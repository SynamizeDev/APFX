'use client'

import {
  useState,
  useMemo,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
  type ReactNode,
} from 'react'
import { motion } from 'framer-motion'
import { Target, Shield, Zap, AlertTriangle, Calculator, HandCoins, Activity, Percent } from 'lucide-react'
import styles from '@/components/ui/CalculatorLayout.module.css'
import calcStyles from '../RiskCalc.module.css'

const PIP_VALUE_PER_LOT = 10 

type InfoVariant = 'formula' | 'default' | 'proTip' | 'mistake'

type InfoCardDef = {
  title: string
  icon: ReactNode
  variant: InfoVariant
  body: ReactNode
}

const INFO_CARDS: InfoCardDef[] = [
  {
    title: 'How it is Calculated',
    icon: <Calculator size={16} />,
    variant: 'formula',
    body: (
      <>
        The model solves for: <strong>(Balance × Risk%) / (Stop Loss × Pip Value)</strong>. This ensures that even
        if you are stopped out, your loss is mathematically capped at your predetermined threshold.
      </>
    ),
  },
  {
    title: 'What This Tool Does',
    icon: <Activity size={16} />,
    variant: 'default',
    body: (
      <>
        It transforms your risk tolerance into an actionable execution size. Instead of guessing how many lots to
        trade, you use hard data to align your position with your account&apos;s survival needs.
      </>
    ),
  },
  {
    title: 'The Survival Factor',
    icon: <Shield size={16} />,
    variant: 'default',
    body: (
      <>
        Trading is a game of probability. By risking only 1% per trade, you require <strong>100 consecutive losses</strong>{' '}
        to blow your account. This &quot;statistical buffer&quot; allows professionals to survive losing streaks that would
        bankrupt a gambler.
      </>
    ),
  },
  {
    title: 'Professional Insight',
    icon: <Zap size={16} />,
    variant: 'proTip',
    body: (
      <>
        Top-tier hedge funds rarely risk more than 0.5% to 1% per trade. They understand that preserving capital
        during high-volatility events depends on low exposure and high precision.
      </>
    ),
  },
  {
    title: 'Common Mistake',
    icon: <AlertTriangle size={16} />,
    variant: 'mistake',
    body: (
      <>
        &quot;Revenge Trading&quot; — doubling your risk after a loss to &quot;recover fast.&quot; This is the primary reason
        for account ruin. Institutional discipline requires you to <strong>reduce</strong> risk during drawdowns, not
        increase it.
      </>
    ),
  },
]

function infoCardClass(variant: InfoVariant) {
  const base = styles.infoCard
  if (variant === 'formula') return `${base} ${styles.formulaCard}`
  if (variant === 'proTip') return `${base} ${styles.proTipCard}`
  if (variant === 'mistake') return `${base} ${styles.mistakeCard}`
  return base
}

/** Must match `gap` on `.infoCarouselScroll` in RiskCalc.module.css */
const INFO_CAROUSEL_GAP_PX = 12
const INFO_SLIDE_MS = 5500
const PHONE_MAX_PX = 768

type InfoLayout = 'desktop' | 'phoneStack' | 'phoneCarousel'

function readInfoLayout(): InfoLayout {
  if (typeof window === 'undefined') return 'desktop'
  const phone = window.matchMedia(`(max-width: ${PHONE_MAX_PX}px)`).matches
  if (!phone) return 'desktop'
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'phoneStack'
  return 'phoneCarousel'
}

