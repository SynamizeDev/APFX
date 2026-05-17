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
import { Shield, Zap, AlertTriangle, Calculator, Globe, TrendingUp, HandCoins } from 'lucide-react'
import Select from '@/components/ui/Select'
import styles from '@/components/ui/CalculatorLayout.module.css'
import rebateStyles from './RebateCalculator.module.css'

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

const REBATE_UNITS = [
    { value: 'pips', label: 'Pips' },
    { value: 'USD', label: 'USD' },
] as const

const CONTRACT_SIZE = 100_000

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

const REBATE_INFO_CARDS: InfoCardDef[] = [
    {
        title: 'How it is Calculated',
        icon: <Calculator size={16} />,
        variant: 'formula',
        body: (
            <>
                If paid in USD, it is simply <strong>Rebate Rate × Lots</strong>. If paid in pips, it is{' '}
                <strong>Rebate Rate (Pips) × Pip Value × Lots</strong>. This provides a clear picture of the net cost
                reduction on every trade entered.
            </>
        ),
    },
    {
        title: 'What This Calculator Does',
        icon: <HandCoins size={16} />,
        variant: 'default',
        body: (
            <>
                It projects the total cashback you can expect from your trading activity. For high-volume traders,
                rebates are not just &quot;extra&quot;—they are a core component of the total return on investment.
            </>
        ),
    },
    {
        title: 'Why It Matters',
        icon: <TrendingUp size={16} />,
        variant: 'default',
        body: (
            <>
                In tight-margin trading environments like scalping, the cost of the spread can eat up to 50% of your
                gains. Rebates return a portion of that cost to you, effectively widening your profit margins.
            </>
        ),
    },
    {
        title: 'Professional Insight',
        icon: <Zap size={16} />,
        variant: 'proTip',
        body: (
            <>
                Institutional &quot;Rebate Arbitrage&quot; involves using high-volume, low-volatility strategies where
                the profit from the rebate itself is the primary target, rather than the price movement of the asset.
            </>
        ),
    },
    {
        title: 'Common Mistake',
        icon: <AlertTriangle size={16} />,
        variant: 'mistake',
        body: (
            <>
                Never sacrifice execution quality for high rebates. A broker offering massive cashback often makes up
                for it with <strong>High Slippage</strong> or <strong>Requotes</strong>, which can cost you more than
                the rebate is worth.
            </>
        ),
    },
]

/** Must match `gap` on `.infoCarouselScroll` in RebateCalculator.module.css */
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

