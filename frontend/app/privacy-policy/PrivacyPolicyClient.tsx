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
            staggerChildren: 0.08,
        },
    },
}

export default function PrivacyPolicyClient() {
    return (
        <div className={styles.page}>
            <InnerPageHero
                title="Privacy"
                accentLine="Policy"
                subtitle="Your data privacy and security are our top priority. Learn how APFX Global Markets collects, uses, and protects your information."
                breadcrumbs={[{ label: 'Company', href: '/company' }, { label: 'Privacy Policy' }]}
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
                            <motion.h2 variants={fadeUp}>Collection of Information</motion.h2>
                            <motion.p variants={fadeUp}>
                                The Company may collect various types of information to provide and improve our services, including:
                            </motion.p>
                            <motion.ul variants={stagger}>
                                <motion.li variants={fadeUp}>Name</motion.li>
                                <motion.li variants={fadeUp}>Address</motion.li>
                                <motion.li variants={fadeUp}>Contact details</motion.li>
                                <motion.li variants={fadeUp}>Financial information</motion.li>
                                <motion.li variants={fadeUp}>Device and IP information</motion.li>
                            </motion.ul>

                            <motion.h2 variants={fadeUp} style={{ marginTop: '4rem' }}>Use of Information</motion.h2>
                            <motion.p variants={fadeUp}>
                                Information collected may be used for several critical operations:
                            </motion.p>
                            <motion.ul variants={stagger}>
                                <motion.li variants={fadeUp}>Account verification</motion.li>
                                <motion.li variants={fadeUp}>Compliance purposes</motion.li>
                                <motion.li variants={fadeUp}>Transaction processing</motion.li>
                                <motion.li variants={fadeUp}>Customer support</motion.li>
                                <motion.li variants={fadeUp}>Security monitoring</motion.li>
                            </motion.ul>

                            <motion.h2 variants={fadeUp} style={{ marginTop: '4rem' }}>Data Protection</motion.h2>
                            <motion.p variants={fadeUp}>
                                The Company takes reasonable measures, including high-level encryption and secure server protocols, to protect client information from unauthorized access, loss, or disclosure.
                            </motion.p>
                            
                            <motion.div 
                                className={styles.warningBox} 
                                variants={fadeUp}
                                style={{ 
                                    marginTop: '4rem',
                                    background: 'rgba(54, 249, 54, 0.03)',
                                    borderColor: 'var(--color-accent-glow)',
                                    color: 'var(--color-text-1)'
                                }}
                            >
                                <p style={{ margin: 0, fontWeight: 'var(--fw-semibold)' }}>
                                    Your trust is our most valuable asset. We are committed to maintaining the highest standards of data security and transparency.
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