function useInfoLayout(): InfoLayout {
  const [layout, setLayout] = useState<InfoLayout>('desktop')

  useLayoutEffect(() => {
    const sync = () => setLayout(readInfoLayout())
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

function RiskInfoCarousel() {
  const [carouselIndex, setCarouselIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const indexRef = useRef(0)
  const scrollSyncTimerRef = useRef<number | undefined>(undefined)

  indexRef.current = carouselIndex

  const scrollStep = useCallback((el: HTMLDivElement) => el.clientWidth + INFO_CAROUSEL_GAP_PX, [])

  const syncIndexFromScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const step = scrollStep(el)
    if (step <= INFO_CAROUSEL_GAP_PX) return
    const i = Math.min(
      INFO_CARDS.length - 1,
      Math.max(0, Math.round(el.scrollLeft / step)),
    )
    setCarouselIndex((prev) => (prev === i ? prev : i))
  }, [scrollStep])

  useLayoutEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const step = scrollStep(el)
    if (step <= INFO_CAROUSEL_GAP_PX) return
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
      el.style.setProperty('--slide-width', `${w}px`)
      el.style.setProperty('--info-carousel-gap', `${INFO_CAROUSEL_GAP_PX}px`)
      const step = w + INFO_CAROUSEL_GAP_PX
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
        setCarouselIndex((i) => (i + 1) % INFO_CARDS.length)
      }, INFO_SLIDE_MS)
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
      className={calcStyles.infoCarouselWrap}
      role="region"
      aria-roledescription="carousel"
      aria-label="Risk-per-trade information"
      aria-live="polite"
    >
      <div className={calcStyles.infoCarouselViewport}>
        <div
          ref={scrollRef}
          className={calcStyles.infoCarouselScroll}
          tabIndex={0}
          aria-label="Swipe or scroll horizontally to read each information card"
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') {
              e.preventDefault()
              setCarouselIndex((i) => Math.max(0, i - 1))
            } else if (e.key === 'ArrowRight') {
              e.preventDefault()
              setCarouselIndex((i) => Math.min(INFO_CARDS.length - 1, i + 1))
            }
          }}
        >
          {INFO_CARDS.map((card, i) => (
            <div
              key={card.title}
              className={calcStyles.infoCarouselSlide}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${INFO_CARDS.length}: ${card.title}`}
              aria-hidden={i !== carouselIndex}
            >
              <div className={infoCardClass(card.variant)}>
                <h3 className={styles.infoTitle}>
                  {card.icon} {card.title}
                </h3>
                <p className={styles.infoText}>{card.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={calcStyles.carouselDots} role="tablist" aria-label="Information slides">
        {INFO_CARDS.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === carouselIndex}
            aria-label={`Slide ${i + 1} of ${INFO_CARDS.length}`}
            className={i === carouselIndex ? calcStyles.carouselDotActive : calcStyles.carouselDot}
            onClick={() => setCarouselIndex(i)}
          />
        ))}
      </div>
    </div>
  )
}

export default function RiskPerTradePage() {
  const infoLayout = useInfoLayout()
  const [balance, setBalance] = useState('10000')
  const [riskPct, setRiskPct] = useState('1')
  const [stopLossPips, setStopLossPips] = useState('20')

  const { maxLoss, positionSizeLots } = useMemo(() => {
    const b = parseFloat(balance) || 0
    const r = parseFloat(riskPct) || 0
    const pips = parseFloat(stopLossPips) || 0
    const maxLoss = b * (r / 100)
    const positionSizeLots = pips > 0 && PIP_VALUE_PER_LOT > 0 ? maxLoss / (pips * PIP_VALUE_PER_LOT) : 0
    return { maxLoss, positionSizeLots }
  }, [balance, riskPct, stopLossPips])

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Positional Exposure & Risk Modeling</h1>
        <p className={styles.subtitle}>
          Institutional-grade risk management begins with precise exposure modeling. Use this tool 
          to calculate optimal position sizes based on your account equity and hard-stop thresholds, 
          ensuring systemic capital preservation across every trade.
        </p>
      </header>
      <div className={styles.inputPanel}>
        <div className={calcStyles.formGrid}>
          <div className={styles.formGroup}>
            <div className={styles.labelWrapper}>
              <label className={styles.label} htmlFor="rpt-balance">Account Balance</label>
              <div className={styles.tooltipContainer}>
                <HandCoins size={14} />
                <span className={styles.tooltipText}>The total funds currently in your trading account.</span>
              </div>
            </div>
            <input
              id="rpt-balance"
              type="number"
              min="0"
              step="100"
              className={styles.input}
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <div className={styles.labelWrapper}>
              <label className={styles.label} htmlFor="rpt-risk">Risk Preference (%)</label>
              <div className={styles.tooltipContainer}>
                <Percent size={14} />
                <span className={styles.tooltipText}>The percentage of your total balance you are willing to lose on this single trade.</span>
              </div>
            </div>
            <input
              id="rpt-risk"
              type="number"
              min="0.1"
              max="100"
              step="0.1"
              className={styles.input}
              value={riskPct}
              onChange={(e) => setRiskPct(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <div className={styles.labelWrapper}>
              <label className={styles.label} htmlFor="rpt-sl">Stop Loss (Pips)</label>
              <div className={styles.tooltipContainer}>
                <Target size={14} />
                <span className={styles.tooltipText}>The distance from your entry price to your exit point if the trade goes against you.</span>
              </div>
            </div>
            <input
              id="rpt-sl"
              type="number"
              min="1"
              step="1"
              className={styles.input}
              value={stopLossPips}
              onChange={(e) => setStopLossPips(e.target.value)}
            />
          </div>
        </div>

        <div className={calcStyles.resultRow}>
          <div className={calcStyles.riskMeterContainer}>
            <div className={calcStyles.riskMeterLabel}>
              Risk Intensity: <span className={parseFloat(riskPct) >= 2 ? calcStyles.riskHigh : calcStyles.riskSafe}>
                {parseFloat(riskPct) >= 5 ? 'High Risk' : parseFloat(riskPct) >= 2 ? 'Aggressive' : 'Institutional'}
              </span>
            </div>
            <div className={calcStyles.progressBar}>
              <motion.div 
                className={calcStyles.progressFill}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(parseFloat(riskPct) * 10, 100)}%` }}
                style={{ backgroundColor: parseFloat(riskPct) >= 5 ? '#ff4d4d' : parseFloat(riskPct) >= 2 ? '#ffa500' : 'var(--color-accent)' }}
              />
            </div>
          </div>

          <div className={calcStyles.summaryResultGrid}>
            <div className={calcStyles.summaryItem}>
              <span className={calcStyles.resultLabel}>Maximum Dollar Risk</span>
              <motion.span 
                key={maxLoss}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`${calcStyles.resultValue} ${calcStyles.highlight}`}
              >
                {maxLoss.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
              </motion.span>
            </div>
            <div className={calcStyles.summaryItem}>
              <span className={calcStyles.resultLabel}>Calculated Position Size</span>
              <motion.span 
                key={positionSizeLots}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={calcStyles.resultValue}
              >
                {positionSizeLots.toFixed(2)} Lots
              </motion.span>
            </div>
          </div>
        </div>

        {infoLayout === 'desktop' && (
          <div className={`${styles.infoSection} ${calcStyles.infoSectionDesktop}`}>
            {INFO_CARDS.map((card) => (
              <div key={card.title} className={infoCardClass(card.variant)}>
                <h3 className={styles.infoTitle}>
                  {card.icon} {card.title}
                </h3>
                <p className={styles.infoText}>{card.body}</p>
              </div>
            ))}
          </div>
        )}
        {infoLayout === 'phoneStack' && (
          <div className={`${styles.infoSection} ${calcStyles.infoSectionPhoneStack}`}>
            {INFO_CARDS.map((card) => (
              <div key={`stack-${card.title}`} className={infoCardClass(card.variant)}>
                <h3 className={styles.infoTitle}>
                  {card.icon} {card.title}
                </h3>
                <p className={styles.infoText}>{card.body}</p>
              </div>
            ))}
          </div>
        )}
        {infoLayout === 'phoneCarousel' && <RiskInfoCarousel />}
      </div>
    </main>
  )
}
