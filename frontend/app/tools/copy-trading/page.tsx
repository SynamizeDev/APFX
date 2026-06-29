'use client'

import { useState, useMemo, useEffect, useRef, useLayoutEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, Wallet, Copy, BarChart3, UserCheck, Zap, Layers, TrendingUp, 
  ShieldCheck, Clock, Target, Info, AlertTriangle, Users, 
  Briefcase, TrendingDown, CheckCircle2, ChevronRight, Sliders, Plus
} from 'lucide-react'
import Link from 'next/link'
import calcLayout from '@/components/ui/CalculatorLayout.module.css'
import styles from './CopyTrading.module.css'

/* ─── Mock data ───────────────────────────────────────────────── */
const TRADERS = [
  { id: '1', name: 'Alex Rivera', initials: 'AR', averageRoiPct: 12.4, winRatePct: 68, followersCount: 2847, riskLevel: 'Low' as const, style: 'Diversified Alpha', maxDrawdown: 5.2 },
  { id: '2', name: 'Jordan Lee', initials: 'JL', averageRoiPct: 18.2, winRatePct: 62, followersCount: 1923, riskLevel: 'Medium' as const, style: 'Momentum Scalper', maxDrawdown: 12.8 },
  { id: '3', name: 'Sam Chen', initials: 'SC', averageRoiPct: 9.8, winRatePct: 74, followersCount: 4102, riskLevel: 'Low' as const, style: 'Conservative Trend', maxDrawdown: 3.5 },
  { id: '4', name: 'Morgan Blake', initials: 'MB', averageRoiPct: 22.1, winRatePct: 58, followersCount: 1204, riskLevel: 'High' as const, style: 'Aggressive Aggregator', maxDrawdown: 18.4 },
  { id: '5', name: 'Riley Park', initials: 'RP', averageRoiPct: 14.6, winRatePct: 71, followersCount: 3560, riskLevel: 'Medium' as const, style: 'Swing Macro', maxDrawdown: 9.1 },
]

/** Carousel includes an extra “+ more” slide after all traders */
const LEADERBOARD_CAROUSEL_SLIDE_COUNT = TRADERS.length + 1

const STEPS = [
  { step: 1, title: 'Open a Live account', description: '', icon: UserCheck },
  { step: 2, title: 'Deposit funds', description: '', icon: Wallet },
  { step: 3, title: 'Launch cTrader on your mobile or web', description: '', icon: Zap },
  { step: 4, title: 'Choose a strategy and click Copy', description: '', icon: Copy },
]

const BENEFITS = [
  { title: 'Systematic Replication', shortDescription: 'Replicate complex strategies with high-fidelity across all market conditions automatically.', icon: Zap },
  { title: 'Multi-Strategy Diversification', shortDescription: 'Allocate across different providers to mitigate concentration risk and smooth your equity curve.', icon: Layers },
  { title: 'Time-Efficient Management', shortDescription: 'Let professional systems manage the minutiae while you focus on high-level portfolio oversight.', icon: Clock },
  { title: 'Data-Driven Decision Making', shortDescription: 'Base your allocations on audited performance data and institutional-grade risk metrics.', icon: Target },
]

function riskPillClass(risk: string) {
  if (risk === 'Low') return styles.riskLow
  if (risk === 'High') return styles.riskHigh
  return styles.riskMedium
}

function LeaderboardMoreCard() {
  return (
    <motion.article
      className={`${styles.traderCard} ${styles.traderCardMore}`}
      whileHover={{ scale: 1.02, translateY: -5 }}
    >
      <Link href="/accounts" className={styles.traderCardMoreLink}>
        <span className={styles.traderCardMorePlus} aria-hidden>
          <Plus size={36} strokeWidth={2} />
        </span>
        <span className={styles.traderCardMoreTitle}>More</span>
        <span className={styles.traderCardMoreHint}>View all strategy providers</span>
        <span className={styles.traderCardMoreCta}>
          Explore accounts <ChevronRight size={16} style={{ verticalAlign: 'middle' }} />
        </span>
      </Link>
    </motion.article>
  )
}

