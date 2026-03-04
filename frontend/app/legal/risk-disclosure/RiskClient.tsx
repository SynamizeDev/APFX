'use client'

import { motion, Variants } from 'framer-motion'
import InnerPageHero from '@/components/layout/InnerPageHero'
import Footer from '@/components/layout/Footer'
import BottomBar from '@/components/layout/BottomBar'
import styles from '../privacy/LegalPage.module.css'

// Metadata moved to page.tsx (Server Component)

/* ──────────────────────────────────────────────────────────
   Motion system — serious, compliance-first, non-distracting
   ────────────────────────────────────────────────────────── */
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: 'easeOut' },
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

export default function RiskPage() {
    return (
        <div className={styles.page}>
            <InnerPageHero
                title="Risk"
                accentLine="Disclosure"
                subtitle="Trading in financial markets involves a substantial risk of loss and is not suitable for all investors."
                breadcrumbs={[
                    { label: 'Legal', href: '/legal' },
                    { label: 'Risk Disclosure' },
                ]}
            />

            <main className={styles.main}>
                <section className={`${styles.section} apfx-section`}>
                    <div className={styles.container}>
                        <motion.div
                            className={styles.content}
                            variants={stagger}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-80px' }}
                        >
                            {/* ── High Risk Warning ─────────────── */}
                            <motion.div
                                className={styles.warningBox}
                                variants={fadeUp}
                            >
                                <strong>High Risk Warning</strong>
                                CFDs are complex instruments and come with a high
                                risk of losing money rapidly due to leverage. You
                                should consider whether you understand how CFDs
                                work and whether you can afford to take the high
                                risk of losing your invested capital.
                            </motion.div>

                            <motion.h3 variants={fadeUp}>
                                1. Leverage Risk
                            </motion.h3>
                            <motion.p variants={fadeUp}>
                                The high degree of leverage available in trading
                                financial instruments can work against you as well
                                as for you. Even small market movements may result
                                in proportionally larger losses or gains, potentially
                                exceeding your initial investment.
                            </motion.p>

                            <motion.h3 variants={fadeUp}>
                                2. Market Volatility
                            </motion.h3>
                            <motion.p variants={fadeUp}>
                                Financial markets may experience periods of extreme
                                volatility. Rapid price fluctuations, reduced
                                liquidity, or market gaps can occur without warning
                                and may significantly impact your trading positions.
                            </motion.p>

                            <motion.h3 variants={fadeUp}>
                                3. Knowledge & Experience
                            </motion.h3>
                            <motion.p variants={fadeUp}>
                                You should ensure that you possess sufficient
                                knowledge, experience, and financial resources to
                                understand the nature of trading risks involved.
                                If necessary, seek independent financial advice
                                before engaging in leveraged trading activities.
                            </motion.p>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
            <BottomBar />
        </div>
    )
}