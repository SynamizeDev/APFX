'use client'

import InnerPageHero from '@/components/layout/InnerPageHero'
import ProductsTabNav from '@/components/navigation/ProductsTabNav'
import styles from './RangePage.module.css'

export default function RangePage() {
    return (
        <div className={styles.page}>
            <InnerPageHero
                title="Institutional"
                accent="Products"
                description="Trade every major market from a single, high-performance platform with deep liquidity and tight spreads."
                breadcrumbs={[{ label: 'Products', href: '/products/range' }, { label: 'Range' }]}
            />
            <ProductsTabNav />

            <main className={styles.main}>
                <section className={styles.section}>
                    <div className={styles.container}>
                        <h2 className={styles.sectionTitle}>Global Market Coverage</h2>
                        <p className={styles.lead}>
                            APFX provides access to a vast range of financial instruments across all major asset classes. 
                            Our institutional-grade infrastructure ensures that you can execute your strategies with 
                            precision, regardless of the market.
                        </p>
                        
                        <ul className={styles.categoryList}>
                            <li className={styles.categoryCard}>
                                <strong>Forex</strong>
                                <span>Major, minor, and exotic pairs with raw spreads.</span>
                            </li>
                            <li className={styles.categoryCard}>
                                <strong>Commodities</strong>
                                <span>Energy, metals, and agricultural products.</span>
                            </li>
                            <li className={styles.categoryCard}>
                                <strong>Indices</strong>
                                <span>Global benchmarks and sector-specific indices.</span>
                            </li>
                            <li className={styles.categoryCard}>
                                <strong>Stocks</strong>
                                <span>1,000+ global shares with direct market access.</span>
                            </li>
                            <li className={styles.categoryCard}>
                                <strong>Crypto</strong>
                                <span>Leading digital assets with 24/7 liquidity.</span>
                            </li>
                            <li className={styles.categoryCard}>
                                <strong>Futures</strong>
                                <span>Standardized contracts for professional hedging.</span>
                            </li>
                        </ul>
                    </div>
                </section>
            </main>

        </div>
    )
}
