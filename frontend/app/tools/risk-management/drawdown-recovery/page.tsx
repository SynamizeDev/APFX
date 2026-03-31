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
import { Zap, AlertTriangle, Calculator, TrendingUp, Activity, TrendingDown, Landmark } from 'lucide-react'
import styles from '@/components/ui/CalculatorLayout.module.css'
import calcStyles from '../RiskCalc.module.css'

const RECOVERY_TABLE_ROWS = [5, 10, 15, 20, 25, 30, 40, 50, 60, 75, 90]

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

function DrawdownInfoCarousel({ cards }: { cards: InfoCardDef[] }) {
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
      aria-label="Drawdown recovery information"
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

export default function DrawdownRecoveryPage() {
  const infoLayout = useInfoLayout()
  const [balance, setBalance] = useState('100000')
  const [drawdownPct, setDrawdownPct] = useState('20')

  const { capitalLost, returnRequiredPct, currentEquity } = useMemo(() => {
    const b = parseFloat(balance) || 0
    const dd = Math.min(99.9, Math.max(0, parseFloat(drawdownPct) || 0)) / 100
    const lost = b * dd
    const returnRequiredPct = dd < 1 ? (1 / (1 - dd) - 1) * 100 : 0
    return { capitalLost: lost, returnRequiredPct, currentEquity: b - lost }
  }, [balance, drawdownPct])

  const infoCards: InfoCardDef[] = useMemo(
    () => [
      {
        title: 'Recovery Asymmetry Matrix',
        icon: <Calculator size={16} />,
        variant: 'formula',
        body: (
          <div className={calcStyles.recoveryTableContainer}>
            <table className={calcStyles.recoveryTable}>
              <thead>
                <tr>
                  <th>Drawdown</th>
                  <th>Required Gain</th>
                </tr>
              </thead>
              <tbody>
                {RECOVERY_TABLE_ROWS.slice(0, 8).map((dd) => (
                  <tr
                    key={dd}
                    style={parseFloat(drawdownPct) === dd ? { background: 'rgba(0, 200, 150, 0.05)' } : {}}
                  >
                    <td>{dd}%</td>
                    <td className={calcStyles.num}>{((1 / (1 - dd / 100) - 1) * 100).toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ),
      },
      {
        title: 'What This Tool Does',
        icon: <Activity size={16} />,
        variant: 'default',
        body: (
          <p className={styles.infoText}>
            It visualizes the &quot;Exponential Cost of Loss.&quot; While loss is linear, recovery is exponential. This tool
            shows you exactly why heavy losses are so difficult to repair.
          </p>
        ),
      },
      {
        title: 'Why It Matters',
        icon: <TrendingUp size={16} />,
        variant: 'default',
        body: (
          <p className={styles.infoText}>
            A 50% loss requires a 100% gain to break even. A 90% loss requires a 900% gain. Risk management is about
            keeping drawdowns in the &quot;Linear Zone&quot; (0-15%) where recovery is manageable.
          </p>
        ),
      },
      {
        title: 'Professional Insight',
        icon: <Zap size={16} />,
        variant: 'proTip',
        body: (
          <p className={styles.infoText}>
            Institutional risk managers use a &quot;Hard Stop&quot; at 20-25% drawdown. At this point, the entire strategy
            is often halted and re-evaluated, as the mathematical burden of recovery begins to outweigh the edge.
          </p>
        ),
      },
      {
        title: 'Common Mistake',
        icon: <AlertTriangle size={16} />,
        variant: 'mistake',
        body: (
          <p className={styles.infoText}>
            &quot;Doubling Down&quot; into a drawdown. Many traders increase their bet sizes to try and &quot;recover fast.&quot;
            This behavior accelerates your travel down the asymmetry curve, making total ruin almost certain.
          </p>
        ),
      },
    ],
    [drawdownPct]
  )

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>The Math of Misery: Drawdown Logistics</h1>
        <p className={styles.subtitle}>
          Analyze the mathematical and psychological overhead of drawdown. This tool 
          quantifies the exact return required to restore parity after a period of 
          volatility, helping you manage the logistics of portfolio recovery.
        </p>
      </header>
      <div className={styles.inputPanel}>
        <div className={calcStyles.formGrid}>
          <div className={styles.formGroup}>
            <div className={styles.labelWrapper}>
              <label className={styles.label} htmlFor="dd-balance">Starting Capital</label>
              <div className={styles.tooltipContainer}>
                <Landmark size={14} />
                <span className={styles.tooltipText}>The initial balance before the drawdown occurred.</span>
              </div>
            </div>
            <input
              id="dd-balance"
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
              <label className={styles.label} htmlFor="dd-pct">Observed Drawdown (%)</label>
              <div className={styles.tooltipContainer}>
                <TrendingDown size={14} />
                <span className={styles.tooltipText}>The cumulative percentage loss from the peak account value.</span>
              </div>
            </div>
            <input
              id="dd-pct"
              type="number"
              min="0"
              max="99.9"
              step="1"
              className={styles.input}
              value={drawdownPct}
              onChange={(e) => setDrawdownPct(e.target.value)}
            />
          </div>
        </div>

        <div className={calcStyles.resultRow}>
          <div className={calcStyles.riskMeterContainer}>
             <div className={calcStyles.riskMeterLabel}>
              Recovery Difficulty: <span className={parseFloat(drawdownPct) >= 25 ? calcStyles.riskHigh : calcStyles.riskSafe}>
                {parseFloat(drawdownPct) >= 50 ? 'Extreme' : parseFloat(drawdownPct) >= 25 ? 'Significant' : 'Managed'}
              </span>
            </div>
            <div className={calcStyles.progressBar}>
              <motion.div 
                className={calcStyles.progressFill}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(parseFloat(drawdownPct) * 2, 100)}%` }}
                style={{ backgroundColor: parseFloat(drawdownPct) >= 50 ? '#ff4d4d' : parseFloat(drawdownPct) >= 25 ? '#ffa500' : 'var(--color-accent)' }}
              />
            </div>
          </div>

          <div className={calcStyles.summaryResultGrid}>
            <div className={calcStyles.summaryItem}>
              <span className={calcStyles.resultLabel}>Required Return to Parity</span>
              <motion.div 
                key={returnRequiredPct}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`${calcStyles.resultValue} ${calcStyles.highlight}`}
              >
                {returnRequiredPct.toFixed(1)}%
              </motion.div>
            </div>
            <div className={calcStyles.summaryItem}>
              <span className={calcStyles.resultLabel}>Remaining Equity</span>
              <motion.div 
                key={currentEquity}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={calcStyles.resultValue}
              >
                {currentEquity.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
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
        {infoLayout === 'phoneCarousel' && <DrawdownInfoCarousel cards={infoCards} />}
      </div>
    </main>
  )
}
