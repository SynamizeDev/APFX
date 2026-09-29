'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'

import { useInViewport } from '@/hooks/useInViewport'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import styles from './WhyAPFX.module.css'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const FEATURES: {
  id?: string
  icon?: React.ReactNode
  image?: {
    src: string
    width: number
    height: number
  }
  label: string
  title: string
  desc: React.ReactNode
  large: boolean
  iconBg?: string
  iconBorder?: string
  glow: string
  highlight?: boolean
  theme?: 'light' | 'dark'
}[] = [
  {
    id: 'withdrawals',
    label: 'Withdrawals',
    title: 'Withdrawals in as Little as 15 Minutes',
    desc: (
      <>
        Experience lightning-fast withdrawals with quick processing designed to give you faster
        access to your funds in as little as{' '}
        <span style={{ color: '#36F936', fontWeight: 600 }}>15 minutes</span>.
      </>
    ),
    large: true,
    theme: 'dark',
    iconBg: 'rgba(54, 249, 54, 0.1)',
    iconBorder: 'rgba(54, 249, 54, 0.2)',
    glow: 'rgba(54, 249, 54, 0.1)',
    image: {
      src: '/assets/stopwatch-fast-withdrawal.webp',
      width: 726,
      height: 893,
    },
  },
  {
    id: 'support',
    label: 'Support',
    title: '24/7 Human Support',
    desc: 'Talk to real trading experts anytime via live chat, email, or phone. Available 24 hours a day, 7 days a week for fast, reliable human assistance.',
    large: false,
    theme: 'light',
    iconBg: 'rgba(54, 249, 54, 0.1)',
    iconBorder: 'rgba(54, 249, 54, 0.2)',
    glow: 'rgba(54, 249, 54, 0.1)',
    image: {
      src: '/assets/headset-support.webp',
      width: 933,
      height: 1008,
    },
  },
  {
    id: 'ai',
    label: 'AI',
    title: 'AI-Powered Trading Assistance',
    desc: 'Trade smarter using ChatGPT, DeepSeek, AI Agents, and intelligent automation to assist with market research and trading decisions.',
    large: false,
    theme: 'dark',
    iconBg: 'rgba(99, 102, 241, 0.1)',
    iconBorder: 'rgba(99, 102, 241, 0.2)',
    glow: 'rgba(99, 102, 241, 0.1)',
    image: {
      src: '/assets/ai-chip.webp',
      width: 933,
      height: 772,
    },
  },
  {
    id: 'indicators',
    label: 'Indicators',
    title: '100+ Smart Indicators',
    desc: (
      <>
        Access <span style={{ color: '#36F936', fontWeight: 600 }}>100+</span> professional
        indicators including Automated Support &amp; Resistance, SuperTrend, Market Sessions, Smart
        Money Concepts (SMC), and many more.
      </>
    ),
    large: false,
    theme: 'light',
    iconBg: 'rgba(54, 249, 54, 0.1)',
    iconBorder: 'rgba(54, 249, 54, 0.2)',
    glow: 'rgba(54, 249, 54, 0.1)',
    image: {
      src: '/assets/candlestick-indicators.webp',
      width: 994,
      height: 992,
    },
  },
  {
    id: 'automation',
    label: 'Automation',
    title: '1000+ Free Trading Bots',
    desc: (
      <>
        Automate your strategies with over{' '}
        <span style={{ color: '#36F936', fontWeight: 600 }}>1000+ free trading bots</span> designed to
        improve execution and trading efficiency.
      </>
    ),
    large: false,
    theme: 'dark',
    iconBg: 'rgba(54, 249, 54, 0.1)',
    iconBorder: 'rgba(54, 249, 54, 0.2)',
    glow: 'rgba(54, 249, 54, 0.1)',
    image: {
      src: '/assets/trading-bots.webp',
      width: 840,
      height: 1007,
    },
  },
  {
    id: 'platform',
    label: 'Platform',
    title: 'Advanced cTrader Trading Platform',
    desc: 'Trade on the powerful cTrader platform with advanced charting, lightning-fast execution, algorithmic trading, and professional-grade tools.',
    large: false,
    theme: 'light',
    iconBg: 'rgba(59, 130, 246, 0.1)',
    iconBorder: 'rgba(59, 130, 246, 0.2)',
    glow: 'rgba(59, 130, 246, 0.1)',
    image: {
      src: '/assets/ctrader-platform.webp',
      width: 1008,
      height: 971,
    },
  },
  {
    id: 'markets',
    label: 'Markets',
    title: '1,200+ Tradable Instruments',
    desc: (
      <>
        Trade Forex, Indices, Commodities, Stocks, ETFs, Cryptocurrencies, and more —{' '}
        <span style={{ color: '#36F936', fontWeight: 600 }}>1,200+ instruments</span> from one
        account.
      </>
    ),
    large: false,
    theme: 'dark',
    iconBg: 'rgba(249, 115, 22, 0.1)',
    iconBorder: 'rgba(249, 115, 22, 0.2)',
    glow: 'rgba(249, 115, 22, 0.1)',
    image: {
      src: '/assets/tradable-instruments.webp',
      width: 940,
      height: 780,
    },
  },
  {
    id: 'copy-trading',
    label: 'Copy Trading',
    title: 'Advanced Copy Trading & PAMM Solutions',
    desc: 'Follow experienced traders or invest through professional PAMM solutions with complete transparency and flexibility.',
    large: false,
    theme: 'dark',
    iconBg: 'rgba(99, 102, 241, 0.1)',
    iconBorder: 'rgba(99, 102, 241, 0.2)',
    glow: 'rgba(99, 102, 241, 0.1)',
    image: {
      src: '/assets/copy-trading.webp',
      width: 922,
      height: 870,
    },
  },
  {
    id: 'risk-management',
    label: 'Risk Management',
    title: 'Advanced Risk Management Tools',
    desc: 'Protect your capital using built-in calculators, position sizing tools, risk analysis, and trade management features.',
    large: false,
    theme: 'dark',
    iconBg: 'rgba(54, 249, 54, 0.1)',
    iconBorder: 'rgba(54, 249, 54, 0.2)',
    glow: 'rgba(54, 249, 54, 0.1)',
    image: {
      src: '/assets/risk-management.webp',
      width: 773,
      height: 1016,
    },
  },
  {
    id: 'partners',
    label: 'Partners',
    title: 'High-Reward Partnership Program',
    desc: (
      <>
        Earn up to <span style={{ color: '#36F936', fontWeight: 600 }}>70% revenue share</span> with
        transparent commission tracking and instant partner payouts.
      </>
    ),
    large: true,
    theme: 'dark',
    iconBg: 'rgba(54, 249, 54, 0.1)',
    iconBorder: 'rgba(54, 249, 54, 0.2)',
    glow: 'rgba(54, 249, 54, 0.1)',
    image: {
      src: '/assets/partnership-program.webp',
      width: 994,
      height: 923,
    },
  },
]

