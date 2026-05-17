'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { BarChart3, TrendingUp, Globe, Smartphone } from 'lucide-react'
import styles from './TradingPlatforms.module.css'

const PLATFORMS = [
    {
        icon: <BarChart3 size={24} />,
        name: 'Advanced Web Terminal',
        desc: 'Institution-grade browser platform with advanced charting, one-click trading, and deep liquidity access.',
    },
    {
        icon: <TrendingUp size={24} />,
        name: 'TradingView Integration',
        desc: 'Trade directly from TradingView charts with powerful technical analysis and social trading tools.',
    },
    {
        icon: <Globe size={24} />,
        name: 'WebTrader',
        desc: 'Access the markets instantly from any modern browser with no installation required.',
    },
    {
        icon: <Smartphone size={24} />,
        name: 'Mobile Trading App',
        desc: 'Full trading functionality on iOS and Android with real-time synchronization across devices.',
    },
]

export default function TradingPlatforms() {
    const sliderRef = useRef<HTMLDivElement | null>(null)
    const [activeIndex, setActiveIndex] = useState(0)

    const syncIndexFromScroll = useCallback(() => {
        const slider = sliderRef.current
        if (!slider) return
        const step = slider.clientWidth
        if (!step) return
        const i = Math.min(PLATFORMS.length - 1, Math.max(0, Math.round(slider.scrollLeft / step)))
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
            const firstCard = slider.querySelector<HTMLElement>(`.${styles.platformItem}`)
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

        // Kick off first movement quickly so autoplay is noticeable.
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
        <section className={`${styles.section} apfx-section`} aria-labelledby="platforms-heading">
            <div className={styles.inner}>
                <div className={styles.content}>
                    <span className={styles.eyebrow}>Award-Winning Tech</span>
                    <h2 id="platforms-heading" className={styles.title}>
                        Institutional-Grade CFD Trading Platforms
                    </h2>
                    <p className={styles.desc}>
                        Whether you scalp intraday volatility or run systematic strategies,
                        our desktop, WebTrader and mobile apps are tuned for speed, stability, and control.
                    </p>

                    <div className={styles.platformsGrid} ref={sliderRef}>
                        {PLATFORMS.map((p) => (
                            <div key={p.name} className={styles.platformItem}>
                                <span className={styles.platformIcon} aria-hidden="true">
                                    {p.icon}
                                </span>
                                <h3 className={styles.platformName}>{p.name}</h3>
                                <p className={styles.platformDesc}>{p.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className={styles.carouselDots} role="tablist" aria-label="Platform slides">
                        {PLATFORMS.map((p, i) => (
                            <button
                                key={p.name}
                                type="button"
                                role="tab"
                                aria-selected={i === activeIndex}
                                aria-label={`Slide ${i + 1} of ${PLATFORMS.length}: ${p.name}`}
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

                <div className={styles.visual} aria-hidden="true">
                    <div className={styles.imageContainer}>
                        <Image 
                            src="/assets/device-bg.png" 
                            alt="Trading Platforms" 
                            width={1200}
                            height={800}
                            className={styles.platformImage}
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
