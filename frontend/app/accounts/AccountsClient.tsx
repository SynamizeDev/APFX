'use client'

import { useState } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import Link from 'next/link'
import Footer from '@/components/layout/Footer'
import BottomBar from '@/components/layout/BottomBar'
import { Check, Plus, Minus, ArrowRight, Zap, Shield, Globe, Cpu, Clock, Wallet } from 'lucide-react'
import InnerPageHero from '@/components/layout/InnerPageHero'
import styles from './AccountsPage.module.css'

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
}

const ACCOUNT_DATA = [
    {
        id: 'standard',
        name: 'Standard',
        commission: '0.0',
        commissionLabel: 'Commission',
        features: [
            'Spreads from 1.0 pips',
            'No commissions',
            'Leverage up to 1:1000',
            'All platforms available',
            'Min. deposit: $50'
        ],
        btnText: 'Get Started',
        btnHref: '/register',
        isPopular: false
    },
    {
        id: 'premium',
        name: 'Premium',
        commission: '3.5',
        commissionLabel: 'per lot',
        features: [
            'Spreads from 0.0 pips',
            'Institutional liquidity',
            'Leverage up to 1:1000',
            'Deep liquidity pool',
            'Min. deposit: $1,000'
        ],
        btnText: 'Open Premium',
        btnHref: '/register',
        isPopular: true
    },
    {
        id: 'elite',
        name: 'Elite',
        commission: 'Custom',
        commissionLabel: 'Solutions',
        features: [
            'Dedicated manager',
            'Volume rebates',
            'Custom API access',
            'Priority support',
            'Min. deposit: $5,000'
        ],
        btnText: 'Contact Sales',
        btnHref: '/support',
        isPopular: false
    }
]

const COMPARISON_ROWS = [
    { label: 'Spreads from', values: ['1.0 pips', '0.0 pips', 'Raw / Custom'] },
    { label: 'Commission', values: ['$0.0', '$3.5 per lot', 'Negotiable'] },
    { label: 'Minimum Deposit', values: ['$50', '$1,000', '$5,000'] },
    { label: 'Leverage', values: ['1:1000', '1:1000', '1:1000'] },
    { label: 'Trading Platform', values: ['All Platforms', 'All Platforms', 'All + FIX API'] },
    { label: 'Execution Model', values: ['STP / NDD', 'Institutional STP', 'Direct DMA'] },
    { label: 'Stop Out Level', values: ['50%', '50%', '40%'] },
    { label: 'Micro Lot Trading', values: [true, true, true] },
    { label: 'Dedicated Support', values: [false, true, true] },
    { label: 'Volume Rebates', values: [false, false, true] },
]

