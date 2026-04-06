'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
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
    const [activeIndex, setActiveIndex] = useState(0)

    const syncIndexFromScroll = useCallback(() => {
        const slider = sliderRef.current
        if (!slider) return
        const step = slider.clientWidth
        if (!step) return
        const i = Math.min(ACADEMY_ITEMS.length - 1, Math.max(0, Math.round(slider.scrollLeft / step)))
        setActiveIndex((prev) => (prev === i ? prev : i))
    }, [])

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
        let scrollSyncTimerId: number | undefined

        const getStep = () => {
            const firstCard = slider.querySelector<HTMLElement>(`.${styles.card}`)
            if (!firstCard) return Math.max(260, slider.clientWidth * 0.92)
            const gapPx = parseFloat(window.getComputedStyle(slider).columnGap || window.getComputedStyle(slider).gap || '0') || 0
            return firstCard.offsetWidth + gapPx
        }

        const tick = () => {
            if (!canAutoSlide()) return
            if (Date.now() < pausedUntil) return

            const step = getStep()
            const atEnd = slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 4

            if (atEnd) {
                slider.scrollTo({ left: 0, behavior: 'smooth' })
            } else {
                slider.scrollTo({ left: slider.scrollLeft + step, behavior: 'smooth' })
            }
        }

        const pauseAuto = () => {
            pausedUntil = Date.now() + 2500
        }

        slider.addEventListener('touchstart', pauseAuto, { passive: true })
        slider.addEventListener('pointerdown', pauseAuto, { passive: true })
        slider.addEventListener('wheel', pauseAuto, { passive: true })
        slider.addEventListener(
            'scroll',
            () => {
                if (scrollSyncTimerId !== undefined) window.clearTimeout(scrollSyncTimerId)
                scrollSyncTimerId = window.setTimeout(() => {
                    scrollSyncTimerId = undefined
                    syncIndexFromScroll()
                }, 60)
            },
            { passive: true },
        )

        startTimeoutId = window.setTimeout(tick, 900)
        intervalId = window.setInterval(tick, 4200)

        return () => {
            if (intervalId !== undefined) window.clearInterval(intervalId)
            if (startTimeoutId !== undefined) window.clearTimeout(startTimeoutId)
            if (scrollSyncTimerId !== undefined) window.clearTimeout(scrollSyncTimerId)
            slider.removeEventListener('touchstart', pauseAuto)
            slider.removeEventListener('pointerdown', pauseAuto)
            slider.removeEventListener('wheel', pauseAuto)
        }
    }, [syncIndexFromScroll])

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

                <div className={styles.carouselDots} role="tablist" aria-label="Academy slides">
                    {ACADEMY_ITEMS.map((item, i) => (
                        <button
                            key={item.id}
                            type="button"
                            role="tab"
                            aria-selected={i === activeIndex}
                            aria-label={`Slide ${i + 1} of ${ACADEMY_ITEMS.length}`}
                            className={i === activeIndex ? styles.carouselDotActive : styles.carouselDot}
                            onClick={() => {
                                const slider = sliderRef.current
                                if (!slider) return
                                const left = i * slider.clientWidth
                                slider.scrollTo({ left, behavior: 'smooth' })
                                setActiveIndex(i)
                            }}
                        />
                    ))}
                </div>
            </div>
            <div className={styles.dividerGlowBottom} />
        </section>
    )
}
