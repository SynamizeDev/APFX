'use client'

import { useEffect, useRef } from 'react'
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
            const firstCard = slider.querySelector<HTMLElement>(`.${styles.platformItem}`)
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

        // Kick off first movement quickly so autoplay is noticeable.
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
        <section className={`${styles.section} apfx-section`} aria-labelledby="platforms-heading">
            <div className={styles.inner}>
                <div className={styles.content}>
                    <span className={styles.eyebrow}>Award-Winning Tech</span>
                    <h2 id="platforms-heading" className={styles.title}>
                        Institutional Platforms on Every Device
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
                </div>

                <div className={styles.visual} aria-hidden="true">
                    <div className={styles.mockupContainer} style={{ position: 'relative', width: '100%', height: '100%', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        
                        {/* Desktop Monitor */}
                        <div style={{ position: 'absolute', width: '80%', height: '60%', background: '#0B0F1A', border: '2px solid #2A3245', borderRadius: '8px', zIndex: 1, top: '10%', left: '10%', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', overflow: 'hidden' }}>
                            <div style={{ padding: '0.4rem', background: '#1A2235', borderBottom: '1px solid #2A3245', display: 'flex', gap: '0.3rem' }}>
                                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ff5f56' }}></div>
                                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#27c93f' }}></div>
                            </div>
                            <div style={{ padding: '1rem', height: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <div style={{ display: 'flex', gap: '8px', height: '60%' }}>
                                    <div style={{ flex: 2, background: 'rgba(0, 200, 150, 0.05)', border: '1px solid rgba(0, 200, 150, 0.2)', borderRadius: '4px', position: 'relative', overflow: 'hidden' }}>
                                        {/* Simple CSS Candlesticks representation */}
                                        <div style={{ position: 'absolute', bottom: '20%', left: '10%', width: '4px', height: '30%', background: '#00C896' }}></div>
                                        <div style={{ position: 'absolute', bottom: '40%', left: '30%', width: '4px', height: '40%', background: '#00C896' }}></div>
                                        <div style={{ position: 'absolute', bottom: '30%', left: '50%', width: '4px', height: '25%', background: '#ff4757' }}></div>
                                        <div style={{ position: 'absolute', bottom: '45%', left: '70%', width: '4px', height: '35%', background: '#00C896' }}></div>
                                    </div>
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <div style={{ flex: 1, background: '#1A2235', borderRadius: '4px' }}></div>
                                        <div style={{ flex: 1, background: '#1A2235', borderRadius: '4px' }}></div>
                                    </div>
                                </div>
                                <div style={{ flex: 1, background: '#1A2235', borderRadius: '4px' }}></div>
                            </div>
                        </div>

                        {/* Tablet View */}
                        <div style={{ position: 'absolute', width: '45%', height: '55%', background: '#03050A', border: '2px solid #2A3245', borderRadius: '12px', zIndex: 2, bottom: '5%', left: '5%', boxShadow: '0 15px 40px rgba(0,0,0,0.6)', overflow: 'hidden' }}>
                            <div style={{ height: '100%', padding: '0.8rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <div style={{ width: '40%', height: '6px', background: '#1A2235', borderRadius: '3px' }}></div>
                                <div style={{ flex: 1, background: 'rgba(0, 200, 150, 0.08)', borderRadius: '6px', border: '1px solid rgba(0, 200, 150, 0.15)', display: 'flex', alignItems: 'flex-end', padding: '8px', gap: '4px' }}>
                                    {/* Line chart mock */}
                                    <div style={{ width: '20%', height: '30%', background: '#00C896', borderRadius: '2px 2px 0 0' }}></div>
                                    <div style={{ width: '20%', height: '50%', background: '#00C896', borderRadius: '2px 2px 0 0' }}></div>
                                    <div style={{ width: '20%', height: '40%', background: '#00C896', borderRadius: '2px 2px 0 0' }}></div>
                                    <div style={{ width: '20%', height: '70%', background: '#00C896', borderRadius: '2px 2px 0 0' }}></div>
                                </div>
                                <div style={{ height: '20%', display: 'flex', gap: '8px' }}>
                                    <div style={{ flex: 1, background: '#1A2235', borderRadius: '4px' }}></div>
                                    <div style={{ flex: 1, background: '#1A2235', borderRadius: '4px' }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Phone */}
                        <div style={{ position: 'absolute', width: '25%', height: '60%', background: '#000', border: '3px solid #3A4255', borderRadius: '24px', zIndex: 3, bottom: '10%', right: '10%', boxShadow: '0 25px 50px rgba(0,0,0,0.8)', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', width: '40%', height: '12px', background: '#3A4255', borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px', zIndex: 4 }}></div>
                            <div style={{ padding: '1.2rem 0.8rem 0.8rem', height: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ width: '40%', height: '16px', background: '#00C896', borderRadius: '4px', opacity: 0.8 }}></div>
                                    <div style={{ width: '20%', height: '16px', background: '#ff4757', borderRadius: '4px', opacity: 0.8 }}></div>
                                </div>
                                <div style={{ flex: 1, background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', flexDirection: 'column', gap: '4px', padding: '6px' }}>
                                    <div style={{ width: '100%', height: '12px', background: '#1A2235', borderRadius: '2px' }}></div>
                                    <div style={{ width: '100%', height: '12px', background: '#1A2235', borderRadius: '2px' }}></div>
                                    <div style={{ width: '100%', height: '12px', background: '#1A2235', borderRadius: '2px' }}></div>
                                    <div style={{ width: '100%', height: '12px', background: '#1A2235', borderRadius: '2px' }}></div>
                                </div>
                                <div style={{ display: 'flex', gap: '6px', marginTop: 'auto' }}>
                                    <div style={{ flex: 1, height: '24px', background: '#00C896', borderRadius: '12px' }}></div>
                                    <div style={{ flex: 1, height: '24px', background: '#ff4757', borderRadius: '12px' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
