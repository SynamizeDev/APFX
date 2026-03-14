'use client';

import Link from 'next/link';
import Header from '@/components/layout/Header';
import BottomBar from '@/components/layout/BottomBar';
import { FODisclaimer } from '@/components/sections/options';
import styles from './page.module.css';

export default function IVAnalysisPage() {
    return (
        <>
            <Header />
            <main className={styles.container}>
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <header className={styles.header}>
                        <Link href="/products/options" className={styles.backLink}>Back</Link>
                        <h1 className={styles.title}>IV Analysis</h1>
                        <p className={styles.subtitle}>
                            Implied volatility by strike and expiry. For education only — not investment advice.
                        </p>
                    </header>

                    <FODisclaimer />

                    <section className={styles.section}>
                        <p className={styles.muted}>
                            IV analysis (IV curve, percentile, skew) will be available in a future update. Select an underlying from the F&O hub to view the options chain with IV column in the meantime.
                        </p>
                        <Link href="/products/options" className={styles.link}>Back to F&O Hub</Link>
                    </section>
                </div>
            </main>
            <BottomBar />
        </>
    );
}
