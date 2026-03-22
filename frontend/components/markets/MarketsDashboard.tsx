'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { fetchMarketData, MarketQuote } from '@/services/marketData'
import LivePriceWidget from '@/components/ui/LivePriceWidget'
import MarketChart from '@/components/ui/MarketChart'
import BottomBar from '@/components/layout/BottomBar'
import styles from './MarketsDashboard.module.css'

const TRADE_INVEST = '/trade&invest'

/** Only these five hubs exist under /trade&invest/ */
const CATEGORY_MAP = {
    Commodities: ['XAU/USD', 'XAG/USD', 'WTI Oil', 'Natural Gas', 'Copper'],
    Indices: ['S&P 500', 'NASDAQ', 'Dow Jones', 'FTSE 100', 'DAX'],
    Stocks: ['Apple', 'Tesla', 'Microsoft', 'Nvidia', 'Amazon', 'Meta'],
    Crypto: ['BTC/USD', 'ETH/USD', 'BNB/USD', 'SOL/USD', 'XRP/USD', 'ADA/USD'],
    Futures: ['E-mini S&P', 'E-mini Nasdaq', 'Crude Future', 'Gold Future', '30Y T-Bond'],
} as const

type TabKey = keyof typeof CATEGORY_MAP

const TAB_ORDER: TabKey[] = ['Commodities', 'Indices', 'Stocks', 'Crypto', 'Futures']

/** UI labels (Crypto → “Cryptocurrencies”) */
const TAB_LABEL: Record<TabKey, string> = {
    Commodities: 'Commodities',
    Indices: 'Indices',
    Stocks: 'Stocks (CFDs)',
    Crypto: 'Cryptocurrencies',
    Futures: 'Futures',
}

function tabHref(tab: TabKey): string {
    const paths: Record<TabKey, string> = {
        Commodities: `${TRADE_INVEST}/commodities`,
        Indices: `${TRADE_INVEST}/indices`,
        Stocks: `${TRADE_INVEST}/stocks`,
        Crypto: `${TRADE_INVEST}/cryptocurrencies`,
        Futures: `${TRADE_INVEST}/futures`,
    }
    return paths[tab]
}

const SLUG_TO_TAB: Record<string, TabKey> = {
    commodities: 'Commodities',
    indices: 'Indices',
    stocks: 'Stocks',
    cryptocurrencies: 'Crypto',
    cryptocurrency: 'Crypto',
    crypto: 'Crypto',
    futures: 'Futures',
}

function getCategoryForSymbol(symbol: string): string {
    for (const [cat, symbols] of Object.entries(CATEGORY_MAP)) {
        if (symbols.includes(symbol as never)) return cat
    }
    return 'Other'
}

function tabFromSlug(slug: string | undefined): TabKey {
    if (!slug) return 'Commodities'
    const key = slug.toLowerCase()
    return SLUG_TO_TAB[key] ?? 'Commodities'
}

function MarketCard({ quote }: { quote: MarketQuote }) {
    const [showChart, setShowChart] = useState(false)
    const [timeframe, setTimeframe] = useState('1D')

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={styles.marketCard}
            style={showChart ? { gridColumn: '1 / -1' } : {}}
        >
            <div className={styles.cardHeader}>
                <span className={styles.symbolName}>{quote.symbol}</span>
                <span className={styles.categoryBadge}>{getCategoryForSymbol(quote.symbol)}</span>
            </div>

            <div className={styles.priceRow}>
                <div>
                    <div className={styles.priceLabel}>Current Price</div>
                    <LivePriceWidget
                        quote={quote}
                        priceClassName={styles.livePrice}
                        changeClassName={styles.liveChange}
                        upClassName={styles.up}
                        downClassName={styles.down}
                    />
                </div>
                <button
                    type="button"
                    onClick={() => setShowChart(!showChart)}
                    style={{
                        background: 'transparent',
                        border: '1px solid rgba(0, 200, 150, 0.4)',
                        color: 'var(--color-accent)',
                        padding: '0.4rem 0.8rem',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.75rem',
                        alignSelf: 'flex-end',
                        marginBottom: '0.5rem',
                    }}
                >
                    {showChart ? 'Hide Chart' : 'View Chart'}
                </button>
            </div>

            {showChart && (
                <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
                        {['15M', '1H', '1D'].map((tf) => (
                            <button
                                type="button"
                                key={tf}
                                onClick={() => setTimeframe(tf)}
                                style={{
                                    background: timeframe === tf ? 'rgba(0,200,150,0.1)' : 'transparent',
                                    color: timeframe === tf ? 'var(--color-accent)' : 'inherit',
                                    border: `1px solid ${timeframe === tf ? 'var(--color-accent)' : 'rgba(255,255,255,0.1)'}`,
                                    padding: '2px 8px',
                                    borderRadius: '4px',
                                    fontSize: '12px',
                                    cursor: 'pointer',
                                }}
                            >
                                {tf}
                            </button>
                        ))}
                    </div>
                    <MarketChart symbol={quote.symbol} timeframe={timeframe} />
                </div>
            )}
        </motion.div>
    )
}

function MarketsContentInner({ categorySlug }: { categorySlug?: string }) {
    const [activeTab, setActiveTab] = useState<TabKey>(() => tabFromSlug(categorySlug))

    useEffect(() => {
        setActiveTab(tabFromSlug(categorySlug))
    }, [categorySlug])

    const [quotes, setQuotes] = useState<MarketQuote[]>([])
    const [loading, setLoading] = useState(true)
    const [lastUpdated, setLastUpdated] = useState<string>('')

    useEffect(() => {
        let isMounted = true

        async function load() {
            try {
                const data = await fetchMarketData()
                if (isMounted && data) {
                    setQuotes(data)
                    setLoading(false)
                    setLastUpdated(new Date().toLocaleTimeString())
                }
            } catch (err) {
                console.error(err)
            }
        }

        load()
        const interval = setInterval(load, 10000)
        return () => {
            isMounted = false
            clearInterval(interval)
        }
    }, [])

    const displayedSymbols = [...CATEGORY_MAP[activeTab]]
    const displayedQuotes = quotes.filter((q) =>
        displayedSymbols.some((sym) => sym === q.symbol)
    )

    return (
        <main className={styles.container}>
            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Global Markets Dashboard</h1>
                    <p className={styles.subtitle}>
                        Real-time pricing data across major asset classes. Powered by institutional liquidity.
                    </p>
                    {lastUpdated && (
                        <div className={styles.lastUpdated}>Last updated: {lastUpdated}</div>
                    )}
                </header>

                <div className={styles.tabs} role="tablist">
                    {TAB_ORDER.map((tab) => (
                        <Link
                            key={tab}
                            href={tabHref(tab)}
                            role="tab"
                            aria-selected={activeTab === tab}
                            scroll={false}
                            className={`${styles.tabBtn} ${activeTab === tab ? styles.tabBtnActive : ''}`}
                        >
                            {TAB_LABEL[tab]}
                        </Link>
                    ))}
                </div>

                {loading ? (
                    <div className={styles.loading}>Connecting to pricing engine...</div>
                ) : (
                    <motion.div layout className={styles.marketGrid}>
                        <AnimatePresence mode="popLayout">
                            {displayedQuotes.map((quote) => (
                                <MarketCard key={quote.symbol} quote={quote} />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </main>
    )
}

export default function MarketsDashboard({ categorySlug }: { categorySlug?: string }) {
    return (
        <>
            <Suspense fallback={<div className={styles.loading}>Loading Dashboard...</div>}>
                <MarketsContentInner categorySlug={categorySlug} />
            </Suspense>
            <BottomBar />
        </>
    )
}
