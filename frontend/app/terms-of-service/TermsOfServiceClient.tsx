'use client'

import { motion, Variants } from 'framer-motion'
import InnerPageHero from '@/components/layout/InnerPageHero'
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
            staggerChildren: 0.05,
        },
    },
}

export default function TermsOfServiceClient() {
    return (
        <div className={styles.page}>
            <InnerPageHero
                title="Terms &"
                accentLine="Conditions"
                subtitle="The legal framework governing your relationship with APFX Global Markets. Please read these terms carefully before using our services."
                breadcrumbs={[{ label: 'Company', href: '/company' }, { label: 'Terms & Conditions' }]}
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
                            <motion.h2 variants={fadeUp}>3.1 Acceptance of Terms</motion.h2>
                            <motion.p variants={fadeUp}>
                                By accessing this website or opening a trading account with APFX Global Markets, the Client agrees to be bound by these Terms and Conditions.
                            </motion.p>
                            <motion.p variants={fadeUp} style={{ color: 'var(--color-accent)', fontWeight: 'var(--fw-semibold)' }}>
                                If the Client does not agree with these Terms, the Client should not use the services.
                            </motion.p>

                            <motion.h2 variants={fadeUp}>3.2 Eligibility</motion.h2>
                            <motion.p variants={fadeUp}>Clients must:</motion.p>
                            <motion.ul variants={stagger}>
                                <motion.li variants={fadeUp}>Be at least 18 years old.</motion.li>
                                <motion.li variants={fadeUp}>Have legal capacity to enter into binding agreements.</motion.li>
                                <motion.li variants={fadeUp}>Comply with the laws of their country of residence.</motion.li>
                            </motion.ul>
                            <motion.p variants={fadeUp}>
                                The Company reserves the right to reject any account application at its sole discretion.
                            </motion.p>

                            <motion.h2 variants={fadeUp}>3.3 Restricted Jurisdictions</motion.h2>
                            <motion.p variants={fadeUp}>
                                APFX Global Markets does not offer services to residents of jurisdictions where forex or CFD trading is restricted or prohibited by local laws.
                            </motion.p>
                            <motion.p variants={fadeUp}>
                                The Company reserves the right to decline or terminate accounts from restricted jurisdictions.
                            </motion.p>

                            <motion.h2 variants={fadeUp}>3.4 Client Responsibility</motion.h2>
                            <motion.p variants={fadeUp}>Clients are responsible for:</motion.p>
                            <motion.ul variants={stagger}>
                                <motion.li variants={fadeUp}>Maintaining confidentiality of account credentials.</motion.li>
                                <motion.li variants={fadeUp}>Monitoring account activity.</motion.li>
                                <motion.li variants={fadeUp}>Ensuring sufficient margin.</motion.li>
                                <motion.li variants={fadeUp}>Understanding trading risks.</motion.li>
                            </motion.ul>
                            <motion.p variants={fadeUp}>
                                The Company shall not be liable for unauthorized access resulting from Client negligence.
                            </motion.p>

                            <motion.h2 variants={fadeUp}>3.5 Order Execution</motion.h2>
                            <motion.p variants={fadeUp}>
                                The Company shall use commercially reasonable efforts to execute Client orders.
                            </motion.p>
                            <motion.p variants={fadeUp}>However, the Client acknowledges that:</motion.p>
                            <motion.ul variants={stagger}>
                                <motion.li variants={fadeUp}>Prices may change rapidly.</motion.li>
                                <motion.li variants={fadeUp}>Slippage may occur.</motion.li>
                                <motion.li variants={fadeUp}>Execution delays may occur during market volatility.</motion.li>
                                <motion.li variants={fadeUp}>Market gaps may affect order execution.</motion.li>
                            </motion.ul>
                            <motion.p variants={fadeUp}>
                                The Company does not guarantee execution at requested prices.
                            </motion.p>

                            <motion.h2 variants={fadeUp}>3.6 Leverage</motion.h2>
                            <motion.p variants={fadeUp}>
                                Trading with leverage increases both potential profits and potential losses.
                            </motion.p>
                            <motion.p variants={fadeUp}>The Company reserves the right to:</motion.p>
                            <motion.ul variants={stagger}>
                                <motion.li variants={fadeUp}>Adjust leverage levels.</motion.li>
                                <motion.li variants={fadeUp}>Change margin requirements.</motion.li>
                                <motion.li variants={fadeUp}>Close positions due to insufficient margin.</motion.li>
                            </motion.ul>

                            <motion.h2 variants={fadeUp}>3.7 Margin Call & Stop Out</motion.h2>
                            <motion.p variants={fadeUp}>
                                Clients are responsible for monitoring margin levels.
                            </motion.p>
                            <motion.p variants={fadeUp}>
                                The Company may close open positions without prior notice if account equity falls below required margin thresholds.
                            </motion.p>

                            <motion.h2 variants={fadeUp}>3.8 Deposits & Withdrawals</motion.h2>
                            <motion.p variants={fadeUp}>
                                Clients must use payment methods registered in their own name.
                            </motion.p>
                            <motion.p variants={fadeUp}>The Company reserves the right to:</motion.p>
                            <motion.ul variants={stagger}>
                                <motion.li variants={fadeUp}>Request verification documents.</motion.li>
                                <motion.li variants={fadeUp}>Reject suspicious transactions.</motion.li>
                                <motion.li variants={fadeUp}>Delay withdrawals pending compliance checks.</motion.li>
                            </motion.ul>
                            <motion.p variants={fadeUp}>
                                Withdrawals may be processed only to verified payment sources belonging to the Client.
                            </motion.p>

                            <motion.h2 variants={fadeUp}>3.9 Anti-Money Laundering (AML)</motion.h2>
                            <motion.p variants={fadeUp}>
                                The Company complies with anti-money laundering procedures and may require identity verification at any time.
                            </motion.p>
                            <motion.p variants={fadeUp}>The Company reserves the right to:</motion.p>
                            <motion.ul variants={stagger}>
                                <motion.li variants={fadeUp}>Request additional documentation.</motion.li>
                                <motion.li variants={fadeUp}>Reject transactions.</motion.li>
                                <motion.li variants={fadeUp}>Suspend or terminate accounts.</motion.li>
                                <motion.li variants={fadeUp}>Report suspicious activity to relevant authorities.</motion.li>
                            </motion.ul>

                            <motion.h2 variants={fadeUp}>3.10 Prohibited Trading Practices</motion.h2>
                            <motion.p variants={fadeUp}>
                                The following activities may result in account suspension or termination:
                            </motion.p>
                            <motion.ul variants={stagger}>
                                <motion.li variants={fadeUp}>Arbitrage abuse</motion.li>
                                <motion.li variants={fadeUp}>Latency exploitation</motion.li>
                                <motion.li variants={fadeUp}>Market manipulation</motion.li>
                                <motion.li variants={fadeUp}>Bonus abuse</motion.li>
                                <motion.li variants={fadeUp}>Use of unauthorized trading software</motion.li>
                                <motion.li variants={fadeUp}>Fraudulent activity</motion.li>
                            </motion.ul>
                            <motion.p variants={fadeUp}>
                                The Company reserves the right to void trades resulting from abusive trading practices.
                            </motion.p>

                            <motion.h2 variants={fadeUp}>3.11 Bonuses & Promotions</motion.h2>
                            <motion.p variants={fadeUp}>
                                Promotional offers are subject to separate terms and conditions.
                            </motion.p>
                            <motion.p variants={fadeUp}>The Company reserves the right to:</motion.p>
                            <motion.ul variants={stagger}>
                                <motion.li variants={fadeUp}>Modify promotions.</motion.li>
                                <motion.li variants={fadeUp}>Cancel bonuses.</motion.li>
                                <motion.li variants={fadeUp}>Restrict withdrawals related to abuse.</motion.li>
                            </motion.ul>

                            <motion.h2 variants={fadeUp}>3.12 Limitation of Liability</motion.h2>
                            <motion.p variants={fadeUp}>The Company shall not be liable for:</motion.p>
                            <motion.ul variants={stagger}>
                                <motion.li variants={fadeUp}>Indirect losses</motion.li>
                                <motion.li variants={fadeUp}>Consequential damages</motion.li>
                                <motion.li variants={fadeUp}>Loss of profits</motion.li>
                                <motion.li variants={fadeUp}>Technical interruptions</motion.li>
                                <motion.li variants={fadeUp}>Market volatility</motion.li>
                                <motion.li variants={fadeUp}>Internet failures</motion.li>
                                <motion.li variants={fadeUp}>Third-party system failures</motion.li>
                            </motion.ul>

                            <motion.h2 variants={fadeUp}>3.13 Intellectual Property</motion.h2>
                            <motion.p variants={fadeUp}>
                                All website content, logos, graphics, and materials remain the intellectual property of APFX Global Markets.
                            </motion.p>
                            <motion.p variants={fadeUp}>
                                Unauthorized use is prohibited.
                            </motion.p>

                            <motion.h2 variants={fadeUp}>3.14 Account Suspension & Termination</motion.h2>
                            <motion.p variants={fadeUp}>
                                The Company reserves the right to suspend or terminate accounts at its discretion, particularly in cases involving:
                            </motion.p>
                            <motion.ul variants={stagger}>
                                <motion.li variants={fadeUp}>Fraud</motion.li>
                                <motion.li variants={fadeUp}>AML concerns</motion.li>
                                <motion.li variants={fadeUp}>Regulatory violations</motion.li>
                                <motion.li variants={fadeUp}>Abusive trading behavior</motion.li>
                            </motion.ul>

                            <motion.h2 variants={fadeUp}>3.15 Governing Law</motion.h2>
                            <motion.p variants={fadeUp}>
                                These Terms shall be governed by the laws applicable to the Company’s jurisdiction of incorporation.
                            </motion.p>
                        </motion.div>
                    </div>
                </section>
            </main>

        </div>
    )
}

