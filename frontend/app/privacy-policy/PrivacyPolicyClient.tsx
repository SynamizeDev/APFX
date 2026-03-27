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

export default function PrivacyPolicyClient() {
    return (
        <div className={styles.page}>
            <InnerPageHero
                title="Privacy"
                accentLine="Policy"
                subtitle="Your data privacy and security are our priority. At APFX Fintech, we are committed to protecting your privacy and ensuring transparency in how your information is handled."
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
                            <motion.h2 variants={fadeUp}>Introduction</motion.h2>
                            <motion.p variants={fadeUp}>
                                This Privacy Policy outlines how we collect, use, and safeguard your data when you use our platform. By accessing APFX Fintech, you entrust us with your information, and we take this responsibility seriously.
                            </motion.p>

                            <motion.h2 variants={fadeUp}>Information We Collect</motion.h2>
                            <motion.p variants={fadeUp}>
                                We may collect the following types of information to provide and improve our services:
                            </motion.p>
                            <motion.ul variants={fadeUp}>
                                <li>Personal information such as name, email address, phone number</li>
                                <li>Account and transaction-related data</li>
                                <li>Device and browser information (IP address, OS, browser type)</li>
                                <li>Usage data including interactions with our platform</li>
                            </motion.ul>

                            <motion.h2 variants={fadeUp}>How We Use Your Information</motion.h2>
                            <motion.p variants={fadeUp}>
                                We use your information to ensure a seamless and secure experience:
                            </motion.p>
                            <motion.ul variants={fadeUp}>
                                <li>Provide, operate, and maintain our services</li>
                                <li>Improve user experience and platform performance</li>
                                <li>Communicate important updates, alerts, and notifications</li>
                                <li>Enhance security and prevent fraudulent activities</li>
                            </motion.ul>

                            <motion.h2 variants={fadeUp}>Data Protection and Security</motion.h2>
                            <motion.p variants={fadeUp}>
                                We implement industry-standard security measures including high-grade encryption, secure servers, and strict access controls to protect your data against unauthorized access, alteration, or disclosure.
                            </motion.p>

                            <motion.h2 variants={fadeUp}>Third-Party Services</motion.h2>
                            <motion.p variants={fadeUp}>
                                We may engage trusted third-party services for analytics, communication, and infrastructure. These providers are bound by strict confidentiality and data protection standards.
                            </motion.p>

                            <motion.h2 variants={fadeUp}>Cookies and Tracking</motion.h2>
                            <motion.p variants={fadeUp}>
                                We use cookies and similar technologies to enhance your browsing experience, analyze traffic patterns, and personalize content delivery.
                            </motion.p>

                            <motion.h2 variants={fadeUp}>User Rights</motion.h2>
                            <motion.p variants={fadeUp}>
                                You have the right to access your personal data, request correction or deletion, and withdraw consent where applicable under global privacy regulations.
                            </motion.p>

                            <motion.h2 variants={fadeUp}>Policy Updates</motion.h2>
                            <motion.p variants={fadeUp}>
                                We may update this Privacy Policy periodically. Any changes will be reflected on this page with an updated effective date.
                            </motion.p>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
