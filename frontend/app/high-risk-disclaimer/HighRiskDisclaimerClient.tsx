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

export default function HighRiskDisclaimerClient() {
    return (
        <div className={styles.page}>
            <InnerPageHero
                title="High-Risk"
                accentLine="Disclaimer"
                subtitle="A critical disclosure regarding the complex nature and significant risks associated with leveraged financial products."
                breadcrumbs={[{ label: 'Legal', href: '/legal' }, { label: 'High-Risk Disclaimer' }]}
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
                            <motion.h2 variants={fadeUp}>Understanding Leveraged Risk</motion.h2>
                            
                            <motion.p variants={fadeUp} style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-1)', fontWeight: 'var(--fw-medium)' }}>
                                Contracts for Difference (CFDs) and leveraged forex products are complex financial instruments with a high risk of losing money rapidly due to leverage.
                            </motion.p>

                            <motion.p variants={fadeUp}>
                                Retail traders should be aware that the vast majority of retail investor accounts lose money when trading CFDs. You should consider whether you understand how CFDs work and whether you can afford to take the high risk of losing your money.
                            </motion.p>

                            <motion.h2 variants={fadeUp} style={{ marginTop: '4rem' }}>Professional Advice & Responsibility</motion.h2>
                            <motion.p variants={fadeUp}>
                                Trading leveraged products may not be suitable for everyone. APFX Global Markets strongly recommends that all clients:
                            </motion.p>
                            <motion.ul variants={stagger}>
                                <motion.li variants={fadeUp}>Trade responsibly and only with capital they can afford to lose.</motion.li>
                                <motion.li variants={fadeUp}>Seek independent financial advice from a qualified professional if necessary.</motion.li>
                                <motion.li variants={fadeUp}>Fully educate themselves on market mechanics before committing significant funds.</motion.li>
                            </motion.ul>
                            
                            <motion.div 
                                className={styles.warningBox} 
                                variants={fadeUp}
                                style={{ 
                                    marginTop: '4rem',
                                    background: 'rgba(239, 68, 68, 0.05)',
                                    borderColor: 'rgba(239, 68, 68, 0.25)',
                                    color: 'var(--color-text-1)'
                                }}
                            >
                                <p style={{ margin: 0, fontWeight: 'var(--fw-semibold)', color: 'var(--color-error)' }}>
                                    Warning: The use of leverage can work against you as well as for you, and can lead to large losses as well as large gains.
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
