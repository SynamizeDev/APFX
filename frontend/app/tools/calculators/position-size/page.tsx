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
import { Target, Shield, Zap, AlertTriangle, Calculator, Globe, Scale, TrendingDown } from 'lucide-react'
import Select from '@/components/ui/Select'
import styles from '@/components/ui/CalculatorLayout.module.css'
import posStyles from './PositionSizeCalculator.module.css'

const INSTRUMENTS = [
    'EUR/USD',
    'GBP/USD',
    'USD/JPY',
    'USD/CHF',
    'AUD/USD',
    'USD/CAD',
] as const

const DEPOSIT_CURRENCIES = [
    { value: 'USD', label: 'US Dollar' },
    { value: 'EUR', label: 'Euro' },
    { value: 'GBP', label: 'British Pound' },
    { value: 'AUD', label: 'Australian Dollar' },
] as const

const mockRates: Record<string, number> = {
    'EUR/USD': 1.1,
    'GBP/USD': 1.3,
    'USD/JPY': 150,
    'USD/CHF': 0.88,
    'AUD/USD': 0.66,
    'USD/CAD': 1.36,
}

type InfoVariant = 'formula' | 'default' | 'proTip' | 'mistake'

type InfoCardDef = {
    title: string
    icon: ReactNode
    variant: InfoVariant
    body: ReactNode
}

const POS_INFO_CARDS: InfoCardDef[] = [
    {
        title: 'How it is Calculated',
        icon: <Calculator size={16} />,
        variant: 'formula',
        body: (
            <>
                The formula is:{' '}
                <strong>Risk Amount (Balance × Risk %) / (Stop Loss × Pip Value per Unit)</strong>. This determines
                the exact mass of your trade so that your predetermined risk is never exceeded, regardless of the
                pair&apos;s volatility.
            </>
        ),
    },
    {
        title: 'What This Calculator Does',
        icon: <Target size={16} />,
        variant: 'default',
        body: (
            <>
                It provides the specific lot size required to turn your <strong>Risk Preference (%)</strong> into a
                physical trade. It ensures that if your stop-loss is hit, your loss is exactly what you
                planned—nothing more, nothing less.
            </>
        ),
    },
    {
        title: 'Why It Matters',
        icon: <Shield size={16} />,
        variant: 'default',
        body: (
            <>
                Capital preservation is the only goal in institutional trading. By mathematically calculating
                position size, you prevent <strong>Over-Leverage</strong> and the emotional stress that comes with
                large, unplanned losses.
            </>
        ),
    },
    {
        title: 'Professional Insight',
        icon: <Zap size={16} />,
        variant: 'proTip',
        body: (
            <>
                Pro traders don&apos;t trade &quot;lots&quot;—they trade &quot;risk units&quot;. If you risk 1% per
                trade, you have 100 &quot;bullets&quot; in your account. Even a losing streak of 10 trades only draws
                your account down by ~10%, making recovery fast and emotional impact low.
            </>
        ),
    },
    {
        title: 'Common Mistake',
        icon: <AlertTriangle size={16} />,
        variant: 'mistake',
        body: (
            <>
                A major error is using a fixed lot size (e.g., always 1.0 lot) for every pair. Because pip values and
                average ranges differ between EUR/USD and GBP/JPY, a fixed lot size means your actual money at risk
                changes unpredictably with each trade.
            </>
        ),
    },
]

/** Must match `gap` on `.infoCarouselScroll` in PositionSizeCalculator.module.css */
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

function infoCardClass(variant: InfoVariant) {
    const base = styles.infoCard
    if (variant === 'formula') return `${base} ${styles.formulaCard}`
    if (variant === 'proTip') return `${base} ${styles.proTipCard}`
    if (variant === 'mistake') return `${base} ${styles.mistakeCard}`
    return base
}

