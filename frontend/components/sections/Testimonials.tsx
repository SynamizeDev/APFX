'use client'

import { Star } from 'lucide-react'
import styles from './Testimonials.module.css'

const REVIEWS = [
    // ... (rest of REVIEWS unchanged)
    {
        quote: "APFX has transformed my trading. The execution speed is incredible — no slippage, no requotes. I moved my entire portfolio here within a month.",
        name: 'Rahul M.',
        role: 'Forex Trader · Dubai',
        initials: 'RM',
        stars: 5,
    },
    {
        quote: "The spreads are genuinely tight. I trade gold daily and the difference versus my old broker is measurable. Customer support is also very responsive.",
        name: 'Priya S.',
        role: 'Scalper · Mumbai',
        initials: 'PS',
        stars: 5,
    },
    {
        quote: "Finally a platform that feels institutional. The MT5 integration is seamless and their VPS service keeps my EAs running 24/5 without issues.",
        name: 'James T.',
        role: 'Algo Trader · London',
        initials: 'JT',
        stars: 5,
    },
    {
        quote: "The leverage options and asset variety are exceptional. I can trade indices, forex, and commodities all from one account. Highly recommended.",
        name: 'Ahmed K.',
        role: 'Portfolio Manager · Riyadh',
        initials: 'AK',
        stars: 5,
    },
    {
        quote: "Regulation and transparency were my top concerns. APFX checks every box. Withdrawals are fast, reporting is clear, and the team is professional.",
        name: 'Sofia L.',
        role: 'Prop Firm Trader · Zurich',
        initials: 'SL',
        stars: 5,
    },
    {
        quote: "Their mobile app is best-in-class. I manage positions on the go without compromising on charting tools or execution quality. Impressive product.",
        name: 'Kevin O.',
        role: 'Day Trader · Lagos',
        initials: 'KO',
        stars: 5,
    },
    {
        quote: "Switched from a major broker after trying APFX's demo. The platform performance, account types, and IB program are all superior.",
        name: 'Maria J.',
        role: 'IB Partner · São Paulo',
        initials: 'MJ',
        stars: 5,
    },
    {
        quote: "Excellent for news trading. Their eco system handles high volatility well — execution stays crisp even during major economic events.",
        name: 'Yuki T.',
        role: 'News Trader · Tokyo',
        initials: 'YT',
        stars: 5,
    },
]

const ROW_1 = REVIEWS.slice(0, 4)
const ROW_2 = REVIEWS.slice(4)

function Card({ r }: { r: (typeof REVIEWS)[0] }) {
    return (
        <div className={styles.card}>
            <div className={styles.stars} aria-label={`${r.stars} out of 5 stars`}>
                {[...Array(r.stars)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                ))}
            </div>
            <p className={styles.quote}>"{r.quote}"</p>
            <div className={styles.author}>
                <div className={styles.avatar} aria-hidden="true">{r.initials}</div>
                <div>
                    <div className={styles.name}>{r.name}</div>
                    <div className={styles.role}>{r.role}</div>
                </div>
            </div>
        </div>
    )
}

export default function Testimonials() {
    return (
        <section className={`${styles.section} apfx-section`} aria-labelledby="testimonials-heading">
            <div className={styles.inner}>
                <div className={styles.eyebrow}>Client Reviews</div>
                <h2 id="testimonials-heading" className={styles.title}>
                    Trusted by Performance‑Driven Traders Worldwide
                </h2>
            </div>

            {/* Row 1 — scrolls left */}
            <div className={styles.marqueeWrap} aria-hidden="true">
                <div className={styles.track}>
                    {[...ROW_1, ...ROW_1].map((r, i) => <Card key={i} r={r} />)}
                </div>
            </div>

            {/* Row 2 — scrolls right */}
            <div className={`${styles.marqueeWrap} ${styles.gap}`} aria-hidden="true">
                <div className={`${styles.track} ${styles.trackReverse}`}>
                    {[...ROW_2, ...ROW_2].map((r, i) => <Card key={i} r={r} />)}
                </div>
            </div>

            {/* Screen-reader accessible version */}
            <ul style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }} aria-label="Client testimonials">
                {REVIEWS.map((r) => (
                    <li key={r.name}>{`${r.name}, ${r.role}: "${r.quote}"`}</li>
                ))}
            </ul>
        </section>
    )
}
