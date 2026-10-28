'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './StatsBar.module.css'

interface Stat {
    prefix?: string
    value: number
    suffix: string
    label: string
    decimals?: number
    useLocale?: boolean
}

const STATS: Stat[] = [
    { prefix: '$', value: 2, suffix: 'B+', label: 'Daily Trading Volume' },
    { value: 150, suffix: '+', label: 'Countries Served' },
    { value: 1200, suffix: '+', label: 'Tradeable Instruments', useLocale: true },
    { value: 99.9, suffix: '%', label: 'Platform Uptime', decimals: 1 },
]

function Counter({ stat }: { stat: Stat }) {
    const numRef = useRef<HTMLSpanElement>(null)
    const [fired, setFired] = useState(false)

    useEffect(() => {
        const el = numRef.current
        if (!el || fired) return
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return
            observer.disconnect()
            setFired(true)

            if (prefersReduced) {
                el.textContent = fmt(stat.value)
                return
            }

            const start = performance.now()
            const dur = 2000
            function tick(now: number) {
                const t = Math.min((now - start) / dur, 1)
                const e = t === 1 ? 1 : 1 - Math.pow(2, -10 * t) // expo-out
                if (el) {
                    el.textContent = fmt(stat.value * e)
                }
                if (t < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
        }, { threshold: 0.3 })

        observer.observe(el)
        return () => observer.disconnect()
    }, [stat, fired])

    const fmt = (n: number) => {
        const fixed = n.toFixed(stat.decimals ?? 0)
        return stat.useLocale ? Number(fixed).toLocaleString('en-US') : fixed
    }

    return (
        <span ref={numRef} className={styles.number}>
            {fmt(stat.value)}
        </span>
    )
}

export default function StatsBar() {
    return (
        <section className={styles.statsSection} aria-labelledby="stats-heading">
            <div className={styles.container}>
                {/* ── Left Column: Section Header ── */}
                <header className={styles.header}>
                    <h2 id="stats-heading" className={styles.heading}>
                        <span className={styles.headingLine1}>We Don&apos;t Follow the Standard.</span>
                        <br />
                        <span className={styles.headingAccent}>We Build Around You.</span>
                    </h2>
                    <p className={styles.description}>
                        Advanced technology. Dedicated human support. A trading environment designed around your needs. Every feature, every tool, and every experience is built to help you navigate the markets with confidence. But don&apos;t just take our word for it. Let our traders and their experiences speak for us.
                    </p>
                </header>

                {/* ── Right Column: Staggered Asymmetrical Cards ── */}
                <div className={styles.cardsGrid}>
                    {/* Card 1: $2B+ Daily Trading Volume (Soft Mint Green) */}
                    <div className={`${styles.kpiCard} ${styles.cardMint} ${styles.cardStagger1}`}>
                        <div className={styles.valueRow}>
                            <span className={styles.prefix}>$</span>
                            <Counter stat={STATS[0]} />
                            <span className={styles.suffix}>B+</span>
                        </div>
                        <span className={styles.label}>Daily Trading Volume</span>
                    </div>

                    {/* Card 2: 1,200+ Tradeable Instruments (Soft Lavender) */}
                    <div className={`${styles.kpiCard} ${styles.cardLavender} ${styles.cardTopRight}`}>
                        <div className={styles.valueRow}>
                            <Counter stat={STATS[2]} />
                            <span className={styles.suffix}>+</span>
                        </div>
                        <span className={styles.label}>Tradeable Instruments</span>
                    </div>

                    {/* Card 3: 150+ Countries Served (Pastel Blue) */}
                    <div className={`${styles.kpiCard} ${styles.cardBlue} ${styles.cardStagger2}`}>
                        <div className={styles.valueRow}>
                            <Counter stat={STATS[1]} />
                            <span className={styles.suffix}>+</span>
                        </div>
                        <span className={styles.label}>Countries Served</span>
                    </div>

                    {/* Card 4: 99.9% Platform Uptime (Light Peach/Orange) */}
                    <div className={`${styles.kpiCard} ${styles.cardPeach} ${styles.cardMidRight}`}>
                        <div className={styles.valueRow}>
                            <Counter stat={STATS[3]} />
                            <span className={styles.suffix}>%</span>
                        </div>
                        <span className={styles.label}>Platform Uptime</span>
                    </div>

                    {/* Card 5: Trustpilot Review Card (Featured, Asymmetrical Overlap) */}
                    <div className={styles.trustpilotCard}>
                        {/* Notch Tab */}
                        <div className={styles.trustpilotTab}>
                            <svg className={styles.tpLogoStar} width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <polygon points="12,1.5 15.24,8.07 22.5,9.12 17.25,14.24 18.49,21.47 12,17.97 5.51,21.47 6.75,14.24 1.5,9.12 8.76,8.07" fill="#00b67a" />
                            </svg>
                            <span>Trustpilot</span>
                        </div>

                        <div className={styles.tpContent}>
                            <div className={styles.tpScore}>4.0</div>
                            <div className={styles.tpDetails}>
                                <div className={styles.tpRatingRow}>
                                    <span className={styles.tpVerdict}>Great</span>
                                    <div className={styles.tpStars} aria-label="Rating 4.0 out of 5 stars">
                                        {[1, 2, 3, 4].map((i) => (
                                            <span key={i} className={styles.tpStarBox}>
                                                <svg width="11" height="11" viewBox="0 0 24 24" fill="#ffffff" aria-hidden="true">
                                                    <polygon points="12,1.5 15.24,8.07 22.5,9.12 17.25,14.24 18.49,21.47 12,17.97 5.51,21.47 6.75,14.24 1.5,9.12 8.76,8.07" />
                                                </svg>
                                            </span>
                                        ))}
                                        <span className={`${styles.tpStarBox} ${styles.tpStarBoxEmpty}`}>
                                            <svg width="11" height="11" viewBox="0 0 24 24" fill="#ffffff" aria-hidden="true">
                                                <polygon points="12,1.5 15.24,8.07 22.5,9.12 17.25,14.24 18.49,21.47 12,17.97 5.51,21.47 6.75,14.24 1.5,9.12 8.76,8.07" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                                <span className={styles.tpReviews}>4 reviews</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
