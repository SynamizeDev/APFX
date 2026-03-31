'use client'

import { motion, Variants } from 'framer-motion'
import InnerPageHero from '@/components/layout/InnerPageHero'
import AccountTypes from '@/components/sections/AccountTypes'
import Footer from '@/components/layout/Footer'
import BottomBar from '@/components/layout/BottomBar'
import styles from './AccountsPage.module.css'

// Metadata moved to page.tsx (Server Component)

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
                {/* Keep /accounts cards identical to the home page section */}
                <AccountTypes />

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
                                        <th>Premium</th>
                                        <th>Elite</th>
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
                                        <td>Market (Premium)</td>
                                        <td>DMA / Custom Liquidity</td>
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