/** Must match carousel `gap` in CopyTrading.module.css */
const CAROUSEL_GAP_PX = 12
const CAROUSEL_SLIDE_MS = 5500
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

function BenefitsCarousel() {
  const [carouselIndex, setCarouselIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const indexRef = useRef(0)
  const scrollSyncTimerRef = useRef<number | undefined>(undefined)

  indexRef.current = carouselIndex

  const scrollStep = useCallback((el: HTMLDivElement) => el.clientWidth + CAROUSEL_GAP_PX, [])

  const syncIndexFromScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const step = scrollStep(el)
    if (step <= CAROUSEL_GAP_PX) return
    const i = Math.min(
      BENEFITS.length - 1,
      Math.max(0, Math.round(el.scrollLeft / step)),
    )
    setCarouselIndex((prev) => (prev === i ? prev : i))
  }, [scrollStep])

  useLayoutEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const step = scrollStep(el)
    if (step <= CAROUSEL_GAP_PX) return
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
      el.style.setProperty('--benefits-slide-width', `${w}px`)
      el.style.setProperty('--benefits-carousel-gap', `${CAROUSEL_GAP_PX}px`)
      const step = w + CAROUSEL_GAP_PX
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
        setCarouselIndex((i) => (i + 1) % BENEFITS.length)
      }, CAROUSEL_SLIDE_MS)
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
      className={styles.benefitsCarouselWrap}
      role="region"
      aria-roledescription="carousel"
      aria-label="Copy trading benefits"
      aria-live="polite"
    >
      <div className={styles.benefitsCarouselViewport}>
        <div
          ref={scrollRef}
          className={styles.benefitsCarouselScroll}
          tabIndex={0}
          aria-label="Swipe or scroll horizontally for each benefit"
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') {
              e.preventDefault()
              setCarouselIndex((i) => Math.max(0, i - 1))
            } else if (e.key === 'ArrowRight') {
              e.preventDefault()
              setCarouselIndex((i) => Math.min(BENEFITS.length - 1, i + 1))
            }
          }}
        >
          {BENEFITS.map((b, i) => (
            <div
              key={b.title}
              className={styles.benefitsCarouselSlide}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${BENEFITS.length}: ${b.title}`}
              aria-hidden={i !== carouselIndex}
            >
              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>
                  <BenefitIcon Icon={b.icon} />
                </div>
                <h3 className={styles.benefitTitle}>{b.title}</h3>
                <p className={styles.benefitDesc}>{b.shortDescription}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.benefitsCarouselDots} role="tablist" aria-label="Benefit slides">
        {BENEFITS.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === carouselIndex}
            aria-label={`Slide ${i + 1} of ${BENEFITS.length}`}
            className={
              i === carouselIndex ? styles.benefitsCarouselDotActive : styles.benefitsCarouselDot
            }
            onClick={() => setCarouselIndex(i)}
          />
        ))}
      </div>
    </div>
  )
}

function LeaderboardCarousel() {
  const [carouselIndex, setCarouselIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const indexRef = useRef(0)
  const scrollSyncTimerRef = useRef<number | undefined>(undefined)

  indexRef.current = carouselIndex

  const scrollStep = useCallback((el: HTMLDivElement) => el.clientWidth + CAROUSEL_GAP_PX, [])

  const syncIndexFromScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const step = scrollStep(el)
    if (step <= CAROUSEL_GAP_PX) return
    const i = Math.min(
      LEADERBOARD_CAROUSEL_SLIDE_COUNT - 1,
      Math.max(0, Math.round(el.scrollLeft / step)),
    )
    setCarouselIndex((prev) => (prev === i ? prev : i))
  }, [scrollStep])

  useLayoutEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const step = scrollStep(el)
    if (step <= CAROUSEL_GAP_PX) return
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
      el.style.setProperty('--leaderboard-slide-width', `${w}px`)
      el.style.setProperty('--leaderboard-carousel-gap', `${CAROUSEL_GAP_PX}px`)
      const step = w + CAROUSEL_GAP_PX
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
        setCarouselIndex((i) => (i + 1) % LEADERBOARD_CAROUSEL_SLIDE_COUNT)
      }, CAROUSEL_SLIDE_MS)
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
      className={styles.leaderboardCarouselWrap}
      role="region"
      aria-roledescription="carousel"
      aria-label="Strategy providers"
      aria-live="polite"
    >
      <div className={styles.leaderboardCarouselViewport}>
        <div
          ref={scrollRef}
          className={styles.leaderboardCarouselScroll}
          tabIndex={0}
          aria-label="Swipe or scroll horizontally to compare traders"
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') {
              e.preventDefault()
              setCarouselIndex((i) => Math.max(0, i - 1))
            } else if (e.key === 'ArrowRight') {
              e.preventDefault()
              setCarouselIndex((i) => Math.min(LEADERBOARD_CAROUSEL_SLIDE_COUNT - 1, i + 1))
            }
          }}
        >
          {TRADERS.map((t, i) => (
            <div
              key={t.id}
              className={styles.leaderboardCarouselSlide}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${LEADERBOARD_CAROUSEL_SLIDE_COUNT}: ${t.name}`}
              aria-hidden={i !== carouselIndex}
            >
              <motion.article className={styles.traderCard} whileHover={{ scale: 1.02, translateY: -5 }}>
                <div className={styles.traderHeader}>
                  <div className={styles.traderAvatar}>{t.initials}</div>
                  <div>
                    <div className={styles.traderName}>{t.name}</div>
                    <span className={styles.traderStyle}>{t.style}</span>
                    <span className={`${styles.riskPill} ${riskPillClass(t.riskLevel)}`}>
                      {t.riskLevel} Risk
                    </span>
                  </div>
                </div>
                <div className={styles.traderStats}>
                  <span className={styles.traderStat}>
                    ROI <strong>{t.averageRoiPct}%</strong>
                  </span>
                  <span className={styles.traderStat}>
                    Win rate <strong>{t.winRatePct}%</strong>
                  </span>
                </div>
                <div className={styles.traderSecondaryStats}>
                  <span className={styles.traderStat}>
                    Max DD <strong>{t.maxDrawdown}%</strong>
                  </span>
                  <span className={styles.traderStat}>
                    Followers <strong>{t.followersCount.toLocaleString()}</strong>
                  </span>
                </div>
              </motion.article>
            </div>
          ))}
          <div
            className={styles.leaderboardCarouselSlide}
            role="group"
            aria-roledescription="slide"
            aria-label={`${LEADERBOARD_CAROUSEL_SLIDE_COUNT} of ${LEADERBOARD_CAROUSEL_SLIDE_COUNT}: View all strategy providers`}
            aria-hidden={carouselIndex !== TRADERS.length}
          >
            <LeaderboardMoreCard />
          </div>
        </div>
      </div>
      <div className={styles.leaderboardCarouselDots} role="tablist" aria-label="Trader slides">
        {Array.from({ length: LEADERBOARD_CAROUSEL_SLIDE_COUNT }, (_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === carouselIndex}
            aria-label={`Slide ${i + 1} of ${LEADERBOARD_CAROUSEL_SLIDE_COUNT}`}
            className={
              i === carouselIndex ? styles.leaderboardCarouselDotActive : styles.leaderboardCarouselDot
            }
            onClick={() => setCarouselIndex(i)}
          />
        ))}
      </div>
    </div>
  )
}

