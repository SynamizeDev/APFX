'use client'
// frontend/components/economic-calendar/ErrorState.tsx

import React from 'react'
import styles from './EconomicCalendar.module.css'

interface ErrorStateProps {
    onRetry?: () => void
}

export default function ErrorState({ onRetry }: ErrorStateProps) {
    return (
        <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>⚠️</div>
            <p className={styles.emptyTitle}>Unable to load calendar data</p>
            <p className={styles.emptySubtitle}>
                The data providers are temporarily unavailable. Please try again.
            </p>
            {onRetry && (
                <button className={styles.emptyAction} onClick={onRetry}>
                    Retry
                </button>
            )}
        </div>
    )
}