export default function AccountsPage() {
    const [activeTab, setActiveTab] = useState('Account Overview')

    const renderOverview = () => (
        <main className={styles.main}>
            <section className={styles.cardsSection}>
                <div className={styles.container}>
                    <div className={styles.profGrid}>
                        {ACCOUNT_DATA.map((acc) => (
                            <motion.div 
                                key={acc.id}
                                className={`${styles.profCard} ${acc.isPopular ? styles.profCardActive : ''}`}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                {acc.isPopular && <span className={styles.profBadge}>MOST POPULAR</span>}
                                <h3 className={styles.cardTitle}>{acc.name}</h3>
                                <div className={styles.cardPriceArea}>
                                    <div className={styles.priceFlex}>
                                        {acc.commission !== 'Custom' && <span className={styles.currencySymbol}>$</span>}
                                        <span className={styles.priceAmount}>{acc.commission}</span>
                                    </div>
                                    <span className={styles.priceSubText}>{acc.commissionLabel}</span>
                                </div>
                                <ul className={styles.featureList}>
                                    {acc.features.map((feat, i) => (
                                        <li key={i}>
                                            <Check size={16} className={styles.checkIcon} />
                                            <span>{feat}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link href={acc.btnHref} className={`${styles.cardBtn} ${acc.isPopular ? styles.cardBtnActive : ''}`}>
                                    {acc.btnText}
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            <section className={styles.tableSection}>
                <div className={styles.container}>
                    <header className={styles.tableHeader}>
                        <h2>Full Feature Comparison</h2>
                        <p>Select the account type that best aligns with your capital requirements and trading frequency.</p>
                    </header>
                    <div className={styles.tableWrapper}>
                        <table className={styles.compTable}>
                            <thead>
                                <tr>
                                    <th>Features</th>
                                    <th>Standard</th>
                                    <th className={styles.highlightCol}>Premium</th>
                                    <th>Elite</th>
                                </tr>
                            </thead>
                            <tbody>
                                {COMPARISON_ROWS.map((row, i) => (
                                    <tr key={i}>
                                        <td className={styles.rowLabel}>{row.label}</td>
                                        {row.values.map((val, j) => (
                                            <td key={j} className={j === 1 ? styles.highlightCol : ''}>
                                                {typeof val === 'boolean' ? (
                                                    val ? <Check size={18} className={styles.accent} /> : <Minus size={18} />
                                                ) : (val)}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </main>
    )

    const renderDetailView = (tierName: string) => {
        const isStandard = tierName === 'Standard'
        return (
            <>
                <section className={styles.detailHero}>
                    <div className={styles.container}>
                        <motion.div 
                            className={styles.detailHeroContent}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <h1>{tierName} Account</h1>
                            <p>
                                {isStandard 
                                    ? "Keep it simple with the APFX Standard account. Experience all the benefits of our institutional pricing with an all-inclusive spread and no commissions."
                                    : `Optimize your edge with the APFX ${tierName} account. Engineered for professional traders who demand the lowest latency and deepest liquidity pools.`}
                            </p>
                            <Link href="/register" className={styles.heroCtaBtn}>Open Account</Link>
                        </motion.div>
                    </div>
                </section>

                {/* ── TAB NAVIGATION (In Detail View) ── */}
                <nav className={styles.tabNav}>
                    <div className={styles.container}>
                        <div className={styles.tabList}>
                            {['Account Overview', 'Standard', 'Premium', 'Elite', 'Swap Free', 'Funding', 'Withdrawal'].map((tab) => (
                                <button 
                                    key={tab}
                                    className={`${styles.tabItem} ${activeTab === tab ? styles.tabActive : ''}`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>
                </nav>

                <main className={styles.detailMain}>
                    <div className={styles.container}>
                        {/* ── WHY CHOOSE ── */}
                        <section className={styles.detailSplit}>
                            <div className={styles.detailText}>
                                <h2 className={styles.sectionHeading}>Why Choose Our {tierName} Account?</h2>
                                <p>
                                    The {tierName} Account from APFX offers speed of execution with no rivals. Combine this with an institutional spread starting from {isStandard ? '1.0 pip' : '0.0 pips'}. Our Equinix NY4 servers in New York and LD4 in London aggregate pricing from up to 30 Tier-1 providers, ensuring an unparalleled trading experience.
                                </p>
                                <p>
                                    Whether you are a day trader, scalper, or utilize automated Expert Advisors, this account provides the technical infrastructure required for high-frequency trading in the global markets.
                                </p>
                            </div>
                            <div className={styles.detailCardWrapper}>
                                <div className={styles.summaryCard}>
                                    <span className={styles.cardKicker}>Institutional Trading</span>
                                    <h3>{tierName} Account</h3>
                                    <ul className={styles.summaryList}>
                                        <li><Check size={14} /> Raw Pricing</li>
                                        <li><Check size={14} /> {isStandard ? 'Commission Free' : 'Institutional Commission'}</li>
                                        <li><Check size={14} /> Fast order execution</li>
                                        <li><Check size={14} /> 1:1000 Leverage</li>
                                        <li><Check size={14} /> Deep Liquidity</li>
                                        <li><Check size={14} /> MetaTrader 4 & 5</li>
                                    </ul>
                                    <Link href="/register" className={styles.summaryBtn}>Open Account</Link>
                                </div>
                            </div>
                        </section>

                        {/* ── FAST EXECUTION ── */}
                        <section className={styles.detailFullWidth}>
                            <h2 className={styles.centeredHeading}>Fast order execution</h2>
                            <p className={styles.centeredPara}>
                                The APFX MetaTrader 4 and 5 servers are located in the Equinix NY4 data center in New York. The NY4 data center, referred to as a financial ecosystem, is home to over 600 buy and sell-side firms, exchanges, trading venues, market data, and service providers. Our servers are cross-connected to our network to ensure low latency and the fast execution of your trades.
                            </p>
                            <p className={styles.centeredPara}>
                                The APFX trade servers have latency on average of less than 1 millisecond to major VPS providers. This low latency environment is ideal for automated and High Frequency Trading and scalping.
                            </p>
                        </section>

                        {/* ── RESTRICTIONS / LEVEL II ── */}
                        <div className={styles.detailGrid2}>
                            <div className={styles.gridBox}>
                                <h3>No Restrictions on Trading – Scalping Allowed</h3>
                                <p>APFX MetaTrader 4 and 5 platforms have no restrictions on trading. We have some of the best trading conditions for scalping and high-frequency trading globally, allowing traders to place orders between the spread as there is no minimum order distance and a freeze level of 0.</p>
                                <p>Traders can also hedge positions as there is no first-in-first-out (FIFO) rule with APFX. Please note that different hedge margin levels and settings may be applied to different products and platforms.</p>
                            </div>
                            <div className={styles.gridBox}>
                                <h3>Level II Pricing – Market Depth</h3>
                                <p>Depth of market shows the full range of executable prices coming directly from pricing providers. Depth of market offers complete transparency of the liquidity of each currency pair by showing the available volumes for each price level at any given time.</p>
                                <p>High liquidity, asynchronous spot prices, and low latency guarantee the tightest possible spreads and the most accurate execution fills.</p>
                            </div>
                        </div>

                        {/* ── LOWER FEATURES ── */}
                        <div className={styles.detailLowerGrid}>
                            <div className={styles.lowerLeft}>
                                <div className={styles.lowerSection}>
                                    <h3>Flexible Funding and Withdrawal Options</h3>
                                    <p>Once you have opened your account you can fund using any of our funding options including: credit/debit card, Skrill, wire transfer, Neteller, FasaPay, China Union Pay, Bpay and broker to broker transfer, deposits.</p>
                                </div>
                                <div className={styles.lowerSection}>
                                    <h3>Flexible Lot Sizing</h3>
                                    <p>There are no limits or restrictions on trade sizes; you can place trades as small as one micro lot (0.01). Our flexible lot sizing allows you to trial the platform with minimal risk and manages your trades sized in accordance with your account balance.</p>
                                </div>
                            </div>
                            <div className={styles.lowerRight}>
                                <div className={styles.lowerTextSection}>
                                    <h4>Forex, CFDs on Commodities and Global Indices</h4>
                                    <p>Trade 60 currency, 15 CFDs on Commodities including metals plus 20 major indices including the FTSE 100, NASDAQ 100 and Dow Jones Index 24 hours a day with a spread as low as 0.0 points.</p>
                                </div>
                                <div className={styles.lowerTextSection}>
                                    <h4>Leverage up to 1:1000</h4>
                                    <p>Accounts are up to 1:1000 leverage on the APFX MetaTrader 4 and 5 platforms. Traders can use higher leverage to suit their trading style and get the best out of their manual and automated trading strategies.</p>
                                </div>
                                <div className={styles.lowerTextSection}>
                                    <h4>All Major Account Currencies Supported</h4>
                                    <p>We know some traders prefer to deal in their local currency; we give traders the option to open an account in our 10 supported base currencies: USD, AUD, EUR, GBP, SGD, NZD, JPY, CHF, HKD, CAD.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </>
        )
    }

    return (
        <div className={styles.page}>
            {activeTab === 'Account Overview' ? (
                <>
                    <div className={styles.overviewHeroOffset}>
                        <InnerPageHero
                            title="Professional Trading"
                            accentLine="Account Structures"
                            subtitle="From high-leverage retail accounts to institutional-grade premium tiers, APFX provides the perfect environment for every trading mandate."
                            breadcrumbs={[{ label: 'Accounts' }]}
                        />
                    </div>
                    {/* ── TAB NAVIGATION (Moved here) ── */}
                    <nav className={styles.tabNav}>
                        <div className={styles.container}>
                            <div className={styles.tabList}>
                                {['Account Overview', 'Standard', 'Premium', 'Elite', 'Swap Free', 'Funding', 'Withdrawal'].map((tab) => (
                                    <button 
                                        key={tab}
                                        className={`${styles.tabItem} ${activeTab === tab ? styles.tabActive : ''}`}
                                        onClick={() => setActiveTab(tab)}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </nav>
                    {renderOverview()}
                </>
            ) : (
                <>
                    {renderDetailView(activeTab)}
                </>
            )}

            <Footer />
            <BottomBar />
        </div>
    )
}