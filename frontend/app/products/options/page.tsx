'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import BottomBar from '@/components/layout/BottomBar';
import { FODisclaimer, ToolCards, UnderlyingChips } from '@/components/sections/options';
import type { UnderlyingInfo } from '@/lib/options/types';
import styles from './page.module.css';

export default function OptionsHubPage() {
    const [underlyings, setUnderlyings] = useState<UnderlyingInfo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;
        fetch('/api/options/underlyings')
            .then((r) => r.ok ? r.json() : Promise.reject(new Error('Failed to load')))
            .then((data: UnderlyingInfo[]) => mounted && setUnderlyings(data))
            .catch((e) => mounted && setError(e.message))
            .finally(() => mounted && setLoading(false));
        return () => { mounted = false; };
    }, []);

    return (
        <>
            <Header />
            <main className={styles.container}>
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <header className={styles.header}>
                        <Link href="/products" className={styles.backLink}>
                            Back
                        </Link>
                        <h1 className={styles.title}>Futures & Options</h1>
                        <p className={styles.subtitle}>
                            Index and stock derivatives. View chain, build strategies, and calculate payoff.
                        </p>
                    </header>

                    <FODisclaimer />

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Underlyings</h2>
                        {loading && <p className={styles.muted}>Loading…</p>}
                        {error && <p className={styles.error}>{error}</p>}
                        {!loading && !error && underlyings.length > 0 && (
                            <UnderlyingChips underlyings={underlyings} />
                        )}
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Tools</h2>
                        <ToolCards />
                    </section>
                </div>
            </main>
            <BottomBar />
        </>
    );
}