function PositionInfoCarousel() {
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
            POS_INFO_CARDS.length - 1,
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
                setCarouselIndex((i) => (i + 1) % POS_INFO_CARDS.length)
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
            className={posStyles.infoCarouselWrap}
            role="region"
            aria-roledescription="carousel"
            aria-label="Position size calculator information"
            aria-live="polite"
        >
            <div className={posStyles.infoCarouselViewport}>
                <div
                    ref={scrollRef}
                    className={posStyles.infoCarouselScroll}
                    tabIndex={0}
                    aria-label="Swipe or scroll horizontally to read each information card"
                    onKeyDown={(e) => {
                        if (e.key === 'ArrowLeft') {
                            e.preventDefault()
                            setCarouselIndex((i) => Math.max(0, i - 1))
                        } else if (e.key === 'ArrowRight') {
                            e.preventDefault()
                            setCarouselIndex((i) =>
                                Math.min(POS_INFO_CARDS.length - 1, i + 1),
                            )
                        }
                    }}
                >
                    {POS_INFO_CARDS.map((card, i) => (
                        <div
                            key={card.title}
                            className={posStyles.infoCarouselSlide}
                            role="group"
                            aria-roledescription="slide"
                            aria-label={`${i + 1} of ${POS_INFO_CARDS.length}: ${card.title}`}
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
            <div className={posStyles.carouselDots} role="tablist" aria-label="Information slides">
                {POS_INFO_CARDS.map((_, i) => (
                    <button
                        key={i}
                        type="button"
                        role="tab"
                        aria-selected={i === carouselIndex}
                        aria-label={`Slide ${i + 1} of ${POS_INFO_CARDS.length}`}
                        className={
                            i === carouselIndex ? posStyles.carouselDotActive : posStyles.carouselDot
                        }
                        onClick={() => setCarouselIndex(i)}
                    />
                ))}
            </div>
        </div>
    )
}

export default function PositionSizeCalculatorPage() {
    const infoLayout = useInfoLayout()

    const [instrument, setInstrument] = useState('EUR/USD')
    const [depositCurrency, setDepositCurrency] = useState('USD')
    const [stopLossPips, setStopLossPips] = useState(200)
    const [accountBalance, setAccountBalance] = useState(100000)
    const [riskPercent, setRiskPercent] = useState(2)
    const [contractSize, setContractSize] = useState(100000)

    const pipSize = useMemo(() => (instrument.includes('JPY') ? 0.01 : 0.0001), [instrument])

    const { riskAmount, units, lots } = useMemo(() => {
        const riskAmount = accountBalance * (riskPercent / 100)
        const quoteCurrency = instrument.split('/')[1]
        let pipValuePerLot = contractSize * pipSize

        if (quoteCurrency !== depositCurrency) {
            if (depositCurrency === 'USD') {
                if (quoteCurrency === 'CAD') pipValuePerLot /= mockRates['USD/CAD']
                if (quoteCurrency === 'CHF') pipValuePerLot /= mockRates['USD/CHF']
                if (quoteCurrency === 'JPY') pipValuePerLot /= mockRates['USD/JPY']
            }
        }

        const pipValuePerUnit = pipValuePerLot / contractSize
        const unitsCalculated =
            stopLossPips > 0 ? riskAmount / (stopLossPips * pipValuePerUnit) : 0
        const lotsCalculated = contractSize > 0 ? unitsCalculated / contractSize : 0

        return {
            riskAmount,
            units: Math.round(unitsCalculated),
            lots: Number(lotsCalculated.toFixed(2)),
        }
    }, [
        accountBalance,
        riskPercent,
        stopLossPips,
        instrument,
        depositCurrency,
        pipSize,
        contractSize,
    ])

    const renderInfoCards = (keyPrefix: string) =>
        POS_INFO_CARDS.map((card) => (
            <div key={`${keyPrefix}-${card.title}`} className={infoCardClass(card.variant)}>
                <h3 className={styles.infoTitle}>
                    {card.icon} {card.title}
                </h3>
                <p className={styles.infoText}>{card.body}</p>
            </div>
        ))

    return (
        <main className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Professional Position Size Calculator</h1>
                <p className={styles.subtitle}>
                    Determine the exact lot size for your trade based on your risk tolerance and stop-loss distance. The
                    single most important tool for institutional-grade capital preservation and longevity.
                </p>
            </header>

            <div className={styles.inputPanel}>
                <div className={posStyles.formGrid}>
                    <div className={styles.formGroup}>
                        <div className={styles.labelWrapper}>
                            <label className={styles.label} htmlFor="pos-instrument">
                                Instrument
                            </label>
                            <div className={styles.tooltipContainer}>
                                <Globe size={14} />
                                <span className={styles.tooltipText}>
                                    The currency pair you are trading. Pip value varies per pair.
                                </span>
                            </div>
                        </div>
                        <Select
                            id="pos-instrument"
                            value={instrument}
                            onChange={setInstrument}
                            options={INSTRUMENTS.map((p) => ({ value: p, label: p }))}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <div className={styles.labelWrapper}>
                            <label className={styles.label} htmlFor="pos-deposit">
                                Account Currency
                            </label>
                            <div className={styles.tooltipContainer}>
                                <Shield size={14} />
                                <span className={styles.tooltipText}>The base currency of your trading account.</span>
                            </div>
                        </div>
                        <Select
                            id="pos-deposit"
                            value={depositCurrency}
                            onChange={setDepositCurrency}
                            options={DEPOSIT_CURRENCIES.map((c) => ({
                                value: c.value,
                                label: c.label,
                            }))}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <div className={styles.labelWrapper}>
                            <label className={styles.label} htmlFor="pos-stoploss">
                                Stop Loss (Pips)
                            </label>
                            <div className={styles.tooltipContainer}>
                                <Target size={14} />
                                <span className={styles.tooltipText}>
                                    The distance in pips to your exit point if the trade goes against you.
                                </span>
                            </div>
                        </div>
                        <input
                            id="pos-stoploss"
                            type="number"
                            className={styles.input}
                            value={stopLossPips}
                            onChange={(e) => setStopLossPips(Number(e.target.value) || 0)}
                            min={1}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <div className={styles.labelWrapper}>
                            <label className={styles.label}>Account Balance</label>
                            <div className={styles.tooltipContainer}>
                                <Scale size={14} />
                                <span className={styles.tooltipText}>
                                    Your total account equity (capital) used for risk % calculation.
                                </span>
                            </div>
                        </div>
                        <input
                            type="number"
                            className={styles.input}
                            value={accountBalance}
                            onChange={(e) => setAccountBalance(Number(e.target.value) || 0)}
                            min={0}
                            step={100}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <div className={styles.labelWrapper}>
                            <label className={styles.label}>Risk Preference (%)</label>
                            <div className={styles.tooltipContainer}>
                                <TrendingDown size={14} />
                                <span className={styles.tooltipText}>
                                    The percentage of your total balance you are willing to lose on this single trade.
                                    Best practice is 1-2%.
                                </span>
                            </div>
                        </div>
                        <div className={posStyles.riskRow}>
                            <input
                                type="number"
                                className={`${styles.input} ${posStyles.riskInput}`}
                                value={riskPercent}
                                onChange={(e) => setRiskPercent(Number(e.target.value) || 0)}
                                min={0.1}
                                step={0.1}
                                max={100}
                            />
                            <span className={posStyles.riskUnit}>%</span>
                        </div>
                    </div>
                </div>

                <div className={posStyles.resultRow}>
                    <div className={posStyles.resultGrid}>
                        <div className={posStyles.resultItem}>
                            <motion.span
                                key={lots}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={posStyles.resultItemValue}
                            >
                                {lots}
                            </motion.span>
                            <span className={posStyles.resultItemLabel}>Lots (Trade Size)</span>
                        </div>
                        <div className={posStyles.resultItem}>
                            <motion.span
                                key={units}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={posStyles.resultItemValue}
                            >
                                {units.toLocaleString()}
                            </motion.span>
                            <span className={posStyles.resultItemLabel}>Total Units</span>
                        </div>
                        <div className={`${posStyles.resultItem} ${posStyles.resultItemHighlight}`}>
                            <motion.span
                                key={riskAmount}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={`${posStyles.resultItemValue} ${posStyles.highlight}`}
                            >
                                {riskAmount.toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: depositCurrency,
                                })}
                            </motion.span>
                            <span className={posStyles.resultItemLabel}>Fixed Money At Risk</span>
                        </div>
                    </div>
                </div>

                {infoLayout === 'desktop' && (
                    <div className={`${styles.infoSection} ${posStyles.infoSectionDesktop}`}>
                        {renderInfoCards('desktop')}
                    </div>
                )}
                {infoLayout === 'phoneStack' && (
                    <div className={`${styles.infoSection} ${posStyles.infoSectionPhoneStack}`}>
                        {renderInfoCards('stack')}
                    </div>
                )}
                {infoLayout === 'phoneCarousel' && <PositionInfoCarousel />}
            </div>
        </main>
    )
}
