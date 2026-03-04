'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Globe, Gem, LayoutDashboard, LineChart, CandlestickChart, Bitcoin } from 'lucide-react'
import { fetchMarketData, MarketQuote } from '@/services/marketData'
import LivePriceWidget from '@/components/ui/LivePriceWidget'
import styles from './MarketsSection.module.css'

interface MarketCategory {
    icon: React.ReactNode;
    name: string;
    desc: string;
    href: string;
    symbols: string[];
    glow: string;
    iconBg: string;
}

const MARKETS: MarketCategory[] = [
    {
        icon: <Globe size={24} aria-hidden="true" />,
        name: 'Forex Market',
        desc: "Trade the world's largest currency market with institutional liquidity.",
        href: '/markets?filter=forex',
        symbols: ['EUR/USD', 'GBP/USD', 'USD/JPY'],
        glow: 'rgba(0,200,150,0.08)',
        iconBg: 'rgba(0,200,150,0.1)',
    },
    {
        icon: <Bitcoin size={24} aria-hidden="true" />,
        name: 'Crypto CFDs',
        desc: 'Speculate on leading digital assets with leveraged CFDs on a secure platform.',
        href: '/markets?filter=crypto',
        symbols: ['BTC/USD', 'ETH/USD', 'SOL/USD'],
        glow: 'rgba(245,158,11,0.08)',
        iconBg: 'rgba(245,158,11,0.1)',
    },
    {
        icon: <Gem size={24} aria-hidden="true" />,
        name: 'Metals',
        desc: 'Trade Gold (XAU) and Silver (XAG) and other precious metals with world-class execution.',
        href: '/markets?filter=metals',
        symbols: ['XAU/USD', 'XAG/USD'],
        glow: 'rgba(201,168,76,0.08)',
        iconBg: 'rgba(201,168,76,0.1)',
    },
    {
        icon: <LineChart size={24} aria-hidden="true" />,
        name: 'Stocks',
        desc: 'CFDs on top global equities — Apple, Tesla, Nvidia — no ownership required.',
        href: '/markets?filter=stocks',
        symbols: ['AAPL', 'TSLA', 'NVDA'],
        glow: 'rgba(59,130,246,0.08)',
        iconBg: 'rgba(59,130,246,0.1)',
    },
    {
        icon: <CandlestickChart size={24} aria-hidden="true" />,
        name: 'ETFs',
        desc: 'Diversify your portfolio with leading Exchange Traded Funds.',
        href: '/markets?filter=etfs',
        symbols: ['SPY', 'QQQ'],
        glow: 'rgba(16,185,129,0.08)',
        iconBg: 'rgba(16,185,129,0.1)',
    },
    {
        icon: <LayoutDashboard size={24} aria-hidden="true" />,
        name: 'Indices',
        desc: 'Trade broad market movements via S&P 500, NASDAQ, DOW and more.',
        href: '/markets?filter=indices',
        symbols: ['S&P500', 'NASDAQ', 'DOW'],
        glow: 'rgba(99,102,241,0.08)',
        iconBg: 'rgba(99,102,241,0.1)',
    },
]

export default function MarketsSection() {
    const [marketData, setMarketData] = useState<Record<string, MarketQuote>>({})
    const [lastUpdated, setLastUpdated] = useState<string>('')

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
        const interval = setInterval(loadData, 60000);

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
                        Access forex, indices, commodities, metals, stocks, and crypto CFDs from a single,
                        institutional-grade trading stack.
                    </p>
                    {lastUpdated && (
                        <div className={styles.lastUpdated}>
                            Last updated: {lastUpdated}
                        </div>
                    )}
                </header>

                <div className={styles.grid}>
                    {MARKETS.map((m) => (
                        <Link
                            key={m.name}
                            href={m.href}
                            className={styles.card}
                            style={
                                {
                                    '--card-glow': m.glow,
                                    '--icon-bg': m.iconBg,
                                } as React.CSSProperties
                            }
                        >
                            <div className={styles.cardIcon}>
                                {m.icon}
                            </div>
                            <div className={styles.cardName}>{m.name}</div>
                            <p className={styles.cardDesc}>{m.desc}</p>

                            {/* Live Pricing Data rendering instead of static meta */}
                            {m.symbols.length > 0 ? (
                                <div className={styles.livePricesWrapper}>
                                    <div className={styles.livePricesHeader}>Live Quotes</div>
                                    <div className={styles.livePricesList}>
                                        {m.symbols.map(sym => {
                                            const quote = marketData[sym];
                                            if (!quote) return (
                                                <div key={sym} className={styles.livePriceItemSkeleton}>
                                                    <span>{sym}</span>
                                                    <div className={styles.skeletonBar} />
                                                </div>
                                            );
                                            return (
                                                <LivePriceWidget
                                                    key={sym}
                                                    quote={quote}
                                                    className={styles.livePriceItem}
                                                    symbolClassName={styles.liveSymbol}
                                                    priceClassName={styles.livePrice}
                                                    changeClassName={styles.liveChange}
                                                    upClassName={styles.liveChangeUp}
                                                    downClassName={styles.liveChangeDown}
                                                />
                                            )
                                        })}
                                    </div>
                                    <div className={styles.cardArrow} aria-hidden="true">→</div>
                                </div>
                            ) : (
                                <div className={styles.cardMeta} style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Explore Markets</span>
                                    <div className={styles.cardArrow} aria-hidden="true" style={{ position: 'static' }}>→</div>
                                </div>
                            )}
                        </Link>
                    ))}
                </div>

                <div className={styles.viewAll}>
                    <Link href="/markets" className={styles.viewAllBtn}>
                        View all markets →
                    </Link>
                </div>
            </div>
        </section>
    )
}
