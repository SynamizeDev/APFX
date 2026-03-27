'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import styles from './AccountTypes.module.css'

const ACCOUNTS = [
    // ... rest of ACCOUNTS unchanged
    {
        name: 'Standard',
        price: '0.0',
        suffix: 'Commission',
        features: [
            'Spreads from 1.0 pips',
            'No commissions',
            'Leverage up to 1:1000',
            'All platforms available',
            'Min. deposit: $50',
        ],
        cta: 'Get Started',
        featured: false,
    },
    {
        name: 'Premium',
        price: '3.5',
        suffix: 'per lot',
        features: [
            'Spreads from 0.0 pips',
            'Institutional liquidity',
            'Leverage up to 1:1000',
            'Deep liquidity pool',
            'Min. deposit: $1,000',
        ],
        badge: 'Most Popular',
        cta: 'Open Premium',
        featured: true,
    },
    {
        name: 'Elite',
        price: 'Custom',
        suffix: 'Solutions',
        features: [
            'Dedicated manager',
            'Volume rebates',
            'Custom API access',
            'Priority support',
            'Min. deposit: $5,000',
        ],
        cta: 'Contact Sales',
        featured: false,
    },
]

export default function AccountTypes() {
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
        <section className={`${styles.section} apfx-section`} aria-labelledby="accounts-heading">
            <div className={styles.inner}>
                <header className={styles.header}>
                    <h2 id="accounts-heading" className={styles.title}>Professional Trading Account Structures</h2>
                </header>

                <div className={styles.grid} ref={sliderRef}>
                    {ACCOUNTS.map((acc) => (
                        <div key={acc.name} className={`${styles.card} ${acc.featured ? styles.cardFeatured : ''}`}>
                            {acc.badge && <span className={styles.badge}>{acc.badge}</span>}
                            <h3 className={styles.name}>{acc.name}</h3>
                            <div className={styles.price}>
                                {acc.price === 'Custom' ? acc.price : (
                                    <>
                                        <span>$</span>{acc.price}
                                    </>
                                )}
                                <span>{acc.suffix}</span>
                            </div>

                            <ul className={styles.features}>
                                {acc.features.map((f) => (
                                    <li key={f} className={styles.feature}>
                                        <span className={styles.check}>✓</span>
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href="/open-account"
                                className={`${styles.cta} ${acc.featured ? styles.ctaMain : styles.ctaOutline}`}
                            >
                                {acc.cta}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

