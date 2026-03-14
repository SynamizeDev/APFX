'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import BottomBar from '@/components/layout/BottomBar';
import { FODisclaimer } from '@/components/sections/options';
import type { StrategyLeg, PayoffPoint } from '@/lib/options/types';
import styles from './page.module.css';

function payoffAtSpot(legs: StrategyLeg[], spot: number): number {
    let pnl = 0;
    for (const leg of legs) {
        const intrinsic = leg.type === 'CE'
            ? Math.max(0, spot - leg.strike)
            : Math.max(0, leg.strike - spot);
        const value = intrinsic * leg.qty;
        pnl += leg.action === 'buy' ? value - leg.premium * leg.qty : leg.premium * leg.qty - value;
    }
    return pnl;
}

export default function PayoffCalculatorPage() {
    const [legs, setLegs] = useState<StrategyLeg[]>([]);
    const [spotRange, setSpotRange] = useState({ min: 22000, max: 25000 });
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined' || loaded) return;
        const params = new URLSearchParams(window.location.search);
        const legsParam = params.get('legs');
        if (legsParam) {
            try {
                const parsed = JSON.parse(legsParam) as StrategyLeg[];
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setLegs(parsed.map((l) => ({ ...l, id: l.id || `leg-${Math.random()}` })));
                    const strikes = parsed.flatMap((l) => [l.strike]);
                    const lo = Math.min(...strikes) - 500;
                    const hi = Math.max(...strikes) + 500;
                    setSpotRange({ min: lo, max: hi });
                }
            } catch {
                // ignore
            }
        }
        setLoaded(true);
    }, [loaded]);

    const points: PayoffPoint[] = useMemo(() => {
        if (legs.length === 0) return [];
        const step = Math.max(50, Math.floor((spotRange.max - spotRange.min) / 80));
        const out: PayoffPoint[] = [];
        for (let s = spotRange.min; s <= spotRange.max; s += step) {
            out.push({ underlying: s, pnl: payoffAtSpot(legs, s) });
        }
        return out;
    }, [legs, spotRange]);

    const maxPnl = points.length ? Math.max(...points.map((p) => p.pnl)) : 0;
    const minPnl = points.length ? Math.min(...points.map((p) => p.pnl)) : 0;

    return (
        <>
            <Header />
            <main className={styles.container}>
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <header className={styles.header}>
                        <Link href="/products/options" className={styles.backLink}>Back</Link>
                        <h1 className={styles.title}>Payoff Calculator</h1>
                        <p className={styles.subtitle}>P&L at expiry (approx). For education only.</p>
                    </header>

                    <FODisclaimer />

                    {legs.length === 0 ? (
                        <section className={styles.section}>
                            <p className={styles.muted}>
                                Build a strategy in the Strategy Builder and open it here, or add legs manually (coming soon).
                            </p>
                            <Link href="/products/options/strategy-builder" className={styles.link}>
                                Go to Strategy Builder
                            </Link>
                        </section>
                    ) : (
                        <>
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>Strategy legs</h2>
                                <ul className={styles.legList}>
                                    {legs.map((l) => (
                                        <li key={l.id} className={styles.legItem}>
                                            {l.action} {l.qty} {l.type} @ {l.strike} (₹{l.premium}/unit)
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>Payoff at expiry</h2>
                                <div className={styles.chartWrap}>
                                    <div className={styles.chart}>
                                        {points.map((p, i) => {
                                            const heightPct = maxPnl === minPnl ? 50 : ((p.pnl - minPnl) / (maxPnl - minPnl)) * 100;
                                            return (
                                                <div
                                                    key={i}
                                                    className={styles.bar}
                                                    style={{
                                                        height: `${Math.max(2, heightPct)}%`,
                                                        backgroundColor: p.pnl >= 0 ? 'var(--color-success)' : 'var(--color-error)',
                                                    }}
                                                    title={`Spot ${p.underlying}: ₹${p.pnl.toFixed(0)}`}
                                                />
                                            );
                                        })}
                                    </div>
                                    <div className={styles.xAxis}>
                                        <span>{spotRange.min}</span>
                                        <span>{spotRange.max}</span>
                                    </div>
                                </div>
                                <div className={styles.stats}>
                                    <span>Max profit (approx): ₹{maxPnl.toFixed(0)}</span>
                                    <span>Max loss (approx): ₹{minPnl.toFixed(0)}</span>
                                </div>
                            </section>

                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>Sample points</h2>
                                <div className={styles.tableWrap}>
                                    <table className={styles.table}>
                                        <thead>
                                            <tr>
                                                <th>Underlying</th>
                                                <th>P&L (₹)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {points.filter((_, i) => i % 4 === 0).map((p, i) => (
                                                <tr key={i}>
                                                    <td>{p.underlying}</td>
                                                    <td className={p.pnl >= 0 ? styles.green : styles.red}>{p.pnl.toFixed(0)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        </>
                    )}
                </div>
            </main>
            <BottomBar />
        </>
    );
}
