'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Linkedin, Send, Youtube, Sparkles } from 'lucide-react'
import Logo from '@/components/ui/Logo'
import styles from './Footer.module.css'

const FOOTER_LINKS = {
    Trading: [
        { label: 'Commodities', href: '/trade&invest/commodities' },
        { label: 'Indices', href: '/trade&invest/indices' },
        { label: 'Stocks (CFDs)', href: '/trade&invest/stocks' },
        { label: 'Cryptocurrencies', href: '/trade&invest/cryptocurrencies' },
        { label: 'Futures', href: '/trade&invest/futures' },
    ],
    Platforms: [
        { label: 'All Platforms', href: '/platforms' },
        { label: 'Web Terminal', href: '/platforms' },
        { label: 'TradingView', href: '/platforms' },
        { label: 'Mobile App', href: '/platforms' },
    ],
    Support: [
        { label: 'About Us', href: '/company/about-us' },
        { label: 'Support Center', href: '/support' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Contact', href: '/contact' },
    ],
}

const SOCIAL = [
    { label: 'LinkedIn', href: 'https://linkedin.com/company/apfx', icon: <Linkedin size={18} /> },
    { label: 'Telegram', href: 'https://t.me/apfx', icon: <Send size={18} /> },
    { label: 'YouTube', href: 'https://youtube.com/@apfx', icon: <Youtube size={18} /> },
]


export default function Footer() {
    return (
        <footer className={`${styles.footer} apfx-section apfx-section--no-divider`} role="contentinfo">


            {/* ── Main Columns ────────────────────────────────────── */}
            <div className={styles.main}>

                {/* Brand */}
                <div className={styles.brand}>
                    <Link href="/" aria-label="Home" style={{ display: 'inline-block' }}>
                        <Logo />
                    </Link>
                    <p className={styles.tagline}>
                        Institutional-grade trading for global investors.
                        Deep liquidity, tight spreads, and advanced technology.
                    </p>

                    {/* Newsletter */}
                    <div className={styles.newsletter}>
                        <h5 id="newsletter-heading">Stay Informed</h5>
                        <form
                            className={styles.newsletterForm}
                            aria-labelledby="newsletter-heading"
                            onSubmit={async (e) => {
                                e.preventDefault();
                                const form = e.currentTarget;
                                const emailInput = form.querySelector('input');
                                const email = emailInput?.value;
                                if (!email) return;

                                try {
                                    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
                                    const res = await fetch(`${apiUrl}/api/subscribe`, {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ email })
                                    });
                                    if (res.ok) {
                                        alert('Successfully subscribed!');
                                        form.reset();
                                    }
                                } catch (err) {
                                    // Silent fail or handle UI-side
                                }
                            }}
                        >
                            <label htmlFor="newsletter-email" className="sr-only">Email Address</label>
                            <input
                                id="newsletter-email"
                                type="email"
                                placeholder="Email Address"
                                required
                            />
                            <button type="submit" aria-label="Subscribe to newsletter">Join</button>
                        </form>
                    </div>

                    <div className={styles.social}>
                        {SOCIAL.map((s) => (
                            <a
                                key={s.label}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialLink}
                                aria-label={s.label}
                            >
                                {s.icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Nav columns */}
                {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
                    <div key={heading} className={styles.col}>
                        <h4>{heading}</h4>
                        <ul role="list">
                            {links.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} prefetch={true}>{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* ── Bottom bar ──────────────────────────────────────── */}
            <div className={styles.bottom}>
                <div className={styles.bottomInner}>
                    <span className={styles.copy}>
                        © {new Date().getFullYear()} APFX Limited. All rights reserved.
                    </span>
                    <nav className={styles.legal} aria-label="Legal navigation">
                        <Link href="/legal" prefetch={true}>Legal Documents</Link>
                        <Link href="/privacy-policy" prefetch={true}>Privacy Policy</Link>
                        <Link href="/terms-of-service" prefetch={true}>Terms & Conditions</Link>
                        <Link href="/risk-disclosure" prefetch={true}>Risk Disclosure</Link>
                        <Link href="/aml-kyc-policy" prefetch={true}>AML & KYC</Link>
                        <Link href="/cookie-policy" prefetch={true}>Cookie Policy</Link>
                        <Link href="/complaint-handling-policy" prefetch={true}>Complaint Handling</Link>
                        <Link href="/bonus-terms" prefetch={true}>Bonus Terms</Link>
                        <Link href="/deposit-withdrawal-policy" prefetch={true}>Deposit & Withdrawal</Link>
                        <Link href="/restricted-countries-policy" prefetch={true}>Restricted Countries</Link>
                        <Link href="/compliance-tips" prefetch={true}>Compliance Standards</Link>
                        <Link href="/high-risk-disclaimer" prefetch={true}>High-Risk Disclaimer</Link>
                        <Link href="/payment-disclaimer" prefetch={true}>Payment Disclaimer</Link>
                    </nav>
                </div>
                <div className={styles.disclosure}>
                    <p>
                        APFX Global Markets is operated by APFX Global Markets Ltd, an International Business
                        Company incorporated in Saint Lucia.
                    </p>
                    <p>
                        <span className={styles.disclosureLabel}>Risk Warning:</span> Trading leveraged
                        products such as forex and CFDs carries a high level of risk and may not be suitable
                        for all investors. You may lose all of your invested capital. Please ensure you fully
                        understand the risks involved before trading.
                    </p>
                    <p>
                        <span className={styles.disclosureLabel}>Restricted Jurisdictions:</span> APFX
                        Global Markets does not provide services to residents of jurisdictions where such
                        distribution or use would be contrary to local law or regulation.
                    </p>
                </div>
            </div>

        </footer>
    )
}
