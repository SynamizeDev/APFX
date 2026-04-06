'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { fetchMarketData, MarketQuote } from '@/services/marketData'
import styles from './MarketsSection.module.css'

const PORTAL_REGISTER_URL = 'https://portal.apfx.com/register'

/* ── Category Data ─────────────────────────────────────────── */
const CATEGORIES = [
    {
        id: 'commodities',
        name: 'Commodities',
        desc: 'Speculate on market moves in gold, crude oil, silver, and more.',
        href: '/trade&invest/commodities',
        gradient: 'linear-gradient(135deg, #444 0%, #111 100%)',
        shadow: 'rgba(255, 255, 255, 0.05)',
        emoji: '🛢️',
    },
    {
        id: 'indices',
        name: 'Indices',
        desc: 'Trade leading global indices like the S&P 500, NASDAQ, and FTSE 100.',
        href: '/trade&invest/indices',
        gradient: 'linear-gradient(135deg, #c9a84c 0%, #9a7b30 100%)',
        shadow: 'rgba(201, 168, 76, 0.15)',
        emoji: '📈',
    },
    {
        id: 'stocks',
        name: 'Stock CFDs',
        desc: 'Trade global stocks with leverage and profit from price movements.',
        href: '/trade&invest/stocks',
        gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
        shadow: 'rgba(59, 130, 246, 0.15)',
        emoji: '🍎',
    },
    {
        id: 'crypto',
        name: 'Cryptocurrencies',
        desc: 'Trade major crypto pairs with deep liquidity and transparent pricing.',
        href: '/trade&invest/cryptocurrencies',
        gradient: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
        shadow: 'rgba(99, 102, 241, 0.2)',
        emoji: '₿',
    },
    {
        id: 'futures',
        name: 'Futures',
        desc: 'Access global markets with flexible, low-cost futures trading.',
        href: '/trade&invest/futures',
        gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        shadow: 'rgba(16, 185, 129, 0.15)',
        emoji: '🌐',
    },
]

/* ── Placeholder instruments per category ──────────────────── */
type Instrument = {
    symbol: string
    code: string
    bid: string
    high: string
    low: string
    change: string
    changePositive: boolean
    trend: number[]
}

const Sparkline = ({ data, positive }: { data: number[], positive: boolean }) => {
    const min = Math.min(...data)
    const max = Math.max(...data)
    const range = max - min || 1
    const width = 100
    const height = 30

    const points = data.map((val, i) => {
        const x = (i / (data.length - 1)) * width
        const y = height - ((val - min) / range) * height
        return { x, y }
    })

    const linePath = points.map(p => `${p.x},${p.y}`).join(' ')
    const areaPath = `M 0,${height} ${linePath} L ${width},${height} Z`
    const color = positive ? '#00c896' : '#ff4757'
    const gradId = `sparkline-grad-${Math.random().toString(36).substring(2, 9)}`

    return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={styles.sparkline}>
            <defs>
                <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity="0.25" />
                    <stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>
            </defs>
            <path d={areaPath} fill={`url(#${gradId})`} />
            <polyline
                fill="none"
                stroke={color}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={linePath}
            />
        </svg>
    )
}

