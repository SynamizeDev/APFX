'use client'

import dynamic from 'next/dynamic'
import styles from './GlobalScale.module.css'

const Globe = dynamic(() => import('@/components/canvas/Globe'), {
    ssr: false,
    loading: () => <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-3)' }}>Initialising Globe...</div>
})

export default function GlobalScale() {
    return (
        <section className={styles.section} aria-labelledby="globe-heading">
            <div className={styles.inner}>
                <header className={styles.header}>
                    <h2 id="globe-heading" className={styles.title}>Global Presence, Local Expertise</h2>
                    <p style={{ color: 'var(--color-text-2)' }}>
                        Serving traders in over 150 countries with institutional infrastructure
                        and 24/5 award-winning support in your language.
                    </p>
                </header>

                <div className={styles.globeContainer}>
                    <div className={styles.glow} />
                    <div className={styles.canvas}>
                        <Globe />
                    </div>
                </div>

                <div className={styles.stats}>
                    <div className={styles.statItem}>
                        <span className={styles.statValue}>150+</span>
                        <span className={styles.statLabel}>Countries</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statValue}>24/5</span>
                        <span className={styles.statLabel}>Live Support</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statValue}>12ms</span>
                        <span className={styles.statLabel}>Avg Execution</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