function RebateInfoCarousel() {
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
            REBATE_INFO_CARDS.length - 1,
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
                setCarouselIndex((i) => (i + 1) % REBATE_INFO_CARDS.length)
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
            className={rebateStyles.infoCarouselWrap}
            role="region"
            aria-roledescription="carousel"
            aria-label="Rebate calculator information"
            aria-live="polite"
        >
            <div className={rebateStyles.infoCarouselViewport}>
                <div
                    ref={scrollRef}
                    className={rebateStyles.infoCarouselScroll}
                    tabIndex={0}
                    aria-label="Swipe or scroll horizontally to read each information card"
                    onKeyDown={(e) => {
                        if (e.key === 'ArrowLeft') {
                            e.preventDefault()
                            setCarouselIndex((i) => Math.max(0, i - 1))
                        } else if (e.key === 'ArrowRight') {
                            e.preventDefault()
                            setCarouselIndex((i) =>
                                Math.min(REBATE_INFO_CARDS.length - 1, i + 1),
                            )
                        }
                    }}
                >
                    {REBATE_INFO_CARDS.map((card, i) => (
                        <div
                            key={card.title}
                            className={rebateStyles.infoCarouselSlide}
                            role="group"
                            aria-roledescription="slide"
                            aria-label={`${i + 1} of ${REBATE_INFO_CARDS.length}: ${card.title}`}
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
            <div className={rebateStyles.carouselDots} role="tablist" aria-label="Information slides">
                {REBATE_INFO_CARDS.map((_, i) => (
                    <button
                        key={i}
                        type="button"
                        role="tab"
                        aria-selected={i === carouselIndex}
                        aria-label={`Slide ${i + 1} of ${REBATE_INFO_CARDS.length}`}
                        className={
                            i === carouselIndex ? rebateStyles.carouselDotActive : rebateStyles.carouselDot
                        }
                        onClick={() => setCarouselIndex(i)}
                    />
                ))}
            </div>
        </div>
    )
}

export default function RebateCalculatorPage() {
    const infoLayout = useInfoLayout()

    const [instrument, setInstrument] = useState('EUR/USD')
    const [depositCurrency, setDepositCurrency] = useState('USD')
    const [rebatePerLotRaw, setRebatePerLotRaw] = useState('0')
    const [rebateUnit, setRebateUnit] = useState('pips')
    const rebatePerLot = useMemo(() => {
        const n = parseFloat(rebatePerLotRaw)
        return Number.isNaN(n) || n < 0 ? 0 : n
    }, [rebatePerLotRaw])
    const [lotsTraded, setLotsTraded] = useState(0)

    const pipSize = useMemo(() => (instrument.includes('JPY') ? 0.01 : 0.0001), [instrument])

    const totalRebate = useMemo(() => {
        if (rebateUnit === 'USD') {
            return rebatePerLot * lotsTraded
        }
        const quoteCurrency = instrument.split('/')[1]
        let pipValuePerLot = CONTRACT_SIZE * pipSize
        if (quoteCurrency !== depositCurrency) {
            if (depositCurrency === 'USD') {
                if (quoteCurrency === 'CAD') pipValuePerLot /= mockRates['USD/CAD']
                if (quoteCurrency === 'CHF') pipValuePerLot /= mockRates['USD/CHF']
                if (quoteCurrency === 'JPY') pipValuePerLot /= mockRates['USD/JPY']
            }
        }
        return rebatePerLot * pipValuePerLot * lotsTraded
    }, [instrument, depositCurrency, rebatePerLot, rebateUnit, lotsTraded, pipSize])

    const renderInfoCards = (keyPrefix: string) =>
        REBATE_INFO_CARDS.map((card, i) => (
            <motion.div 
                key={`${keyPrefix}-${card.title}`} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={infoCardClass(card.variant)}
            >
                <h3 className={styles.infoTitle}>
                    {card.icon} {card.title}
                </h3>
                <p className={styles.infoText}>{card.body}</p>
            </motion.div>
        ))

    return (
        <main className={styles.container}>
            <header className={styles.header}>
                <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={styles.title}
                >
                    Rebate Calculator
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className={styles.subtitle}
                >
                    Calculate the total cashback or rebate value earned from your trading volume 
                    with institutional precision and real-time conversion.
                </motion.p>
            </header>

            <div className={styles.inputPanel}>
                <div className={rebateStyles.formGrid}>
                    <div className={styles.formGroup}>
                        <div className={styles.labelWrapper}>
                            <label className={styles.label} htmlFor="rebate-instrument">
                                Instrument
                            </label>
                            <div className={styles.tooltipContainer}>
                                <Globe size={14} />
                                <span className={styles.tooltipText}>
                                    The currency pair you are trading. Rebate values are often volume-based.
                                </span>
                            </div>
                        </div>
                        <div className={styles.inputWrapper}>
                            <Select
                                id="rebate-instrument"
                                value={instrument}
                                onChange={setInstrument}
                                options={INSTRUMENTS.map((p) => ({ value: p, label: p }))}
                                triggerClassName={styles.selectTrigger}
                            />
                            <div className={styles.inputIcon}><Globe size={20} /></div>
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <div className={styles.labelWrapper}>
                            <label className={styles.label} htmlFor="rebate-deposit">
                                Account Currency
                            </label>
                            <div className={styles.tooltipContainer}>
                                <Shield size={14} />
                                <span className={styles.tooltipText}>The currency in which you receive your rebate.</span>
                            </div>
                        </div>
                        <div className={styles.inputWrapper}>
                            <Select
                                id="rebate-deposit"
                                value={depositCurrency}
                                onChange={setDepositCurrency}
                                options={DEPOSIT_CURRENCIES.map((c) => ({
                                    value: c.value,
                                    label: c.label,
                                }))}
                                triggerClassName={styles.selectTrigger}
                            />
                            <div className={styles.inputIcon}><Shield size={20} /></div>
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <div className={styles.labelWrapper}>
                            <label className={styles.label} htmlFor="rebate-rate">Rebate per Lot</label>
                            <div className={styles.tooltipContainer}>
                                <Zap size={14} />
                                <span className={styles.tooltipText}>
                                    The rebate amount paid per standard lot by your broker.
                                </span>
                            </div>
                        </div>
                        <div className={rebateStyles.rebatePerLotRow}>
                            <div className={styles.inputWrapper}>
                                <input
                                    id="rebate-rate"
                                    type="number"
                                    className={styles.input}
                                    value={rebatePerLot}
                                    onChange={(e) => setRebatePerLot(Number(e.target.value) || 0)}
                                    min={0}
                                    step={0.1}
                                />
                                <div className={styles.inputIcon}><Zap size={20} /></div>
                            </div>
                            <div className={rebateStyles.rebateUnit}>
                                {rebateUnit}
                            </div>
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <div className={styles.labelWrapper}>
                            <label className={styles.label} htmlFor="rebate-lots">Lots Traded</label>
                            <div className={styles.tooltipContainer}>
                                <Calculator size={14} />
                                <span className={styles.tooltipText}>
                                    Total trading volume for which you are calculating the rebate.
                                </span>
                            </div>
                        </div>
                        <div className={styles.inputWrapper}>
                            <input
                                id="rebate-lots"
                                type="number"
                                className={styles.input}
                                value={lotsTraded}
                                onChange={(e) => setLotsTraded(Number(e.target.value) || 0)}
                                min={0.01}
                                step={0.01}
                            />
                            <div className={styles.inputIcon}><Calculator size={20} /></div>
                        </div>
                    </div>
                </div>

                <div className={rebateStyles.resultRow}>
                    <div className={styles.resultTitle}>Total Rebate Value</div>

                    {/* High-fidelity background glow */}
                    <div className={rebateStyles.resultGlow} />

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={totalRebate}
                            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                            className={styles.resultValue}
                        >
                            {totalRebate.toLocaleString('en-US', {
                                style: 'currency',
                                currency: depositCurrency,
                            })}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {infoLayout === 'desktop' && (
                    <div className={`${styles.infoSection} ${rebateStyles.infoSectionDesktop}`}>
                        {renderInfoCards('desktop')}
                    </div>
                )}
                {infoLayout === 'phoneStack' && (
                    <div className={`${styles.infoSection} ${rebateStyles.infoSectionPhoneStack}`}>
                        {renderInfoCards('stack')}
                    </div>
                )}
                {infoLayout === 'phoneCarousel' && <RebateInfoCarousel />}
            </div>
        </main>
    )
}
