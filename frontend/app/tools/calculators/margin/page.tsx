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
import { Target, Shield, Zap, AlertTriangle, Calculator, Globe, Scale } from 'lucide-react'
import Select from '@/components/ui/Select'
import styles from '@/components/ui/CalculatorLayout.module.css'
import marginStyles from './MarginCalculator.module.css'

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

const CONTRACT_SIZE = 100_000

const mockRates: Record<string, number> = {
    'EUR/USD': 1.1000,
    'GBP/USD': 1.3000,
    'USD/JPY': 150.0,
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

const MARGIN_INFO_CARDS: InfoCardDef[] = [
    {
        title: 'How it is Calculated',
        icon: <Calculator size={16} />,
        variant: 'formula',
        body: (
            <>
                The required margin is calculated as:{' '}
                <strong>(Contract Size × Lots × Market Price) / Leverage</strong>. This determines the portion of
                your account balance that will be &quot;locked&quot; as a good-faith deposit to hold the position
                open.
            </>
        ),
    },
    {
        title: 'What This Calculator Does',
        icon: <Target size={16} />,
        variant: 'default',
        body: (
            <>
                It provides a precise dollar-value (or base currency value) of the equity required to open a trade.
                In institutional trading, this helps manage <strong>Free Margin</strong>—the amount available to open
                additional positions or withstand drawdown.
            </>
        ),
    },
    {
        title: 'Why It Matters',
        icon: <Shield size={16} />,
        variant: 'default',
        body: (
            <>
                Margin is not a fee; it&apos;s a security deposit. Failing to monitor margin requirements can lead to{' '}
                <strong>Margin Calls</strong>, where the broker automatically liquidates your positions to prevent a
                negative account balance during high volatility.
            </>
        ),
    },
    {
        title: 'Professional Insight',
        icon: <Zap size={16} />,
        variant: 'proTip',
        body: (
            <>
                Institutional risk managers focus on <strong>Used Margin vs. Total Equity</strong>. Professional
                discipline dictates keeping total margin usage below 10-20% of account equity to maintain a
                &quot;safety buffer&quot; for market swings.
            </>
        ),
    },
    {
        title: 'Common Mistake',
        icon: <AlertTriangle size={16} />,
        variant: 'mistake',
        body: (
            <>
                A common trap is assuming that having enough margin to open a trade means you have enough to keep it
                open. If the price moves against you, your <strong>Free Margin</strong> drops, potentially
                triggering a liquidation even if the trade eventually recovers.
            </>
        ),
    },
]

/** Must match `gap` on `.infoCarouselScroll` in MarginCalculator.module.css */
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

function MarginInfoCarousel() {
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
            MARGIN_INFO_CARDS.length - 1,
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
                setCarouselIndex((i) => (i + 1) % MARGIN_INFO_CARDS.length)
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
            className={marginStyles.infoCarouselWrap}
            role="region"
            aria-roledescription="carousel"
            aria-label="Margin calculator information"
            aria-live="polite"
        >
            <div className={marginStyles.infoCarouselViewport}>
                <div
                    ref={scrollRef}
                    className={marginStyles.infoCarouselScroll}
                    tabIndex={0}
                    aria-label="Swipe or scroll horizontally to read each information card"
                    onKeyDown={(e) => {
                        if (e.key === 'ArrowLeft') {
                            e.preventDefault()
                            setCarouselIndex((i) => Math.max(0, i - 1))
                        } else if (e.key === 'ArrowRight') {
                            e.preventDefault()
                            setCarouselIndex((i) =>
                                Math.min(MARGIN_INFO_CARDS.length - 1, i + 1),
                            )
                        }
                    }}
                >
                    {MARGIN_INFO_CARDS.map((card, i) => (
                        <div
                            key={card.title}
                            className={marginStyles.infoCarouselSlide}
                            role="group"
                            aria-roledescription="slide"
                            aria-label={`${i + 1} of ${MARGIN_INFO_CARDS.length}: ${card.title}`}
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
            <div className={marginStyles.carouselDots} role="tablist" aria-label="Information slides">
                {MARGIN_INFO_CARDS.map((_, i) => (
                    <button
                        key={i}
                        type="button"
                        role="tab"
                        aria-selected={i === carouselIndex}
                        aria-label={`Slide ${i + 1} of ${MARGIN_INFO_CARDS.length}`}
                        className={
                            i === carouselIndex ? marginStyles.carouselDotActive : marginStyles.carouselDot
                        }
                        onClick={() => setCarouselIndex(i)}
                    />
                ))}
            </div>
        </div>
    )
}

export default function MarginCalculatorPage() {
    const infoLayout = useInfoLayout()

    const [instrument, setInstrument] = useState('EUR/USD')
    const [depositCurrency, setDepositCurrency] = useState('USD')
    const [leverage, setLeverage] = useState(100)
    const [lots, setLots] = useState(1)
    const [price, setPrice] = useState(1.14152)

    useEffect(() => {
        const rate = mockRates[instrument]
        if (rate != null) setPrice(rate)
    }, [instrument])

    const marginRequired = useMemo(() => {
        const quoteCurrency = instrument.split('/')[1]
        const notionalInQuote = CONTRACT_SIZE * lots * price
        let marginInQuote = notionalInQuote / leverage

        if (quoteCurrency !== depositCurrency) {
            const conversionPair = `${quoteCurrency}/${depositCurrency}`
            const inversePair = `${depositCurrency}/${quoteCurrency}`
            if (mockRates[conversionPair]) {
                marginInQuote *= mockRates[conversionPair]
            } else if (mockRates[inversePair]) {
                marginInQuote /= mockRates[inversePair]
            } else if (depositCurrency === 'USD') {
                if (quoteCurrency === 'CAD') marginInQuote /= mockRates['USD/CAD']
                if (quoteCurrency === 'CHF') marginInQuote /= mockRates['USD/CHF']
                if (quoteCurrency === 'JPY') marginInQuote /= mockRates['USD/JPY']
            }
        }
        return marginInQuote
    }, [instrument, depositCurrency, leverage, lots, price])

    const renderInfoCards = (keyPrefix: string) =>
        MARGIN_INFO_CARDS.map((card) => (
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
                <h1 className={styles.title}>Professional Margin Calculator</h1>
                <p className={styles.subtitle}>
                    Calculate the exact collateral (margin) required to open and maintain trading positions. Essential
                    for managing account equity and understanding the impact of leverage on your trading capital.
                </p>
            </header>

            <div className={styles.inputPanel}>
                <div className={marginStyles.formGrid}>
                    <div className={styles.formGroup}>
                        <div className={styles.labelWrapper}>
                            <label className={styles.label} htmlFor="margin-instrument">
                                Instrument
                            </label>
                            <div className={styles.tooltipContainer}>
                                <Globe size={14} />
                                <span className={styles.tooltipText}>
                                    The currency pair you intend to trade. Notional value is calculated based on current
                                    market price.
                                </span>
                            </div>
                        </div>
                        <Select
                            id="margin-instrument"
                            value={instrument}
                            onChange={setInstrument}
                            options={INSTRUMENTS.map((p) => ({ value: p, label: p }))}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <div className={styles.labelWrapper}>
                            <label className={styles.label} htmlFor="margin-deposit">
                                Account Currency
                            </label>
                            <div className={styles.tooltipContainer}>
                                <Shield size={14} />
                                <span className={styles.tooltipText}>
                                    The base currency of your account for the margin requirement calculation.
                                </span>
                            </div>
                        </div>
                        <Select
                            id="margin-deposit"
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
                            <label className={styles.label} htmlFor="margin-leverage">
                                Leverage Ratio
                            </label>
                            <div className={styles.tooltipContainer}>
                                <Scale size={14} />
                                <span className={styles.tooltipText}>
                                    The leverage provided by the broker (e.g., 100 means you need 1% margin). 100:1 is
                                    common for institutional setup.
                                </span>
                            </div>
                        </div>
                        <input
                            id="margin-leverage"
                            type="number"
                            className={styles.input}
                            value={leverage}
                            onChange={(e) => {
                                const n = parseInt(e.target.value, 10)
                                if (!Number.isNaN(n) && n >= 1) setLeverage(n)
                            }}
                            min={1}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <div className={styles.labelWrapper}>
                            <label className={styles.label} htmlFor="margin-lots">
                                Lots (Trade Size)
                            </label>
                            <div className={styles.tooltipContainer}>
                                <Zap size={14} />
                                <span className={styles.tooltipText}>
                                    1 standard lot = 100,000 units. Size significantly impacts required margin.
                                </span>
                            </div>
                        </div>
                        <input
                            id="margin-lots"
                            type="number"
                            className={styles.input}
                            value={lots}
                            onChange={(e) => setLots(Number(e.target.value) || 0)}
                            min={0.01}
                            step={0.01}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <div className={styles.labelWrapper}>
                            <label className={styles.label} htmlFor="margin-price">
                                Current Price
                            </label>
                            <div className={styles.tooltipContainer}>
                                <Target size={14} />
                                <span className={styles.tooltipText}>
                                    The current exchange rate of the instrument. Changes in price affect notional value
                                    and margin.
                                </span>
                            </div>
                        </div>
                        <input
                            id="margin-price"
                            type="number"
                            className={styles.input}
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value) || 0)}
                            min={0}
                            step={0.00001}
                        />
                    </div>
                </div>

                <div className={marginStyles.resultRow}>
                    <div className={styles.resultTitle}>Required Margin (Collateral)</div>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={marginRequired}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={styles.resultValue}
                        >
                            {marginRequired.toLocaleString('en-US', {
                                style: 'currency',
                                currency: depositCurrency,
                            })}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {infoLayout === 'desktop' && (
                    <div className={`${styles.infoSection} ${marginStyles.infoSectionDesktop}`}>
                        {renderInfoCards('desktop')}
                    </div>
                )}
                {infoLayout === 'phoneStack' && (
                    <div className={`${styles.infoSection} ${marginStyles.infoSectionPhoneStack}`}>
                        {renderInfoCards('stack')}
                    </div>
                )}
                {infoLayout === 'phoneCarousel' && <MarginInfoCarousel />}
            </div>
        </main>
    )
}
