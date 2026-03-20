'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { BookOpen, GraduationCap, Video, ArrowRight } from 'lucide-react'
import styles from './TradingAcademy.module.css'

const ACADEMY_ITEMS = [
    {
        id: 'academy',
        icon: <BookOpen size={28} />,
        title: 'Trading\nAcademy',
        desc: 'Learn with APFX Academy for clear, structured lessons. Easy steps to build trading skills. No experience needed.',
        link: 'Explore Courses',
        href: '/learn'
    },
    {
        id: 'education',
        icon: <GraduationCap size={28} />,
        title: 'Education\nSection',
        desc: 'Read articles and watch tutorials that cover every trading aspect. All topics, all levels, all in one click.',
        link: 'Browse All Topics',
        href: '/education'
    },
    {
        id: 'webinars',
        icon: <Video size={28} />,
        title: 'Live\nWebinars',
        desc: 'Attend our weekly live webinars to analyse trends. Improve your trading skills, in simple and understandable terms.',
        link: 'Reserve Your Spot',
        href: '/education/webinars'
    }
]

export default function TradingAcademy() {
    const sliderRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const slider = sliderRef.current
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
            t < 0.5
                ? 16 * Math.pow(t, 5)
                : 1 - Math.pow(-2 * t + 2, 5) / 2

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
            const firstCard = slider.querySelector<HTMLElement>(`.${styles.card}`)
            if (!firstCard) return Math.max(260, slider.clientWidth * 0.92)
            const gapPx = parseFloat(window.getComputedStyle(slider).columnGap || window.getComputedStyle(slider).gap || '0') || 0
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
    }, [])

    return (
        <section className={`${styles.section} apfx-section`} aria-labelledby="academy-heading">
            <div className={styles.dividerGlow} />
            {/* Background Decorative Text */}
            <div className={styles.bgWatermark} aria-hidden="true">
                LEARN
            </div>

            <div className={styles.inner}>
                <header className={styles.header}>
                    <h2 id="academy-heading" className={styles.title}>
                        Start <span className={styles.titleAccent}>Learning Here</span>
                    </h2>
                </header>

                <div className={styles.grid} ref={sliderRef}>
                    {ACADEMY_ITEMS.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            className={styles.card}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.8,
                                delay: idx * 0.15,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                            whileHover={{ y: -10 }}
                        >
                            <div className={styles.cardGlow} />
                            <div className={styles.cardFlare} />
                            <div className={styles.shimmer} />

                            <div className={styles.iconContainer}>
                                <div className={styles.iconBlob} />
                                <div className={styles.iconWrapper}>
                                    {item.icon}
                                </div>
                            </div>

                            <div className={styles.cardContent}>
                                <h3 className={styles.cardTitle}>{item.title}</h3>
                                <p className={styles.cardDesc}>{item.desc}</p>
                            </div>

                            <Link href={item.href} className={styles.link}>
                                <span>{item.link}</span>
                                <ArrowRight size={16} className={styles.linkArrow} />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
            <div className={styles.dividerGlowBottom} />
        </section>
    )
}
