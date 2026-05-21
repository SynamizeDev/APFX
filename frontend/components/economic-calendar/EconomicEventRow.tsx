'use client'
// frontend/components/economic-calendar/EconomicEventRow.tsx
// Single table row for an economic event.

import React from 'react'
import { EconomicEvent } from '@/types/economic'
import ImpactBadge from './ImpactBadge'
import CurrencyFlag from './CurrencyFlag'
import styles from './EconomicCalendar.module.css'

interface EconomicEventRowProps {
    event: EconomicEvent
    isUpcoming: boolean   // within 1 hour
    isToday: boolean
    isExpanded: boolean
    onToggle: () => void
}

function formatActual(val?: string): { text: string; className: string } {
    if (!val) return { text: '—', className: styles.actualPending }
    return { text: val, className: styles.actualValue }
}

export default function EconomicEventRow({
    event,
    isUpcoming,
    isToday,
    isExpanded,
    onToggle
}: EconomicEventRowProps) {
    const { text: actualText, className: actualClass } = formatActual(event.actual)

    return (
        <div
            className={`
                ${styles.tableRow}
                ${isUpcoming ? styles.rowUpcoming : ''}
                ${isToday ? styles.rowToday : ''}
                ${event.impact === 'High' ? styles.rowHigh : ''}
                ${isExpanded ? styles.rowExpandedActive : ''}
            `}
            onClick={onToggle}
            style={{ cursor: 'pointer' }}
        >
            {/* Time */}
            <span className={styles.time}>
                {isUpcoming && <span className={styles.upcomingPip} />}
                {event.time}
                <span className={styles.timeUtc}>UTC</span>
            </span>

            {/* Currency + Flag */}
            <span className={styles.currency}>
                <CurrencyFlag currency={event.currency} size="sm" />
            </span>

            {/* Impact */}
            <span className={styles.impact}>
                <ImpactBadge impact={event.impact} />
            </span>

            {/* Event name */}
            <span className={styles.eventName}>
                <span className={`${styles.expChevron} ${isExpanded ? styles.expChevronRotated : ''}`}>
                    ▶
                </span>
                {event.event}
            </span>

            {/* Forecast */}
            <span className={`${styles.numCol} ${styles.numVal}`}>
                {event.forecast || '—'}
            </span>

            {/* Previous */}
            <span className={`${styles.numCol} ${styles.numVal}`}>
                {event.previous || '—'}
            </span>

            {/* Actual */}
            <span className={`${styles.numCol} ${actualClass}`}>
                {actualText}
            </span>
        </div>
    )
}
