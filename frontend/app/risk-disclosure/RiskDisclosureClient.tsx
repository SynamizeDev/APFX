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
                                <strong>Risk Disclosure Statement</strong>
                                <p>
                                    Trading foreign exchange (Forex), Contracts for Difference (CFDs), commodities, indices, cryptocurrencies, and other leveraged financial instruments involves significant risk and may not be suitable for all investors.
                                </p>
                            </motion.div>

                            <motion.p variants={fadeUp}>
                                Clients should carefully consider their investment objectives, level of experience, and risk appetite before trading.
                            </motion.p>

                            <motion.p variants={fadeUp}>
                                The use of leverage can work both for and against you. Market volatility may result in substantial losses, including the loss of your entire deposited capital.
                            </motion.p>

                            <motion.p variants={fadeUp}>
                                Past performance is not indicative of future results.
                            </motion.p>

                            <motion.p variants={fadeUp}>
                                APFX Global Markets does not guarantee profits or protection from losses.
                            </motion.p>

                            <motion.h3 variants={fadeUp} style={{ marginTop: '3rem', marginBottom: '1.5rem' }}>
                                Clients acknowledge that:
                            </motion.h3>

                            <motion.ul variants={stagger} style={{ marginBottom: '3rem' }}>
                                <motion.li variants={fadeUp}>Prices may fluctuate rapidly.</motion.li>
                                <motion.li variants={fadeUp}>Slippage and execution delays may occur.</motion.li>
                                <motion.li variants={fadeUp}>Trading during volatile market conditions may increase risk.</motion.li>
                                <motion.li variants={fadeUp}>Technical failures may affect trading activity.</motion.li>
                                <motion.li variants={fadeUp}>Leveraged trading amplifies both gains and losses.</motion.li>
                            </motion.ul>

                            <motion.h3 variants={fadeUp} style={{ marginTop: '3rem', marginBottom: '1.5rem' }}>
                                Restricted Jurisdictions
                            </motion.h3>

                            <motion.p variants={fadeUp}>
                                APFX Global Markets does not provide services to residents of jurisdictions where the offering of leveraged financial products or CFD trading would be contrary to local laws or regulations.
                            </motion.p>

                            <motion.p variants={fadeUp}>
                                The Company does not accept clients from certain jurisdictions, including but not limited to:
                            </motion.p>

                            <motion.ul variants={stagger} style={{ marginBottom: '1.5rem' }}>
                                <motion.li variants={fadeUp}>United States</motion.li>
                                <motion.li variants={fadeUp}>Iran</motion.li>
                                <motion.li variants={fadeUp}>North Korea</motion.li>
                                <motion.li variants={fadeUp}>Syria</motion.li>
                                <motion.li variants={fadeUp}>Sudan</motion.li>
                                <motion.li variants={fadeUp}>Cuba</motion.li>
                            </motion.ul>

                            <motion.p variants={fadeUp}>
                                The Company reserves the right to decline account applications or suspend services at its sole discretion in order to comply with applicable laws, sanctions, anti-money laundering obligations, or internal compliance policies.
                            </motion.p>

                            <motion.p variants={fadeUp} style={{ marginBottom: '3rem' }}>
                                It is the Client’s responsibility to ensure that accessing and using the Company’s services is permitted under the laws of their country of residence.
                            </motion.p>

                            <motion.div 
                                className={styles.warningBox} 
                                variants={fadeUp}
                                style={{ 
                                    background: 'rgba(255, 255, 255, 0.03)', 
                                    borderColor: 'var(--color-border-2)',
                                    color: 'var(--color-text-1)',
                                    marginBottom: 0
                                }}
                            >
                                <p style={{ margin: 0, fontSize: 'var(--text-lg)', fontWeight: 'var(--fw-semibold)', color: 'var(--color-accent)' }}>
                                    Clients should not trade with money they cannot afford to lose.
                                </p>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}

