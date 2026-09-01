'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { BarChart3, TrendingUp, Globe, Smartphone } from 'lucide-react'
import { useInViewport } from '@/hooks/useInViewport'
import styles from './TradingPlatforms.module.css'

interface PlatformActionBtn {
    label: string
    href: string
    isExternal?: boolean
}

interface PlatformBadge {
    type: 'appstore' | 'googleplay'
    href: string
}

interface PlatformItem {
    icon: React.ReactNode
    name: string
    subtitle: string
    actionBtn?: PlatformActionBtn
    badges?: PlatformBadge[]
}

const PLATFORMS: PlatformItem[] = [
    {
        icon: <BarChart3 size={26} />,
        name: 'Advanced Web Terminal',
        subtitle: 'Trade directly from your browser',
        actionBtn: {
            label: 'Trade on Web →',
            href: 'https://app.apfxglobal.com/',
            isExternal: true,
        },
    },
    {
        icon: <Smartphone size={26} />,
        name: 'APFX cTrader App',
        subtitle: 'Trade anytime, anywhere with APFX cTrader.',
        badges: [
            {
                type: 'appstore',
                href: 'https://apps.apple.com/in/app/apfx-ctrader/id6797503642',
            },
            {
                type: 'googleplay',
                href: 'https://play.google.com/store/apps/details?id=com.apfx.ct&pcampaignid=web_share',
            },
        ],
    },
]

export default function TradingPlatforms() {
    const sliderRef = useRef<HTMLDivElement | null>(null)
    const { ref: sectionRef, isInViewport } = useInViewport()
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
        if (!isInViewport) return
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
    }, [syncIndexFromScroll, isInViewport])

    return (
        <section ref={sectionRef} className={`${styles.section} apfx-section`} aria-labelledby="platforms-heading">
            <div className={styles.inner}>
                <div className={styles.content}>
                    <span className={styles.eyebrow}>Award-Winning Tech</span>
                    <h2 id="platforms-heading" className={styles.title}>
                        Institutional-Grade CFD Trading Platforms
                    </h2>
                    <p className={styles.desc}>
                        Built for speed, stability, and precision.
                    </p>

                    <div className={styles.platformsGrid} ref={sliderRef}>
                        {PLATFORMS.map((p) => (
                            <div key={p.name} className={styles.platformItem}>
                                <span className={styles.platformIcon} aria-hidden="true">
                                    {p.icon}
                                </span>
                                <h3 className={styles.platformName}>{p.name}</h3>
                                {p.subtitle && <p className={styles.platformSubtitle}>{p.subtitle}</p>}
                                {p.actionBtn && (
                                    <div className={styles.actionContainer}>
                                        <a
                                            href={p.actionBtn.href}
                                            target={p.actionBtn.isExternal ? '_blank' : undefined}
                                            rel={p.actionBtn.isExternal ? 'noopener noreferrer' : undefined}
                                            className={styles.darkCtaBtn}
                                        >
                                            {p.actionBtn.label}
                                        </a>
                                    </div>
                                )}
                                {p.badges && (
                                    <div className={styles.storeBadges}>
                                        {p.badges.map((b) => (
                                            <a
                                                key={b.type}
                                                href={b.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={styles.storeBadge}
                                                aria-label={b.type === 'appstore' ? 'Download APFX cTrader on Apple App Store' : 'Get APFX cTrader on Google Play'}
                                            >
                                                {b.type === 'appstore' ? (
                                                    <>
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={styles.storeBadgeIcon} aria-hidden="true">
                                                            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.67-.82 1.13-1.96.99-3.11-1 .04-2.19.67-2.9 1.5-.64.74-1.2 1.92-1.05 3.05 1.12.09 2.29-.62 2.96-1.44z" />
                                                        </svg>
                                                        <div className={styles.badgeTextGroup}>
                                                            <span className={styles.badgeSubtext}>Download on the</span>
                                                            <span className={styles.badgeTitle}>App Store</span>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className={styles.storeBadgeIcon} aria-hidden="true">
                                                            <path d="M3.609 1.814A1.99 1.99 0 0 0 3 3.234v17.532c0 .546.22 1.04.609 1.42l.07.07L13.88 12.06v-.12L3.68 1.74l-.071.074zM17.26 8.68l-3.38 3.38 3.38 3.38 3.82-2.17c1.09-.62 1.09-1.63 0-2.25L17.26 8.68zM16.14 16.51L12.76 13.13 3.68 22.21c.42.44 1.1.51 1.74.15l10.72-5.85zM16.14 7.49L5.42 1.64c-.64-.36-1.32-.29-1.74.15l9.08 9.08 3.38-3.38z"/>
                                                        </svg>
                                                        <div className={styles.badgeTextGroup}>
                                                            <span className={styles.badgeSubtext}>GET IT ON</span>
                                                            <span className={styles.badgeTitle}>Google Play</span>
                                                        </div>
                                                    </>
                                                )}
                                            </a>
                                        ))}
                                    </div>
                                )}
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
