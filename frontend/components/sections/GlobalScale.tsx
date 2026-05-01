'use client'

import dynamic from 'next/dynamic'
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'
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

/** Value props beside the globe — institutional, non-location-specific */
const TRUST_HIGHLIGHTS = [
    {
        id: 'safeguarding',
        code: 'Safeguarding',
        name: 'Segregated client funds',
        desc: 'Client assets held with tier-one banking partners and handled in line with institutional safeguarding standards.',
        icon: '🔐',
    },
    {
        id: 'liquidity',
        code: 'Liquidity',
        name: 'Multi-venue pricing',
        desc: 'Aggregated depth across major venues so you see consistent pricing and execution quality worldwide.',
        icon: '🌐',
    },
    {
        id: 'support',
        code: '24/7 Desk',
        name: 'Global coverage',
        desc: 'Specialist desks aligned to major trading sessions—chat, phone, and email when markets move.',
        icon: '🎧',
    },
]

export default function GlobalScale() {
    const prefersReducedMotion = useReducedMotion()
    const highlightsRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (prefersReducedMotion) return
        const slider = highlightsRef.current
        if (!slider) return

        const canAutoSlide = () => {
            const isSmallScreen = window.matchMedia('(max-width: 768px)').matches
            const isScrollable = slider.scrollWidth - slider.clientWidth > 8
            return isSmallScreen && isScrollable
        }

        let intervalId: number | undefined
        let startTimeoutId: number | undefined
        let pausedUntil = 0
        let rafId: number | null = null
        let isAnimating = false

        const easeInOutQuint = (t: number) =>
            t < 0.5 ? 16 * Math.pow(t, 5) : 1 - Math.pow(-2 * t + 2, 5) / 2

        const animateScrollTo = (targetLeft: number, duration = 2000) => {
            if (isAnimating) return

            const startLeft = slider.scrollLeft
            const maxLeft = Math.max(0, slider.scrollWidth - slider.clientWidth)
            const clampedTarget = Math.max(0, Math.min(targetLeft, maxLeft))
            const delta = clampedTarget - startLeft
            if (Math.abs(delta) < 1) return

            isAnimating = true
            const startTime = performance.now()

            const stepFrame = (now: number) => {
                const elapsed = now - startTime
                const progress = Math.min(1, elapsed / duration)
                const eased = easeInOutQuint(progress)
                slider.scrollLeft = startLeft + delta * eased

                if (progress < 1) {
                    rafId = requestAnimationFrame(stepFrame)
                } else {
                    isAnimating = false
                    rafId = null
                }
            }

            rafId = requestAnimationFrame(stepFrame)
        }

        const getStep = () => {
            const firstCard = slider.querySelector<HTMLElement>(`.${styles.regItem}`)
            if (!firstCard) return Math.max(260, slider.clientWidth * 0.92)
            const gapPx =
                parseFloat(
                    window.getComputedStyle(slider).columnGap ||
                        window.getComputedStyle(slider).gap ||
                        '0',
                ) || 0
            return firstCard.offsetWidth + gapPx
        }

        const tick = () => {
            if (!canAutoSlide()) return
            if (Date.now() < pausedUntil) return
            if (isAnimating) return

            const step = getStep()
            const atEnd = slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 4
            if (atEnd) {
                animateScrollTo(0)
            } else {
                animateScrollTo(slider.scrollLeft + step)
            }
        }

        const pauseAuto = () => {
            pausedUntil = Date.now() + 2500
        }

        slider.addEventListener('touchstart', pauseAuto, { passive: true })
        slider.addEventListener('pointerdown', pauseAuto, { passive: true })
        slider.addEventListener('wheel', pauseAuto, { passive: true })

        startTimeoutId = window.setTimeout(tick, 900)
        intervalId = window.setInterval(tick, 4200)

        return () => {
            if (intervalId !== undefined) window.clearInterval(intervalId)
            if (startTimeoutId !== undefined) window.clearTimeout(startTimeoutId)
            if (rafId !== null) cancelAnimationFrame(rafId)
            slider.removeEventListener('touchstart', pauseAuto)
            slider.removeEventListener('pointerdown', pauseAuto)
            slider.removeEventListener('wheel', pauseAuto)
        }
    }, [prefersReducedMotion])

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
                            institutionally engineered stack—deep liquidity routes across established
                            and <strong>emerging markets worldwide</strong>.
                        </p>

                        <div className={styles.miniStats}>
                            <div className={styles.miniStat}>
                                <span className={styles.statVal}>12ms</span>
                                <span className={styles.statLab}>Avg Execution</span>
                            </div>
                            <div className={styles.miniStat}>
                                <span className={styles.statVal}>24/7</span>
                                <span className={styles.statLab}>Live Support</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* ── Center: Globe ────────────────────────── */}
                    <motion.div
                        className={styles.globeContainer}
                        initial={prefersReducedMotion ? false : { opacity: 0 }}
                        whileInView={prefersReducedMotion ? undefined : { opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className={styles.glow} />
                        <div className={styles.canvas}>
                            <Globe />
                        </div>
                    </motion.div>

                    {/* ── Right: Trust highlights (counterweighted to globe) ──────────────── */}
                    <div className={styles.regulators} ref={highlightsRef}>
                        {TRUST_HIGHLIGHTS.map((item, idx) => (
                            <motion.div
                                key={item.id}
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
                                <div className={styles.regIcon}>{item.icon}</div>
                                <div className={styles.regContent}>
                                    <span className={styles.regCode}>{item.code}</span>
                                    <h3 className={styles.regName}>{item.name}</h3>
                                    <p className={styles.regDesc}>{item.desc}</p>
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
