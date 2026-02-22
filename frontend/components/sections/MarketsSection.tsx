'use client'

import Link from 'next/link'
import { RefreshCcw, Gem, BarChart3, Droplets, Building2, Bitcoin } from 'lucide-react'
import styles from './MarketsSection.module.css'

const MARKETS = [
    {
        icon: <RefreshCcw size={24} />,
        name: 'Forex',
        desc: '70+ major, minor & exotic pairs. Institutional liquidity, tight spreads from 0.0 pips.',
        href: '/markets/forex',
        spread: '0.0 pips',
        leverage: '1:500',
        instruments: '70+',
        glow: 'rgba(0,200,150,0.08)',
        iconBg: 'rgba(0,200,150,0.1)',
    },
    {
        icon: <Gem size={24} />,
        name: 'Metals & Gold',
        desc: 'Trade XAU/USD, XAG/USD and other precious metals with world-class execution.',
        href: '/markets/metals',
        spread: '0.2 pips',
        leverage: '1:200',
        instruments: '10+',
        glow: 'rgba(201,168,76,0.08)',
        iconBg: 'rgba(201,168,76,0.1)',
    },
    {
        icon: <BarChart3 size={24} />,
        name: 'Indices',
        desc: 'Trade global indices — S&P 500, NASDAQ, FTSE, DAX and more without ownership.',
        href: '/markets/indices',
        spread: '0.5 pts',
        leverage: '1:100',
        instruments: '15+',
        glow: 'rgba(99,102,241,0.08)',
        iconBg: 'rgba(99,102,241,0.1)',
    },
    {
        icon: <Droplets size={24} />,
        name: 'Commodities',
        desc: 'Crude Oil, Natural Gas, Coffee and agricultural commodities. Trade the real economy.',
        href: '/markets/commodities',
        spread: '0.03',
        leverage: '1:100',
        instruments: '20+',
        glow: 'rgba(249,115,22,0.08)',
        iconBg: 'rgba(249,115,22,0.1)',
    },
    {
        icon: <Building2 size={24} />,
        name: 'Stocks & ETFs',
        desc: 'CFDs on top global equities — Apple, Tesla, NVDA — and major ETFs, no ownership required.',
        href: '/markets/stocks',
        spread: '0.1%',
        leverage: '1:20',
        instruments: '500+',
        glow: 'rgba(59,130,246,0.08)',
        iconBg: 'rgba(59,130,246,0.1)',
    },
    {
        icon: <Bitcoin size={24} />,
        name: 'Crypto CFDs',
        desc: 'Speculate on BTC, ETH, SOL and 50+ leading digital assets with leveraged CFDs.',
        href: '/markets/crypto',
        spread: '0.5%',
        leverage: '1:10',
        instruments: '50+',
        glow: 'rgba(245,158,11,0.08)',
        iconBg: 'rgba(245,158,11,0.1)',
    },
]

export default function MarketsSection() {
    return (
        <section className={styles.section} aria-labelledby="markets-heading">
            <div className={styles.inner}>
                <header className={styles.header}>
                    <div className={styles.eyebrow}>Our Markets</div>
                    <h2 id="markets-heading" className={styles.title}>
                        Trade Everything That Moves
                    </h2>
                    <p className={styles.subtitle}>
                        From Forex to equities, metals to crypto — all on one platform with
                        institutional-grade execution.
                    </p>
                </header>

                <div className={styles.grid}>
                    {MARKETS.map((m) => (
                        <Link
                            key={m.name}
                            href={m.href}
                            className={styles.card}
                            style={
                                {
                                    '--card-glow': m.glow,
                                    '--icon-bg': m.iconBg,
                                } as React.CSSProperties
                            }
                        >
                            <div className={styles.cardIcon}>
                                {m.icon}
                            </div>
                            <div className={styles.cardName}>{m.name}</div>
                            <p className={styles.cardDesc}>{m.desc}</p>
                            <div className={styles.cardMeta}>
                                <div className={styles.metaItem}>
                                    <span className={styles.metaLabel}>Min Spread</span>
                                    <span className={`${styles.metaValue} ${styles.metaValueGreen}`}>{m.spread}</span>
                                </div>
                                <div className={styles.metaItem}>
                                    <span className={styles.metaLabel}>Leverage</span>
                                    <span className={styles.metaValue}>{m.leverage}</span>
                                </div>
                                <div className={styles.metaItem}>
                                    <span className={styles.metaLabel}>Instruments</span>
                                    <span className={styles.metaValue}>{m.instruments}</span>
                                </div>
                                <div className={styles.cardArrow} aria-hidden="true">→</div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className={styles.viewAll}>
                    <Link href="/markets" className={styles.viewAllBtn}>
                        View all markets →
                    </Link>
                </div>
            </div>
        </section>
    )
}
