import { BarChart3, TrendingUp, Globe, Smartphone } from 'lucide-react'
import InnerPageHero from '@/components/layout/InnerPageHero'
import Footer from '@/components/layout/Footer'
import BottomBar from '@/components/layout/BottomBar'
import styles from './PlatformsPage.module.css'

export const metadata = {
    title: 'Trading Platforms — APFX',
    description: 'Experience institutional-grade trading on MT4, MT5, and WebTrader. Trade on desktop, web, or mobile with APFX.',
}

const PLATFORMS = [
    {
        name: 'MetaTrader 4',
        tag: 'The Global Standard',
        desc: 'The most popular platform for retail traders. Features advanced charting, automated trading via EAs, and a massive library of indicators.',
        features: ['30 Default Indicators', '9 Timeframes', 'Automated Trading (EAs)', 'Hedging Allowed'],
        icon: <BarChart3 size={40} />
    },
    {
        name: 'MetaTrader 5',
        tag: 'Next-Generation Trading',
        desc: 'Built for the modern multi-asset trader. More timeframes, more indicators, and a powerful MQL5 engine for lightning-fast backtesting.',
        features: ['38 Technical Indicators', '21 Timeframes', 'Built-in Economic Calendar', 'Depth of Market (DOM)'],
        icon: <TrendingUp size={40} />
    },
    {
        name: 'WebTrader',
        tag: 'Trading without Limits',
        desc: 'Access the markets from any browser on any device. No download required. Perfectly synced with your desktop account.',
        features: ['No Installation Required', 'One-Click Trading', 'Advanced Analytical Tools', 'Real-time Account Sync'],
        icon: <Globe size={40} />
    },
    {
        name: 'Mobile App',
        tag: 'Trading on the Go',
        desc: 'Full trading functionality on your smartphone. Available for iOS and Android with real-time sync.',
        features: ['Full Mobile Control', 'Push Notifications', 'Real-time Charts', 'Secure Transactions'],
        icon: <Smartphone size={40} />
    }
]

export default function PlatformsPage() {
    return (
        <div className={styles.page}>
            <InnerPageHero
                title="Institutional Tech"
                accentLine="for Every Device"
                subtitle="Whether you prefer the reliability of desktop or the flexibility of mobile, our platforms are powered by fibre-optic cross-connects for the fastest execution."
                breadcrumbs={[{ label: 'Platforms' }]}
            />

            <main className={styles.main}>
                <section className={styles.section}>
                    <div className={styles.container}>
                        <div className={styles.platformList}>
                            {PLATFORMS.map((p, i) => (
                                <div key={p.name} className={`${styles.platformItem} ${i % 2 !== 0 ? styles.reverse : ''}`}>
                                    <div className={styles.info}>
                                        <span className={styles.tag}>{p.tag}</span>
                                        <h2 className={styles.name}>{p.name}</h2>
                                        <p className={styles.desc}>{p.desc}</p>
                                        <ul className={styles.features}>
                                            {p.features.map(f => <li key={f}>{f}</li>)}
                                        </ul>
                                        <div className={styles.actions}>
                                            <button className={styles.btnPrimary}>Download Now</button>
                                            <button className={styles.btnSecondary}>Quick Guide</button>
                                        </div>
                                    </div>
                                    <div className={styles.visual}>
                                        <div className={styles.visualIcon}>{p.icon}</div>
                                        <div className={styles.glow} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className={styles.ctaSection}>
                    <div className={styles.container}>
                        <div className={styles.ctaBox}>
                            <h2>One Account, All Platforms.</h2>
                            <p>Switch between desktop, web, and mobile seamlessly with a single set of credentials.</p>
                            <button className={styles.btnAccent}>Start Trading Now</button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
            <BottomBar />
        </div>
    )
}
