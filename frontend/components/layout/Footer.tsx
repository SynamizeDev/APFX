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
        { label: 'Success Stories', href: '/company/success-stories' },
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
                <div className={styles.disclosure}>
                    <p>
                        APFX is the trading names of APFX Global Markets Ltd, which is regulated by the Saint Lucia Financial Services Regulatory Authority.
                    </p>
                    <p>
                        <span className={styles.disclosureLabel}>Risk Warning:</span> Trading in securities involves significant risk. Prices may fluctuate and securities can become entirely valueless. You may incur losses that exceed your potential profits, and in some cases, losses may exceed the amount you have deposited. Securities, futures, options, and contracts for differences are complex financial instruments and are not suitable for all investors. Engaging in such transactions requires a sound understanding of the associated risks. Please read and ensure you fully understand our <Link href="/risk-disclosure" className={styles.accentLink}>Risk Disclosure</Link>.
                    </p>
                    <p>
                        Our leverage is dynamic and may change at any time. Such changes may affect your positions and margin requirements. You are responsible for monitoring your positions and maintaining sufficient margin at all times.
                    </p>
                    <p>
                        <span className={styles.disclosureLabel}>Restricted Countries:</span> APFX Global Markets Ltd does not provide services for residents of certain countries such as the United States, Iran, North Korea, Syria, Sudan and Cuba or a country where such distribution or use would be contrary to local law or regulation.
                    </p>
                    <p>
                        You must be 18 years old, or of legal age as determined in your country. Upon registering an account with APFX Global Markets Ltd, you acknowledge that you are registering <span className={styles.underline}>at your own free will, without solicitation on behalf of APFX Global Markets Ltd</span>.
                    </p>
                    <p>
                        APFX Global Markets Ltd does not direct its website and services to any individual in any country in which the use of its website and services are prohibited by local laws or regulations. When accessing this website from a country in which its use may or may not be prohibited, it is the user&apos;s <span className={styles.underline}>responsibility to ensure that any use of the website or services adheres to local laws or regulations</span>. APFX Global Markets Ltd does not affirm that the information on its website is suitable for all jurisdictions.
                    </p>

                    <nav className={styles.legalNav} aria-label="Legal navigation">
                        <Link href="/legal">Legal Documents</Link>
                        <Link href="/privacy-policy">Privacy Policy</Link>
                        <Link href="/terms-of-service">Terms & Conditions</Link>
                        <Link href="/risk-disclosure">Risk Disclosure</Link>
                        <Link href="/aml-kyc-policy">AML & KYC</Link>
                        <Link href="/cookie-policy">Cookie Policy</Link>
                        <Link href="/complaint-handling-policy">Complaint Handling</Link>
                        <Link href="/bonus-terms">Bonus Terms</Link>
                        <Link href="/deposit-withdrawal-policy">Deposit & Withdrawal</Link>
                        <Link href="/restricted-countries-policy">Restricted Countries</Link>
                        <Link href="/compliance-tips">Compliance Standards</Link>
                        <Link href="/high-risk-disclaimer">High-Risk Disclaimer</Link>
                        <Link href="/payment-disclaimer">Payment Disclaimer</Link>
                    </nav>
                </div>

                <div className={styles.bottomInner}>
                    <span className={styles.copy}>
                        © {new Date().getFullYear()} APFX Global Markets Ltd | All rights reserved.
                    </span>
                </div>
            </div>

        </footer>
    )
}
