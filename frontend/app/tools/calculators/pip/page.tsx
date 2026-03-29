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
import { Info, Target, Shield, Zap, AlertTriangle, Calculator, Globe } from 'lucide-react'
import Select from '@/components/ui/Select'
import styles from '@/components/ui/CalculatorLayout.module.css'
import pipStyles from './PipCalculator.module.css'

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

const UNITS_PER_LOT = 100_000

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

const INFO_CARDS: InfoCardDef[] = [
    {
        title: 'How it is Calculated',
        icon: <Calculator size={16} />,
        variant: 'formula',
        body: (
            <>
                The pip value is derived by multiplying the <strong>Pip Size</strong> (usually 0.0001 or 0.01 for
                JPY) by the <strong>Trade Volume</strong> (Lots × 100,000). If your account is in a different
                currency than the pair&apos;s quote currency, an additional conversion rate is applied for
                institutional accuracy.
            </>
        ),
    },
    {
        title: 'What This Calculator Does',
        icon: <Target size={16} />,
        variant: 'default',
        body: (
            <>
                It translates abstract &quot;pips&quot; into actual currency. In the institutional world, traders
                use this to understand exactly how much equity is at risk per unit of price movement before
                committing capital.
            </>
        ),
    },
    {
        title: 'Why It Matters',
        icon: <Shield size={16} />,
        variant: 'default',
        body: (
            <>
                Without knowing your pip value, you cannot set an intelligent stop-loss. This tool ensures your
                risk-per-trade remains within your 1-2% comfort zone, protecting your principal capital from
                unexpected volatility.
            </>
        ),
    },
    {
        title: 'Professional Insight',
        icon: <Zap size={16} />,
        variant: 'proTip',
        body: (
            <>
                Institutional traders normalize risk by adjusting position sizes based on variable pip values.
                This ensures that a 20-pip stop on GBP/USD has the same financial weight as a 20-pip stop on
                EUR/GBP.
            </>
        ),
    },
    {
        title: 'Common Mistake',
        icon: <AlertTriangle size={16} />,
        variant: 'mistake',
        body: (
            <>
                Many traders assume a pip is always worth $10 per standard lot. However, for non-USD quote pairs
                (like EUR/GBP), the value varies significantly based on current exchange rates.
            </>
        ),
    },
]

/** Must match `gap` on `.infoCarouselScroll` in PipCalculator.module.css */
const INFO_CAROUSEL_GAP_PX = 12
const INFO_SLIDE_MS = 5500
const PHONE_MAX_PX = 768

function infoCardClass(variant: InfoVariant) {
    const base = styles.infoCard
    if (variant === 'formula') return `${base} ${styles.formulaCard}`
    if (variant === 'proTip') return `${base} ${styles.proTipCard}`
    if (variant === 'mistake') return `${base} ${styles.mistakeCard}`
    return base
}

