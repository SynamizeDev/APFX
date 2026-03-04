'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './MarketsSection.module.css'

/* ── Category Data ─────────────────────────────────────────── */
const CATEGORIES = [
    {
        id: 'forex',
        name: 'Forex',
        desc: 'Trade major and minor currency pairs like EUR/USD and USD/JPY with speed and confidence.',
        href: '/markets/forex',
        gradient: 'linear-gradient(135deg, #e89044 0%, #d4752a 100%)',
        shadow: 'rgba(232, 144, 68, 0.15)',
        emoji: '💱',
    },
    {
        id: 'commodities',
        name: 'Commodities',
        desc: 'Speculate on market moves in gold, crude oil, silver, and more.',
        href: '/markets/commodities',
        gradient: 'linear-gradient(135deg, #444 0%, #111 100%)',
        shadow: 'rgba(255, 255, 255, 0.05)',
        emoji: '🛢️',
    },
    {
        id: 'indices',
        name: 'Indices',
        desc: 'Trade leading global indices like the S&P 500, NASDAQ, and FTSE 100.',
        href: '/markets/indices',
        gradient: 'linear-gradient(135deg, #c9a84c 0%, #9a7b30 100%)',
        shadow: 'rgba(201, 168, 76, 0.15)',
        emoji: '📈',
    },
    {
        id: 'stocks',
        name: 'Stock CFDs',
        desc: 'Trade global stocks with leverage and profit from price movements.',
        href: '/markets/stocks',
        gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
        shadow: 'rgba(59, 130, 246, 0.15)',
        emoji: '🍎',
    },
    {
        id: 'futures',
        name: 'Futures',
        desc: 'Access global markets with flexible, low-cost futures trading.',
        href: '/markets/futures',
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
    forex: [
        { symbol: 'EURUSD', code: 'EURUSD', bid: '1.16203', high: '1.19', low: '1.14', change: '+0.01%', changePositive: true, trend: [10, 15, 12, 18, 14, 20, 18, 25, 22] },
        { symbol: 'GBPUSD', code: 'GBPUSD', bid: '1.33567', high: '1.36', low: '1.31', change: '+0.01%', changePositive: true, trend: [20, 18, 25, 22, 28, 24, 30, 28, 32] },
        { symbol: 'USDJPY', code: 'USDJPY', bid: '157.371', high: '160.52', low: '154.22', change: '+0.01%', changePositive: true, trend: [15, 12, 18, 14, 20, 15, 22, 18, 25] },
        { symbol: 'AUDUSD', code: 'AUDUSD', bid: '0.67423', high: '0.69', low: '0.66', change: '-0.02%', changePositive: false, trend: [30, 28, 25, 20, 22, 18, 15, 12, 10] },
        { symbol: 'USDCHF', code: 'USDCHF', bid: '0.78206', high: '0.80', low: '0.77', change: '+0.05%', changePositive: true, trend: [10, 12, 14, 16, 18, 20, 22, 24, 26] },
        { symbol: 'USDCAD', code: 'USDCAD', bid: '1.36768', high: '1.40', low: '1.34', change: '+0.01%', changePositive: true, trend: [25, 22, 28, 24, 20, 22, 25, 28, 30] },
        { symbol: 'NZDUSD', code: 'NZDUSD', bid: '0.59112', high: '0.60', low: '0.58', change: '+0.06%', changePositive: true, trend: [12, 15, 18, 20, 22, 24, 26, 28, 30] },
        { symbol: 'EURGBP', code: 'EURGBP', bid: '0.87012', high: '0.89', low: '0.85', change: '+0.05%', changePositive: true, trend: [18, 16, 20, 18, 22, 20, 24, 22, 26] },
        { symbol: 'EURJPY', code: 'EURJPY', bid: '182.876', high: '186.53', low: '179.22', change: '+0.03%', changePositive: true, trend: [20, 22, 24, 26, 28, 30, 32, 34, 36] },
    ],
    commodities: [
        { symbol: 'XAUUSD', code: 'Gold', bid: '2,341.50', high: '2,365.00', low: '2,320.00', change: '+0.45%', changePositive: true, trend: [10, 15, 12, 18, 20, 22, 25, 28, 30] },
        { symbol: 'XAGUSD', code: 'Silver', bid: '29.485', high: '30.12', low: '28.90', change: '+0.32%', changePositive: true, trend: [15, 12, 18, 14, 20, 22, 20, 25, 28] },
        { symbol: 'USOIL', code: 'Crude Oil', bid: '78.240', high: '79.50', low: '77.10', change: '-0.18%', changePositive: false, trend: [25, 22, 20, 18, 15, 12, 14, 10, 8] },
        { symbol: 'UKOIL', code: 'Brent', bid: '82.670', high: '83.80', low: '81.40', change: '-0.12%', changePositive: false, trend: [22, 20, 18, 15, 12, 14, 10, 12, 9] },
        { symbol: 'NATGAS', code: 'Nat Gas', bid: '2.894', high: '3.01', low: '2.78', change: '+1.24%', changePositive: true, trend: [10, 12, 15, 12, 18, 20, 25, 30, 35] },
        { symbol: 'COPPER', code: 'Copper', bid: '4.352', high: '4.42', low: '4.28', change: '+0.08%', changePositive: true, trend: [18, 16, 20, 18, 22, 20, 24, 22, 25] },
    ],
    indices: [
        { symbol: 'US500', code: 'S&P 500', bid: '5,432.10', high: '5,460.00', low: '5,410.00', change: '+0.12%', changePositive: true, trend: [20, 22, 20, 25, 22, 28, 25, 30, 32] },
        { symbol: 'US30', code: 'Dow 30', bid: '39,872.50', high: '40,120.00', low: '39,650.00', change: '+0.08%', changePositive: true, trend: [18, 20, 18, 22, 20, 24, 22, 26, 28] },
        { symbol: 'USTEC', code: 'Nasdaq', bid: '18,945.30', high: '19,100.00', low: '18,820.00', change: '+0.22%', changePositive: true, trend: [25, 28, 25, 30, 28, 35, 32, 38, 40] },
        { symbol: 'UK100', code: 'FTSE 100', bid: '8,234.60', high: '8,260.00', low: '8,200.00', change: '-0.05%', changePositive: false, trend: [22, 20, 18, 15, 18, 12, 15, 10, 8] },
        { symbol: 'GER40', code: 'DAX 40', bid: '18,567.80', high: '18,620.00', low: '18,490.00', change: '+0.15%', changePositive: true, trend: [15, 18, 15, 20, 18, 22, 20, 25, 28] },
        { symbol: 'JPN225', code: 'Nikkei', bid: '38,912.40', high: '39,100.00', low: '38,750.00', change: '+0.34%', changePositive: true, trend: [12, 15, 12, 18, 15, 20, 18, 22, 25] },
    ],
    stocks: [
        { symbol: 'AAPL', code: 'Apple', bid: '195.42', high: '197.10', low: '193.80', change: '+0.85%', changePositive: true, trend: [25, 28, 25, 30, 35, 32, 38, 40, 45] },
        { symbol: 'MSFT', code: 'Microsoft', bid: '425.30', high: '428.50', low: '422.10', change: '+0.42%', changePositive: true, trend: [20, 22, 20, 25, 28, 25, 30, 32, 35] },
        { symbol: 'TSLA', code: 'Tesla', bid: '178.65', high: '182.30', low: '175.20', change: '-1.23%', changePositive: false, trend: [35, 32, 30, 25, 28, 20, 15, 18, 12] },
        { symbol: 'NVDA', code: 'NVIDIA', bid: '124.80', high: '126.50', low: '122.40', change: '+2.15%', changePositive: true, trend: [10, 15, 20, 18, 25, 30, 35, 40, 50] },
        { symbol: 'AMZN', code: 'Amazon', bid: '186.25', high: '188.40', low: '184.00', change: '+0.55%', changePositive: true, trend: [15, 18, 22, 20, 25, 28, 30, 32, 35] },
        { symbol: 'META', code: 'Meta', bid: '502.10', high: '506.80', low: '498.30', change: '+0.72%', changePositive: true, trend: [18, 20, 25, 22, 28, 30, 35, 38, 42] },
    ],
    futures: [
        { symbol: 'ESU4', code: 'E-mini S&P', bid: '5,430.25', high: '5,458.00', low: '5,408.00', change: '+0.10%', changePositive: true, trend: [15, 18, 15, 20, 18, 22, 20, 24, 26] },
        { symbol: 'NQU4', code: 'E-mini Nasdaq', bid: '18,940.50', high: '19,095.00', low: '18,815.00', change: '+0.20%', changePositive: true, trend: [20, 22, 20, 25, 22, 28, 25, 30, 32] },
        { symbol: 'CLU4', code: 'Crude Future', bid: '78.12', high: '79.40', low: '77.00', change: '-0.15%', changePositive: false, trend: [25, 22, 20, 18, 15, 12, 14, 10, 8] },
        { symbol: 'GCQ4', code: 'Gold Future', bid: '2,339.80', high: '2,363.00', low: '2,318.00', change: '+0.40%', changePositive: true, trend: [12, 15, 18, 20, 22, 24, 26, 28, 30] },
        { symbol: 'ZBU4', code: '30Y T-Bond', bid: '119.25', high: '119.80', low: '118.70', change: '+0.08%', changePositive: true, trend: [10, 12, 11, 13, 12, 14, 13, 15, 16] },
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

/* ── Component ─────────────────────────────────────────────── */
export default function MarketsSection() {
    const [activeCategory, setActiveCategory] = useState('forex')
    const instruments = INSTRUMENTS[activeCategory] || []

    return (
        <section className={`${styles.section} apfx-section`} aria-labelledby="markets-heading">
            <div className={styles.inner}>
                <header className={styles.header}>
                    <div className={styles.eyebrow}>Our Markets</div>
                    <h2 id="markets-heading" className={styles.title}>
                        Trade Every Major Market in One Place
                    </h2>
                    <p className={styles.subtitle}>
                        Access forex, indices, commodities, metals, stocks, and crypto CFDs from a single,
                        institutional-grade trading stack.
                    </p>
                </header>

                <div className={styles.layout}>
                    {/* ── Left Sidebar: Category Tabs ─────────────────── */}
                    <div className={styles.sidebar}>
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.id}
                                className={`${styles.categoryCard} ${activeCategory === cat.id ? styles.categoryActive : ''}`}
                                onClick={() => setActiveCategory(cat.id)}
                                style={
                                    activeCategory === cat.id
                                        ? {
                                            '--cat-gradient': cat.gradient,
                                            '--cat-shadow': cat.shadow,
                                        } as React.CSSProperties
                                        : undefined
                                }
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
                        <div className={styles.tableHeader}>
                            <span className={styles.thSymbol}>Symbol</span>
                            <span className={styles.thNum}>Bid</span>
                            <span className={styles.thNum}>High</span>
                            <span className={styles.thNum}>Low</span>
                            <span className={styles.thNum}>Daily Change</span>
                            <span className={styles.thTrend}>Trend</span>
                            <span className={styles.thAction}></span>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeCategory}
                                className={styles.tableBody}
                                variants={tableVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                {instruments.map((inst) => (
                                    <motion.div
                                        key={inst.symbol}
                                        className={styles.tableRow}
                                        variants={rowVariants}
                                    >
                                        <div className={styles.tdSymbol}>
                                            <span className={styles.symbolName}>{inst.symbol}</span>
                                            <span className={styles.symbolCode}>{inst.code}</span>
                                        </div>
                                        <span className={styles.tdNum}>{inst.bid}</span>
                                        <span className={styles.tdNum}>{inst.high}</span>
                                        <span className={styles.tdNum}>{inst.low}</span>
                                        <span className={`${styles.tdNum} ${inst.changePositive ? styles.changeUp : styles.changeDown}`}>
                                            {inst.change}
                                        </span>
                                        <div className={styles.tdTrend}>
                                            <Sparkline data={inst.trend} positive={inst.changePositive} />
                                        </div>
                                        <Link href="https://portal.apfx.com/register" className={styles.tradeBtn}>
                                            Trade now
                                        </Link>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                <p className={styles.disclaimer}>
                    Live rates are indicative only and may differ from actual trading prices. Please consult your broker before making any trading decisions.
                </p>

                <div className={styles.viewAll}>
                    <Link href="https://portal.apfx.com/register" className={styles.viewAllBtn}>
                        Open Live account
                    </Link>
                </div>
            </div>
        </section>
    )
}
