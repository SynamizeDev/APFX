'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Activity, Shield, TrendingUp, Users, PieChart, ArrowRight, BarChart3, Lock, Zap, CheckCircle2, ChevronRight } from 'lucide-react'
import styles from './PammPage.module.css'

export default function PammClient() {
    const router = useRouter()

    const handleTabChange = (tab: string) => {
        if (tab === 'PAMM') return
        const typeMap: Record<string, string> = {
            'Standard': 'standard',
            'Premium': 'premium',
            'Elite': 'elite',
            'Swap Free': 'swap-free',
            'Funding': 'funding',
            'Withdrawal': 'withdrawal',
            'Account Overview': 'overview'
        }
        const type = typeMap[tab]
        if (type) {
            router.push(`/accounts?type=${type}`)
        }
    }

    return (
        <div className={styles.page}>
            {/* HERO SECTION */}
            <section className={styles.hero}>
                <div className={styles.heroGrid} />
                <div className={styles.heroGlow} />
                <div className={styles.container}>
                    <div className={styles.heroContent}>
                        <motion.div 
                            className={styles.heroTextCenter}
                            initial={{ opacity: 0, y: 16 }} 
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
                        >
                            <h1 className={styles.heroTitle}>
                                PAMM Allocation <br />
                                <span className={styles.accent}>Infrastructure</span>
                            </h1>
                            <p className={styles.heroSubtitle}>
                                Institutional-grade percentage allocation management designed for transparent strategy participation and professional capital distribution.
                            </p>
                            <Link href="https://portal.apfx.com/register" className={styles.heroCtaBtn}>
                                Allocate Capital
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── TAB NAVIGATION ── */}
            <nav className={styles.tabNav}>
                <div className={styles.container}>
                    <div className={styles.tabList}>
                        {['Account Overview', 'Standard', 'Premium', 'Elite', 'Swap Free', 'PAMM', 'Funding', 'Withdrawal'].map((tab) => (
                            <button 
                                key={tab}
                                className={`${styles.tabItem} ${tab === 'PAMM' ? styles.tabActive : ''}`}
                                onClick={() => handleTabChange(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            {/* WHAT IS PAMM */}
            <section className={styles.sectionDark}>
                <div className={styles.container}>
                    <div className={styles.splitLayout}>
                        <motion.div 
                            className={styles.splitText}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className={styles.sectionTitle}>What is PAMM?</h2>
                            <p className={styles.sectionDesc}>
                                The Percentage Allocation Management Module (PAMM) is an advanced technical solution allowing investors to attach their capital to a Master Strategy without transferring direct control of funds.
                            </p>
                            <ul className={styles.featureList}>
                                <li>
                                    <CheckCircle2 className={styles.checkIcon} />
                                    <span><strong>Master Account System:</strong> Trades executed by the manager are instantly replicated.</span>
                                </li>
                                <li>
                                    <CheckCircle2 className={styles.checkIcon} />
                                    <span><strong>Pro-Rata Allocation:</strong> Profits and losses are distributed exactly based on equity percentage.</span>
                                </li>
                                <li>
                                    <CheckCircle2 className={styles.checkIcon} />
                                    <span><strong>Automated Settlements:</strong> Performance fees are deducted automatically via smart high-water mark systems.</span>
                                </li>
                            </ul>
                        </motion.div>
                        <motion.div 
                            className={styles.splitVisual}
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className={styles.glassVisual}>
                                <div className={styles.visualFlow}>
                                    <div className={styles.flowNode}>Investor A <span>30%</span></div>
                                    <div className={styles.flowNode}>Investor B <span>50%</span></div>
                                    <div className={styles.flowNode}>Investor C <span>20%</span></div>
                                </div>
                                <div className={styles.flowArrow}><ArrowRight size={24} /></div>
                                <div className={styles.flowMaster}>
                                    <h4>Master Strategy Account</h4>
                                    <p>Total Pooled Equity: $1,000,000</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* STRATEGY MANAGERS */}
            <section id="strategies" className={styles.sectionLight}>
                <div className={styles.container}>
                    <div className={styles.sectionHeaderCenter}>
                        <h2 className={styles.sectionTitle}>Elite Strategy Managers</h2>
                        <p className={styles.sectionDesc}>
                            Access a curated ecosystem of professional traders, quant funds, and institutional strategies. Filter by risk-adjusted returns, maximum drawdown, and historical performance.
                        </p>
                    </div>

                    <div className={styles.managerGrid}>
                        {[
                            { name: 'Quantum Alpha', type: 'Algorithmic', return: '42.8%', dd: '8.4%', risk: 'Medium', aum: '$12.5M' },
                            { name: 'Global Macro Focus', type: 'Fundamental', return: '28.5%', dd: '5.2%', risk: 'Low', aum: '$45.2M' },
                            { name: 'Apex Scalper', type: 'High Frequency', return: '64.2%', dd: '15.8%', risk: 'High', aum: '$3.8M' },
                        ].map((mgr, i) => (
                            <motion.div 
                                key={i} 
                                className={styles.managerCard}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className={styles.managerHeader}>
                                    <div>
                                        <h3>{mgr.name}</h3>
                                        <span className={styles.managerType}>{mgr.type}</span>
                                    </div>
                                    <div className={styles.riskBadge} data-risk={mgr.risk.toLowerCase()}>
                                        {mgr.risk} Risk
                                    </div>
                                </div>
                                <div className={styles.managerStats}>
                                    <div className={styles.statBox}>
                                        <span className={styles.statLabel}>Return (YTD)</span>
                                        <span className={styles.statValueGreen}>{mgr.return}</span>
                                    </div>
                                    <div className={styles.statBox}>
                                        <span className={styles.statLabel}>Max Drawdown</span>
                                        <span className={styles.statValueRed}>{mgr.dd}</span>
                                    </div>
                                    <div className={styles.statBox}>
                                        <span className={styles.statLabel}>Capital Managed</span>
                                        <span className={styles.statValueWhite}>{mgr.aum}</span>
                                    </div>
                                </div>
                                <div className={styles.chartPlaceholder}>
                                    {/* Abstract equity curve line */}
                                    <svg viewBox="0 0 100 30" preserveAspectRatio="none">
                                        <path d="M0 30 C 20 20, 40 25, 60 10 C 80 -5, 90 15, 100 5" fill="none" stroke="var(--color-accent)" strokeWidth="2" />
                                        <path d="M0 30 C 20 20, 40 25, 60 10 C 80 -5, 90 15, 100 5 L 100 30 L 0 30 Z" fill="url(#gradPamm)" opacity="0.1" />
                                        <defs>
                                            <linearGradient id="gradPamm" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="var(--color-accent)" />
                                                <stop offset="100%" stopColor="transparent" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                                <Link href="#" className={styles.managerLink}>
                                    View Full Analytics <ChevronRight size={16} />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* RISK & ANALYTICS */}
            <section className={styles.sectionDark}>
                <div className={styles.container}>
                    <div className={styles.grid2Col}>
                        <motion.div 
                            className={styles.featureBox}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className={styles.iconWrapper}><Shield size={24} /></div>
                            <h3>Institutional Risk Management</h3>
                            <p>Protect your capital with hard stop-loss limits. Investors can define maximum equity drawdown thresholds; if reached, all positions are automatically closed and capital is detached from the strategy manager instantly.</p>
                        </motion.div>
                        <motion.div 
                            className={styles.featureBox}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className={styles.iconWrapper}><BarChart3 size={24} /></div>
                            <h3>Bloomberg-Grade Analytics</h3>
                            <p>Analyze strategy performance with deep statistical insights. Access Sharpe ratios, sortino metrics, daily volatility tracking, win/loss ratios, and fully transparent historical execution logs before you invest.</p>
                        </motion.div>
                        <motion.div 
                            className={styles.featureBox}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className={styles.iconWrapper}><PieChart size={24} /></div>
                            <h3>Portfolio Diversification</h3>
                            <p>Build your own fund of funds. Allocate your capital across multiple PAMM managers simultaneously. Balance high-yield aggressive strategies with stable, low-volatility algorithmic trading modules.</p>
                        </motion.div>
                        <motion.div 
                            className={styles.featureBox}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className={styles.iconWrapper}><Zap size={24} /></div>
                            <h3>Real-Time Control</h3>
                            <p>Enjoy absolute liquidity control. Add funds to a performing strategy or initiate withdrawal requests seamlessly through your investor dashboard without lock-up periods or hidden exit penalties.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className={styles.ctaSection}>
                <div className={styles.ctaGlow} />
                <div className={styles.container}>
                    <div className={styles.ctaBox}>
                        <h2>Ready for Professional Capital Allocation?</h2>
                        <p>Join the APFX PAMM infrastructure whether you are an investor looking for passive returns or a proven strategy manager seeking capital to scale.</p>
                        <div className={styles.ctaButtons}>
                            <Link href="https://portal.apfx.com/register" className={styles.btnPrimary}>Open PAMM Account</Link>
                            <Link href="/support" className={styles.btnOutline}>Become a Manager</Link>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}
