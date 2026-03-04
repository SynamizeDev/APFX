'use client'

import { motion } from 'framer-motion'
import InnerPageHero from '@/components/layout/InnerPageHero'
import Footer from '@/components/layout/Footer'
import BottomBar from '@/components/layout/BottomBar'
import styles from './LegalPage.module.css'

/* ──────────────────────────────────────────────────────────
   Motion system — restrained, formal, compliance-safe
   ────────────────────────────────────────────────────────── */
const fadeUp = {
    hidden: { opacity: 0, y: 22 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: 'easeOut' as const },
    },
}

const stagger = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
        },
    },
}

export default function PrivacyPage() {
    return (
        <div className={styles.page}>
            <InnerPageHero
                title="Privacy"
                accentLine="Policy"
                subtitle="Your privacy is fundamental to how we operate. This policy explains how APFX collects, uses, and safeguards your personal information across our global operations."
                breadcrumbs={[
                    { label: 'Legal', href: '/legal' },
                    { label: 'Privacy Policy' },
                ]}
            />

            <main className={styles.main}>
                <section className={`${styles.section} apfx-section`}>
                    <div className={styles.container}>
                        <motion.div
                            className={styles.content}
                            variants={stagger}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-80px' }}
                        >
                            <motion.h3 variants={fadeUp}>
                                1. Information Collection
                            </motion.h3>
                            <motion.p variants={fadeUp}>
                                We collect personal information that you voluntarily
                                provide when opening an account, accessing our
                                platforms, submitting forms, or communicating with
                                APFX. This may include identification, contact, and
                                transactional data required for regulatory and
                                operational purposes.
                            </motion.p>

                            <motion.h3 variants={fadeUp}>
                                2. Use of Information
                            </motion.h3>
                            <motion.p variants={fadeUp}>
                                Your information is used to deliver our services,
                                verify identity, manage accounts, process
                                transactions, enhance platform security, and meet
                                applicable legal, regulatory, and compliance
                                obligations.
                            </motion.p>

                            <motion.h3 variants={fadeUp}>
                                3. Data Protection
                            </motion.h3>
                            <motion.p variants={fadeUp}>
                                We employ industry-standard administrative,
                                technical, and physical safeguards to protect your
                                data against unauthorized access, alteration,
                                disclosure, or destruction. Access to personal data
                                is restricted to authorized personnel only.
                            </motion.p>

                            <motion.h3 variants={fadeUp}>
                                4. Disclosure to Third Parties
                            </motion.h3>
                            <motion.p variants={fadeUp}>
                                APFX does not sell or rent your personal information.
                                Data may be shared with trusted third parties,
                                including liquidity providers, technology partners,
                                and regulators, solely where necessary to provide
                                services or comply with legal requirements.
                            </motion.p>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
            <BottomBar />
        </div>
    )
}