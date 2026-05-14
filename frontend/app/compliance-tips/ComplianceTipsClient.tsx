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

export default function ComplianceTipsClient() {
    return (
        <div className={styles.page}>
            <InnerPageHero
                title="Operational"
                accentLine="Compliance"
                subtitle="Our commitment to operational excellence and transparency through rigorous internal standards and best practices."
                breadcrumbs={[{ label: 'Legal', href: '/legal' }, { label: 'Compliance Standards' }]}
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
                            <motion.h2 variants={fadeUp}>Internal Operational Standards</motion.h2>
                            
                            <motion.p variants={fadeUp}>
                                To maintain institutional credibility and ensure a secure trading environment, APFX Global Markets adheres to the following operational best practices:
                            </motion.p>

                            <motion.ul variants={stagger}>
                                <motion.li variants={fadeUp}><strong>KYC Records:</strong> We maintain comprehensive Know Your Customer documentation for all active clients.</motion.li>
                                <motion.li variants={fadeUp}><strong>Transaction Integrity:</strong> Every financial transaction is logged with immutable timestamps and audit trails.</motion.li>
                                <motion.li variants={fadeUp}><strong>Withdrawal Governance:</strong> All withdrawal requests undergo multi-tier approval recording before execution.</motion.li>
                                <motion.li variants={fadeUp}><strong>Activity Monitoring:</strong> Proactive real-time monitoring of account activity to identify and mitigate suspicious patterns.</motion.li>
                                <motion.li variants={fadeUp}><strong>Ethical Advertising:</strong> A strict commitment to avoid misleading information or unsubstantiated return claims.</motion.li>
                                <motion.li variants={fadeUp}><strong>Communication Archiving:</strong> Maintenance of full support communication history for quality and compliance auditing.</motion.li>
                                <motion.li variants={fadeUp}><strong>IB Documentation:</strong> Robust documentation and agreement management for all Introducing Broker partnerships.</motion.li>
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
                                    These standards are reviewed periodically to ensure alignment with international regulatory developments and institutional best practices.
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
