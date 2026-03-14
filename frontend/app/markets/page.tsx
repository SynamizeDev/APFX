'use client'

import { useState, useEffect, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { fetchMarketData, MarketQuote, DEFAULT_SYMBOLS } from '@/services/marketData'
import LivePriceWidget from '@/components/ui/LivePriceWidget'
import MarketChart from '@/components/ui/MarketChart'
import styles from './page.module.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BottomBar from '@/components/layout/BottomBar'

// Map categories to their symbols
const CATEGORY_MAP: Record<string, string[]> = {
    'All': ['EUR/USD', 'GBP/USD', 'BTC/USD', 'ETH/USD', 'XAU/USD', 'Apple', 'S&P 500'],
    'Forex': ['EUR/USD', 'GBP/USD', 'USD/JPY', 'USD/CHF', 'AUD/USD', 'NZD/USD'],
    'Crypto': ['BTC/USD', 'ETH/USD', 'BNB/USD', 'SOL/USD', 'XRP/USD', 'ADA/USD'],
    'Commodities': ['XAU/USD', 'XAG/USD', 'WTI Oil', 'Natural Gas', 'Copper'],
    'Stocks': ['Apple', 'Tesla', 'Microsoft', 'Nvidia', 'Amazon', 'Meta'],
    'Indices': ['S&P 500', 'NASDAQ', 'Dow Jones', 'FTSE 100', 'DAX']
}

function getCategoryForSymbol(symbol: string): string {
    for (const [cat, symbols] of Object.entries(CATEGORY_MAP)) {
        if (cat !== 'All' && symbols.includes(symbol)) return cat;
    }
    return 'Other';
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
                    onClick={() => setShowChart(!showChart)}
                    className={styles.chartToggleBtn}
                    style={{ 
                        background: 'transparent', 
                        border: '1px solid rgba(0, 200, 150, 0.4)', 
                        color: 'var(--color-accent)', 
                        padding: '0.4rem 0.8rem', 
                        borderRadius: '8px', 
                        cursor: 'pointer',
                        fontSize: '0.75rem',
                        alignSelf: 'flex-end',
                        marginBottom: '0.5rem'
                    }}
                >
                    {showChart ? 'Hide Chart' : 'View Chart'}
                </button>
            </div>

            {showChart && (
                <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
                        {['15M', '1H', '1D'].map(tf => (
                            <button 
                                key={tf}
                                onClick={() => setTimeframe(tf)}
                                style={{
                                    background: timeframe === tf ? 'rgba(0,200,150,0.1)' : 'transparent',
                                    color: timeframe === tf ? 'var(--color-accent)' : 'inherit',
                                    border: `1px solid ${timeframe === tf ? 'var(--color-accent)' : 'rgba(255,255,255,0.1)'}`,
                                    padding: '2px 8px',
                                    borderRadius: '4px',
                                    fontSize: '12px',
                                    cursor: 'pointer'
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

function MarketsContent() {
    const searchParams = useSearchParams()
    const initialFilter = searchParams.get('filter') || 'All'

    // Capitalize filter to match tab keys
    const startTab = Object.keys(CATEGORY_MAP).find(k => k.toLowerCase() === initialFilter.toLowerCase()) || 'All'

    const [activeTab, setActiveTab] = useState(startTab)
    const [quotes, setQuotes] = useState<MarketQuote[]>([])
    const [loading, setLoading] = useState(true)
    const [lastUpdated, setLastUpdated] = useState<string>('')

    useEffect(() => {
        let isMounted = true;

        async function load() {
            try {
                // Use centralized fetcher
                const data = await fetchMarketData();
                if (isMounted && data) {
                    setQuotes(data);
                    setLoading(false);
                    setLastUpdated(new Date().toLocaleTimeString());
                }
            } catch (err) {
                console.error(err);
            }
        }

        load();
        const interval = setInterval(load, 10000); // 10s polling
        return () => {
            isMounted = false;
            clearInterval(interval);
        }
    }, [])

    const displayedSymbols = CATEGORY_MAP[activeTab] || DEFAULT_SYMBOLS;
    const displayedQuotes = quotes.filter(q => displayedSymbols.includes(q.symbol))

    const tabs = Object.keys(CATEGORY_MAP)

    return (
        <main className={styles.container}>
            <div className="container" style={{ position: 'relative', zIndex: 2 }}>

                <header className={styles.header}>
                    <h1 className={styles.title}>Global Markets Dashboard</h1>
                    <p className={styles.subtitle}>
                        Real-time pricing data across major asset classes. Powered by institutional liquidity.
                    </p>
                    {lastUpdated && (
                        <div className={styles.lastUpdated}>
                            Last updated: {lastUpdated}
                        </div>
                    )}
                </header>

                <div className={styles.tabs} role="tablist">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            role="tab"
                            aria-selected={activeTab === tab}
                            className={`${styles.tabBtn} ${activeTab === tab ? styles.tabBtnActive : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
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

export default function MarketsDashboardPage() {
    return (
        <>
            <Header />
            <Suspense fallback={<div className={styles.loading}>Loading Dashboard...</div>}>
                <MarketsContent />
            </Suspense>
            <BottomBar />
        </>
    )
}
