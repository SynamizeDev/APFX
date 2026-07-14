'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import { useInViewport } from '@/hooks/useInViewport'
import { PORTAL_SIGNUP_LINK_PROPS } from '@/config/urls'
import styles from './AccountTypes.module.css'

const G = '#36F936' // APFX green accent

const ACCOUNTS: {
  name: string
  price: string
  suffix: string
  features?: React.ReactNode[]
  description?: React.ReactNode
  badge?: string
  cta?: string
  featured: boolean
  isElite?: boolean
  eliteFeatures?: { label: string; value: string }[]
}[] = [
  {
    name: 'Standard Account',
    price: '0',
    suffix: 'Commission',
    features: [
      <>
        Account Currencies: <span style={{ color: G, fontWeight: 600 }}>USD / GBP / EUR</span>
      </>,
      <>
        Leverage: Up to <span style={{ color: G, fontWeight: 600 }}>1:300</span>
      </>,
      <>
        <span style={{ color: G, fontWeight: 600 }}>1,200+</span> Tradable Instruments
      </>,
      <>
        Spreads: From <span style={{ color: G, fontWeight: 600 }}>1.8–2.0 pips</span>
      </>,
      <>
        Commission: <span style={{ color: G, fontWeight: 600 }}>None</span>
      </>,
      <>
        Minimum Deposit: <span style={{ color: G, fontWeight: 600 }}>$20</span>
      </>,
      <>
        Maximum Deposit: <span style={{ color: G, fontWeight: 600 }}>No Limit</span>
      </>,
      <>
        Expert Advisors (EA/Bots): <span style={{ color: G, fontWeight: 600 }}>Supported</span>
      </>,
    ],
    cta: 'Open Standard Account',
    featured: false,
  },
  {
    name: 'Premium Account',
    price: '8',
    suffix: 'per Lot',
    features: [
      <>
        Account Currencies: <span style={{ color: G, fontWeight: 600 }}>USD / GBP / EUR</span>
      </>,
      <>
        Leverage: Up to <span style={{ color: G, fontWeight: 600 }}>1:500</span>
      </>,
      <>
        <span style={{ color: G, fontWeight: 600 }}>1,200+</span> Tradable Instruments
      </>,
      <>
        Spreads: From <span style={{ color: G, fontWeight: 600 }}>0.8–1.0 pips</span>
      </>,
      <>
        Commission: <span style={{ color: G, fontWeight: 600 }}>$8 per Lot</span>
      </>,
      <>
        Minimum Deposit: <span style={{ color: G, fontWeight: 600 }}>$1,000</span>
      </>,
      <>
        Maximum Deposit: <span style={{ color: G, fontWeight: 600 }}>No Limit</span>
      </>,
      <>
        Expert Advisors (EA/Bots): <span style={{ color: G, fontWeight: 600 }}>Supported</span>
      </>,
    ],
    badge: 'Most Popular',
    cta: 'Open Premium Account',
    featured: true,
  },
  {
    name: 'Elite',
    price: 'Custom',
    suffix: 'Solutions',
    badge: 'ELITE',
    cta: 'Open Elite Account',
    featured: false,
    isElite: true,
    features: [
      <>
        Leverage: <span style={{ color: '#E5B742', fontWeight: 600 }}>Customized</span>
      </>,
      <>
        Tradable Instruments: <span style={{ color: '#E5B742', fontWeight: 600 }}>1,200+</span>
      </>,
      <>
        Spreads: <span style={{ color: '#E5B742', fontWeight: 600 }}>Customized</span>
      </>,
      <>
        Commission: <span style={{ color: '#E5B742', fontWeight: 600 }}>Customized</span>
      </>,
      <>
        Minimum Deposit: <span style={{ color: '#E5B742', fontWeight: 600 }}>$2,000</span>
      </>,
      <>
        Maximum Deposit: <span style={{ color: '#E5B742', fontWeight: 600 }}>No Limit</span>
      </>,
      <>
        Expert Advisors (EAs/Bots): <span style={{ color: '#E5B742', fontWeight: 600 }}>Allowed (Subject to execution style and risk assessment)</span>
      </>,
    ],
  },
]

export default function AccountTypes() {
  const sliderRef = useRef<HTMLDivElement | null>(null)
  const { ref: sectionRef, isInViewport } = useInViewport()
  const [activeIndex, setActiveIndex] = useState(0)
  const activeIndexRef = useRef(0)
  activeIndexRef.current = activeIndex

  const syncIndexFromScroll = useCallback(() => {
    const slider = sliderRef.current
    if (!slider) return
    const firstCard = slider.querySelector<HTMLElement>(`.${styles.card}`)
    if (!firstCard) return
    const gapPx =
      parseFloat(
        window.getComputedStyle(slider).columnGap || window.getComputedStyle(slider).gap || '0'
      ) || 0
    const step = firstCard.offsetWidth + gapPx
    if (!step) return
    const i = Math.min(ACCOUNTS.length - 1, Math.max(0, Math.round(slider.scrollLeft / step)))
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
      const firstCard = slider.querySelector<HTMLElement>(`.${styles.card}`)
      if (!firstCard) return Math.max(260, slider.clientWidth * 0.92)
      const gapPx =
        parseFloat(
          window.getComputedStyle(slider).columnGap || window.getComputedStyle(slider).gap || '0'
        ) || 0
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
      { passive: true }
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
  }, [syncIndexFromScroll, isInViewport])

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} apfx-section`}
      aria-labelledby="accounts-heading"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 id="accounts-heading" className={styles.title}>
            Professional Trading Account Structures
          </h2>
        </header>

        <div className={styles.grid} ref={sliderRef}>
          {ACCOUNTS.map((acc) => (
            <div
              key={acc.name}
              className={`${styles.card} ${acc.featured ? styles.cardFeatured : ''} ${acc.isElite ? styles.cardElite : ''}`}
            >
              {acc.badge && (
                <span className={`${styles.badge} ${acc.isElite ? styles.badgeElite : ''}`}>
                  {acc.badge}
                </span>
              )}
              <h3 className={styles.name}>{acc.name}</h3>
              <div className={styles.price}>
                {acc.price === 'Custom' ? (
                  acc.price
                ) : (
                  <>
                    <span>$</span>
                    {acc.price}
                  </>
                )}
                <span>{acc.suffix}</span>
              </div>

              {acc.description && <p className={styles.description}>{acc.description}</p>}
              
              {acc.features && (
                <ul className={styles.features}>
                  {acc.features.map((f, fi) => (
                    <li key={fi} className={styles.feature}>
                      <span className={`${styles.check} ${acc.isElite ? styles.checkElite : ''}`}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              )}

              {acc.cta && (
                <Link
                  {...PORTAL_SIGNUP_LINK_PROPS}
                  className={`${styles.cta} ${acc.featured ? styles.ctaMain : styles.ctaOutline}`}
                >
                  {acc.cta}
                </Link>
              )}
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
                const firstCard = slider.querySelector<HTMLElement>(`.${styles.card}`)
                const gapPx =
                  parseFloat(
                    window.getComputedStyle(slider).columnGap ||
                      window.getComputedStyle(slider).gap ||
                      '0'
                  ) || 0
                const step = firstCard ? firstCard.offsetWidth + gapPx : slider.clientWidth
                slider.scrollTo({ left: i * step, behavior: 'smooth' })
                setActiveIndex(i)
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
