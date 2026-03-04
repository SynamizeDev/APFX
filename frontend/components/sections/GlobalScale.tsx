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

const REGULATORS = [
    {
        id: 'adgm',
        code: 'ADGM / FSRA',
        name: 'Abu Dhabi Global Markets Financial Services Regulatory Authority',
        desc: 'Direct regulatory oversight for UAE and MENA regional operations.',
        icon: '🇦🇪'
    },
    {
        id: 'mumbai',
        code: 'Strategic Hub',
        name: 'Mumbai Market Intelligence',
        desc: 'Localized liquidity and deep market insight for the Indian subcontinent.',
        icon: '🇮🇳'
    },
    {
        id: 'support',
        code: '24/5 Desk',
        name: 'Dedicated Support',
        customLabel: 'Dedicated Dubai/Mumbai Desk',
        desc: 'Expert support teams localized to your time zone and market needs.',
        icon: '📞'
    }
]

export default function GlobalScale() {
    const prefersReducedMotion = useReducedMotion()

    return (
        <section
            className={`${styles.section} apfx-section`}
            aria-labelledby="globe-heading"
        >
            <div className={styles.inner}>
                <div className={styles.layout}>
                    {/* ── Left: Narrative ─────────────────────── */}
                    <motion.div
                        className={styles.narrative}
                        initial={prefersReducedMotion ? false : { opacity: 0, x: -30 }}
                        whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className={styles.eyebrow}>Safe Hands</div>
                        <h2 id="globe-heading" className={styles.title}>
                            Global Reach, Local Market Intelligence
                        </h2>
                        <p className={styles.description}>
                            Serve and support clients in more than 150 jurisdictions with a single,
                            institutionally engineered infrastructure and specialized focus on the
                            <strong> UAE and India</strong> growth markets.
                        </p>

                        <div className={styles.miniStats}>
                            <div className={styles.miniStat}>
                                <span className={styles.statVal}>12ms</span>
                                <span className={styles.statLab}>Avg Execution</span>
                            </div>
                            <div className={styles.miniStat}>
                                <span className={styles.statVal}>24/5</span>
                                <span className={styles.statLab}>Live Support</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* ── Center: Globe ────────────────────────── */}
                    <motion.div
                        className={styles.globeContainer}
                        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
                        whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className={styles.glow} />
                        <div className={styles.canvas}>
                            <Globe />
                        </div>
                    </motion.div>

                    {/* ── Right: Regulators/Presence ──────────────── */}
                    <div className={styles.regulators}>
                        {REGULATORS.map((reg, idx) => (
                            <motion.div
                                key={reg.id}
                                className={styles.regItem}
                                initial={prefersReducedMotion ? false : { opacity: 0, x: 30 }}
                                whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.2 + (idx * 0.1),
                                    ease: [0.16, 1, 0.3, 1]
                                }}
                            >
                                <div className={styles.regIcon}>{reg.icon}</div>
                                <div className={styles.regContent}>
                                    <span className={styles.regCode}>{reg.code}</span>
                                    <h3 className={styles.regName}>{reg.name}</h3>
                                    <p className={styles.regDesc}>{reg.desc}</p>
                                </div>
                                <div className={styles.connector} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
