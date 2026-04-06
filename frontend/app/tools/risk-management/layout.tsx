'use client'

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Shield, ShieldCheck, Zap, TrendingUp, Globe } from 'lucide-react'
import Footer from '@/components/layout/Footer'
import BottomBar from '@/components/layout/BottomBar'
import { RISK_TOOLS } from './tools'
import styles from './RiskManagementLayout.module.css'

/** Must match `gap` on `.frameworkCarouselScroll` in RiskManagementLayout.module.css */
const FRAMEWORK_CAROUSEL_GAP_PX = 12
const FRAMEWORK_SLIDE_MS = 5500
const PHONE_MAX_PX = 768

type PhoneSectionLayout = 'desktop' | 'phoneStack' | 'phoneCarousel'

function readPhoneSectionLayout(): PhoneSectionLayout {
  if (typeof window === 'undefined') return 'desktop'
  const phone = window.matchMedia(`(max-width: ${PHONE_MAX_PX}px)`).matches
  if (!phone) return 'desktop'
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'phoneStack'
  return 'phoneCarousel'
}

function usePhoneSectionLayout(): PhoneSectionLayout {
  const [layout, setLayout] = useState<PhoneSectionLayout>('desktop')

  useLayoutEffect(() => {
    const sync = () => setLayout(readPhoneSectionLayout())
    sync()
    const mqPhone = window.matchMedia(`(max-width: ${PHONE_MAX_PX}px)`)
    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    mqPhone.addEventListener('change', sync)
    mqReduce.addEventListener('change', sync)
    return () => {
      mqPhone.removeEventListener('change', sync)
      mqReduce.removeEventListener('change', sync)
    }
  }, [])

  return layout
}

const FRAMEWORK_CARDS = [
  {
    title: 'Capital Preservation',
    icon: <Shield size={20} />,
    desc:
      'Survival is the only goal. Professionals prioritize minimizing drawdown over maximizing gains, ensuring they stay in the game during inevitable losing streaks.',
  },
  {
    title: 'Probabilistic Thinking',
    icon: <TrendingUp size={20} />,
    desc:
      'Individual trades are random; series are statistical. These tools help align your execution with your long-term mathematical edge.',
  },
  {
    title: 'Asymmetric Returns',
    icon: <Zap size={20} />,
    desc:
      'Seek setups where risk is capped and potential reward is larger. This allows profitability even with a win rate below 50%.',
  },
] as const

