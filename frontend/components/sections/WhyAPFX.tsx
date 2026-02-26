'use client'

import { Zap, Landmark, BarChart3, Lock, Globe, Smartphone } from 'lucide-react'
import styles from './WhyAPFX.module.css'

const FEATURES = [
    {
        icon: <Zap size={24} />,
        label: 'Execution',
        title: 'Sub-Millisecond Order Execution',
        desc: 'Our infrastructure is co-located with tier-1 liquidity providers, ensuring your orders are filled at the price you see with zero re-quotes.',
        large: true,
        iconBg: 'rgba(0,200,150,0.1)',
        iconBorder: 'rgba(0,200,150,0.2)',
        glow: 'rgba(0,200,150,0.12)',
    },
    {
        icon: <Landmark size={24} />,
        label: 'Regulation',
        title: 'Fully Regulated & Licensed',
        desc: 'Operating under strict financial regulation with segregated client funds, full transparency and mandatory audits.',
        large: false,
        iconBg: 'rgba(99,102,241,0.1)',
        iconBorder: 'rgba(99,102,241,0.2)',
        glow: 'rgba(99,102,241,0.1)',
    },
    {
        icon: <BarChart3 size={24} />,
        label: 'Liquidity',
        title: 'Deep Institutional Liquidity',
        desc: 'Aggregated from 15+ global tier-1 banks and non-bank market makers for the tightest spreads.',
        large: false,
        iconBg: 'rgba(0,200,150,0.1)',
        iconBorder: 'rgba(0,200,150,0.2)',
        glow: 'rgba(0,200,150,0.1)',
    },
    {
        icon: <Lock size={24} />,
        label: 'Security',
        title: 'Bank-Level Security',
        desc: 'Your funds are held in segregated accounts at top-tier banks. 2FA, encrypted connections, and real-time monitoring.',
        large: false,
        iconBg: 'rgba(249,115,22,0.1)',
        iconBorder: 'rgba(249,115,22,0.2)',
        glow: 'rgba(249,115,22,0.1)',
    },
    {
        icon: <Globe size={24} />,
        label: 'Global',
        title: 'Truly Global Access',
        desc: 'Serve clients in 150+ countries with local payment methods, multilingual support, and regional compliance.',
        large: false,
        iconBg: 'rgba(201,168,76,0.1)',
        iconBorder: 'rgba(201,168,76,0.2)',
        glow: 'rgba(201,168,76,0.1)',
    },
    {
        icon: <Smartphone size={24} />,
        label: 'Platform',
        title: 'Trade Anywhere, Any Device',
        desc: 'MT4, MT5, WebTrader, and native mobile apps for iOS and Android. Seamless across all your devices.',
        large: false,
        iconBg: 'rgba(59,130,246,0.1)',
        iconBorder: 'rgba(59,130,246,0.2)',
        glow: 'rgba(59,130,246,0.1)',
    },
]

export default function WhyAPFX() {
    return (
        <section className={`${styles.section} apfx-section`} aria-labelledby="why-heading">
            <div className={styles.inner}>
                <header className={styles.header}>
                    <div className={styles.eyebrow}>Why APFX</div>
                    <h2 id="why-heading" className={styles.title}>
                        Engineered for Serious Traders
                    </h2>
                    <p className={styles.subtitle}>
                        Every decision in our stack is designed to compress latency, sharpen pricing, and
                        give you the kind of edge usually reserved for institutional desks.
                    </p>
                </header>

                <div className={styles.bento}>
                    {FEATURES.map((f) => (
                        <div
                            key={f.title}
                            className={`${styles.bentoItem} ${f.large ? styles.bentoLarge : ''}`}
                            style={
                                {
                                    '--glow-color': f.glow,
                                    '--icon-bg': f.iconBg,
                                    '--icon-border': f.iconBorder,
                                } as React.CSSProperties
                            }
                        >
                            <div className={styles.bentoIcon}>
                                {f.icon}
                            </div>
                            <div className={styles.bentoContent}>
                                <span className={styles.bentoLabel}>{f.label}</span>
                                <h3 className={styles.bentoTitle}>{f.title}</h3>
                                <p className={styles.bentoDesc}>{f.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