const INSTRUMENTS: Record<string, Instrument[]> = {
    commodities: [
        { symbol: 'XAU/USD', code: 'Gold', bid: '2341.50', high: '2365.00', low: '2320.00', change: '+0.45%', changePositive: true, trend: [10, 15, 12, 18, 20, 22, 25, 28, 30] },
        { symbol: 'XAG/USD', code: 'Silver', bid: '29.48', high: '30.12', low: '28.90', change: '+0.32%', changePositive: true, trend: [15, 12, 18, 14, 20, 22, 20, 25, 28] },
        { symbol: 'WTI Oil', code: 'WTI Crude', bid: '78.24', high: '79.50', low: '77.10', change: '-0.18%', changePositive: false, trend: [25, 22, 20, 18, 15, 12, 14, 10, 8] },
        { symbol: 'Brent Oil', code: 'Brent Crude', bid: '82.67', high: '83.80', low: '81.40', change: '-0.12%', changePositive: false, trend: [22, 20, 18, 15, 12, 14, 10, 12, 9] },
        { symbol: 'Natural Gas', code: 'Nat Gas', bid: '2.89', high: '3.01', low: '2.78', change: '+1.24%', changePositive: true, trend: [10, 12, 15, 12, 18, 20, 25, 30, 35] },
        { symbol: 'Copper', code: 'Copper', bid: '4.35', high: '4.42', low: '4.28', change: '+0.08%', changePositive: true, trend: [18, 16, 20, 18, 22, 20, 24, 22, 25] },
    ],
    crypto: [
        { symbol: 'BTC/USD', code: 'Bitcoin', bid: '63120', high: '64000', low: '62000', change: '+1.80%', changePositive: true, trend: [25, 28, 25, 30, 35, 32, 38, 40, 45] },
        { symbol: 'ETH/USD', code: 'Ethereum', bid: '3450', high: '3500', low: '3400', change: '+2.10%', changePositive: true, trend: [20, 22, 20, 25, 28, 25, 30, 32, 35] },
        { symbol: 'BNB/USD', code: 'Binance Coin', bid: '580', high: '590', low: '570', change: '+0.50%', changePositive: true, trend: [15, 18, 22, 20, 25, 28, 30, 32, 35] },
        { symbol: 'SOL/USD', code: 'Solana', bid: '145', high: '150', low: '140', change: '-1.20%', changePositive: false, trend: [35, 32, 30, 25, 28, 20, 15, 18, 12] },
        { symbol: 'XRP/USD', code: 'Ripple', bid: '0.52', high: '0.55', low: '0.50', change: '+0.80%', changePositive: true, trend: [10, 15, 20, 18, 25, 30, 35, 40, 50] },
        { symbol: 'ADA/USD', code: 'Cardano', bid: '0.45', high: '0.48', low: '0.42', change: '-0.40%', changePositive: false, trend: [18, 20, 25, 22, 28, 30, 35, 38, 42] },
        { symbol: 'DOGE/USD', code: 'Dogecoin', bid: '0.15', high: '0.16', low: '0.14', change: '+1.10%', changePositive: true, trend: [10, 12, 15, 12, 18, 20, 25, 30, 35] },
    ],
    indices: [
        { symbol: 'S&P 500', code: 'S&P 500', bid: '5432.10', high: '5460.00', low: '5410.00', change: '+0.12%', changePositive: true, trend: [20, 22, 20, 25, 22, 28, 25, 30, 32] },
        { symbol: 'NASDAQ', code: 'Nasdaq', bid: '18945.30', high: '19100.00', low: '18820.00', change: '+0.22%', changePositive: true, trend: [25, 28, 25, 30, 28, 35, 32, 38, 40] },
        { symbol: 'Dow Jones', code: 'Dow 30', bid: '39872.50', high: '40120.00', low: '39650.00', change: '+0.08%', changePositive: true, trend: [18, 20, 18, 22, 20, 24, 22, 26, 28] },
        { symbol: 'FTSE 100', code: 'FTSE 100', bid: '8234.60', high: '8260.00', low: '8200.00', change: '-0.05%', changePositive: false, trend: [22, 20, 18, 15, 18, 12, 15, 10, 8] },
        { symbol: 'DAX', code: 'DAX 40', bid: '18567.80', high: '18620.00', low: '18490.00', change: '+0.15%', changePositive: true, trend: [15, 18, 15, 20, 18, 22, 20, 25, 28] },
        { symbol: 'Nikkei 225', code: 'Nikkei', bid: '38912.40', high: '39100.00', low: '38750.00', change: '+0.34%', changePositive: true, trend: [12, 15, 12, 18, 15, 20, 18, 22, 25] },
        { symbol: 'Nifty 50', code: 'Nifty 50', bid: '23500.00', high: '23600.00', low: '23400.00', change: '+0.50%', changePositive: true, trend: [18, 16, 20, 18, 22, 20, 24, 22, 26] },
        { symbol: 'Sensex', code: 'BSE Sensex', bid: '77000.00', high: '77500.00', low: '76500.00', change: '+0.60%', changePositive: true, trend: [15, 18, 15, 20, 18, 22, 20, 25, 28] },
        { symbol: 'Dubai Financial Market Index', code: 'DFMGI', bid: '4000.00', high: '4050.00', low: '3950.00', change: '+0.10%', changePositive: true, trend: [10, 12, 15, 12, 18, 20, 25, 30, 35] },
    ],
    stocks: [
        { symbol: 'Apple', code: 'AAPL', bid: '195.42', high: '197.10', low: '193.80', change: '+0.85%', changePositive: true, trend: [25, 28, 25, 30, 35, 32, 38, 40, 45] },
        { symbol: 'Microsoft', code: 'MSFT', bid: '425.30', high: '428.50', low: '422.10', change: '+0.42%', changePositive: true, trend: [20, 22, 20, 25, 28, 25, 30, 32, 35] },
        { symbol: 'Amazon', code: 'AMZN', bid: '186.25', high: '188.40', low: '184.00', change: '+0.55%', changePositive: true, trend: [15, 18, 22, 20, 25, 28, 30, 32, 35] },
        { symbol: 'Nvidia', code: 'NVDA', bid: '124.80', high: '126.50', low: '122.40', change: '+2.15%', changePositive: true, trend: [10, 15, 20, 18, 25, 30, 35, 40, 50] },
        { symbol: 'Tesla', code: 'TSLA', bid: '178.65', high: '182.30', low: '175.20', change: '-1.23%', changePositive: false, trend: [35, 32, 30, 25, 28, 20, 15, 18, 12] },
        { symbol: 'Meta', code: 'META', bid: '502.10', high: '506.80', low: '498.30', change: '+0.72%', changePositive: true, trend: [18, 20, 25, 22, 28, 30, 35, 38, 42] },
        { symbol: 'Google', code: 'GOOGL', bid: '175.00', high: '178.00', low: '172.00', change: '+1.50%', changePositive: true, trend: [15, 12, 18, 14, 20, 22, 20, 25, 28] },
        { symbol: 'Saudi Aramco', code: '2222.SR', bid: '30.00', high: '31.00', low: '29.50', change: '+0.00%', changePositive: true, trend: [20, 20, 20, 20, 20, 20, 20, 20, 20] },
        { symbol: 'Reliance', code: 'RELIANCE', bid: '2900.00', high: '2950.00', low: '2850.00', change: '+1.20%', changePositive: true, trend: [15, 18, 15, 20, 18, 22, 20, 25, 28] },
        { symbol: 'TCS', code: 'TCS', bid: '3800.00', high: '3850.00', low: '3750.00', change: '-0.30%', changePositive: false, trend: [25, 22, 20, 18, 15, 12, 14, 10, 8] },
        { symbol: 'HDFC Bank', code: 'HDFCBANK', bid: '1550.00', high: '1580.00', low: '1530.00', change: '+0.80%', changePositive: true, trend: [10, 12, 15, 12, 18, 20, 25, 30, 35] },
    ],
    futures: [
        { symbol: 'E-mini S&P', code: 'ES', bid: '5430.25', high: '5458.00', low: '5408.00', change: '+0.10%', changePositive: true, trend: [15, 18, 15, 20, 18, 22, 20, 24, 26] },
        { symbol: 'E-mini Nasdaq', code: 'NQ', bid: '18940.50', high: '19095.00', low: '18815.00', change: '+0.20%', changePositive: true, trend: [20, 22, 20, 25, 22, 28, 25, 30, 32] },
        { symbol: 'Crude Future', code: 'CL', bid: '78.12', high: '79.40', low: '77.00', change: '-0.15%', changePositive: false, trend: [25, 22, 20, 18, 15, 12, 14, 10, 8] },
        { symbol: 'Gold Future', code: 'GC', bid: '2339.80', high: '2363.00', low: '2318.00', change: '+0.40%', changePositive: true, trend: [12, 15, 18, 20, 22, 24, 26, 28, 30] },
        { symbol: '30Y T-Bond', code: 'ZB', bid: '119.25', high: '119.80', low: '118.70', change: '+0.08%', changePositive: true, trend: [10, 12, 11, 13, 12, 14, 13, 15, 16] },
    ],
}

