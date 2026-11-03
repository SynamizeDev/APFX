'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import styles from './WhyAPFX.module.css'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface USPItem {
  id: string
  title: string
  desc: string
  image: {
    src: string
    width: number
    height: number
    alt: string
  }
  icon: React.ReactNode
}

const FEATURES: USPItem[] = [
  {
    id: 'withdrawals',
    title: 'Withdrawals in as Little as 15 Minutes',
    desc: 'Experience lightning-fast withdrawals with quick processing designed to give you faster access to your funds in as little as 15 minutes.',
    image: {
      src: '/assets/stopwatch-fast-withdrawal.webp',
      width: 726,
      height: 893,
      alt: 'Fast withdrawals stopwatch',
    },
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 14l3.5-3.5" />
        <path d="M3.34 17a10 10 0 1 1 17.32 0" />
      </svg>
    ),
  },
  {
    id: 'support',
    title: '24/7 Human Support',
    desc: 'Talk to real trading experts anytime via live chat, email, or phone. Available 24 hours a day, 7 days a week for fast, reliable human assistance.',
    image: {
      src: '/assets/headset-support.webp',
      width: 933,
      height: 1008,
      alt: 'Dedicated human support headset',
    },
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </svg>
    ),
  },
  {
    id: 'ai',
    title: 'AI-Powered Trading Assistance',
    desc: 'Trade smarter using ChatGPT, DeepSeek, AI Agents, and intelligent automation to assist with market research and trading decisions.',
    image: {
      src: '/assets/ai-chip.webp',
      width: 933,
      height: 772,
      alt: 'AI microchip trading assistant',
    },
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="2" x2="9" y2="4" />
        <line x1="15" y1="2" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="22" />
        <line x1="15" y1="20" x2="15" y2="22" />
        <line x1="20" y1="9" x2="22" y2="9" />
        <line x1="20" y1="15" x2="22" y2="15" />
        <line x1="2" y1="9" x2="4" y2="9" />
        <line x1="2" y1="15" x2="4" y2="15" />
      </svg>
    ),
  },
  {
    id: 'indicators',
    title: '100+ Smart Indicators',
    desc: 'Access 100+ professional indicators, including Automated Support & Resistance, SuperTrend, Market Sessions, Smart Money Concepts (SMC), and many more.',
    image: {
      src: '/assets/candlestick-indicators.webp',
      width: 994,
      height: 992,
      alt: 'Professional candlestick chart indicators',
    },
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
        <circle cx="18" cy="7" r="2" />
        <circle cx="6" cy="11" r="2" />
      </svg>
    ),
  },
  {
    id: 'automation',
    title: '1000+ Free Trading Bots',
    desc: 'Automate your strategies with over 1000 free trading bots designed to improve execution and trading efficiency.',
    image: {
      src: '/assets/trading-bots.webp',
      width: 840,
      height: 1007,
      alt: 'Automated trading bots robot',
    },
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <circle cx="12" cy="5" r="2" />
        <path d="M12 7v4" />
        <line x1="8" y1="16" x2="8" y2="16.01" />
        <line x1="16" y1="16" x2="16" y2="16.01" />
      </svg>
    ),
  },
  {
    id: 'platform',
    title: 'Advanced cTrader Trading Platform',
    desc: 'Trade on the powerful cTrader platform with advanced charting, lightning-fast execution, algorithmic trading, and professional-grade tools.',
    image: {
      src: '/assets/ctrader-platform.webp',
      width: 1008,
      height: 971,
      alt: 'Advanced cTrader monitor platform',
    },
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
        <path d="M6 8l4 4 3-3 5 5" />
      </svg>
    ),
  },
  {
    id: 'markets',
    title: '1,200+ Tradable Instruments',
    desc: 'Trade Forex, Indices, Commodities, Stocks, ETFs, Cryptocurrencies, and more — 1,200+ instruments from one account.',
    image: {
      src: '/assets/tradable-instruments.webp',
      width: 940,
      height: 780,
      alt: 'Global instruments globe',
    },
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    id: 'copy-trading',
    title: 'Advanced Copy Trading & PAMM Solutions',
    desc: 'Follow experienced traders or invest through professional PAMM solutions with complete transparency and flexibility.',
    image: {
      src: '/assets/copy-trading.webp',
      width: 922,
      height: 870,
      alt: 'Copy trading and PAMM solutions',
    },
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: 'risk-management',
    title: 'Advanced Risk Management Tools',
    desc: 'Protect your capital using built-in calculators, position sizing tools, risk analysis, and trade management features.',
    image: {
      src: '/assets/risk-management.webp',
      width: 773,
      height: 1016,
      alt: 'Risk management shield',
    },
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    id: 'partners',
    title: 'High-Reward Partnership Program',
    desc: 'Earn up to 70% revenue share with transparent commission tracking and instant partner payouts.',
    image: {
      src: '/assets/partnership-program.webp',
      width: 994,
      height: 923,
      alt: 'Partnership program chain links',
    },
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
]

