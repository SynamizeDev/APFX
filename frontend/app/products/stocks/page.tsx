'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import BottomBar from '@/components/layout/BottomBar';
import {
    IndexSummaryCards,
    IndexChartSection,
    SectionWithTabs,
    PopularCategories,
} from '@/components/sections/stocks';
import type { StocksDashboardResponse } from '@/components/sections/stocks/types';
import styles from './page.module.css';

export default function StocksPage() {
    const [data, setData] = useState<StocksDashboardResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        async function load() {
            try {
                const res = await fetch('/api/stocks/dashboard');
                if (!res.ok) throw new Error('Failed to load dashboard');
                const json = await res.json();
                if (isMounted) {
                    setData(json);
                    setError(null);
                }
            } catch (e) {
                if (isMounted) {
                    setError(e instanceof Error ? e.message : 'Something went wrong');
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        }
        load();
        return () => { isMounted = false; };
    }, []);

    return (
        <>
            <Header />
            <main className={styles.container}>
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <header className={styles.header}>
                        <Link href="/products" className={styles.backLink} aria-label="Back to products">
                            Back
                        </Link>
                        <h1 className={styles.title}>Stock Market Today</h1>
                    </header>

                    {loading && <div className={styles.loading}>Loading dashboard...</div>}
                    {error && <div className={styles.error}>{error}</div>}

                    {data && !loading && (
                        <>
                            <IndexSummaryCards indices={data.majorIndices} />
                            <IndexChartSection />
                            <SectionWithTabs
                                title="Major Indices"
                                viewAllHref="/products/stocks/indices"
                                tabs={[
                                    { key: 'NIFTY50', label: 'NIFTY50' },
                                    { key: 'NIFTY Next 50', label: 'NIFTY Next 50' },
                                ]}
                                itemsByTab={data.majorIndicesList}
                            />
                            <SectionWithTabs
                                title="Market Movers"
                                viewAllHref="/products/stocks/movers"
                                tabs={[
                                    { key: 'gainers', label: 'Top Gainers' },
                                    { key: 'losers', label: 'Top Losers' },
                                    { key: 'high52', label: '52 Week High' },
                                    { key: 'low52', label: '52 Week Low' },
                                ]}
                                itemsByTab={data.marketMovers}
                            />
                            <SectionWithTabs
                                title="Stocks By Sector"
                                viewAllHref="/products/stocks/sectors"
                                tabs={Object.keys(data.bySector).map((k) => ({ key: k, label: k }))}
                                itemsByTab={data.bySector}
                            />
                            <SectionWithTabs
                                title="Stocks By Market Cap"
                                viewAllHref="/products/stocks/market-cap"
                                tabs={Object.keys(data.byMarketCap).map((k) => ({ key: k, label: k }))}
                                itemsByTab={data.byMarketCap}
                            />
                            <SectionWithTabs
                                title="Penny Stocks"
                                viewAllHref="/products/stocks/penny"
                                tabs={Object.keys(data.pennyStocks).map((k) => ({ key: k, label: k }))}
                                itemsByTab={data.pennyStocks}
                            />
                            <PopularCategories categories={data.popularCategories} />
                        </>
                    )}
                </div>
            </main>
            <BottomBar />
        </>
    );
}