/* ── Animation Variants ────────────────────────────────────── */
const tableVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.04 },
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.15 },
    },
}

const rowVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.35,
            ease: [0.16, 1, 0.3, 1] as any,
        },
    },
}

/* ── Individual Row Component (handles flashing) ──────────────── */
function MarketRow({ inst, liveData }: { inst: Instrument, liveData: MarketQuote | undefined }) {
    const bidValue = liveData && liveData.price !== undefined ? liveData.price : parseFloat(inst.bid.replace(/,/g, ''));
    const prevPriceRef = useRef(bidValue);
    const [flashClass, setFlashClass] = useState('');

    useEffect(() => {
        if (liveData && liveData.price !== undefined && liveData.price !== prevPriceRef.current) {
            if (liveData.price > prevPriceRef.current) {
                setFlashClass(styles.flashUp);
                setTimeout(() => setFlashClass(''), 400);
            } else if (liveData.price < prevPriceRef.current) {
                setFlashClass(styles.flashDown);
                setTimeout(() => setFlashClass(''), 400);
            }
            prevPriceRef.current = liveData.price;
        }
    }, [liveData]);

    const bid = liveData && liveData.price !== undefined ? liveData.price.toFixed(5) : inst.bid
    const high = inst.high
    const low = inst.low
    const change = liveData && liveData.percent_change !== undefined
        ? `${liveData.percent_change >= 0 ? '+' : ''}${liveData.percent_change.toFixed(2)}%`
        : inst.change
    const changePositive = liveData && liveData.up !== undefined ? liveData.up : inst.changePositive

    return (
        <motion.tr className={`${styles.tableRow} ${flashClass}`} variants={rowVariants}>
            <td className={styles.tdSymbol}>
                <span className={styles.symbolName}>{inst.symbol}</span>
                <span className={styles.symbolCode}>{inst.code}</span>
            </td>
            <td className={styles.tdNum}>{bid}</td>
            <td className={styles.tdNum}>{high}</td>
            <td className={styles.tdNum}>{low}</td>
            <td className={`${styles.tdNum} ${changePositive ? styles.changeUp : styles.changeDown}`}>
                {change}
            </td>
            <td className={styles.tdTrend}>
                <Sparkline data={inst.trend} positive={changePositive} />
            </td>
            <td className={styles.tdAction}>
                <Link
                    href={PORTAL_REGISTER_URL}
                    className={styles.tradeBtn}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Trade now — ${inst.symbol}`}
                >
                    Trade Now
                </Link>
            </td>
        </motion.tr>
    )
}


/* ── Component ─────────────────────────────────────────────── */
export default function MarketsSection() {
    const [marketData, setMarketData] = useState<Record<string, MarketQuote>>({})
    const [lastUpdated, setLastUpdated] = useState<string>('')
    const [activeCategory, setActiveCategory] = useState('commodities')
    const instruments = INSTRUMENTS[activeCategory] || []

    useEffect(() => {
        let isMounted = true;

        async function loadData() {
            try {
                // Now uses centralized, cached, single-cycle fetcher
                const data = await fetchMarketData();

                if (isMounted && data) {
                    const dataMap: Record<string, MarketQuote> = {};
                    data.forEach(quote => {
                        dataMap[quote.symbol] = quote;
                    });
                    setMarketData(dataMap);
                    setLastUpdated(new Date().toLocaleTimeString());
                }
            } catch (error) {
                console.error('MarketsSection fetch error:', error)
            }
        }

        loadData();
        const interval = setInterval(loadData, 10000); // Poll every 10s for fast UI updates

        return () => {
            isMounted = false;
            clearInterval(interval);
        }
    }, []);

    return (
        <section className={`${styles.section} apfx-section`} aria-labelledby="markets-heading">
            <div className={styles.inner}>
                <header className={styles.header}>
                    <div className={styles.eyebrow}>Our Markets</div>
                    <h2 id="markets-heading" className={styles.title}>
                        Trade Every Major Market in One Place
                    </h2>
                    <p className={styles.subtitle}>
                        Access commodities, indices, stocks, crypto, and futures CFDs from a single,
                        institutional-grade trading stack.
                    </p>
                    {lastUpdated && (
                        <div className={styles.lastUpdated}>
                            Last updated: {lastUpdated}
                        </div>
                    )}
                </header>

                <div className={styles.layout}>
                    {/* ── Left Sidebar: Category Tabs ─────────────────── */}
                    <div className={styles.sidebar}>
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.id}
                                className={`${styles.categoryCard} ${activeCategory === cat.id ? styles.categoryActive : ''}`}
                                onClick={() => setActiveCategory(cat.id)}
                                style={{
                                    '--cat-gradient': cat.gradient,
                                    '--cat-shadow': cat.shadow,
                                } as React.CSSProperties}
                            >
                                {/* Gradient background layer for active card */}
                                <div className={styles.categoryBg} />

                                <div className={styles.categoryContent}>
                                    <div className={styles.categoryName}>
                                        {cat.name}
                                        <ArrowRight size={16} className={styles.categoryArrow} />
                                    </div>
                                    <p className={styles.categoryDesc}>{cat.desc}</p>
                                </div>

                                <div className={styles.categoryEmoji}>
                                    {cat.emoji}
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* ── Right: Instruments Table ────────────────────── */}
                    <div className={styles.tableWrap}>
                        <table className={styles.table}>
                            <colgroup>
                                <col style={{ width: '22%' }} />
                                <col style={{ width: '12%' }} />
                                <col style={{ width: '11%' }} />
                                <col style={{ width: '11%' }} />
                                <col style={{ width: '14%' }} />
                                <col style={{ width: '19%' }} />
                                <col style={{ width: '11%' }} />
                            </colgroup>
                            <thead>
                                <tr className={styles.tableHeader}>
                                    <th className={styles.thSymbol}>Symbol</th>
                                    <th className={styles.thNum}>Bid</th>
                                    <th className={styles.thNum}>High</th>
                                    <th className={styles.thNum}>Low</th>
                                    <th className={styles.thNum}>Daily Change</th>
                                    <th className={styles.thTrend}>Trend</th>
                                    <th className={styles.thAction} scope="col">
                                        <span className="sr-only">Trade</span>
                                    </th>
                                </tr>
                            </thead>

                            <AnimatePresence mode="wait">
                                <motion.tbody
                                    key={activeCategory}
                                    variants={tableVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    {instruments.map((inst) => {
                                        return <MarketRow key={inst.symbol} inst={inst} liveData={marketData[inst.symbol]} />;
                                    })}
                                </motion.tbody>
                            </AnimatePresence>
                        </table>
                    </div>
                </div>

                <p className={styles.disclaimer}>
                    Live rates are indicative only and may differ from actual trading prices. Please consult your broker before making any trading decisions.
                </p>

                <div className={styles.viewAll}>
                </div>
            </div>
        </section>
    )
}
