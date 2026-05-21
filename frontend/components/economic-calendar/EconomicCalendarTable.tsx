'use client'
// frontend/components/economic-calendar/EconomicCalendarTable.tsx
// Full table with sticky header, date-group separators, expandable details and row variants.

import React, { useMemo, useState } from 'react'
import { EconomicEvent } from '@/types/economic'
import EconomicEventRow from './EconomicEventRow'
import EventDetailsDrawer from './EventDetailsDrawer'
import LoadingSkeleton from './LoadingSkeleton'
import EmptyState from './EmptyState'
import styles from './EconomicCalendar.module.css'

interface EconomicCalendarTableProps {
    events: EconomicEvent[]
    isLoading: boolean
    onClearFilters?: () => void
}

function isWithin1Hour(event: EconomicEvent): boolean {
    const now = Date.now()
    const evtTime = new Date(`${event.date}T${event.time}:00Z`).getTime()
    return evtTime > now && evtTime - now < 60 * 60 * 1000
}

function isTodayDate(dateStr: string): boolean {
    return dateStr === new Date().toISOString().split('T')[0]
}

function formatDateGroup(dateStr: string): string {
    const d = new Date(`${dateStr}T00:00:00Z`)
    const today = new Date()
    const todayStr = today.toISOString().split('T')[0]
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const tomorrowStr = tomorrow.toISOString().split('T')[0]

    if (dateStr === todayStr) return 'Today'
    if (dateStr === tomorrowStr) return 'Tomorrow'
    return d.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
    })
}

export default function EconomicCalendarTable({
    events,
    isLoading,
    onClearFilters,
}: EconomicCalendarTableProps) {
    const [expandedId, setExpandedId] = useState<string | null>(null)

    // Group events by date
    const grouped = useMemo(() => {
        const map = new Map<string, EconomicEvent[]>()
        events.forEach((e) => {
            const arr = map.get(e.date) || []
            arr.push(e)
            map.set(e.date, arr)
        })
        return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b))
    }, [events])

    const handleToggleExpand = (id: string) => {
        setExpandedId((prev) => (prev === id ? null : id))
    }

    return (
        <div className={styles.tableWrap}>
            {/* Sticky header */}
            <div className={styles.tableHeader}>
                <span>Time (UTC)</span>
                <span>Currency</span>
                <span>Impact</span>
                <span>Event</span>
                <span className={styles.numCol}>Forecast</span>
                <span className={styles.numCol}>Previous</span>
                <span className={styles.numCol}>Actual</span>
            </div>

            {/* Body */}
            <div className={styles.tableBody}>
                {isLoading ? (
                    <LoadingSkeleton rows={8} />
                ) : grouped.length === 0 ? (
                    <EmptyState onClear={onClearFilters} />
                ) : (
                    grouped.map(([date, dateEvents]) => (
                        <React.Fragment key={date}>
                            {/* Date group separator */}
                            <div className={`${styles.dateGroup} ${isTodayDate(date) ? styles.dateGroupToday : ''}`}>
                                <span className={styles.dateGroupLabel}>{formatDateGroup(date)}</span>
                                <span className={styles.dateGroupDate}>{date}</span>
                                <span className={styles.dateGroupCount}>{dateEvents.length} events</span>
                            </div>

                            {dateEvents.map((evt) => {
                                const isExpanded = expandedId === evt.id
                                return (
                                    <React.Fragment key={evt.id}>
                                        <EconomicEventRow
                                            event={evt}
                                            isUpcoming={isWithin1Hour(evt)}
                                            isToday={isTodayDate(date)}
                                            isExpanded={isExpanded}
                                            onToggle={() => handleToggleExpand(evt.id)}
                                        />
                                        {isExpanded && (
                                            <EventDetailsDrawer event={evt} />
                                        )}
                                    </React.Fragment>
                                )
                            })}
                        </React.Fragment>
                    ))
                )}
            </div>
        </div>
    )
}
