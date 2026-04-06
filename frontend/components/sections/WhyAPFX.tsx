'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Zap, Landmark, BarChart3, Lock, Globe, Smartphone, Headphones } from 'lucide-react'
import styles from './WhyAPFX.module.css'

const FEATURES = [
    {
        icon: <Zap size={24} />,
        label: 'Execution',
        title: 'Sub-Millisecond Order Execution',
        desc: 'Our infrastructure is co-located with tier-1 liquidity providers, ensuring your orders are filled at the price you see with zero re-quotes.',
        large: true,
        iconBg: 'rgba(0,200,150,0.1)',
        iconBorder: 'rgba(0,200,150,0.2)',
        glow: 'rgba(0,200,150,0.12)',
    },
    {
        icon: <Landmark size={24} />,
        label: 'Regulation',
        title: 'Fully Regulated & Licensed',
        desc: 'Operating under strict financial regulation with segregated client funds, full transparency and mandatory audits.',
        large: false,
        iconBg: 'rgba(99,102,241,0.1)',
        iconBorder: 'rgba(99,102,241,0.2)',
        glow: 'rgba(99,102,241,0.1)',
    },
    {
        icon: <BarChart3 size={24} />,
        label: 'Liquidity',
        title: 'Deep Institutional Liquidity',
        desc: 'Aggregated from 15+ global tier-1 banks and non-bank market makers for the tightest spreads.',
        large: false,
        iconBg: 'rgba(0,200,150,0.1)',
        iconBorder: 'rgba(0,200,150,0.2)',
        glow: 'rgba(0,200,150,0.1)',
    },
    {
        icon: <Lock size={24} />,
        label: 'Security',
        title: 'Bank-Level Security',
        desc: 'Your funds are held in segregated accounts at top-tier banks. 2FA, encrypted connections, and real-time monitoring.',
        large: false,
        iconBg: 'rgba(249,115,22,0.1)',
        iconBorder: 'rgba(249,115,22,0.2)',
        glow: 'rgba(249,115,22,0.1)',
    },
    {
        icon: <Globe size={24} />,
        label: 'Global',
        title: 'Truly Global Access',
        desc: 'Serve clients in 150+ countries with local payment methods, multilingual support, and regional compliance.',
        large: false,
        iconBg: 'rgba(201,168,76,0.1)',
        iconBorder: 'rgba(201,168,76,0.2)',
        glow: 'rgba(201,168,76,0.1)',
    },
    {
        icon: <Smartphone size={24} />,
        label: 'Platform',
        title: 'Trade Anywhere, Any Device',
        desc: 'Advanced Desktop, WebTrader, and native mobile apps for iOS and Android. Seamless across all your devices.',
        large: false,
        iconBg: 'rgba(59,130,246,0.1)',
        iconBorder: 'rgba(59,130,246,0.2)',
        glow: 'rgba(59,130,246,0.1)',
    },
    {
        icon: <Headphones size={24} />,
        label: 'Support',
        title: 'Expert 24/7 Local Support',
        desc: 'Dedicated institutional-grade support via chat, phone, and email—aligned to major trading sessions worldwide.',
        large: true,
        iconBg: 'rgba(59,130,246,0.1)',
        iconBorder: 'rgba(59,130,246,0.2)',
        glow: 'rgba(59,130,246,0.1)',
    },
]

export default function WhyAPFX() {
    const sliderRef = useRef<HTMLDivElement | null>(null)
    const [activeIndex, setActiveIndex] = useState(0)

    const syncIndexFromScroll = useCallback(() => {
        const slider = sliderRef.current
        if (!slider) return
        const step = slider.clientWidth
        if (!step) return
        const i = Math.min(FEATURES.length - 1, Math.max(0, Math.round(slider.scrollLeft / step)))
        setActiveIndex((prev) => (prev === i ? prev : i))
    }, [])

    useEffect(() => {
        const slider = sliderRef.current
        if (!slider) return

        const canAutoSlide = () => {
            // Match the rest of the home-page carousels (phone breakpoint)
            const isSmallScreen = window.matchMedia('(max-width: 768px)').matches
            const isScrollable = slider.scrollWidth - slider.clientWidth > 8
            return isSmallScreen && isScrollable
        }

        let intervalId: number | undefined
        let startTimeoutId: number | undefined
        let pausedUntil = 0
        let scrollSyncTimerId: number | undefined

        const getStep = () => {
            const firstCard = slider.querySelector<HTMLElement>(`.${styles.bentoItem}`)
            if (!firstCard) return Math.max(260, slider.clientWidth * 0.9)

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
            pausedUntil = Date.now() + 5000
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
        <section className={`${styles.section} apfx-section`} aria-labelledby="why-heading">
            <div className={styles.inner}>
                <header className={styles.header}>
                    <div className={styles.eyebrow}>Why APFX</div>
                    <h2 id="why-heading" className={styles.title}>
                        Engineered for Serious Traders
                    </h2>
                    <p className={styles.subtitle}>
                        Every decision in our stack is designed to compress latency, sharpen pricing, and
                        give you the kind of edge usually reserved for institutional desks.
                    </p>
                </header>

                <div className={styles.bento} ref={sliderRef}>
                    {FEATURES.map((f) => (
                        <div
                            key={f.title}
                            className={`${styles.bentoItem} ${f.large ? styles.bentoLarge : ''}`}
                            style={
                                {
                                    '--glow-color': f.glow,
                                    '--icon-bg': f.iconBg,
                                    '--icon-border': f.iconBorder,
                                } as React.CSSProperties
                            }
                        >
                            <div className={styles.bentoIcon}>
                                {f.icon}
                            </div>
                            <div className={styles.bentoContent}>
                                <span className={styles.bentoLabel}>{f.label}</span>
                                <h3 className={styles.bentoTitle}>{f.title}</h3>
                                <p className={styles.bentoDesc}>{f.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.carouselDots} role="tablist" aria-label="Why APFX slides">
                    {FEATURES.map((f, i) => (
                        <button
                            key={f.title}
                            type="button"
                            role="tab"
                            aria-selected={i === activeIndex}
                            aria-label={`Slide ${i + 1} of ${FEATURES.length}: ${f.label}`}
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
        </section>
    )
}
