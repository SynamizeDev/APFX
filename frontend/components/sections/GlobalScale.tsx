'use client'

import dynamic from 'next/dynamic'
import { motion, useReducedMotion } from 'framer-motion'
import styles from './GlobalScale.module.css'

const Globe = dynamic(() => import('@/components/canvas/Globe'), {
    ssr: false,
    loading: () => (
        <div
            style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-text-3)',
                fontSize: 'var(--text-sm)',
            }}
        >
            Initialising global network…
        </div>
    ),
})

export default function GlobalScale() {
    const prefersReducedMotion = useReducedMotion()

    return (
        <section
            className={`${styles.section} apfx-section`}
            aria-labelledby="globe-heading"
        >
            <div className={styles.inner}>
                {/* ── Header ─────────────────────────────── */}
                <motion.header
                    className={styles.header}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                    whileInView={
                        prefersReducedMotion
                            ? undefined
                            : { opacity: 1, y: 0 }
                    }
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{
                        duration: 0.7,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                >
                    <h2 id="globe-heading" className={styles.title}>
                        Global Reach, Local Market Intelligence
                    </h2>
                    <p style={{ color: 'var(--color-text-2)' }}>
                        Serve and support clients in more than 150 jurisdictions
                        with a single, institutionally engineered infrastructure
                        and true 24/5 multilingual coverage.
                    </p>
                </motion.header>

                {/* ── Globe ──────────────────────────────── */}
                <motion.div
                    className={styles.globeContainer}
                    initial={
                        prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }
                    }
                    whileInView={
                        prefersReducedMotion
                            ? undefined
                            : { opacity: 1, scale: 1 }
                    }
                    viewport={{ once: true }}
                    transition={{
                        duration: 1,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                >
                    <div className={styles.glow} />
                    <div className={styles.canvas}>
                        <Globe />
                    </div>
                </motion.div>

                {/* ── Stats ──────────────────────────────── */}
                <motion.div
                    className={styles.stats}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                    whileInView={
                        prefersReducedMotion
                            ? undefined
                            : { opacity: 1, y: 0 }
                    }
                    viewport={{ once: true }}
                    transition={{
                        duration: 0.7,
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.1,
                    }}
                >
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
                </motion.div>
            </div>
        </section>
    )
}