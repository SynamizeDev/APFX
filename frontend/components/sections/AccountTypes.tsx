'use client'

import Link from 'next/link'
import styles from './AccountTypes.module.css'

const ACCOUNTS = [
    {
        name: 'Standard',
        price: '0.0',
        suffix: 'Commission',
        features: [
            'Spreads from 1.0 pips',
            'No commissions',
            'Leverage up to 1:1000',
            'All platforms available',
            'Min. deposit: $100',
        ],
        cta: 'Get Started',
        featured: false,
    },
    {
        name: 'Premium',
        price: '3.5',
        suffix: 'per lot',
        features: [
            'Spreads from 0.0 pips',
            'Institutional liquidity',
            'Leverage up to 1:1000',
            'Deep liquidity pool',
            'Min. deposit: $500',
        ],
        badge: 'Most Popular',
        cta: 'Open Premium',
        featured: true,
    },
    {
        name: 'Elite',
        price: 'Custom',
        suffix: 'Solutions',
        features: [
            'Dedicated manager',
            'Volume rebates',
            'Custom API access',
            'Priority support',
            'Min. deposit: $25k',
        ],
        cta: 'Contact Sales',
        featured: false,
    },
]

export default function AccountTypes() {
    return (
        <section className={`${styles.section} apfx-section`} aria-labelledby="accounts-heading">
            <div className={styles.inner}>
                <header className={styles.header}>
                    <h2 id="accounts-heading" className={styles.title}>Account Structures Built Around Your Edge</h2>
                </header>

                <div className={styles.grid}>
                    {ACCOUNTS.map((acc) => (
                        <div key={acc.name} className={`${styles.card} ${acc.featured ? styles.cardFeatured : ''}`}>
                            {acc.badge && <span className={styles.badge}>{acc.badge}</span>}
                            <h3 className={styles.name}>{acc.name}</h3>
                            <div className={styles.price}>
                                {acc.price === 'Custom' ? acc.price : (
                                    <>
                                        <span>$</span>{acc.price}
                                    </>
                                )}
                                <span>{acc.suffix}</span>
                            </div>

                            <ul className={styles.features}>
                                {acc.features.map((f) => (
                                    <li key={f} className={styles.feature}>
                                        <span className={styles.check}>✓</span>
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href="/open-account"
                                className={`${styles.cta} ${acc.featured ? styles.ctaMain : styles.ctaOutline}`}
                            >
                                {acc.cta}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
