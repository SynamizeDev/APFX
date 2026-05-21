'use client'
// frontend/components/economic-calendar/EmptyState.tsx

import React from 'react'
import styles from './EconomicCalendar.module.css'

interface EmptyStateProps {
    onClear?: () => void
}

export default function EmptyState({ onClear }: EmptyStateProps) {
    return (
        <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📭</div>
            <p className={styles.emptyTitle}>No events match your filters</p>
            <p className={styles.emptySubtitle}>
                Try adjusting the impact level, currency, or date range.
            </p>
            {onClear && (
                <button className={styles.emptyAction} onClick={onClear}>
                    Clear all filters
                </button>
            )}
        </div>
    )
}
