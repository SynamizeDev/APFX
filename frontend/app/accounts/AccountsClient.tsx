'use client'

import { motion, Variants } from 'framer-motion'
import InnerPageHero from '@/components/layout/InnerPageHero'
import Footer from '@/components/layout/Footer'
import BottomBar from '@/components/layout/BottomBar'
import styles from './AccountsPage.module.css'

// Metadata moved to page.tsx (Server Component)

const ACCOUNTS = [
    {
        name: 'Standard',
        desc: 'Perfect for retail traders seeking a simple, all-inclusive pricing model with no commissions.',
        spreads: 'from 1.0 pips',
        commission: '$0',
        deposit: '$50',
        bestFor: 'Beginners & Swing Traders',
    },
    {
        name: 'Raw Spread',
        desc: 'Institutional-grade spreads paired with a transparent commission structure.',
        spreads: 'from 0.0 pips',
        commission: '$3.50 per side',
        deposit: '$1,000',
        bestFor: 'Scalpers & Day Traders',
        featured: true,
    },
    {
        name: 'Institutional',
        desc: 'Custom execution, pricing, and liquidity solutions for high-volume and corporate clients.',
        spreads: 'from 0.0 pips',
        commission: 'Custom / Tiered',
        deposit: '$5,000+',
        bestFor: 'Professional Traders',
    },
]

/* ──────────────────────────────────────────────────────────
   Motion system — restrained, premium, scroll-led
   ────────────────────────────────────────────────────────── */
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, ease: 'easeOut' },
    },
}

const stagger: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
        },
    },
}

export default function AccountsPage() {
    return (
        <div className={styles.page}>
            <InnerPageHero
                title="Account Structures for"
                accentLine="Every Trading Mandate"
                subtitle="From simple all-in pricing to raw spread and institutional tiers, our accounts are engineered to support how you trade today — and how you plan to scale tomorrow."
                breadcrumbs={[]}
            />

            <main className={styles.main}>
                {/* ── Account Cards ───────────────────────── */}
                <section className={`${styles.section} apfx-section`}>
                    <div className={styles.container}>
                        <motion.div
                            className={styles.accountGrid}
                            variants={stagger}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-80px' }}
                        >
                            {ACCOUNTS.map((acc) => (
                                <motion.div
                                    key={acc.name}
                                    className={`${styles.accCard} ${acc.featured ? styles.featured : ''
                                        }`}
                                    variants={fadeUp}
                                >
                                    {acc.featured && (
                                        <div className={styles.badge}>Most Popular</div>
                                    )}

                                    <h3 className={styles.accName}>{acc.name}</h3>
                                    <p className={styles.accDesc}>{acc.desc}</p>

                                    <div className={styles.metrics}>
                                        <div className={styles.metric}>
                                            <span>Spreads</span>
                                            <strong>{acc.spreads}</strong>
                                        </div>
                                        <div className={styles.metric}>
                                            <span>Commission</span>
                                            <strong>{acc.commission}</strong>
                                        </div>
                                        <div className={styles.metric}>
                                            <span>Min Deposit</span>
                                            <strong>{acc.deposit}</strong>
                                        </div>
                                    </div>

                                    <div className={styles.footer}>
                                        <span className={styles.best}>
                                            Best for: {acc.bestFor}
                                        </span>
                                        <button className={styles.btnOpen}>
                                            Open Account
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* ── Comparison Table ────────────────────── */}
                <section className={`${styles.tableSection} apfx-section`}>
                    <div className={styles.container}>
                        <motion.header
                            className={styles.tableHeader}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                        >
                            <h2>Full Feature Comparison</h2>
                            <p>
                                A detailed breakdown of execution, platform access,
                                and trading conditions across all account tiers.
                            </p>
                        </motion.header>

                        <motion.div
                            className={styles.tableWrapper}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
                        >
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Feature</th>
                                        <th>Standard</th>
                                        <th>Raw Spread</th>
                                        <th>Institutional</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Trading Platforms</td>
                                        <td>Desktop, Mobile, Web</td>
                                        <td>Desktop, Mobile, Web</td>
                                        <td>Desktop, Mobile, API</td>
                                    </tr>
                                    <tr>
                                        <td>Execution Type</td>
                                        <td>Market</td>
                                        <td>Market (ECN)</td>
                                        <td>DMA / ECN</td>
                                    </tr>
                                    <tr>
                                        <td>Stop Out Level</td>
                                        <td>50%</td>
                                        <td>50%</td>
                                        <td>40%</td>
                                    </tr>
                                    <tr>
                                        <td>Minimum Lot Size</td>
                                        <td>0.01 Lots</td>
                                        <td>0.01 Lots</td>
                                        <td>0.1 Lots</td>
                                    </tr>
                                </tbody>
                            </table>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
            <BottomBar />
        </div>
    )
}