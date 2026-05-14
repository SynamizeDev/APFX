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

export default function BonusTermsClient() {
    return (
        <div className={styles.page}>
            <InnerPageHero
                title="Bonus"
                accentLine="Terms"
                subtitle="Understanding the guidelines and requirements for our promotional offers and bonus programs."
                breadcrumbs={[{ label: 'Company', href: '/company' }, { label: 'Bonus Terms' }]}
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
                            <motion.h2 variants={fadeUp}>Bonus Terms & Conditions</motion.h2>
                            
                            <motion.p variants={fadeUp}>
                                Promotional offers and bonuses are designed to enhance your trading experience. Please note the following general terms:
                            </motion.p>

                            <motion.ul variants={stagger}>
                                <motion.li variants={fadeUp}>Bonus funds may not be immediately withdrawable.</motion.li>
                                <motion.li variants={fadeUp}>The Company may impose trading volume requirements before withdrawals are permitted.</motion.li>
                                <motion.li variants={fadeUp}>The Company reserves the right to cancel bonuses in cases of abuse or fraudulent activity.</motion.li>
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
                                    Each promotional offer may have its own specific terms and conditions. Please refer to the specific documentation provided with each offer.
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
