'use client'
// frontend/components/economic-calendar/CountdownWidget.tsx
// Counts down to the next High-impact event within 24 hours.

import React, { useEffect, useState } from 'react'
import { EconomicEvent } from '@/types/economic'
import styles from './EconomicCalendar.module.css'

interface CountdownWidgetProps {
    events: EconomicEvent[]
}

function getNextHighImpactEvent(events: EconomicEvent[]): EconomicEvent | null {
    const now = new Date()
    return (
        events
            .filter((e) => {
                if (e.impact !== 'High') return false
                const eventDt = new Date(`${e.date}T${e.time}:00Z`)
                return eventDt > now
            })
            .sort((a, b) => {
                const da = new Date(`${a.date}T${a.time}:00Z`).getTime()
                const db = new Date(`${b.date}T${b.time}:00Z`).getTime()
                return da - db
            })[0] || null
    )
}

function formatCountdown(ms: number): string {
    if (ms <= 0) return '00:00:00'
    const totalSec = Math.floor(ms / 1000)
    const h = Math.floor(totalSec / 3600)
    const m = Math.floor((totalSec % 3600) / 60)
    const s = totalSec % 60
    return [h, m, s].map((n) => String(n).padStart(2, '0')).join(':')
}

export default function CountdownWidget({ events }: CountdownWidgetProps) {
    const [nextEvent, setNextEvent] = useState<EconomicEvent | null>(null)
    const [timeLeft, setTimeLeft] = useState('')
    const [msLeft, setMsLeft] = useState(Infinity)

    useEffect(() => {
        const update = () => {
            const evt = getNextHighImpactEvent(events)
            setNextEvent(evt)
            if (evt) {
                const diff = new Date(`${evt.date}T${evt.time}:00Z`).getTime() - Date.now()
                setMsLeft(diff)
                setTimeLeft(formatCountdown(diff))
            }
        }
        update()
        const id = setInterval(update, 1000)
        return () => clearInterval(id)
    }, [events])

    if (!nextEvent) return null

    const isUrgent = msLeft < 60 * 60 * 1000 // within 1 hour

    return (
        <div className={`${styles.countdownWidget} ${isUrgent ? styles.countdownUrgent : ''}`}>
            <div className={styles.countdownLeft}>
                <span className={styles.countdownLabel}>Next High Impact</span>
                <span className={styles.countdownEvent}>{nextEvent.event}</span>
                <span className={styles.countdownMeta}>
                    {nextEvent.currency} · {nextEvent.date} at {nextEvent.time} UTC
                </span>
            </div>
            <div className={styles.countdownRight}>
                <span className={styles.countdownLabel}>In</span>
                <span className={`${styles.countdownTimer} ${isUrgent ? styles.countdownTimerUrgent : ''}`}>
                    {timeLeft}
                </span>
            </div>
        </div>
    )
}
