'use client'

import { motion, Variants } from 'framer-motion'
import InnerPageHero from '@/components/layout/InnerPageHero'
import Footer from '@/components/layout/Footer'
import styles from '@/components/layout/LegalLayout.module.css'

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
}

const stagger: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
        },
    },
}

export default function RiskDisclosureClient() {
    return (
        <div className={styles.page}>
            <InnerPageHero
                title="Risk"
                accentLine="Disclosure"
                subtitle="Understanding financial risks before you invest. Financial trading and investments involve significant risks."
                breadcrumbs={[{ label: 'Company', href: '/company' }, { label: 'Risk Disclosure' }]}
            />

            <main className={styles.main}>
                <section className={styles.section}>
                    <div className={styles.container}>
                        <motion.div
                            className={styles.content}
                            variants={stagger}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                        >
                            <motion.div className={styles.warningBox} variants={fadeUp}>
                                <strong>Important Risk Warning</strong>
                                <p>
                                    Trading CFDs carries significant risk of loss. Leverage can work against you. You may lose more than you invest. Ensure you fully understand the risks involved and seek independent financial advice if necessary.
                                </p>
                            </motion.div>

                            <motion.h2 variants={fadeUp}>Introduction</motion.h2>
                            <motion.p variants={fadeUp}>
                                At APFX Fintech, we believe in full transparency. Detailed below are the market, technical, and operational risks associated with financial trading. Users must carefully evaluate their financial situation before engaging with our platform.
                            </motion.p>

                            <motion.h2 variants={fadeUp}>Market Risks</motion.h2>
                            <motion.p variants={fadeUp}>
                                Financial markets are highly volatile. Prices can fluctuate rapidly due to geopolitical events, economic data releases, and market sentiment, leading to potential substantial losses.
                            </motion.p>

                            <motion.h2 variants={fadeUp}>No Guarantee of Returns</motion.h2>
                            <motion.p variants={fadeUp}>
                                APFX Fintech does not guarantee profits, specific returns, or successful outcomes of any financial activity. Past performance is not indicative of future results.
                            </motion.p>

                            <motion.h2 variants={fadeUp}>User Responsibility</motion.h2>
                            <motion.p variants={fadeUp}>
                                All investment decisions are made solely by the user. APFX Fintech does not provide financial advice, price predictions, or specific investment recommendations.
                            </motion.p>

                            <motion.h2 variants={fadeUp}>Leverage Risks</motion.h2>
                            <motion.p variants={fadeUp}>
                                Using leverage can magnify both profits and losses. It is a powerful tool that requires a deep understanding of margin requirements and risk management before use.
                            </motion.p>

                            <motion.h2 variants={fadeUp}>Technical Risks</motion.h2>
                            <motion.p variants={fadeUp}>
                                System outages, connectivity issues, or hardware failures may affect the execution of transactions. While we maintain redundant systems, technical risks are inherent in electronic trading.
                            </motion.p>

                            <motion.h2 variants={fadeUp}>Regulatory Considerations</motion.h2>
                            <motion.p variants={fadeUp}>
                                Users are responsible for ensuring compliance with local laws and regulations applicable to financial activities in their respective jurisdictions.
                            </motion.p>

                            <motion.h2 variants={fadeUp}>Acknowledgment</motion.h2>
                            <motion.p variants={fadeUp}>
                                By using the APFX Fintech platform, you acknowledge that you understand and accept all associated risks and are prepared for the possibility of financial loss.
                            </motion.p>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
