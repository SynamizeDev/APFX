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

export default function TermsOfServiceClient() {
    return (
        <div className={styles.page}>
            <InnerPageHero
                title="Terms of"
                accentLine="Service"
                subtitle="Guidelines for using our platform responsibly. These terms govern your use of our platform and services."
                breadcrumbs={[{ label: 'Company', href: '/company' }, { label: 'Terms of Service' }]}
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
                            <motion.h2 variants={fadeUp}>Introduction</motion.h2>
                            <motion.p variants={fadeUp}>
                                By accessing or using APFX Fintech, you agree to comply with these Terms of Service. These terms form a legally binding agreement between you and APFX Fintech.
                            </motion.p>

                            <motion.h2 variants={fadeUp}>User Responsibilities</motion.h2>
                            <motion.p variants={fadeUp}>
                                To maintain a secure and efficient trading environment, all users agree to:
                            </motion.p>
                            <motion.ul variants={fadeUp}>
                                <li>Provide accurate, current, and complete information during registration</li>
                                <li>Use the platform in strict compliance with applicable local and international laws</li>
                                <li>Maintain the absolute confidentiality of account credentials and security keys</li>
                            </motion.ul>

                            <motion.h2 variants={fadeUp}>Account Security</motion.h2>
                            <motion.p variants={fadeUp}>
                                You are solely responsible for all activities conducted under your account. Any unauthorized use or suspicion of a security breach should be reported to our support team immediately.
                            </motion.p>

                            <motion.h2 variants={fadeUp}>Prohibited Activities</motion.h2>
                            <motion.p variants={fadeUp}>
                                Users must not engage in activities that compromise the integrity or performance of APFX Fintech:
                            </motion.p>
                            <motion.ul variants={fadeUp}>
                                <li>Attempt unauthorized access to systems, data, or other user accounts</li>
                                <li>Engage in fraudulent, deceptive, or manipulative trading practices</li>
                                <li>Interfere with platform performance, security, or underlying infrastructure</li>
                                <li>Use automated systems to extract data without explicit written permission</li>
                            </motion.ul>

                            <motion.h2 variants={fadeUp}>Service Availability</motion.h2>
                            <motion.p variants={fadeUp}>
                                While we strive for high availability and low latency, we do not guarantee uninterrupted service. Scheduled maintenance or technical issues may cause temporary disruptions.
                            </motion.p>

                            <motion.h2 variants={fadeUp}>Limitation of Liability</motion.h2>
                            <motion.p variants={fadeUp}>
                                APFX Fintech shall not be held liable for any direct or indirect losses, including financial losses or opportunity costs, arising from the use of our platform or services.
                            </motion.p>

                            <motion.h2 variants={fadeUp}>Termination</motion.h2>
                            <motion.p variants={fadeUp}>
                                We reserve the right to suspend or terminate accounts that violate these terms, pose a risk to the platform, or are subject to regulatory investigations.
                            </motion.p>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
