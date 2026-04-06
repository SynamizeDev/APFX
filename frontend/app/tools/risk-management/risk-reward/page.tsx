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
import { Shield, Zap, AlertTriangle, BarChart3, Activity, Crosshair, Target, TrendingUp } from 'lucide-react'
import styles from '@/components/ui/CalculatorLayout.module.css'
import calcStyles from '../RiskCalc.module.css'

function getQuality(ratio: number): 'Poor' | 'Moderate' | 'Good' {
  if (ratio < 1) return 'Poor'
  if (ratio <= 2.5) return 'Moderate'
  return 'Good'
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

function RiskRewardInfoCarousel({ cards }: { cards: InfoCardDef[] }) {
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
      cards.length - 1,
      Math.max(0, Math.round(el.scrollLeft / step)),
    )
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
        setCarouselIndex((i) => (i + 1) % cards.length)
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
  }, [cards.length])

  return (
    <div
      className={calcStyles.infoCarouselWrap}
      role="region"
      aria-roledescription="carousel"
      aria-label="Risk-reward information"
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

export default function RiskRewardPage() {
  const infoLayout = useInfoLayout()
  const [entry, setEntry] = useState('1.1000')
  const [stopLoss, setStopLoss] = useState('1.0950')
  const [takeProfit, setTakeProfit] = useState('1.1150')

  const { ratio, quality, breakevenWinRate } = useMemo(() => {
    const e = parseFloat(entry) || 0
    const sl = parseFloat(stopLoss) || 0
    const tp = parseFloat(takeProfit) || 0
    const risk = Math.abs(e - sl)
    const reward = Math.abs(tp - e)
    const r = risk > 0 ? reward / risk : 0
    const be = r > 0 ? (1 / (1 + r)) * 100 : 0
    return { ratio: r, quality: getQuality(r), breakevenWinRate: be }
  }, [entry, stopLoss, takeProfit])

  const infoCards: InfoCardDef[] = useMemo(
    () => [
      {
        title: 'Breakeven Win Rate Matrix',
        icon: <BarChart3 size={16} />,
        variant: 'formula',
        body: (
          <div className={calcStyles.recoveryTableContainer}>
            <table className={calcStyles.recoveryTable}>
              <thead>
                <tr>
                  <th>R:R Ratio</th>
                  <th>Req. Win Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1:1</td>
                  <td className={calcStyles.num}>50%</td>
                </tr>
                <tr>
                  <td>1:2</td>
                  <td className={calcStyles.num}>33%</td>
                </tr>
                <tr style={{ background: 'rgba(0, 200, 150, 0.05)' }}>
                  <td>1:3 (Pro Target)</td>
                  <td className={calcStyles.num}>25%</td>
                </tr>
                <tr>
                  <td>1:5</td>
                  <td className={calcStyles.num}>17%</td>
                </tr>
              </tbody>
            </table>
          </div>
        ),
      },
      {
        title: 'The Asymmetry Advantage',
        icon: <Activity size={16} />,
        variant: 'default',
        body: (
          <p className={styles.infoText}>
            In institutional trading, &quot;edge&quot; is not just predicting direction—it is securing{' '}
            <strong>Asymmetry</strong>. By targeting 1:3 RR, you can be wrong 70% of the time and still remain net
            profitable.
          </p>
        ),
      },
      {
        title: 'Why It Matters',
        icon: <Shield size={16} />,
        variant: 'default',
        body: (
          <p className={styles.infoText}>
            Your R:R ratio is the bridge between win rate and account growth. It removes the emotional need to
            &quot;be right&quot; and replaces it with the mathematical necessity of &quot;winning big.&quot;
          </p>
        ),
      },
      {
        title: 'Professional Insight',
        icon: <Zap size={16} />,
        variant: 'proTip',
        body: (
          <p className={styles.infoText}>
            Hedge funds often ignore setups below 1:2.5. They understand that slippage, commissions, and spread
            &quot;decay&quot; lower-ratio trades, turning the math against you over a long enough sample size.
          </p>
        ),
      },
      {
        title: 'Common Mistake',
        icon: <AlertTriangle size={16} />,
        variant: 'mistake',
        body: (
          <p className={styles.infoText}>
            Forcing target levels just to &quot;make the R:R look good.&quot; If the market structure doesn&apos;t
            support the target, the trade will fail. Let market structure dictate target, then check if R:R meets your
            minimum filter.
          </p>
        ),
      },
    ],
    []
  )

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Asymmetric Risk-Reward Profiler</h1>
        <p className={styles.subtitle}>
          Objectively evaluate the viability of your setups by assessing risk-reward asymmetries. 
          Standardize your execution by prioritizing high-probability trades with mathematically 
          favorable ROI profiles.
        </p>
      </header>
      <div className={styles.inputPanel}>
        <div className={calcStyles.formGrid}>
          <div className={styles.formGroup}>
            <div className={styles.labelWrapper}>
              <label className={styles.label} htmlFor="rr-entry">Entry Price</label>
              <div className={styles.tooltipContainer}>
                <Crosshair size={14} />
                <span className={styles.tooltipText}>The level at which you plan to enter the market.</span>
              </div>
            </div>
            <input
              id="rr-entry"
              type="number"
              step="any"
              className={styles.input}
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <div className={styles.labelWrapper}>
              <label className={styles.label} htmlFor="rr-sl">Stop Loss</label>
              <div className={styles.tooltipContainer}>
                <Target size={14} />
                <span className={styles.tooltipText}>The level at which your trade thesis is invalidated.</span>
              </div>
            </div>
            <input
              id="rr-sl"
              type="number"
              step="any"
              className={styles.input}
              value={stopLoss}
              onChange={(e) => setStopLoss(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <div className={styles.labelWrapper}>
              <label className={styles.label} htmlFor="rr-tp">Take Profit</label>
              <div className={styles.tooltipContainer}>
                <TrendingUp size={14} />
                <span className={styles.tooltipText}>The target level where you will exit the trade with a profit.</span>
              </div>
            </div>
            <input
              id="rr-tp"
              type="number"
              step="any"
              className={styles.input}
              value={takeProfit}
              onChange={(e) => setTakeProfit(e.target.value)}
            />
          </div>
        </div>

        <div className={calcStyles.resultRow}>
          <div className={calcStyles.summaryResultGrid}>
            <div className={calcStyles.summaryItem}>
              <span className={calcStyles.resultLabel}>Risk-Reward Ratio</span>
              <motion.div 
                key={ratio}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`${calcStyles.resultValue} ${calcStyles.highlight}`}
              >
                1 : {ratio.toFixed(2)}
              </motion.div>
            </div>
            <div className={calcStyles.summaryItem}>
              <span className={calcStyles.resultLabel}>Required Win Rate</span>
              <motion.div 
                key={breakevenWinRate}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={calcStyles.resultValue}
              >
                {breakevenWinRate.toFixed(1)}%
              </motion.div>
            </div>
          </div>
          
          <div style={{ marginTop: '1.5rem' }}>
            <span className={`${calcStyles.indicator} ${quality === 'Poor' ? calcStyles.indicatorPoor : quality === 'Moderate' ? calcStyles.indicatorModerate : calcStyles.indicatorGood}`}>
              Profile Quality: {quality}
            </span>
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
        {infoLayout === 'phoneCarousel' && <RiskRewardInfoCarousel cards={infoCards} />}
      </div>
    </main>
  )
}
