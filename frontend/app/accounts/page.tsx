import InnerPageHero from '@/components/layout/InnerPageHero'
import Footer from '@/components/layout/Footer'
import BottomBar from '@/components/layout/BottomBar'
import styles from './AccountsPage.module.css'

export const metadata = {
    title: 'Account Types — APFX',
    description: 'Choose the account that fits your trading style. From commission-free Standard accounts to ultra-low spread Raw accounts for professionals.',
}

const ACCOUNTS = [
    {
        name: 'Standard',
        desc: 'Perfect for retail traders wanting a simple, all-inclusive pricing model.',
        spreads: 'from 1.0 pips',
        commission: '$0',
        deposit: '$100',
        bestFor: 'Beginners & Swing Traders'
    },
    {
        name: 'Raw Spread',
        desc: 'Our most popular account. Institutional spreads with a small commission.',
        spreads: 'from 0.0 pips',
        commission: '$3.50 per side',
        deposit: '$500',
        bestFor: 'Scalpers & Day Traders',
        featured: true
    },
    {
        name: 'Institutional',
        desc: 'Custom-tailored solutions for high-volume traders and corporate clients.',
        spreads: 'from 0.0 pips',
        commission: 'Custom / Tiered',
        deposit: '$25,000+',
        bestFor: 'Professional Traders'
    }
]

export default function AccountsPage() {
    return (
        <div className={styles.page}>
            <InnerPageHero
                title="Trading Accounts for"
                accentLine="Every Ambition"
                subtitle="Whether you're just starting or managing an institutional portfolio, our account types are designed to give you a competitive edge."
                breadcrumbs={[{ label: 'Accounts' }]}
            />

            <main className={styles.main}>
                <section className={styles.section}>
                    <div className={styles.container}>
                        <div className={styles.accountGrid}>
                            {ACCOUNTS.map((acc) => (
                                <div key={acc.name} className={`${styles.accCard} ${acc.featured ? styles.featured : ''}`}>
                                    {acc.featured && <div className={styles.badge}>Most Popular</div>}
                                    <h3 className={styles.accName}>{acc.name}</h3>
                                    <p className={styles.accDesc}>{acc.desc}</p>

                                    <div className={styles.metrics}>
                                        <div className={styles.metric}>
                                            <span>Spreads</span>
                                            <strong>{acc.spreads}</strong>
                                        </div>
                                        <div className={styles.metric}>
                                            <span>Commission</span>
                                            <strong>{acc.commission}</strong>
                                        </div>
                                        <div className={styles.metric}>
                                            <span>Min Deposit</span>
                                            <strong>{acc.deposit}</strong>
                                        </div>
                                    </div>

                                    <div className={styles.footer}>
                                        <span className={styles.best}>Best for: {acc.bestFor}</span>
                                        <button className={styles.btnOpen}>Open Account</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className={styles.tableSection}>
                    <div className={styles.container}>
                        <header className={styles.tableHeader}>
                            <h2>Full Feature Comparison</h2>
                            <p>Deep dive into the technical specifications of each account type.</p>
                        </header>
                        <div className={styles.tableWrapper}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Feature</th>
                                        <th>Standard</th>
                                        <th>Raw Spread</th>
                                        <th>Institutional</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Trading Platforms</td>
                                        <td>MT4, MT5, Web</td>
                                        <td>MT4, MT5, Web</td>
                                        <td>MT4, MT5, API</td>
                                    </tr>
                                    <tr>
                                        <td>Execution Type</td>
                                        <td>Market</td>
                                        <td>Market (ECN)</td>
                                        <td>DMA / ECN</td>
                                    </tr>
                                    <tr>
                                        <td>Stop Out Level</td>
                                        <td>50%</td>
                                        <td>50%</td>
                                        <td>40%</td>
                                    </tr>
                                    <tr>
                                        <td>Min Lot Size</td>
                                        <td>0.01 Lots</td>
                                        <td>0.01 Lots</td>
                                        <td>0.1 Lots</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
            <BottomBar />
        </div>
    )
}
