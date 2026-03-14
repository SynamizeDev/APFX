'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import BottomBar from '@/components/layout/BottomBar';
import { FODisclaimer } from '@/components/sections/options';
import type { StrategyLeg } from '@/lib/options/types';
import styles from './page.module.css';

const TEMPLATES = [
    { name: 'Long Straddle', legs: [{ type: 'CE' as const, strike: 0, qty: 1, action: 'buy' as const }, { type: 'PE' as const, strike: 0, qty: 1, action: 'buy' as const }] },
    { name: 'Short Straddle', legs: [{ type: 'CE' as const, strike: 0, qty: 1, action: 'sell' as const }, { type: 'PE' as const, strike: 0, qty: 1, action: 'sell' as const }] },
    { name: 'Long Strangle', legs: [{ type: 'CE' as const, strike: 0, qty: 1, action: 'buy' as const }, { type: 'PE' as const, strike: 0, qty: 1, action: 'buy' as const }] },
    { name: 'Bull Call Spread', legs: [{ type: 'CE' as const, strike: 0, qty: 1, action: 'buy' as const }, { type: 'CE' as const, strike: 0, qty: 1, action: 'sell' as const }] },
    { name: 'Bear Put Spread', legs: [{ type: 'PE' as const, strike: 0, qty: 1, action: 'buy' as const }, { type: 'PE' as const, strike: 0, qty: 1, action: 'sell' as const }] },
];

export default function StrategyBuilderPage() {
    const [symbol, setSymbol] = useState('NIFTY');
    const [expiry, setExpiry] = useState('2025-03-27');
    const [legs, setLegs] = useState<StrategyLeg[]>([]);
    const [newLeg, setNewLeg] = useState<Partial<StrategyLeg>>({ type: 'CE', strike: 23500, qty: 50, action: 'buy', premium: 0 });

    const addLeg = () => {
        if (!newLeg.type || !newLeg.strike || !newLeg.qty || newLeg.action === undefined) return;
        setLegs((prev) => [...prev, {
            id: `leg-${Date.now()}`,
            type: newLeg.type as 'CE' | 'PE',
            strike: newLeg.strike,
            qty: newLeg.qty,
            action: newLeg.action as 'buy' | 'sell',
            premium: newLeg.premium ?? 0,
        }]);
        setNewLeg({ type: 'CE', strike: 23500, qty: 50, action: 'buy', premium: 0 });
    };

    const removeLeg = (id: string) => {
        setLegs((prev) => prev.filter((l) => l.id !== id));
    };

    const netPremium = legs.reduce((sum, l) => {
        const p = l.premium * l.qty;
        return sum + (l.action === 'buy' ? -p : p);
    }, 0);

    return (
        <>
            <Header />
            <main className={styles.container}>
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <header className={styles.header}>
                        <Link href="/products/options" className={styles.backLink}>Back</Link>
                        <h1 className={styles.title}>Strategy Builder</h1>
                        <p className={styles.subtitle}>Build multi-leg options strategies. For education only.</p>
                    </header>

                    <FODisclaimer />

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Underlying & Expiry</h2>
                        <div className={styles.row}>
                            <select className={styles.select} value={symbol} onChange={(e) => setSymbol(e.target.value)}>
                                <option value="NIFTY">Nifty 50</option>
                                <option value="BANKNIFTY">Bank Nifty</option>
                                <option value="FINNIFTY">Fin Nifty</option>
                            </select>
                            <select className={styles.select} value={expiry} onChange={(e) => setExpiry(e.target.value)}>
                                <option value="2025-03-27">27 Mar 2025</option>
                                <option value="2025-04-03">03 Apr 2025</option>
                                <option value="2025-04-24">24 Apr 2025</option>
                            </select>
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Templates</h2>
                        <div className={styles.templateGrid}>
                            {TEMPLATES.map((t) => (
                                <button
                                    key={t.name}
                                    type="button"
                                    className={styles.templateBtn}
                                    onClick={() => setLegs(t.legs.map((leg, i) => ({
                                        id: `t-${i}-${Date.now()}`,
                                        type: leg.type,
                                        strike: leg.strike || 23500,
                                        qty: leg.qty,
                                        action: leg.action,
                                        premium: 0,
                                    })))}
                                >
                                    {t.name}
                                </button>
                            ))}
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Add leg</h2>
                        <div className={styles.legForm}>
                            <select value={newLeg.type} onChange={(e) => setNewLeg((p) => ({ ...p, type: e.target.value as 'CE' | 'PE' }))}>
                                <option value="CE">CE</option>
                                <option value="PE">PE</option>
                            </select>
                            <input
                                type="number"
                                placeholder="Strike"
                                value={newLeg.strike ?? ''}
                                onChange={(e) => setNewLeg((p) => ({ ...p, strike: Number(e.target.value) || 0 }))}
                            />
                            <input
                                type="number"
                                placeholder="Qty"
                                value={newLeg.qty ?? ''}
                                onChange={(e) => setNewLeg((p) => ({ ...p, qty: Number(e.target.value) || 0 }))}
                            />
                            <select value={newLeg.action} onChange={(e) => setNewLeg((p) => ({ ...p, action: e.target.value as 'buy' | 'sell' }))}>
                                <option value="buy">Buy</option>
                                <option value="sell">Sell</option>
                            </select>
                            <input
                                type="number"
                                step="0.01"
                                placeholder="Premium"
                                value={newLeg.premium ?? ''}
                                onChange={(e) => setNewLeg((p) => ({ ...p, premium: Number(e.target.value) || 0 }))}
                            />
                            <button type="button" className={styles.addBtn} onClick={addLeg}>Add</button>
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Legs</h2>
                        {legs.length === 0 ? (
                            <p className={styles.muted}>Add legs or pick a template above.</p>
                        ) : (
                            <ul className={styles.legList}>
                                {legs.map((l) => (
                                    <li key={l.id} className={styles.legItem}>
                                        <span>{l.action} {l.qty} {l.type} @ {l.strike} (₹{l.premium})</span>
                                        <button type="button" className={styles.removeBtn} onClick={() => removeLeg(l.id)}>Remove</button>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {legs.length > 0 && (
                            <div className={styles.netRow}>
                                <strong>Net premium (approx):</strong>
                                <span className={netPremium >= 0 ? styles.credit : styles.debit}>
                                    {netPremium >= 0 ? '+' : ''}₹{netPremium.toFixed(2)}
                                </span>
                            </div>
                        )}
                    </section>

                    {legs.length > 0 && (
                        <Link href={`/products/options/payoff-calculator?legs=${encodeURIComponent(JSON.stringify(legs))}`} className={styles.payoffLink}>
                            Open in Payoff Calculator →
                        </Link>
                    )}
                </div>
            </main>
            <BottomBar />
        </>
    );
}
