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
import { Shield, Zap, AlertTriangle, Calculator, Binary, Activity, Flame, TrendingUp } from 'lucide-react'
import styles from '@/components/ui/CalculatorLayout.module.css'
import calcStyles from '../RiskCalc.module.css'

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

function RiskOfRuinInfoCarousel({ cards }: { cards: InfoCardDef[] }) {
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
      aria-label="Risk of ruin information"
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

export default function RiskOfRuinPage() {
  const infoLayout = useInfoLayout()
  const [winRatePct, setWinRatePct] = useState('55')
  const [riskPerTradePct, setRiskPerTradePct] = useState('1')
  const [rewardRiskRatio, setRewardRiskRatio] = useState('1.5')
  const [numTrades, setNumTrades] = useState('100')

  const { ruinPct, riskLevel, edge } = useMemo(() => {
    const W = (parseFloat(winRatePct) || 0) / 100
    const R = parseFloat(rewardRiskRatio) || 0
    const riskPct = parseFloat(riskPerTradePct) || 0
    const n = Math.max(1, Math.min(1000, Math.floor(parseFloat(numTrades) || 0)))
    const edgeVal = W * R - (1 - W)
    const units = riskPct > 0 ? 100 / riskPct : 100
    let ruinPctValue = 0
    
    if (edgeVal <= 0) {
      ruinPctValue = 100
    } else {
      // Gambler's Ruin formula: ((1-edge)/(1+edge))^units
      const q = (1 - (W * R - (1 - W)) / (W * R + (1 - W)))
      ruinPctValue = Math.min(100, Math.pow(q, Math.min(units, n)) * 100)
    }
    
    const level = ruinPctValue > 20 ? 'Critical' : ruinPctValue > 5 ? 'High' : ruinPctValue > 1 ? 'Moderate' : 'Institutional'
    return { ruinPct: ruinPctValue, riskLevel: level, edge: edgeVal }
  }, [winRatePct, riskPerTradePct, rewardRiskRatio, numTrades])

  const infoCards: InfoCardDef[] = useMemo(
    () => [
      {
        title: 'The Ruin Equation',
        icon: <Calculator size={16} />,
        variant: 'formula',
        body: (
          <p className={styles.infoText}>
            Based on the <strong>Gambler&apos;s Ruin</strong> theorem. It checks if your edge is sufficient to outrun the
            &quot;variance-induced depletion&quot; that accompanies any series of random outcomes.
          </p>
        ),
      },
      {
        title: 'What This Tool Does',
        icon: <Binary size={16} />,
        variant: 'default',
        body: (
          <p className={styles.infoText}>
            It calculates the <strong>Ultimate Frontier</strong> of your trading business. If this tool shows a ruin
            probability above 1%, your strategy is mathematically destined for failure, regardless of short-term
            gains.
          </p>
        ),
      },
      {
        title: 'Why It Matters',
        icon: <Shield size={16} />,
        variant: 'default',
        body: (
          <p className={styles.infoText}>
            A 0% Risk of Ruin is non-negotiable for professional firms. It ensures that even the worst possible
            sequence of losses (the &quot;tail event&quot;) cannot remove the firm from the marketplace.
          </p>
        ),
      },
      {
        title: 'Professional Insight',
        icon: <Zap size={16} />,
        variant: 'proTip',
        body: (
          <p className={styles.infoText}>
            If your Risk of Ruin is high, the solution is rarely to &quot;be a better trader.&quot; The solution is to{' '}
            <strong>lower your risk per trade</strong> until the units of capital can survive the variance of your
            edge.
          </p>
        ),
      },
      {
        title: 'Common Mistake',
        icon: <AlertTriangle size={16} />,
        variant: 'mistake',
        body: (
          <p className={styles.infoText}>
            Confusing a &quot;Positive Edge&quot; with &quot;Invincibility.&quot; You can have a profitable strategy but still
            have a 100% Risk of Ruin if your position sizes are too aggressive relative to your win rate.
          </p>
        ),
      },
    ],
    []
  )

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Statistical Survival: Risk of Ruin</h1>
        <p className={styles.subtitle}>
          The ultimate boundary of survival. This tool uses probability theory to 
          estimate the likelihood of total capital depletion based on your edge, 
          execution frequency, and risk intensity.
        </p>
      </header>
      <div className={styles.inputPanel}>
        <div className={calcStyles.formGrid}>
          <div className={styles.formGroup}>
            <div className={styles.labelWrapper}>
              <label className={styles.label} htmlFor="ror-win">Historical Win Rate (%)</label>
              <div className={styles.tooltipContainer}>
                <Activity size={14} />
                <span className={styles.tooltipText}>The percentage of trades that result in a profit.</span>
              </div>
            </div>
            <input
              id="ror-win"
              type="number"
              min="1"
              max="99"
              step="1"
              className={styles.input}
              value={winRatePct}
              onChange={(e) => setWinRatePct(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <div className={styles.labelWrapper}>
              <label className={styles.label} htmlFor="ror-risk">Risk Per Trade (%)</label>
              <div className={styles.tooltipContainer}>
                <Flame size={14} />
                <span className={styles.tooltipText}>The portion of capital exposed to loss on an individual trade.</span>
              </div>
            </div>
            <input
              id="ror-risk"
              type="number"
              min="0.1"
              max="20"
              step="0.1"
              className={styles.input}
              value={riskPerTradePct}
              onChange={(e) => setRiskPerTradePct(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <div className={styles.labelWrapper}>
              <label className={styles.label} htmlFor="ror-rr">Avg. Reward/Risk Ratio</label>
              <div className={styles.tooltipContainer}>
                <TrendingUp size={14} />
                <span className={styles.tooltipText}>The average ratio of profit units to risk units in your setups.</span>
              </div>
            </div>
            <input
              id="ror-rr"
              type="number"
              min="0.1"
              step="0.1"
              className={styles.input}
              value={rewardRiskRatio}
              onChange={(e) => setRewardRiskRatio(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <div className={styles.labelWrapper}>
              <label className={styles.label} htmlFor="ror-trades">Simulation Horizon</label>
              <div className={styles.tooltipContainer}>
                <Binary size={14} />
                <span className={styles.tooltipText}>The number of trades over which the ruin probability is calculated.</span>
              </div>
            </div>
            <input
              id="ror-trades"
              type="number"
              min="10"
              max="5000"
              step="10"
              className={styles.input}
              value={numTrades}
              onChange={(e) => setNumTrades(e.target.value)}
            />
          </div>
        </div>

        <div className={calcStyles.resultRow}>
          <div className={calcStyles.riskMeterContainer}>
             <div className={calcStyles.riskMeterLabel}>
              Depletion Probability: <span className={ruinPct > 5 ? calcStyles.riskHigh : calcStyles.riskSafe}>
                {riskLevel}
              </span>
            </div>
            <div className={calcStyles.progressBar}>
              <motion.div 
                className={calcStyles.progressFill}
                initial={{ width: 0 }}
                animate={{ width: `${ruinPct}%` }}
                style={{ backgroundColor: ruinPct > 10 ? '#ff4d4d' : ruinPct > 1 ? '#ffa500' : 'var(--color-accent)' }}
              />
            </div>
          </div>

          <div className={calcStyles.summaryResultGrid}>
            <div className={calcStyles.summaryItem}>
              <span className={calcStyles.resultLabel}>Risk of Ruin</span>
              <motion.div 
                key={ruinPct}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`${calcStyles.resultValue} ${calcStyles.highlight}`}
              >
                {ruinPct < 0.01 ? '< 0.01%' : `${ruinPct.toFixed(2)}%`}
              </motion.div>
            </div>
            <div className={calcStyles.summaryItem}>
              <span className={calcStyles.resultLabel}>Mathematical Edge</span>
              <motion.div 
                key={edge}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={calcStyles.resultValue}
                style={{ color: edge > 0 ? 'var(--color-accent)' : '#ff4d4d' }}
              >
                {edge > 0 ? `+${edge.toFixed(2)}` : edge.toFixed(2)}
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
        {infoLayout === 'phoneCarousel' && <RiskOfRuinInfoCarousel cards={infoCards} />}
      </div>
    </main>
  )
}
