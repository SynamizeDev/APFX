'use client'

import { motion, Variants } from 'framer-motion'
import InnerPageHero from '@/components/layout/InnerPageHero'
import Footer from '@/components/layout/Footer'
import BottomBar from '@/components/layout/BottomBar'
import styles from '../privacy/LegalPage.module.css'

// Metadata moved to page.tsx (Server Component)

/* ──────────────────────────────────────────────────────────
   Motion system — formal, conservative, regulator-safe
   ────────────────────────────────────────────────────────── */
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: 'easeOut' },
    },
}

const stagger: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
        },
    },
}

export default function TermsPage() {
    return (
        <div className={styles.page}>
            <InnerPageHero
                title="Terms of"
                accentLine="Service"
                subtitle="These terms and conditions govern your access to and use of APFX’s services, platforms, and trading infrastructure."
                breadcrumbs={[
                    { label: 'Legal', href: '/legal' },
                    { label: 'Terms of Service' },
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
                                1. Acceptance of Terms
                            </motion.h3>
                            <motion.p variants={fadeUp}>
                                By accessing or using APFX’s services, platforms, or
                                related offerings, you acknowledge that you have
                                read, understood, and agreed to be bound by these
                                Terms of Service, together with all applicable laws,
                                regulations, and policies.
                            </motion.p>

                            <motion.h3 variants={fadeUp}>
                                2. Eligibility
                            </motion.h3>
                            <motion.p variants={fadeUp}>
                                To use our services, you must be at least 18 years
                                of age and possess the legal capacity to enter into
                                a binding agreement. You are responsible for ensuring
                                that your use of APFX’s services complies with the
                                laws and regulations applicable in your jurisdiction.
                            </motion.p>

                            <motion.h3 variants={fadeUp}>
                                3. Account Security
                            </motion.h3>
                            <motion.p variants={fadeUp}>
                                You are solely responsible for maintaining the
                                confidentiality of your account credentials and for
                                all activities conducted under your account. APFX
                                shall not be liable for any loss or damage arising
                                from unauthorized access resulting from your failure
                                to safeguard your login information.
                            </motion.p>

                            <motion.h3 variants={fadeUp}>
                                4. Prohibited Activities
                            </motion.h3>
                            <motion.p variants={fadeUp}>
                                You agree not to engage in any unlawful, fraudulent,
                                or abusive conduct when using our services. This
                                includes, but is not limited to, market manipulation,
                                misuse of trading systems, unauthorized access, or
                                any activity that may disrupt the integrity or
                                security of APFX’s platforms.
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