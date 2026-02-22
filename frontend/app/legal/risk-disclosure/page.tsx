import InnerPageHero from '@/components/layout/InnerPageHero'
import Footer from '@/components/layout/Footer'
import BottomBar from '@/components/layout/BottomBar'
import styles from './LegalPage.module.css'

export const metadata = {
    title: 'Risk Disclosure — APFX',
    description: 'Trading financial instruments carries significant risk. This disclosure outlines the risks involved and your responsibilities as a trader.',
}

export default function RiskPage() {
    return (
        <div className={styles.page}>
            <InnerPageHero
                title="Risk"
                accentLine="Disclosure"
                subtitle="Trading in financial markets involves substantial risk of loss and is not suitable for all investors."
                breadcrumbs={[{ label: 'Legal', href: '/legal' }, { label: 'Risk Disclosure' }]}
            />

            <main className={styles.main}>
                <section className={styles.section}>
                    <div className={styles.container}>
                        <div className={styles.content}>
                            <div className={styles.warningBox}>
                                <strong>High Risk Warning:</strong> CFDs are complex instruments and come with a high risk of losing money rapidly due to leverage.
                            </div>

                            <h3>1. Leverage Risk</h3>
                            <p>The high degree of leverage available can work against you as well as for you. Use of leverage can lead to large losses as well as gains.</p>

                            <h3>2. Market Volatility</h3>
                            <p>Financial markets can be highly volatile. Prices can move rapidly and unpredictably, which may lead to significant losses.</p>

                            <h3>3. Knowledge & Experience</h3>
                            <p>You should ensure that you have sufficient knowledge and experience to understand the risks involved in trading financial instruments.</p>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
            <BottomBar />
        </div>
    )
}
