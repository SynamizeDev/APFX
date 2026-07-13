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
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Zap, AlertTriangle, Calculator, Activity, Briefcase, Flame, Layers } from 'lucide-react'
import styles from '@/components/ui/CalculatorLayout.module.css'
import calcStyles from '../RiskCalc.module.css'

function getDiversification(totalRiskPct: number): string {
  if (totalRiskPct > 15) return 'High Concentration'
  if (totalRiskPct > 8) return 'Moderate Exposure'
  if (totalRiskPct > 3) return 'Institutional Balance'
  return 'Conservative'
}

type InfoVariant = 'formula' | 'default' | 'proTip' | 'mistake'

type InfoCardDef = {
  title: string
  icon: ReactNode
  variant: InfoVariant
  body: ReactNode
}

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

function PortfolioInfoCarousel({ cards }: { cards: InfoCardDef[] }) {
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
    const i = Math.min(cards.length - 1, Math.max(0, Math.round(el.scrollLeft / step)))
    setCarouselIndex((prev) => (prev === i ? prev : i))
  }, [cards.length, scrollStep])

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
      if (scrollSyncTimerRef.current !== undefined) window.clearTimeout(scrollSyncTimerRef.current)
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
      if (scrollSyncTimerRef.current !== undefined) window.clearTimeout(scrollSyncTimerRef.current)
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
      id = window.setInterval(() => setCarouselIndex((i) => (i + 1) % cards.length), INFO_SLIDE_MS)
    }
    arm()
    mqPhone.addEventListener('change', arm)
    mqReduce.addEventListener('change', arm)
    return () => {
      if (id !== undefined) window.clearInterval(id)
      mqPhone.removeEventListener('change', arm)
      mqReduce.removeEventListener('change', arm)
    }
  }, [cards.length])

  return (
    <div
      className={calcStyles.infoCarouselWrap}
      role="region"
      aria-roledescription="carousel"
      aria-label="Portfolio risk information"
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
              setCarouselIndex((i) => Math.min(cards.length - 1, i + 1))
            }
          }}
        >
          {cards.map((card, i) => (
            <div
              key={card.title}
              className={calcStyles.infoCarouselSlide}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${cards.length}: ${card.title}`}
              aria-hidden={i !== carouselIndex}
            >
              <div className={infoCardClass(card.variant)}>
                <h3 className={styles.infoTitle}>
                  {card.icon} {card.title}
                </h3>
                <div className={styles.infoText}>{card.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={calcStyles.carouselDots} role="tablist" aria-label="Information slides">
        {cards.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === carouselIndex}
            aria-label={`Slide ${i + 1} of ${cards.length}`}
            className={i === carouselIndex ? calcStyles.carouselDotActive : calcStyles.carouselDot}
            onClick={() => setCarouselIndex(i)}
          />
        ))}
      </div>
    </div>
  )
}

export default function PortfolioRiskPage() {
  const infoLayout = useInfoLayout()
  const [capital, setCapital] = useState('100000')
  const [riskPerStrategyPct, setRiskPerStrategyPct] = useState('2')
  const [numStrategies, setNumStrategies] = useState('4')

  const { totalRiskPct, diversification, riskLevel } = useMemo(() => {
    const r = parseFloat(riskPerStrategyPct) || 0
    const n = Math.max(0, Math.min(50, Math.floor(parseFloat(numStrategies) || 0)))
    const total = n * r
    const level = total > 15 ? 'Critical' : total > 8 ? 'High' : total > 3 ? 'Safe' : 'Low'
    return { totalRiskPct: total, diversification: getDiversification(total), riskLevel: level }
  }, [riskPerStrategyPct, numStrategies])

  const infoCards: InfoCardDef[] = useMemo(
    () => [
      {
        title: 'The “Heat” Calculation',
        icon: <Calculator size={16} />,
        variant: 'formula',
        body: (
          <p className={styles.infoText}>
            The model calculates: <strong>Avg Risk × Unit Count</strong>. While this assumes no correlation, it
            represents your &quot;Worst Case&quot; exposure if all positions fail simultaneously.
          </p>
        ),
      },
      {
        title: 'What This Tool Does',
        icon: <Activity size={16} />,
        variant: 'default',
        body: (
          <p className={styles.infoText}>
            It aggregates individual risks into a single <strong>Portfolio Metric</strong>. This allows you to see the
            &quot;Total Pressure&quot; on your account equity at any given moment.
          </p>
        ),
      },
      {
        title: 'Correlation: The Silent Killer',
        icon: <Shield size={16} />,
        variant: 'default',
        body: (
          <p className={styles.infoText}>
            Diversification only works if risks are <strong>uncorrelated</strong>. If you have 5 trades all long USD,
            your actual risk is much higher than 5 independent trades because they will likely move in unison.
          </p>
        ),
      },
      {
        title: 'Professional Insight',
        icon: <Zap size={16} />,
        variant: 'proTip',
        body: (
          <p className={styles.infoText}>
            Institutional desks limit &quot;Strategic Heat&quot; to 10-15%. Going beyond this makes the account vulnerable
            to &quot;Black Swan&quot; events where stop-losses may slip and correlations spike to 1.0.
          </p>
        ),
      },
      {
        title: 'Common Mistake',
        icon: <AlertTriangle size={16} />,
        variant: 'mistake',
        body: (
          <p className={styles.infoText}>
            Assuming that 5 strategies in different USD pairs is diversification. If the USD Index spikes, all
            positions will likely hit their stop losses simultaneously, resulting in a <strong>Max Heat</strong> event.
          </p>
        ),
      },
    ],
    []
  )

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Aggregate Portfolio Risk & Heat Analysis</h1>
        <p className={styles.subtitle}>
          Individual trade risk is only half the story. Portfolio risk measures 
          the "Total Heat" on your account, accounting for cumulative exposure 
          across all active positions and strategies.
        </p>
      </header>
      <div className={styles.inputPanel}>
        <div className={calcStyles.formGrid}>
          <div className={styles.formGroup}>
            <div className={styles.labelWrapper}>
              <label className={styles.label} htmlFor="pr-capital">Total Account Equity</label>
              <div className={styles.tooltipContainer}>
                <Briefcase size={14} />
                <span className={styles.tooltipText}>The total net value of your account, including all realized and unrealized P/L.</span>
              </div>
            </div>
            <input
              id="pr-capital"
              type="number"
              min="0"
              step="1000"
              className={styles.input}
              value={capital}
              onChange={(e) => setCapital(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <div className={styles.labelWrapper}>
              <label className={styles.label} htmlFor="pr-risk">Avg. Risk Per Unit (%)</label>
              <div className={styles.tooltipContainer}>
                <Flame size={14} />
                <span className={styles.tooltipText}>The typical risk percentage allocated to a single trade or strategy.</span>
              </div>
            </div>
            <input
              id="pr-risk"
              type="number"
              min="0"
              max="100"
              step="0.5"
              className={styles.input}
              value={riskPerStrategyPct}
              onChange={(e) => setRiskPerStrategyPct(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <div className={styles.labelWrapper}>
              <label className={styles.label} htmlFor="pr-num">Active Positions / Strategies</label>
              <div className={styles.tooltipContainer}>
                <Layers size={14} />
                <span className={styles.tooltipText}>The number of independent trades or automated strategies currently active.</span>
              </div>
            </div>
            <input
              id="pr-num"
              type="number"
              min="0"
              max="50"
              step="1"
              className={styles.input}
              value={numStrategies}
              onChange={(e) => setNumStrategies(e.target.value)}
            />
          </div>
        </div>

        <div className={calcStyles.resultRow}>
          <div className={calcStyles.riskMeterContainer}>
             <div className={calcStyles.riskMeterLabel}>
              Portfolio Heat: <span className={totalRiskPct >= 8 ? calcStyles.riskHigh : calcStyles.riskSafe}>
                {diversification}
              </span>
            </div>
            <div className={calcStyles.progressBar}>
              <motion.div 
                className={calcStyles.progressFill}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(totalRiskPct * 4, 100)}%` }}
                style={{ backgroundColor: totalRiskPct >= 15 ? '#ff4d4d' : totalRiskPct >= 8 ? '#ffa500' : 'var(--color-accent)' }}
              />
            </div>
          </div>

          <div className={calcStyles.summaryResultGrid}>
            <div className={calcStyles.summaryItem}>
              <span className={calcStyles.resultLabel}>Total Percentage Exposure</span>
              <motion.div 
                key={totalRiskPct}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`${calcStyles.resultValue} ${calcStyles.highlight}`}
              >
                {totalRiskPct.toFixed(1)}%
              </motion.div>
            </div>
            <div className={calcStyles.summaryItem}>
              <span className={calcStyles.resultLabel}>Total Dollar Exposure</span>
              <motion.div 
                key={totalRiskPct}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={calcStyles.resultValue}
              >
                {( (parseFloat(capital) || 0) * (totalRiskPct / 100) ).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
              </motion.div>
            </div>
          </div>
        </div>

        {infoLayout === 'desktop' && (
          <div className={`${styles.infoSection} ${calcStyles.infoSectionDesktop}`}>
            {infoCards.map((card) => (
              <div key={card.title} className={infoCardClass(card.variant)}>
                <h3 className={styles.infoTitle}>
                  {card.icon} {card.title}
                </h3>
                <div className={styles.infoText}>{card.body}</div>
              </div>
            ))}
          </div>
        )}
        {infoLayout === 'phoneStack' && (
          <div className={`${styles.infoSection} ${calcStyles.infoSectionPhoneStack}`}>
            {infoCards.map((card) => (
              <div key={`stack-${card.title}`} className={infoCardClass(card.variant)}>
                <h3 className={styles.infoTitle}>
                  {card.icon} {card.title}
                </h3>
                <div className={styles.infoText}>{card.body}</div>
              </div>
            ))}
          </div>
        )}
        {infoLayout === 'phoneCarousel' && <PortfolioInfoCarousel cards={infoCards} />}
      </div>
    </main>
  )
}
