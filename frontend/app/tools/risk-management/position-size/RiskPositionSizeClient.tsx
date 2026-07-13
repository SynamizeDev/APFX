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
import { Shield, Zap, AlertTriangle } from 'lucide-react'
import styles from '@/components/ui/CalculatorLayout.module.css'
import calcStyles from '../RiskCalc.module.css'

const PIP_VALUE_PER_LOT = 10

type InfoVariant = 'default' | 'proTip' | 'mistake'

type InfoCardDef = {
  title: string
  icon: ReactNode
  variant: InfoVariant
  body: ReactNode
}

function infoCardClass(variant: InfoVariant) {
  const base = styles.infoCard
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

function RiskPositionInfoCarousel({ cards }: { cards: InfoCardDef[] }) {
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
      aria-label="Position size information"
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

export default function RiskPositionSizePage() {
  const infoLayout = useInfoLayout()
  const [balance, setBalance] = useState('10000')
  const [riskPct, setRiskPct] = useState('2')
  const [stopLossPips, setStopLossPips] = useState('30')

  const { riskAmount, lots } = useMemo(() => {
    const b = parseFloat(balance) || 0
    const r = parseFloat(riskPct) || 0
    const pips = parseFloat(stopLossPips) || 0
    const riskAmount = b * (r / 100)
    const lots = pips > 0 && PIP_VALUE_PER_LOT > 0 ? riskAmount / (pips * PIP_VALUE_PER_LOT) : 0
    return { riskAmount, lots }
  }, [balance, riskPct, stopLossPips])

  const infoCards: InfoCardDef[] = useMemo(
    () => [
      {
        title: 'Why It Matters',
        icon: <Shield size={16} />,
        variant: 'default',
        body: (
          <p className={styles.infoText}>
            This tool bridges the gap between your stop-loss and your lot sizes, ensuring that every trade remains
            within your pre-defined risk boundaries.
          </p>
        ),
      },
      {
        title: 'Professional Insight',
        icon: <Zap size={16} />,
        variant: 'proTip',
        body: (
          <p className={styles.infoText}>
            Position sizing is the most powerful tool for &quot;survivability.&quot; It is the only variable you have 100%
            control over in an uncertain market.
          </p>
        ),
      },
      {
        title: 'Common Mistake',
        icon: <AlertTriangle size={16} />,
        variant: 'mistake',
        body: (
          <p className={styles.infoText}>
            Rounding up lot sizes to &quot;make more.&quot; Small deviations in position size can lead to large deviations
            in expected drawdown.
          </p>
        ),
      },
    ],
    []
  )

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Position Size Calculator</h1>
        <p className={styles.subtitle}>
          Calculate the position size in lots based on your total capital, risk per trade, and stop loss in pips. Uses a standard pip value per lot for USD pairs.
        </p>
      </header>
      <div className={styles.inputPanel}>
        <div className={calcStyles.formGrid}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="ps-balance">Total capital</label>
            <input
              id="ps-balance"
              type="number"
              min="0"
              step="100"
              className={styles.input}
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="ps-risk">Risk per trade (%)</label>
            <input
              id="ps-risk"
              type="number"
              min="0"
              max="100"
              step="0.5"
              className={styles.input}
              value={riskPct}
              onChange={(e) => setRiskPct(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="ps-sl">Stop loss (pips)</label>
            <input
              id="ps-sl"
              type="number"
              min="0"
              step="1"
              className={styles.input}
              value={stopLossPips}
              onChange={(e) => setStopLossPips(e.target.value)}
            />
          </div>
        </div>
        <div className={calcStyles.resultRow}>
          <p className={calcStyles.resultLabel}>Risk amount per trade</p>
          <p className={calcStyles.resultValue}>
            {riskAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className={calcStyles.resultLabel} style={{ marginTop: '1rem' }}>Recommended position size</p>
          <p className={calcStyles.resultValue}>{lots.toFixed(2)} lots</p>
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
        {infoLayout === 'phoneCarousel' && <RiskPositionInfoCarousel cards={infoCards} />}
      </div>
    </main>
  )
}
