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
            staggerChildren: 0.1,
        },
    },
}

export default function DepositWithdrawalClient() {
    return (
        <div className={styles.page}>
            <InnerPageHero
                title="Deposit &"
                accentLine="Withdrawal"
                subtitle="Guidelines for funding your account and withdrawing your capital securely and efficiently."
                breadcrumbs={[{ label: 'Legal', href: '/legal' }, { label: 'Deposit & Withdrawal' }]}
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
                            <motion.h2 variants={fadeUp}>Deposit Procedures</motion.h2>
                            <motion.p variants={fadeUp}>
                                Clients can fund their trading accounts using a variety of secure payment methods. All deposits must originate from an account held in the client&apos;s own name.
                            </motion.p>
                            <motion.ul variants={stagger}>
                                <motion.li variants={fadeUp}>Bank Wire Transfers</motion.li>
                                <motion.li variants={fadeUp}>Credit/Debit Cards (Visa, Mastercard)</motion.li>
                                <motion.li variants={fadeUp}>Cryptocurrency Deposits (USDT, BTC, ETH)</motion.li>
                                <motion.li variants={fadeUp}>E-wallets (Skrill, Neteller)</motion.li>
                            </motion.ul>

                            <motion.h2 variants={fadeUp} style={{ marginTop: '4rem' }}>Withdrawal Requirements</motion.h2>
                            <motion.p variants={fadeUp}>
                                To ensure the security of client funds and comply with AML regulations, withdrawals are processed back to the original source of funding wherever possible.
                            </motion.p>
                            <motion.ul variants={stagger}>
                                <motion.li variants={fadeUp}>Withdrawals are typically processed within 24-48 business hours.</motion.li>
                                <motion.li variants={fadeUp}>Accounts must be fully verified (KYC) before a withdrawal can be initiated.</motion.li>
                                <motion.li variants={fadeUp}>Third-party withdrawals are strictly prohibited.</motion.li>
                            </motion.ul>

                            <motion.h2 variants={fadeUp} style={{ marginTop: '4rem' }}>Fees & Processing</motion.h2>
                            <motion.p variants={fadeUp}>
                                While APFX Global Markets does not charge internal fees for deposits, please be aware that your bank or payment provider may apply transaction fees. 
                            </motion.p>
                            
                            <motion.div 
                                className={styles.warningBox} 
                                variants={fadeUp}
                                style={{ 
                                    marginTop: '4rem',
                                    background: 'rgba(54, 249, 54, 0.03)',
                                    borderColor: 'var(--color-border-2)',
                                    color: 'var(--color-text-2)'
                                }}
                            >
                                <p style={{ margin: 0, fontSize: 'var(--text-sm)' }}>
                                    For detailed information on specific payment methods and processing times, please refer to our <a href="/payment-disclaimer" style={{ color: 'var(--color-accent)', fontWeight: 'var(--fw-semibold)' }}>Payment Disclaimer</a>.
                                </p>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>
            </main>

        </div>
    )
}