export default function WhyAPFX() {
  const sliderRef = useRef<HTMLDivElement | null>(null)
  const { ref: sectionRef, isInViewport } = useInViewport()
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
    if (!isInViewport) return
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

  // GSAP scroll animation
  useGSAP(
    () => {
      const cards = gsap.utils.toArray(`.${styles.bentoItem}`) as HTMLElement[]
      if (!cards.length) return

      const mm = gsap.matchMedia()

      // Only animate on big screens (desktop)
      mm.add('(min-width: 769px)', () => {
        cards.forEach((card, index) => {
          // Calculate a slight stagger delay based on column position (0, 1, 2)
          // Since it's a 3-column grid, we can just use index % 3
          const colIndex = index % 3
          
          gsap.from(card, {
            y: 80,
            scale: 0.9,
            opacity: 0,
            duration: 0.8,
            delay: colIndex * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          })
        })
      })

      return () => mm.revert()
    },
    { scope: sectionRef }
  )

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const cards = document.querySelectorAll(`.${styles.bentoItem}`) as NodeListOf<HTMLElement>
    for (const card of cards) {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      card.style.setProperty('--mouse-x', `${x}px`)
      card.style.setProperty('--mouse-y', `${y}px`)
    }
  }

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} apfx-section`}
      aria-labelledby="why-heading"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <div className={styles.eyebrow}>Why APFX</div>
          <h2 id="why-heading" className={styles.title}>
            Engineered for Serious Traders
          </h2>
          <p className={styles.subtitle}>
            Every decision in our stack is designed to compress latency, sharpen pricing, and give
            you the kind of edge usually reserved for institutional desks.
          </p>
        </header>

        <div className={styles.bento} ref={sliderRef} onMouseMove={handleMouseMove}>
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className={`${styles.bentoItem} ${f.large ? styles.bentoLarge : ''} ${
                f.highlight ? styles.bentoHighlighted : ''
              } ${f.theme === 'light' ? styles.bentoLight : ''} ${
                f.id === 'withdrawals' ? styles.withdrawalsCard : ''
              } ${f.id === 'support' ? styles.supportCard : ''} ${
                f.id === 'ai' ? styles.aiCard : ''
              } ${f.id === 'indicators' ? styles.indicatorsCard : ''} ${
                f.id === 'automation' ? styles.automationCard : ''
              } ${f.id === 'platform' ? styles.platformCard : ''} ${
                f.id === 'markets' ? styles.marketsCard : ''
              } ${f.id === 'copy-trading' ? styles.copyTradingCard : ''} ${
                f.id === 'risk-management' ? styles.riskManagementCard : ''
              } ${f.id === 'partners' ? styles.partnersCard : ''}`}
              style={
                {
                  '--glow-color': f.glow,
                  '--icon-bg': f.iconBg,
                  '--icon-border': f.iconBorder,
                } as React.CSSProperties
              }
            >
              {f.id === 'withdrawals' && f.image ? (
                <div className={styles.withdrawalsWrapper}>
                  <div className={styles.withdrawalsContent}>
                    <span className={styles.bentoLabel}>{f.label}</span>
                    <h3 className={styles.bentoTitle}>{f.title}</h3>
                    <p className={styles.bentoDesc}>{f.desc}</p>
                  </div>
                  <div className={styles.stopwatchMedia}>
                    <Image
                      src={f.image.src}
                      alt=""
                      aria-hidden="true"
                      width={f.image.width}
                      height={f.image.height}
                      className={styles.stopwatchImg}
                      sizes="(max-width: 768px) 60px, (max-width: 1024px) 240px, 280px"
                    />
                  </div>
                </div>
              ) : f.id === 'support' && f.image ? (
                <div className={styles.supportWrapper}>
                  <div className={styles.headsetMedia}>
                    <Image
                      src={f.image.src}
                      alt=""
                      aria-hidden="true"
                      width={f.image.width}
                      height={f.image.height}
                      className={styles.headsetImg}
                      sizes="(max-width: 768px) 60px, (max-width: 1024px) 140px, 160px"
                    />
                  </div>
                  <div className={styles.supportContent}>
                    <span className={styles.bentoLabel}>{f.label}</span>
                    <h3 className={styles.bentoTitle}>{f.title}</h3>
                    <p className={styles.bentoDesc}>{f.desc}</p>
                  </div>
                </div>
              ) : f.id === 'ai' && f.image ? (
                <div className={styles.aiWrapper}>
                  <div className={styles.chipMedia}>
                    <Image
                      src={f.image.src}
                      alt=""
                      aria-hidden="true"
                      width={f.image.width}
                      height={f.image.height}
                      className={styles.chipImg}
                      sizes="(max-width: 768px) 60px, (max-width: 1024px) 140px, 160px"
                    />
                  </div>
                  <div className={styles.aiContent}>
                    <span className={styles.bentoLabel}>{f.label}</span>
                    <h3 className={styles.bentoTitle}>{f.title}</h3>
                    <p className={styles.bentoDesc}>{f.desc}</p>
                  </div>
                </div>
              ) : f.id === 'indicators' && f.image ? (
                <div className={styles.indicatorsWrapper}>
                  <div className={styles.indicatorsMedia}>
                    <Image
                      src={f.image.src}
                      alt=""
                      aria-hidden="true"
                      width={f.image.width}
                      height={f.image.height}
                      className={styles.indicatorsImg}
                      sizes="(max-width: 768px) 60px, (max-width: 1024px) 140px, 160px"
                    />
                  </div>
                  <div className={styles.indicatorsContent}>
                    <span className={styles.bentoLabel}>{f.label}</span>
                    <h3 className={styles.bentoTitle}>{f.title}</h3>
                    <p className={styles.bentoDesc}>{f.desc}</p>
                  </div>
                </div>
              ) : f.id === 'automation' && f.image ? (
                <div className={styles.automationWrapper}>
                  <div className={styles.robotMedia}>
                    <Image
                      src={f.image.src}
                      alt=""
                      aria-hidden="true"
                      width={f.image.width}
                      height={f.image.height}
                      className={styles.robotImg}
                      sizes="(max-width: 768px) 60px, (max-width: 1024px) 140px, 160px"
                    />
                  </div>
                  <div className={styles.automationContent}>
                    <span className={styles.bentoLabel}>{f.label}</span>
                    <h3 className={styles.bentoTitle}>{f.title}</h3>
                    <p className={styles.bentoDesc}>{f.desc}</p>
                  </div>
                </div>
              ) : f.id === 'platform' && f.image ? (
                <div className={styles.platformWrapper}>
                  <div className={styles.monitorMedia}>
                    <Image
                      src={f.image.src}
                      alt=""
                      aria-hidden="true"
                      width={f.image.width}
                      height={f.image.height}
                      className={styles.monitorImg}
                      sizes="(max-width: 768px) 60px, (max-width: 1024px) 140px, 160px"
                    />
                  </div>
                  <div className={styles.platformContent}>
                    <span className={styles.bentoLabel}>{f.label}</span>
                    <h3 className={styles.bentoTitle}>{f.title}</h3>
                    <p className={styles.bentoDesc}>{f.desc}</p>
                  </div>
                </div>
              ) : f.id === 'markets' && f.image ? (
                <div className={styles.marketsWrapper}>
                  <div className={styles.globeMedia}>
                    <Image
                      src={f.image.src}
                      alt=""
                      aria-hidden="true"
                      width={f.image.width}
                      height={f.image.height}
                      className={styles.globeImg}
                      sizes="(max-width: 768px) 60px, (max-width: 1024px) 140px, 160px"
                    />
                  </div>
                  <div className={styles.marketsContent}>
                    <span className={styles.bentoLabel}>{f.label}</span>
                    <h3 className={styles.bentoTitle}>{f.title}</h3>
                    <p className={styles.bentoDesc}>{f.desc}</p>
                  </div>
                </div>
              ) : f.id === 'copy-trading' && f.image ? (
                <div className={styles.copyTradingWrapper}>
                  <div className={styles.panelsMedia}>
                    <Image
                      src={f.image.src}
                      alt=""
                      aria-hidden="true"
                      width={f.image.width}
                      height={f.image.height}
                      className={styles.panelsImg}
                      sizes="(max-width: 768px) 60px, (max-width: 1024px) 140px, 160px"
                    />
                  </div>
                  <div className={styles.copyTradingContent}>
                    <span className={styles.bentoLabel}>{f.label}</span>
                    <h3 className={styles.bentoTitle}>{f.title}</h3>
                    <p className={styles.bentoDesc}>{f.desc}</p>
                  </div>
                </div>
              ) : f.id === 'risk-management' && f.image ? (
                <div className={styles.riskManagementWrapper}>
                  <div className={styles.shieldMedia}>
                    <Image
                      src={f.image.src}
                      alt=""
                      aria-hidden="true"
                      width={f.image.width}
                      height={f.image.height}
                      className={styles.shieldImg}
                      sizes="(max-width: 768px) 60px, (max-width: 1024px) 140px, 160px"
                    />
                  </div>
                  <div className={styles.riskManagementContent}>
                    <span className={styles.bentoLabel}>{f.label}</span>
                    <h3 className={styles.bentoTitle}>{f.title}</h3>
                    <p className={styles.bentoDesc}>{f.desc}</p>
                  </div>
                </div>
              ) : f.id === 'partners' && f.image ? (
                <div className={styles.partnersWrapper}>
                  <div className={styles.partnersContent}>
                    <span className={styles.bentoLabel}>{f.label}</span>
                    <h3 className={styles.bentoTitle}>{f.title}</h3>
                    <p className={styles.bentoDesc}>{f.desc}</p>
                  </div>
                  <div className={styles.linksMedia}>
                    <Image
                      src={f.image.src}
                      alt=""
                      aria-hidden="true"
                      width={f.image.width}
                      height={f.image.height}
                      className={styles.linksImg}
                      sizes="(max-width: 768px) 60px, (max-width: 1024px) 240px, 280px"
                    />
                  </div>
                </div>
              ) : (
                <>
                  {f.icon && <div className={styles.bentoIcon}>{f.icon}</div>}
                  <div className={styles.bentoContent}>
                    <span className={styles.bentoLabel}>{f.label}</span>
                    <h3 className={styles.bentoTitle}>{f.title}</h3>
                    <p className={styles.bentoDesc}>{f.desc}</p>
                  </div>
                </>
              )}
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
