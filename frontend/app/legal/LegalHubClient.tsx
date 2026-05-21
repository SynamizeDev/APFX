'use client'

import { motion, Variants } from 'framer-motion'
import Link from 'next/link'
import InnerPageHero from '@/components/layout/InnerPageHero'
import styles from './LegalHub.module.css'

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

const legalLinks = [
    {
        title: 'Terms & Conditions',
        description: 'The primary agreement governing your use of our platform and services.',
        href: '/terms-of-service',
        icon: '📄',
    },
    {
        title: 'Risk Disclosure',
        description: 'Important warnings regarding the risks of trading leveraged financial instruments.',
        href: '/risk-disclosure',
        icon: '⚠️',
    },
    {
        title: 'AML & KYC Policy',
        description: 'Our procedures for preventing money laundering and verifying client identities.',
        href: '/aml-kyc-policy',
        icon: '🛡️',
    },
    {
        title: 'Privacy Policy',
        description: 'How we collect, use, and protect your personal and financial information.',
        href: '/privacy-policy',
        icon: '🔒',
    },
    {
        title: 'Cookie Policy',
        description: 'Information about how we use cookies to improve your browsing experience.',
        href: '/cookie-policy',
        icon: '🍪',
    },
    {
        title: 'Complaint Handling',
        description: 'Our formal process for receiving, investigating, and resolving client complaints.',
        href: '/complaint-handling-policy',
        icon: '⚖️',
    },
    {
        title: 'Bonus Terms',
        description: 'The specific rules and volume requirements for promotional offers.',
        href: '/bonus-terms',
        icon: '🎁',
    },
    {
        title: 'Payment Disclaimer',
        description: 'Disclosures regarding transaction processing times and potential fees.',
        href: '/payment-disclaimer',
        icon: '💳',
    },
    {
        title: 'Restricted Countries',
        description: 'Information on jurisdictions where our services are not available.',
        href: '/restricted-countries-policy',
        icon: '🚫',
    },
    {
        title: 'Compliance Standards',
        description: 'Our internal operational best practices and commitment to transparency.',
        href: '/compliance-tips',
        icon: '📋',
    },
    {
        title: 'High-Risk Disclaimer',
        description: 'Critical warnings regarding the significant risks of leveraged financial products.',
        href: '/high-risk-disclaimer',
        icon: '🚨',
    },
]

export default function LegalHubClient() {
    return (
        <div className={styles.page}>
            <InnerPageHero
                title="Legal"
                accentLine="Documents"
                subtitle="A comprehensive repository of all policies, agreements, and disclosures governing APFX Global Markets."
                breadcrumbs={[{ label: 'Legal' }]}
            />

            <main className={styles.main}>
                <section className={styles.section}>
                    <div className={styles.container}>
                        <motion.div
                            className={styles.grid}
                            variants={stagger}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                        >
                            {legalLinks.map((link) => (
                                <motion.div key={link.href} variants={fadeUp}>
                                    <Link href={link.href} className={styles.card}>
                                        <div className={styles.icon}>{link.icon}</div>
                                        <div className={styles.content}>
                                            <h3>{link.title}</h3>
                                            <p>{link.description}</p>
                                        </div>
                                        <div className={styles.arrow}>→</div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            </main>

        </div>
    )
}
