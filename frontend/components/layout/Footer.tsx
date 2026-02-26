'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Twitter, Linkedin, Send, Youtube, Sparkles } from 'lucide-react'
import styles from './Footer.module.css'

interface StatItem {
    value: number
    prefix?: string
    suffix: string
    label: string
    decimals?: number
}

const STATS: StatItem[] = [
    { value: 2, prefix: '$', suffix: 'B+', label: 'Trading Volume' },
    { value: 150, suffix: '+', label: 'Countries Served' },
    { value: 27, suffix: 'K+', label: 'Instruments' },
    { value: 99.9, suffix: '%', label: 'Uptime SLA', decimals: 1 },
]

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

function AnimatedCounter({ stat }: { stat: StatItem }) {
    const ref = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (prefersReduced) {
            el.textContent = `${stat.prefix ?? ''}${stat.value.toFixed(stat.decimals ?? 0)}${stat.suffix}`
            return
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return
                observer.disconnect()

                const start = performance.now()
                const duration = 2000
                const from = 0
                const to = stat.value

                function step(now: number) {
                    const elapsed = now - start
                    const progress = Math.min(elapsed / duration, 1)
                    // expo out easing
                    const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
                    const current = from + (to - from) * eased
                    el!.textContent = `${stat.prefix ?? ''}${current.toFixed(stat.decimals ?? 0)}${stat.suffix}`
                    if (progress < 1) requestAnimationFrame(step)
                }

                requestAnimationFrame(step)
            },
            { threshold: 0.5 }
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [stat])

    return <span ref={ref} className={styles.statValue}>0</span>
}

export default function Footer() {
    return (
        <footer className={`${styles.footer} apfx-section apfx-section--no-divider`} role="contentinfo">

            {/* ── Stats Bar ───────────────────────────────────────── */}
            <div className={styles.statsBar}>
                <div className={styles.statsGrid}>
                    {STATS.map((stat) => (
                        <div key={stat.label} className={styles.stat}>
                            <AnimatedCounter stat={stat} />
                            <span className={styles.statLabel}>{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>

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
