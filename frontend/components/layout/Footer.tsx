'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Twitter, Linkedin, Send, Youtube, Sparkles } from 'lucide-react'
import styles from './Footer.module.css'

const FOOTER_LINKS = {
    Trading: [
        { label: 'Forex', href: '/markets/forex' },
        { label: 'Commodities', href: '/markets/commodities' },
        { label: 'Indices', href: '/markets/indices' },
        { label: 'Metals', href: '/markets/metals' },
        { label: 'Stocks', href: '/markets/stocks' },
    ],
    Platforms: [
        { label: 'MetaTrader 4', href: '/platforms/mt4' },
        { label: 'MetaTrader 5', href: '/platforms/mt5' },
        { label: 'WebTrader', href: '/platforms/webtrader' },
        { label: 'Mobile App', href: '/platforms/mobile' },
        { label: 'Copy Trading', href: '/platforms/copy-trading' },
    ],
    Company: [
        { label: 'About APFX', href: '/about' },
        { label: 'Regulation', href: '/about/regulation' },
        { label: 'Careers', href: '/about/careers' },
        { label: 'News', href: '/news' },
        { label: 'Contact', href: '/contact' },
    ],
    Support: [
        { label: 'Help Center', href: '/support' },
        { label: 'Open Account', href: 'https://portal.apfx.com/register' },
        { label: 'Deposit', href: 'https://portal.apfx.com/deposit' },
        { label: 'IB Program', href: '/partners' },
        { label: 'FAQ', href: '/faq' },
    ],
}

const SOCIAL = [
    { label: 'X', href: 'https://twitter.com/apfx', icon: <Twitter size={18} /> },
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
                    <Link href="/" className={styles.footerLogo}>
                        <span className={styles.logoMark} aria-hidden="true">
                            <Sparkles className={styles.logoIcon} />
                        </span>
                        <span className={styles.logoWordmark}>
                            <span className={styles.logoPrefix}>AP</span>
                            <span className={styles.logoFx}>FX</span>
                        </span>
                    </Link>
                    <p className={styles.tagline}>
                        Institutional-grade trading for every investor.
                        Deep liquidity, tight spreads, zero compromise.
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
                                    console.error('Subscription failed', err);
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
                                <li key={link.href}>
                                    <Link href={link.href}>{link.label}</Link>
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
                        <Link href="/legal/privacy">Privacy Policy</Link>
                        <Link href="/legal/terms">Terms of Service</Link>
                        <Link href="/legal/risk-disclosure">Risk Disclosure</Link>
                    </nav>
                </div>
                <p className={styles.disclaimer}>
                    Risk Warning: Trading CFDs carries significant risk of loss. Leverage can work against you.
                    You may lose more than you invest. Ensure you fully understand the risks involved and seek
                    independent financial advice if necessary. APFX Limited is regulated and authorised.
                    Past performance is not indicative of future results.
                </p>
            </div>

        </footer>
    )
}
