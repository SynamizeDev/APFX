'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  Clock,
  Sparkles,
  BarChart2,
  Monitor,
  Globe,
  Handshake,
  Headphones,
  Bot,
  Users,
  ShieldCheck,
} from 'lucide-react'
import { useInViewport } from '@/hooks/useInViewport'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import styles from './WhyAPFX.module.css'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const FEATURES: {
  icon: React.ReactNode
  label: string
  title: string
  desc: React.ReactNode
  large: boolean
  iconBg: string
  iconBorder: string
  glow: string
  highlight?: boolean
  theme?: 'light' | 'dark'
}[] = [
  {
    icon: <Clock size={24} />,
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
  },
  {
    icon: <Headphones size={24} />,
    label: 'Support',
    title: '24/7 Human Support',
    desc: 'Talk to real trading experts anytime via live chat, email, or phone. Fast, reliable human assistance whenever you need it.',
    large: false,
    theme: 'light',
    iconBg: 'rgba(54, 249, 54, 0.1)',
    iconBorder: 'rgba(54, 249, 54, 0.2)',
    glow: 'rgba(54, 249, 54, 0.1)',
  },
  {
    icon: <Sparkles size={24} />,
    label: 'AI',
    title: 'AI-Powered Trading Assistance',
    desc: 'Trade smarter using ChatGPT, DeepSeek, AI Agents, and intelligent automation to assist with market research and trading decisions.',
    large: false,
    theme: 'dark',
    iconBg: 'rgba(99, 102, 241, 0.1)',
    iconBorder: 'rgba(99, 102, 241, 0.2)',
    glow: 'rgba(99, 102, 241, 0.1)',
  },
  {
    icon: <BarChart2 size={24} />,
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
  },
  {
    icon: <Bot size={24} />,
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
  },
  {
    icon: <Monitor size={24} />,
    label: 'Platform',
    title: 'Advanced cTrader Trading Platform',
    desc: 'Trade on the powerful cTrader platform with advanced charting, lightning-fast execution, algorithmic trading, and professional-grade tools.',
    large: false,
    theme: 'light',
    iconBg: 'rgba(59, 130, 246, 0.1)',
    iconBorder: 'rgba(59, 130, 246, 0.2)',
    glow: 'rgba(59, 130, 246, 0.1)',
  },
  {
    icon: <Globe size={24} />,
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
  },
  {
    icon: <Users size={24} />,
    label: 'Copy Trading',
    title: 'Advanced Copy Trading & PAMM Solutions',
    desc: 'Follow experienced traders or invest through professional PAMM solutions with complete transparency and flexibility.',
    large: false,
    highlight: true,
    theme: 'dark',
    iconBg: 'rgba(99, 102, 241, 0.1)',
    iconBorder: 'rgba(99, 102, 241, 0.2)',
    glow: 'rgba(99, 102, 241, 0.1)',
  },
  {
    icon: <ShieldCheck size={24} />,
    label: 'Risk Management',
    title: 'Advanced Risk Management Tools',
    desc: 'Protect your capital using built-in calculators, position sizing tools, risk analysis, and trade management features.',
    large: false,
    theme: 'dark',
    iconBg: 'rgba(54, 249, 54, 0.1)',
    iconBorder: 'rgba(54, 249, 54, 0.2)',
    glow: 'rgba(54, 249, 54, 0.1)',
  },
  {
    icon: <Handshake size={24} />,
    label: 'Partners',
    title: 'High-Reward Partnership Program',
    desc: (
      <>
        Earn up to <span style={{ color: '#36F936', fontWeight: 600 }}>70% revenue share</span> with
        transparent commission tracking and instant partner payouts.
      </>
    ),
    large: true,
    theme: 'light',
    iconBg: 'rgba(201, 168, 76, 0.1)',
    iconBorder: 'rgba(201, 168, 76, 0.2)',
    glow: 'rgba(201, 168, 76, 0.12)',
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
              } ${f.theme === 'light' ? styles.bentoLight : ''}`}
              style={
                {
                  '--glow-color': f.glow,
                  '--icon-bg': f.iconBg,
                  '--icon-border': f.iconBorder,
                } as React.CSSProperties
              }
            >
              <div className={styles.bentoIcon}>{f.icon}</div>
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
