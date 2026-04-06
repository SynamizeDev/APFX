'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
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
    const [activeIndex, setActiveIndex] = useState(0)
    const activeIndexRef = useRef(0)
    activeIndexRef.current = activeIndex

    const syncIndexFromScroll = useCallback(() => {
        const slider = sliderRef.current
        if (!slider) return
        const step = slider.clientWidth
        if (!step) return
        const i = Math.min(ACCOUNTS.length - 1, Math.max(0, Math.round(slider.scrollLeft / step)))
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

            const target = atEnd ? 0 : slider.scrollLeft + step
            slider.scrollTo({ left: target, behavior: 'smooth' })
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

                <div className={styles.carouselDots} role="tablist" aria-label="Account slides">
                    {ACCOUNTS.map((acc, i) => (
                        <button
                            key={acc.name}
                            type="button"
                            role="tab"
                            aria-selected={i === activeIndex}
                            aria-label={`Slide ${i + 1} of ${ACCOUNTS.length}: ${acc.name}`}
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

