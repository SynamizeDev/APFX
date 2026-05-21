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

export default function PaymentDisclaimerClient() {
    return (
        <div className={styles.page}>
            <InnerPageHero
                title="Payment"
                accentLine="Disclaimer"
                subtitle="Information regarding transaction processing, potential delays, and applicable financial fees."
                breadcrumbs={[{ label: 'Company', href: '/company' }, { label: 'Payment Disclaimer' }]}
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
                            <motion.h2 variants={fadeUp}>Transaction & Processing Information</motion.h2>
                            
                            <motion.p variants={fadeUp}>
                                To ensure transparency in our financial operations, please note the following regarding payments and transfers:
                            </motion.p>

                            <motion.ul variants={stagger}>
                                <motion.li variants={fadeUp}>Processing times may vary depending on the chosen payment providers and geographical location.</motion.li>
                                <motion.li variants={fadeUp}>The Company is not responsible for delays, technical interruptions, or failures caused by third-party payment systems.</motion.li>
                                <motion.li variants={fadeUp}>Banking fees, intermediary bank charges, or blockchain network fees (gas fees) may apply depending on the payment method used.</motion.li>
                            </motion.ul>
                            
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
                                    Clients are advised to consult with their respective financial institutions or payment providers regarding specific fees and processing timeframes.
                                </p>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>
            </main>

        </div>
    )
}
