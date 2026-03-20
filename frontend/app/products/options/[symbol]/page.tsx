'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import BottomBar from '@/components/layout/BottomBar';
import { FODisclaimer, OptionsChainTable } from '@/components/sections/options';
import MarketChart from '@/components/ui/MarketChart';
import type { OptionsChainResponse } from '@/lib/options/types';
import styles from './page.module.css';

const TIMEFRAMES = ['1D', '1W', '1M', '3M', '6M', '1Y'];

export default function OptionsChainPage() {
    const params = useParams();
    const symbol = (params?.symbol as string) || 'NIFTY';
    const [data, setData] = useState<OptionsChainResponse | null>(null);
    const [expiry, setExpiry] = useState<string>('');
    const [timeframe, setTimeframe] = useState('1D');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        fetch(`/api/options/chain?symbol=${encodeURIComponent(symbol)}&expiry=${encodeURIComponent(expiry || '')}`)
            .then((r) => r.ok ? r.json() : Promise.reject(new Error('Failed to load chain')))
            .then((d: OptionsChainResponse) => {
                if (mounted) {
                    setData(d);
                    if (!expiry && (d.selectedExpiry || d.expiries?.[0])) setExpiry(d.selectedExpiry || d.expiries[0]);
                }
            })
            .catch((e) => mounted && setError(e.message))
            .finally(() => mounted && setLoading(false));
        return () => { mounted = false; };
    }, [symbol, expiry]);

    useEffect(() => {
        if (data && !expiry && data.expiries?.length) setExpiry(data.expiries[0]);
    }, [data, expiry]);

    const chartSymbol = symbol === 'BANKNIFTY' ? 'Bank Nifty' : symbol === 'SENSEX' ? 'Sensex' : symbol === 'FINNIFTY' ? 'Fin Nifty' : symbol === 'MIDCPNIFTY' ? 'Midcap' : 'Nifty 50';

    return (
        <>
            <main className={styles.container}>
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <header className={styles.header}>
                        <Link href="/products/options" className={styles.backLink}>
                            Back
                        </Link>
                        <div className={styles.titleRow}>
                            <h1 className={styles.title}>{data?.name ?? symbol}</h1>
                            {data && (
                                <span className={data.up ? styles.up : styles.down}>
                                    {data.spot.toLocaleString('en-IN')} ({data.up ? '+' : ''}{data.changePercent.toFixed(2)}%)
                                </span>
                            )}
                        </div>
                        {data && (
                            <div className={styles.meta}>
                                <span>PCR (OI): {(data.pcrOi ?? 0).toFixed(2)}</span>
                                <span>PCR (Vol): {(data.pcrVolume ?? 0).toFixed(2)}</span>
                            </div>
                        )}
                    </header>

                    <FODisclaimer />

                    {data && data.expiries?.length > 0 && (
                        <div className={styles.expiryRow}>
                            <span className={styles.expiryLabel}>Expiry</span>
                            <select
                                className={styles.expirySelect}
                                value={expiry || data.expiries[0]}
                                onChange={(e) => setExpiry(e.target.value)}
                            >
                                {data.expiries.map((ex) => (
                                    <option key={ex} value={ex}>{ex}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {loading && <p className={styles.muted}>Loading chain…</p>}
                    {error && <p className={styles.errorText}>{error}</p>}
                    {data?.rows && (
                        <OptionsChainTable rows={data.rows} spot={data.spot} />
                    )}

                    <section className={styles.chartSection}>
                        <h2 className={styles.chartTitle}>Spot chart</h2>
                        <div className={styles.timeframeRow}>
                            {TIMEFRAMES.map((tf) => (
                                <button
                                    key={tf}
                                    type="button"
                                    className={`${styles.tfBtn} ${timeframe === tf ? styles.tfBtnActive : ''}`}
                                    onClick={() => setTimeframe(tf)}
                                >
                                    {tf}
                                </button>
                            ))}
                        </div>
                        <div className={styles.chartWrap}>
                            <MarketChart symbol={chartSymbol} timeframe={timeframe} />
                        </div>
                    </section>
                </div>
            </main>
            <BottomBar />
        </>
    );
}
