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

export default function AMLKYCClient() {
    return (
        <div className={styles.page}>
            <InnerPageHero
                title="AML & KYC"
                accentLine="Policy"
                subtitle="Ensuring a secure and compliant trading environment through robust identity verification and activity monitoring."
                breadcrumbs={[{ label: 'Company', href: '/company' }, { label: 'AML & KYC Policy' }]}
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
                            <motion.h2 variants={fadeUp}>Client Verification Requirements</motion.h2>
                            <motion.p variants={fadeUp}>
                                To comply with international financial regulations, Clients may be required to provide:
                            </motion.p>
                            <motion.ul variants={stagger}>
                                <motion.li variants={fadeUp}>Government-issued ID</motion.li>
                                <motion.li variants={fadeUp}>Proof of address</motion.li>
                                <motion.li variants={fadeUp}>Selfie verification</motion.li>
                                <motion.li variants={fadeUp}>Source of funds documentation</motion.li>
                            </motion.ul>
                            <motion.p variants={fadeUp} style={{ marginTop: '1.5rem' }}>
                                The Company reserves the right to conduct enhanced due diligence where necessary.
                            </motion.p>

                            <motion.h2 variants={fadeUp} style={{ marginTop: '4rem' }}>Suspicious Activity Monitoring</motion.h2>
                            <motion.p variants={fadeUp}>
                                The Company monitors transactions to identify suspicious activity including:
                            </motion.p>
                            <motion.ul variants={stagger}>
                                <motion.li variants={fadeUp}>Unusual deposit patterns</motion.li>
                                <motion.li variants={fadeUp}>Third-party payments</motion.li>
                                <motion.li variants={fadeUp}>Fraud indicators</motion.li>
                                <motion.li variants={fadeUp}>Sanctions exposure</motion.li>
                            </motion.ul>
                            
                            <motion.div 
                                className={styles.warningBox} 
                                variants={fadeUp}
                                style={{ 
                                    marginTop: '3.5rem',
                                    background: 'rgba(239, 68, 68, 0.04)',
                                    borderColor: 'rgba(239, 68, 68, 0.2)'
                                }}
                            >
                                <p style={{ margin: 0, fontWeight: 'var(--fw-semibold)', color: 'var(--color-error)' }}>
                                    Accounts may be suspended pending review if suspicious activity is detected.
                                </p>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>
            </main>

        </div>
    )
}