export default function PipCalculatorPage() {
    const [pips, setPips] = useState(1)
    const [lots, setLots] = useState(1)
    const [instrument, setInstrument] = useState('EUR/USD')
    const [depositCurrency, setDepositCurrency] = useState('USD')
    const [carouselIndex, setCarouselIndex] = useState(0)
    const infoCarouselScrollRef = useRef<HTMLDivElement>(null)
    const carouselIndexRef = useRef(0)
    const scrollSyncTimerRef = useRef<number | undefined>(undefined)

    carouselIndexRef.current = carouselIndex

    const scrollStep = useCallback((el: HTMLDivElement) => el.clientWidth + INFO_CAROUSEL_GAP_PX, [])

    const syncIndexFromScroll = useCallback(() => {
        const el = infoCarouselScrollRef.current
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
        const el = infoCarouselScrollRef.current
        if (!el) return
        const step = scrollStep(el)
        if (step <= INFO_CAROUSEL_GAP_PX) return
        const target = carouselIndex * step
        if (Math.abs(el.scrollLeft - target) < 8) return
        el.scrollTo({ left: target, behavior: 'smooth' })
    }, [carouselIndex, scrollStep])

    useEffect(() => {
        const el = infoCarouselScrollRef.current
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
        const el = infoCarouselScrollRef.current
        if (!el) return

        const applySize = () => {
            const w = el.clientWidth
            if (!w) return
            el.style.setProperty('--slide-width', `${w}px`)
            el.style.setProperty('--info-carousel-gap', `${INFO_CAROUSEL_GAP_PX}px`)
            const step = w + INFO_CAROUSEL_GAP_PX
            el.scrollTo({ left: carouselIndexRef.current * step, behavior: 'auto' })
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

    const pipSize = useMemo(() => {
        return instrument.includes('JPY') ? 0.01 : 0.0001
    }, [instrument])

    const pipValue = useMemo(() => {
        const quoteCurrency = instrument.split('/')[1]
        const units = lots * UNITS_PER_LOT
        let valueInQuote = pipSize * pips * units

        if (quoteCurrency !== depositCurrency) {
            const conversionPair = `${quoteCurrency}/${depositCurrency}`
            const inversePair = `${depositCurrency}/${quoteCurrency}`
            if (mockRates[conversionPair]) {
                valueInQuote *= mockRates[conversionPair]
            } else if (mockRates[inversePair]) {
                valueInQuote /= mockRates[inversePair]
            } else if (depositCurrency === 'USD') {
                if (quoteCurrency === 'CAD') valueInQuote /= mockRates['USD/CAD']
                if (quoteCurrency === 'CHF') valueInQuote /= mockRates['USD/CHF']
                if (quoteCurrency === 'JPY') valueInQuote /= mockRates['USD/JPY']
            }
        }
        return valueInQuote
    }, [pipSize, pips, lots, instrument, depositCurrency])

    return (
        <main className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Professional Pip Value Calculator</h1>
                <p className={styles.subtitle}>
                    Accurately determine the precise value of a single pip for your specific 
                    trade size and currency pair. Essential for calculating risk exposure 
                    and managing position sizing with institutional precision.
                </p>
            </header>

            <div className={styles.inputPanel}>
                <div className={pipStyles.formGrid}>
                    <div className={styles.formGroup}>
                        <div className={styles.labelWrapper}>
                            <label className={styles.label} htmlFor="pip-pips">Pips</label>
                            <div className={styles.tooltipContainer}>
                                <Info size={14} />
                                <span className={styles.tooltipText}>The number of pips you want to calculate the value for. Usually 1 for base calculations.</span>
                            </div>
                        </div>
                        <input
                            id="pip-pips"
                            type="number"
                            className={styles.input}
                            value={pips}
                            onChange={(e) => setPips(Number(e.target.value) || 0)}
                            min={0}
                            step={1}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <div className={styles.labelWrapper}>
                            <label className={styles.label} htmlFor="pip-instrument">Instrument</label>
                            <div className={styles.tooltipContainer}>
                                <Globe size={14} />
                                <span className={styles.tooltipText}>The currency pair you are trading. Pip size varies between standard pairs (4 digits) and JPY pairs (2 digits).</span>
                            </div>
                        </div>
                        <Select
                            id="pip-instrument"
                            value={instrument}
                            onChange={setInstrument}
                            options={INSTRUMENTS.map((p) => ({ value: p, label: p }))}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <div className={styles.labelWrapper}>
                            <label className={styles.label} htmlFor="pip-lots">Lots (trade size)</label>
                            <div className={styles.tooltipContainer}>
                                <Zap size={14} />
                                <span className={styles.tooltipText}>Your trade volume. 1 standard lot = 100,000 units of the base currency.</span>
                            </div>
                        </div>
                        <input
                            id="pip-lots"
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
                            <label className={styles.label} htmlFor="pip-deposit">Account Currency</label>
                            <div className={styles.tooltipContainer}>
                                <Shield size={14} />
                                <span className={styles.tooltipText}>The base currency of your trading account for the final calculation.</span>
                            </div>
                        </div>
                        <Select
                            id="pip-deposit"
                            value={depositCurrency}
                            onChange={setDepositCurrency}
                            options={DEPOSIT_CURRENCIES.map((c) => ({ value: c.value, label: c.label }))}
                        />
                    </div>
                </div>

                <div className={pipStyles.readOnlyRow}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            Current {instrument} Pip Step Size
                        </label>
                        <input
                            type="text"
                            className={pipStyles.readOnlyField}
                            value={pipSize}
                            readOnly
                        />
                    </div>
                </div>

                <div className={pipStyles.resultRow}>
                    <div className={styles.resultTitle}>Total Pip Value</div>
                    <AnimatePresence mode="wait">
                        <motion.div 
                            key={pipValue}
                            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            className={styles.resultValue}
                        >
                            {pipValue.toLocaleString('en-US', {
                                style: 'currency',
                                currency: depositCurrency,
                            })}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className={`${styles.infoSection} ${pipStyles.infoSectionDesktop}`}>
                    {INFO_CARDS.map((card) => (
                        <div key={card.title} className={infoCardClass(card.variant)}>
                            <h3 className={styles.infoTitle}>
                                {card.icon} {card.title}
                            </h3>
                            <p className={styles.infoText}>{card.body}</p>
                        </div>
                    ))}
                </div>

                <div className={`${pipStyles.infoSectionPhoneReduced} ${styles.infoSection}`}>
                    {INFO_CARDS.map((card) => (
                        <div key={`stack-${card.title}`} className={infoCardClass(card.variant)}>
                            <h3 className={styles.infoTitle}>
                                {card.icon} {card.title}
                            </h3>
                            <p className={styles.infoText}>{card.body}</p>
                        </div>
                    ))}
                </div>

                <div
                    className={pipStyles.infoCarouselWrap}
                    role="region"
                    aria-roledescription="carousel"
                    aria-label="Calculator information"
                    aria-live="polite"
                >
                    <div className={pipStyles.infoCarouselViewport}>
                        <div
                            ref={infoCarouselScrollRef}
                            className={pipStyles.infoCarouselScroll}
                            tabIndex={0}
                            aria-label="Swipe or scroll horizontally to read each information card"
                            onKeyDown={(e) => {
                                if (e.key === 'ArrowLeft') {
                                    e.preventDefault()
                                    setCarouselIndex((i) => Math.max(0, i - 1))
                                } else if (e.key === 'ArrowRight') {
                                    e.preventDefault()
                                    setCarouselIndex((i) =>
                                        Math.min(INFO_CARDS.length - 1, i + 1),
                                    )
                                }
                            }}
                        >
                            {INFO_CARDS.map((card, i) => (
                                <div
                                    key={card.title}
                                    className={pipStyles.infoCarouselSlide}
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
                    <div className={pipStyles.carouselDots} role="tablist" aria-label="Information slides">
                        {INFO_CARDS.map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                role="tab"
                                aria-selected={i === carouselIndex}
                                aria-label={`Slide ${i + 1} of ${INFO_CARDS.length}`}
                                className={
                                    i === carouselIndex ? pipStyles.carouselDotActive : pipStyles.carouselDot
                                }
                                onClick={() => setCarouselIndex(i)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}
