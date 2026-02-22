import { RefreshCcw, Droplets, BarChart3, Gem, Building2, Bitcoin } from 'lucide-react'
import InnerPageHero from '@/components/layout/InnerPageHero'
import Footer from '@/components/layout/Footer'
import BottomBar from '@/components/layout/BottomBar'
import styles from './MarketsPage.module.css'

export const metadata = {
    title: 'Trade Global Markets — APFX',
    description: 'Explore the wide range of markets available at APFX. Trade Forex, Commodities, Indices, Stocks and more with institutional conditions.',
}

const MARKET_BLOCKS = [
    {
        title: 'Forex',
        icon: <RefreshCcw size={32} />,
        desc: '60+ Currency pairs with spreads from 0.0 pips and 24/5 institutional depth.',
    },
    {
        title: 'Commodities',
        icon: <Droplets size={32} />,
        desc: 'Trade Oil, Gas, and Hard Commodities with zero commission and flexible leverage.',
    },
    {
        title: 'Indices',
        icon: <BarChart3 size={32} />,
        desc: 'Access major global exchanges like S&P 500, DAX, and FTSE 100 with ultra-low latency.',
    },
    {
        title: 'Metals',
        icon: <Gem size={32} />,
        desc: 'Spot Gold and Silver against major currencies with the tightest spreads in the industry.',
    },
    {
        title: 'Stocks',
        icon: <Building2 size={32} />,
        desc: 'Hundreds of blue-chip global shares with dividend payments and leverage.',
    },
    {
        title: 'Crypto',
        icon: <Bitcoin size={32} />,
        desc: 'Trade major cryptocurrencies against USD with fast execution and 24/7 availability.',
    },
]

export default function MarketsPage() {
    return (
        <div className={styles.page}>
            <InnerPageHero
                title="Deep Liquidity across"
                accentLine="6 Asset Classes"
                subtitle="Whether you're a day trader or an institutional investor, our DMA (Direct Market Access) technology provides the speed and reliability you need."
                breadcrumbs={[{ label: 'Markets' }]}
            />

            <main className={styles.main}>
                <section className={styles.section}>
                    <div className={styles.container}>
                        <div className={styles.marketGrid}>
                            {MARKET_BLOCKS.map((m) => (
                                <div key={m.title} className={styles.marketCard}>
                                    <div className={styles.marketIcon}>
                                        {m.icon}
                                    </div>
                                    <h3 className={styles.marketTitle}>{m.title}</h3>
                                    <p className={styles.marketDesc}>{m.desc}</p>
                                    <div className={styles.marketLink}>Explore {m.title} →</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className={styles.conditions}>
                    <div className={styles.container}>
                        <div className={styles.conditionsInner}>
                            <h2>Superior Trading Conditions</h2>
                            <div className={styles.statsRow}>
                                <div className={styles.stat}>
                                    <span className={styles.val}>0.0</span>
                                    <span className={styles.lab}>Spread from</span>
                                </div>
                                <div className={styles.stat}>
                                    <span className={styles.val}>$0</span>
                                    <span className={styles.lab}>Commission</span>
                                </div>
                                <div className={styles.stat}>
                                    <span className={styles.val}>1:500</span>
                                    <span className={styles.lab}>Max Leverage</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
            <BottomBar />
        </div>
    )
}