function FrameworkCarousel() {
  const [carouselIndex, setCarouselIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const indexRef = useRef(0)
  const scrollSyncTimerRef = useRef<number | undefined>(undefined)

  indexRef.current = carouselIndex

  const scrollStep = useCallback(
    (el: HTMLDivElement) => el.clientWidth + FRAMEWORK_CAROUSEL_GAP_PX,
    []
  )

  const syncIndexFromScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const step = scrollStep(el)
    if (step <= FRAMEWORK_CAROUSEL_GAP_PX) return
    const i = Math.min(
      FRAMEWORK_CARDS.length - 1,
      Math.max(0, Math.round(el.scrollLeft / step))
    )
    setCarouselIndex((prev) => (prev === i ? prev : i))
  }, [scrollStep])

  useLayoutEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const step = scrollStep(el)
    if (step <= FRAMEWORK_CAROUSEL_GAP_PX) return
    const target = carouselIndex * step
    if (Math.abs(el.scrollLeft - target) < 8) return
    el.scrollTo({ left: target, behavior: 'smooth' })
  }, [carouselIndex, scrollStep])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const onScroll = () => {
      if (scrollSyncTimerRef.current !== undefined) {
        window.clearTimeout(scrollSyncTimerRef.current)
      }
      scrollSyncTimerRef.current = window.setTimeout(() => {
        scrollSyncTimerRef.current = undefined
        syncIndexFromScroll()
      }, 60)
    }

    const onScrollEnd = () => {
      if (scrollSyncTimerRef.current !== undefined) {
        window.clearTimeout(scrollSyncTimerRef.current)
        scrollSyncTimerRef.current = undefined
      }
      syncIndexFromScroll()
    }

    el.addEventListener('scroll', onScroll, { passive: true })
    el.addEventListener('scrollend', onScrollEnd)
    return () => {
      el.removeEventListener('scroll', onScroll)
      el.removeEventListener('scrollend', onScrollEnd)
      if (scrollSyncTimerRef.current !== undefined) {
        window.clearTimeout(scrollSyncTimerRef.current)
      }
    }
  }, [syncIndexFromScroll])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const applySize = () => {
      const w = el.clientWidth
      if (!w) return
      el.style.setProperty('--framework-slide-width', `${w}px`)
      el.style.setProperty('--framework-carousel-gap', `${FRAMEWORK_CAROUSEL_GAP_PX}px`)
      const step = w + FRAMEWORK_CAROUSEL_GAP_PX
      el.scrollTo({ left: indexRef.current * step, behavior: 'auto' })
    }

    const ro = new ResizeObserver(applySize)
    ro.observe(el)
    applySize()
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const mqPhone = window.matchMedia(`(max-width: ${PHONE_MAX_PX}px)`)
    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const shouldAuto = () => mqPhone.matches && !mqReduce.matches

    let id: number | undefined

    const arm = () => {
      if (id !== undefined) {
        window.clearInterval(id)
        id = undefined
      }
      if (!shouldAuto()) return
      id = window.setInterval(() => {
        setCarouselIndex((i) => (i + 1) % FRAMEWORK_CARDS.length)
      }, FRAMEWORK_SLIDE_MS)
    }

    arm()
    mqPhone.addEventListener('change', arm)
    mqReduce.addEventListener('change', arm)
    return () => {
      if (id !== undefined) window.clearInterval(id)
      mqPhone.removeEventListener('change', arm)
      mqReduce.removeEventListener('change', arm)
    }
  }, [])

  return (
    <div
      className={styles.frameworkCarouselWrap}
      role="region"
      aria-roledescription="carousel"
      aria-label="Institutional risk framework"
      aria-live="polite"
    >
      <div className={styles.frameworkCarouselViewport}>
        <div
          ref={scrollRef}
          className={styles.frameworkCarouselScroll}
          tabIndex={0}
          aria-label="Swipe or scroll horizontally for each framework card"
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') {
              e.preventDefault()
              setCarouselIndex((i) => Math.max(0, i - 1))
            } else if (e.key === 'ArrowRight') {
              e.preventDefault()
              setCarouselIndex((i) => Math.min(FRAMEWORK_CARDS.length - 1, i + 1))
            }
          }}
        >
          {FRAMEWORK_CARDS.map((card, i) => (
            <div
              key={card.title}
              className={styles.frameworkCarouselSlide}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${FRAMEWORK_CARDS.length}: ${card.title}`}
              aria-hidden={i !== carouselIndex}
            >
              <div className={styles.frameworkCard}>
                <div className={styles.frameworkCardHeader}>
                  <div className={styles.frameworkIcon}>{card.icon}</div>
                  <h3 className={styles.frameworkCardTitle}>{card.title}</h3>
                </div>
                <p className={styles.frameworkCardDesc}>{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.frameworkCarouselDots} role="tablist" aria-label="Framework slides">
        {FRAMEWORK_CARDS.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === carouselIndex}
            aria-label={`Slide ${i + 1} of ${FRAMEWORK_CARDS.length}`}
            className={
              i === carouselIndex ? styles.frameworkCarouselDotActive : styles.frameworkCarouselDot
            }
            onClick={() => setCarouselIndex(i)}
          />
        ))}
      </div>
    </div>
  )
}

export default function RiskManagementLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const frameworkLayout = usePhoneSectionLayout()

  return (
    <div className={styles.wrapper}>
      <header className={styles.hero}>
        <h1 className={styles.heroTitle}>Professional Risk Management</h1>
        <p className={styles.heroDesc}>
          Precision risk control is the cornerstone of institutional trading. 
          Use these tools to align your strategy with mathematical survival.
        </p>
      </header>
      
      <main className={styles.main}>
        <aside className={styles.sidebar} aria-label="Risk Management Tools">
          <nav className={styles.sidebarNav}>
            <span className={styles.sidebarTitle}>Systems</span>
            {RISK_TOOLS.map((tool) => {
              const isActive = pathname === tool.href
              return (
                <Link
                  key={tool.slug}
                  href={tool.href}
                  className={`${styles.sidebarLink} ${isActive ? styles.sidebarLinkActive : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {tool.label}
                </Link>
              )
            })}
          </nav>
        </aside>

        <div className={styles.content}>
          <section className={styles.frameworkSection}>
            <h2 className={styles.frameworkTitle}>
              <ShieldCheck size={24} color="var(--color-accent)" />
              Institutional Risk Framework
            </h2>
            {frameworkLayout === 'desktop' && (
              <div className={styles.frameworkGrid}>
                {FRAMEWORK_CARDS.map((card) => (
                  <div key={card.title} className={styles.frameworkCard}>
                    <div className={styles.frameworkCardHeader}>
                      <div className={styles.frameworkIcon}>{card.icon}</div>
                      <h3 className={styles.frameworkCardTitle}>{card.title}</h3>
                    </div>
                    <p className={styles.frameworkCardDesc}>{card.desc}</p>
                  </div>
                ))}
              </div>
            )}
            {frameworkLayout === 'phoneStack' && (
              <div className={`${styles.frameworkGrid} ${styles.frameworkGridSingleCol}`}>
                {FRAMEWORK_CARDS.map((card) => (
                  <div key={card.title} className={styles.frameworkCard}>
                    <div className={styles.frameworkCardHeader}>
                      <div className={styles.frameworkIcon}>{card.icon}</div>
                      <h3 className={styles.frameworkCardTitle}>{card.title}</h3>
                    </div>
                    <p className={styles.frameworkCardDesc}>{card.desc}</p>
                  </div>
                ))}
              </div>
            )}
            {frameworkLayout === 'phoneCarousel' && <FrameworkCarousel />}
          </section>

          {children}

          <section className={styles.rulesSection}>
            <h2 className={styles.rulesTitle}>Institutional Gold Rules</h2>
            <ul className={styles.rulesList}>
              <li><strong>The 2% Hard Cap:</strong> Never risk more than 2% of total equity on any single idea.</li>
              <li><strong>Stop Loss Integrality:</strong> A trade without a stop loss is a gamble, not a business decision.</li>
              <li><strong>Positive Expectancy:</strong> Only enter trades with a minimum 1:2 Risk/Reward profile.</li>
              <li><strong>Drawdown Awareness:</strong> Reduce position sizes by 50% if account drawdown exceeds 10%.</li>
            </ul>
          </section>

          <section className={styles.ctaSection}>
            <h2 className={styles.ctaTitle}>Trade with Professional Discipline</h2>
            <p className={styles.ctaSubtitle}>
              Precision is the difference between a gambler and a trader. 
              Connect your strategy to institutional-grade risk management.
            </p>
            <div className={styles.ctaButtons}>
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <BottomBar />
    </div>
  )
}