// Geometry of the Circular Arc on the Far Left
const STEP_ANGLE = 52 // Wide angular spacing so inactive assets sit far away along the curve (matching Inveslo)
const FOCAL_X = 270 // Focal horizontal position of active button inside arcColumn
const RADIUS = 480 // Radius of the curved track
const CX = FOCAL_X - RADIUS // -210px (circle center remains outside left viewport)

export default function WhyAPFX() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [arcCenterY, setArcCenterY] = useState(280)
  const [connectorWidth, setConnectorWidth] = useState(65)

  const trackRef = useRef<HTMLDivElement | null>(null)
  const arcColumnRef = useRef<HTMLDivElement | null>(null)
  const wheelRef = useRef<HTMLDivElement | null>(null)
  const cardRef = useRef<HTMLDivElement | null>(null)
  const stripRef = useRef<HTMLDivElement | null>(null)
  const touchStartX = useRef<number | null>(null)

  // Mobile & Tablet detection (<= 1080px)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1080)
    }
    handleResize()
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Auto-scroll active button into view in the mobile/tablet icon strip
  useEffect(() => {
    if (!isMobile || !stripRef.current) return
    const activeBtn = stripRef.current.children[activeIndex] as HTMLElement
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }, [activeIndex, isMobile])

  // Auto-advance every 3 seconds on phone and tablet devices (<= 1080px)
  useEffect(() => {
    if (!isMobile) return
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    let isSectionInView = true
    const track = trackRef.current

    // Pause timer when the section is not visible in the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        isSectionInView = entries[0]?.isIntersecting ?? true
      },
      { threshold: 0.15 }
    )

    if (track) observer.observe(track)

    const interval = setInterval(() => {
      if (isSectionInView && !document.hidden) {
        setActiveIndex((prev) => (prev + 1) % FEATURES.length)
      }
    }, 3000)

    return () => {
      clearInterval(interval)
      if (track) observer.unobserve(track)
    }
  }, [isMobile, activeIndex])

  // Synchronize arc vertical center and connector width directly with the card
  useEffect(() => {
    if (isMobile) return

    const updateAlignment = () => {
      if (!arcColumnRef.current || !cardRef.current) return
      const arcRect = arcColumnRef.current.getBoundingClientRect()
      const cardRect = cardRef.current.getBoundingClientRect()

      // Target card vertical midpoint relative to arcColumn
      const relativeCardCenterY = Math.round(cardRect.top + cardRect.height / 2 - arcRect.top)
      setArcCenterY(relativeCardCenterY)

      // Active icon right edge is at FOCAL_X + 80px (radius of 160px button)
      const activeIconRight = arcRect.left + (FOCAL_X + 80)
      const dist = Math.max(16, Math.round(cardRect.left - activeIconRight))
      setConnectorWidth(dist)
    }

    updateAlignment()
    window.addEventListener('resize', updateAlignment, { passive: true })
    return () => window.removeEventListener('resize', updateAlignment)
  }, [isMobile, activeIndex])

  // Continuous smooth scroll-driven sequence tracker
  useEffect(() => {
    if (isMobile) return

    const totalAngle = (FEATURES.length - 1) * STEP_ANGLE
    const DWELL_START = 0.08
    const DWELL_END = 0.04
    const RANGE = 1 - DWELL_START - DWELL_END
    const PIN_TOP = 72

    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          ticking = false
          const track = trackRef.current
          if (!track) return

          const rect = track.getBoundingClientRect()
          const scrolled = PIN_TOP - rect.top

          // If the section has not yet reached the pin point (still scrolling into view),
          // it MUST remain strictly locked on USP 1 (index 0) with zero rotation.
          if (scrolled <= 0) {
            if (wheelRef.current) {
              gsap.set(wheelRef.current, { rotation: 0 })
              const icons = wheelRef.current.querySelectorAll(`.${styles.iconCounterRotate}`)
              if (icons.length > 0) {
                gsap.set(icons, { rotation: 0 })
              }
            }
            setActiveIndex(0)
            return
          }

          // Total scrollable distance while stickyContainer remains pinned
          const stickyH = Math.min(window.innerHeight - PIN_TOP, 960)
          const totalScrollable = Math.max(1, track.offsetHeight - stickyH)
          const rawProgress = Math.min(1, Math.max(0, scrolled / totalScrollable))

          // Apply introductory dwell on USP 1 and exit dwell on USP 10
          let effectiveP = 0
          if (rawProgress <= DWELL_START) {
            effectiveP = 0
          } else if (rawProgress >= 1 - DWELL_END) {
            effectiveP = 1
          } else {
            effectiveP = (rawProgress - DWELL_START) / RANGE
          }

          const rot = -effectiveP * totalAngle

          if (wheelRef.current) {
            gsap.set(wheelRef.current, { rotation: rot })
            const icons = wheelRef.current.querySelectorAll(`.${styles.iconCounterRotate}`)
            if (icons.length > 0) {
              gsap.set(icons, { rotation: -rot })
            }
          }

          // Calculate active index with an equal scroll window per USP
          const newIdx = Math.min(
            FEATURES.length - 1,
            Math.max(0, Math.floor(effectiveP * FEATURES.length))
          )
          setActiveIndex((prev) => (prev !== newIdx ? newIdx : prev))
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [isMobile])

  // Select USP (clicking any dot or node)
  const handleSelect = (idx: number) => {
    setActiveIndex(idx)
    if (isMobile) return

    const track = trackRef.current
    if (!track) return

    const PIN_TOP = 72
    const stickyH = Math.min(window.innerHeight - PIN_TOP, 960)
    const totalScrollable = Math.max(1, track.offsetHeight - stickyH)
    const trackTop = window.scrollY + track.getBoundingClientRect().top
    const DWELL_START = 0.08
    const DWELL_END = 0.04
    const RANGE = 1 - DWELL_START - DWELL_END

    let targetP = 0
    if (idx === 0) {
      targetP = 0.02
    } else if (idx === FEATURES.length - 1) {
      targetP = 0.98
    } else {
      const centerEffective = (idx + 0.5) / FEATURES.length
      targetP = DWELL_START + centerEffective * RANGE
    }

    const startScroll = trackTop - PIN_TOP
    const targetScroll = startScroll + targetP * totalScrollable
    window.scrollTo({ top: Math.max(0, targetScroll), behavior: 'smooth' })
  }

  // Mobile Touch Swipe Handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const deltaX = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0 && activeIndex < FEATURES.length - 1) {
        handleSelect(activeIndex + 1)
      } else if (deltaX > 0 && activeIndex > 0) {
        handleSelect(activeIndex - 1)
      }
    }
    touchStartX.current = null
  }

  const activeFeature = FEATURES[activeIndex]

  return (
    <div className={styles.sectionWrapper} ref={trackRef}>
      <div className={styles.scrollTrack}>
        <section className={styles.stickyContainer} aria-labelledby="why-heading">
          <div className={styles.inner}>
            {/* Top Bar: "Get Started" on Upper-Right */}
            <div className={styles.topBar}>
              <Link
                href="https://portal.apfxglobal.com/signup"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.getStartedLink}
              >
                Get Started
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Main Showcase Grid: Left Far-Left Arc + Right Content Area */}
            <div className={styles.showcaseGrid}>
              {/* Left Column: Continuous Mint-Green Circular Arc Band (Strictly Far Left) */}
              <div className={styles.arcColumn} ref={arcColumnRef}>
                {/* SVG Stationary Mint-Green Circular Band */}
                <div
                  className={styles.arcSvgWrap}
                  style={{ top: `${arcCenterY}px` }}
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 360 1400"
                    width="360"
                    height="1400"
                    className={styles.arcSvg}
                  >
                    <defs>
                      <linearGradient id="arcBandGradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#00dc00" stopOpacity="0.10" />
                        <stop offset="100%" stopColor="#00dc00" stopOpacity="0.04" />
                      </linearGradient>
                    </defs>
                    {/* Thick continuous mint-green curved band */}
                    <circle
                      cx={CX}
                      cy={700}
                      r={RADIUS}
                      fill="none"
                      stroke="url(#arcBandGradient)"
                      strokeWidth="170"
                    />
                    {/* Outer boundary line */}
                    <circle
                      cx={CX}
                      cy={700}
                      r={RADIUS + 85}
                      fill="none"
                      stroke="rgba(0, 220, 0, 0.22)"
                      strokeWidth="1.5"
                    />
                    {/* Inner boundary line */}
                    <circle
                      cx={CX}
                      cy={700}
                      r={RADIUS - 85}
                      fill="none"
                      stroke="rgba(0, 220, 0, 0.22)"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>

                {!isMobile ? (
                  <>
                    {/* Rotating Icon Wheel Container */}
                    <div
                      ref={wheelRef}
                      className={styles.wheel}
                      style={{
                        left: `${CX - RADIUS}px`,
                        top: `${arcCenterY - RADIUS}px`,
                        transformOrigin: `${RADIUS}px ${RADIUS}px`,
                      }}
                    >
                      {FEATURES.map((item, index) => {
                        const angleDeg = index * STEP_ANGLE
                        const angleRad = (angleDeg * Math.PI) / 180
                        const localX = Math.round(RADIUS + RADIUS * Math.cos(angleRad))
                        const localY = Math.round(RADIUS + RADIUS * Math.sin(angleRad))

                        const isActive = index === activeIndex
                        const isPrev = index === activeIndex - 1
                        const isNext = index === activeIndex + 1
                        const isVisible = isActive || isPrev || isNext

                        return (
                          <button
                            key={item.id}
                            type="button"
                            className={`${styles.nodeItem} ${
                              isActive ? styles.nodeActive : styles.nodeInactive
                            }`}
                            style={{
                              left: `${localX}px`,
                              top: `${localY}px`,
                              opacity: isActive ? 1 : isPrev ? 0.28 : isNext ? 0.18 : 0,
                              pointerEvents: isVisible ? 'auto' : 'none',
                            }}
                            onClick={() => handleSelect(index)}
                            aria-label={`USP ${index + 1}: ${item.title}`}
                            aria-current={isActive ? 'true' : undefined}
                          >
                            <div className={styles.iconCounterRotate}>
                              {item.icon}
                            </div>
                          </button>
                        )
                      })}
                    </div>

                    {/* Horizontal Thin Green Connector Line to Card */}
                    <div
                      className={styles.connectorLine}
                      style={{
                        left: `${FOCAL_X + 80}px`,
                        top: `${arcCenterY}px`,
                        width: `${connectorWidth}px`,
                      }}
                    >
                      <div className={styles.connectorEndpoint} />
                    </div>
                  </>
                ) : (
                  /* Mobile & Tablet: Horizontal Icon Strip */
                  <div className={styles.mobileIconStrip} ref={stripRef}>
                    {FEATURES.map((item, index) => {
                      const isActive = index === activeIndex
                      return (
                        <button
                          key={item.id}
                          type="button"
                          className={`${styles.nodeItem} ${
                            isActive ? styles.nodeActive : styles.nodeInactive
                          }`}
                          onClick={() => handleSelect(index)}
                          aria-label={`USP ${index + 1}: ${item.title}`}
                          aria-current={isActive ? 'true' : undefined}
                        >
                          <div className={styles.iconCounterRotate}>
                            {item.icon}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Right Column: Strictly Right-Aligned Header & Lower-Right Card */}
              <div
                className={styles.contentArea}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
              >
                {/* Section Header */}
                <header className={styles.headerBlock}>
                  <h2 id="why-heading" className={styles.headlineLine1}>
                    Why Serious Traders Are
                  </h2>
                  <div className={styles.headlineLine2}>
                    Choosing APFX
                  </div>
                  <p className={styles.headerDesc}>
                    Powerful trading technology, fast withdrawals, dedicated human support, and a
                    trading environment designed around you.
                  </p>
                </header>

                {/* Prominent USP Card in Lower-Right Area */}
                <div className={styles.cardWrapper} ref={cardRef}>
                  <div
                    key={`card-${activeIndex}`}
                    className={`${styles.uspCard} ${styles.cardPulse}`}
                  >
                    <div className={styles.cardLeft}>
                      <h3
                        key={`title-${activeIndex}`}
                        className={`${styles.cardHeadline} ${styles.textAnimHeadline}`}
                      >
                        {activeFeature.title}
                      </h3>
                      <p
                        key={`desc-${activeIndex}`}
                        className={`${styles.cardDescription} ${styles.textAnimDesc}`}
                      >
                        {activeFeature.desc}
                      </p>
                    </div>

                    {/* 3D WebP Asset on Right Inside Card */}
                    <div
                      key={`media-${activeIndex}`}
                      className={`${styles.cardRightMedia} ${styles.mediaAnim}`}
                    >
                      <Image
                        src={activeFeature.image.src}
                        alt={activeFeature.image.alt}
                        width={activeFeature.image.width}
                        height={activeFeature.image.height}
                        className={styles.assetImg}
                        priority
                        sizes="(max-width: 900px) 90px, 125px"
                      />
                    </div>

                    {/* Progress Indicators in Bottom-Right of Card */}
                    <div
                      className={styles.progressIndicatorRow}
                      role="tablist"
                      aria-label="USP Progress Indicators"
                    >
                      {FEATURES.map((item, index) => (
                        <button
                          key={item.id}
                          type="button"
                          role="tab"
                          aria-selected={index === activeIndex}
                          aria-label={`Go to USP ${index + 1}: ${item.title}`}
                          className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ''}`}
                          onClick={() => handleSelect(index)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
