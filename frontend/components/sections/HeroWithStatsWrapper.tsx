'use client'

import HeroCurve from './HeroCurve'
import styles from './HeroCurve.module.css'

/**
 * Wraps hero + stats so the right-side curve spans from behind stats up to the header.
 */
export default function HeroWithStatsWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.wrapper}>
            <HeroCurve />
            {children}
        </div>
    )
}