const MONTHLY_RETURNS = [
  { month: 'Jan', returnPct: 2.1 },
  { month: 'Feb', returnPct: -0.5 },
  { month: 'Mar', returnPct: 1.8 },
  { month: 'Apr', returnPct: 3.2 },
  { month: 'May', returnPct: 1.1 },
  { month: 'Jun', returnPct: 2.6 },
  { month: 'Jul', returnPct: -0.2 },
  { month: 'Aug', returnPct: 1.9 },
  { month: 'Sep', returnPct: 2.4 },
  { month: 'Oct', returnPct: 1.5 },
  { month: 'Nov', returnPct: 2.8 },
  { month: 'Dec', returnPct: 1.7 },
]

const RISK_LEVELS = [
  { value: 'Low', label: 'Low' },
  { value: 'Medium', label: 'Medium' },
  { value: 'High', label: 'High' },
]

function StepIcon({ Icon }: { Icon: any }) {
  return <Icon size={24} />
}

function BenefitIcon({ Icon }: { Icon: any }) {
  return <Icon size={22} />
}

export default function CopyTradingPage() {
  const benefitsLayout = usePhoneSectionLayout()
  const leaderboardLayout = usePhoneSectionLayout()
  const [iframeLoaded, setIframeLoaded] = useState(false)

  const [investment, setInvestment] = useState('10000')
  const [monthlyReturnPct, setMonthlyReturnPct] = useState('2')
  const [months, setMonths] = useState('12')

  const [riskInvestment, setRiskInvestment] = useState('10000')
  const [maxDrawdownPct, setMaxDrawdownPct] = useState('15')
  const [riskLevel, setRiskLevel] = useState('Medium')

  const profitResults = useMemo(() => {
    const inv = parseFloat(investment) || 0
    const r = (parseFloat(monthlyReturnPct) || 0) / 100
    const m = Math.max(0, Math.min(360, Math.floor(parseFloat(months) || 0)))
    if (inv <= 0 || m === 0) return { portfolioValue: 0, totalProfit: 0, growthPct: 0 }
    const portfolioValue = inv * Math.pow(1 + r, m)
    const totalProfit = portfolioValue - inv
    const growthPct = inv > 0 ? (totalProfit / inv) * 100 : 0
    return { portfolioValue, totalProfit, growthPct }
  }, [investment, monthlyReturnPct, months])

  const riskResults = useMemo(() => {
    const inv = parseFloat(riskInvestment) || 0
    const dd = Math.max(0, Math.min(100, parseFloat(maxDrawdownPct) || 0)) / 100
    const worstCaseLoss = inv * dd
    const remainingCapital = inv - worstCaseLoss
    return { worstCaseLoss, remainingCapital }
  }, [riskInvestment, maxDrawdownPct])

  const maxBarPct = useMemo(() => Math.max(...MONTHLY_RETURNS.map((r) => Math.abs(r.returnPct))), [])

  return (
    <>
      <section className={styles.hero}>
        <motion.h1 
          className={styles.heroTitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Copy Trade
        </motion.h1>
        <motion.p 
          className={styles.heroDesc}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Build your portfolio by following proven strategy providers. 
          Every trade is synchronized automatically, allowing you to participate in the markets with confidence.
        </motion.p>
        
      </section>

      {/* ── Official cTrader Copy Trading Widget ────────────────── */}
      <section className={styles.widgetSection} aria-label="Live cTrader Copy Trading">
        <div className={styles.widgetInner}>
          <div className={styles.widgetCard}>
            <div className={styles.widgetCardHeader}>
              <div className={styles.widgetDots}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e', display: 'inline-block' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840', display: 'inline-block' }} />
              </div>
              <span className={styles.widgetCardLabel}>APFX · Live Copy Strategies</span>
            </div>
            <div className={styles.widgetIframeWrap}>
              {!iframeLoaded && (
                <div className={styles.widgetLoader}>
                  <div className={styles.widgetSpinner} />
                  <p className={styles.widgetLoaderText}>Loading live strategies…</p>
                </div>
              )}
              <iframe
                src="https://app.apfxglobal.com/multiple-strategies/?lang=en&theme=dark&u=falmoguera&strategyIdList=106768,95145"
                className={styles.widgetIframe}
                onLoad={() => setIframeLoaded(true)}
                allow="clipboard-read; clipboard-write"
                title="APFX cTrader Copy Trading Strategies"
              />
            </div>
          </div>
        </div>
      </section>

      <div className={styles.container}>
        {/* How it works */}
        <section className={styles.section} aria-labelledby="how-title">
          <h2 id="how-title" className={styles.sectionTitle}>Get Started in 4 Steps</h2>
          <div className={styles.stepsWrap}>
            {STEPS.map((s, idx) => (
              <motion.div 
                key={s.step} 
                className={styles.stepCard}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={styles.stepIcon}><StepIcon Icon={s.icon} /></div>
                <p className={styles.stepNum}>Step {s.step}</p>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepDesc}>{s.description}</p>
              </motion.div>
            ))}
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="https://portal.apfxglobal.com/signup" target="_blank" rel="noopener noreferrer" className={styles.heroCtaSecondary}>
              GO TRADE
            </Link>
          </div>
        </section>



        {/* Flexible Investment Platform */}
        <section className={styles.section} aria-labelledby="benefits-title">
          <h3 style={{ fontSize: '1.2rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem', fontWeight: 400 }}>Invest for Your Success</h3>
          <h2 id="benefits-title" className={styles.sectionTitle} style={{ textAlign: 'left', margin: '0 0 1.5rem 0' }}>A Flexible Investment Platform</h2>
          <div style={{ width: '40px', height: '3px', background: 'var(--color-accent)', marginBottom: '2rem' }} />
          
          <div style={{ maxWidth: '800px' }}>
            <p className={styles.sectionSubtitle} style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
              cTrader Copy is a copy trading solution tailored for commitment-free investing.
            </p>
            <p className={styles.sectionSubtitle} style={{ textAlign: 'left', marginBottom: '2.5rem' }}>
              Any trader can become an investor or strategy provider. *
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '0.2rem' }}>
                  <CheckCircle2 size={24} />
                </div>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', lineHeight: 1.6, margin: 0 }}>
                  Strategy providers can broadcast their trading signals to followers for a performance, management, and volume fee
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '0.2rem' }}>
                  <CheckCircle2 size={24} />
                </div>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', lineHeight: 1.6, margin: 0 }}>
                  Investors can discover strategies and copy them without any long-term commitment
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Who is it for */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Find Your Trading Style</h2>
          <p className={styles.sectionSubtitle}>Tailored solutions for every stage of the trading journey.</p>
          <div className={styles.personaGrid}>
             <div className={styles.personaCard}>
                <div className={styles.personaIcon}><Users size={24} /></div>
                <h3 className={styles.personaTitle}>Beginners</h3>
                <p className={styles.personaDesc}>Accelerate your learning curve by observing and replicating the trade logic of experienced market professionals in real-time.</p>
             </div>
             <div className={styles.personaCard}>
                <div className={styles.personaIcon}><Briefcase size={24} /></div>
                <h3 className={styles.personaTitle}>Busy Professionals</h3>
                <p className={styles.personaDesc}>Access global markets without the time commitment of manual analysis. Let proven systems manage your capital while you focus on your career.</p>
             </div>
             <div className={styles.personaCard}>
                <div className={styles.personaIcon}><Layers size={24} /></div>
                <h3 className={styles.personaTitle}>Advanced Investors</h3>
                <p className={styles.personaDesc}>Diversify your portfolio across multiple asset classes and non-correlated strategies to smooth your returns and reduce systemic risk.</p>
             </div>
          </div>
        </section>

        {/* Risk Disclosure */}
        <section className={styles.riskDisclosureWrapper}>
           <p className={styles.riskDisclosureText}>
              <AlertTriangle size={14} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
              <strong>Institutional Risk Disclosure:</strong> Copy trading involve significant risk to your capital. Performance data presented is historical and not a guarantee of future returns. You should only allocate capital that you can afford to lose. We recommend diversifying across multiple strategy providers to mitigate individual manager risk.
           </p>
        </section>
      </div>

      {/* CTA */}
      <section className={styles.ctaSection} aria-labelledby="cta-title">
        <h2 id="cta-title" className={styles.ctaTitle}>Start Building a Smarter Trading Portfolio</h2>
        <p className={styles.ctaSubtitle}>Experience the power of professional automation with full transparency and control.</p>
        <div className={styles.ctaButtons}>
        </div>
      </section>
    </>
  )
}
