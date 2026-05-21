'use client'
// frontend/components/economic-calendar/LoadingSkeleton.tsx

import React from 'react'
import styles from './EconomicCalendar.module.css'

export default function LoadingSkeleton({ rows = 8 }: { rows?: number }) {
    return (
        <div className={styles.skeletonWrap}>
            {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className={styles.skeletonRow} style={{ animationDelay: `${i * 0.06}s` }}>
                    <div className={`${styles.skeletonCell} ${styles.skeletonShort}`} />
                    <div className={`${styles.skeletonCell} ${styles.skeletonShort}`} />
                    <div className={`${styles.skeletonCell} ${styles.skeletonMed}`} />
                    <div className={`${styles.skeletonCell} ${styles.skeletonLong}`} />
                    <div className={`${styles.skeletonCell} ${styles.skeletonShort}`} />
                    <div className={`${styles.skeletonCell} ${styles.skeletonShort}`} />
                    <div className={`${styles.skeletonCell} ${styles.skeletonShort}`} />
                </div>
            ))}
        </div>
    )
}
