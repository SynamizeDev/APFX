'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, Wallet, Copy, BarChart3, UserCheck, Zap, Layers, TrendingUp, 
  ShieldCheck, Clock, Target, Info, AlertTriangle, Users, 
  Briefcase, TrendingDown, CheckCircle2, ChevronRight, Sliders
} from 'lucide-react'
import Link from 'next/link'
import calcLayout from '@/components/ui/CalculatorLayout.module.css'
import styles from './CopyTrading.module.css'

/* ─── Mock data ───────────────────────────────────────────────── */
const TRADERS = [
  { id: '1', name: 'Alex Rivera', initials: 'AR', averageRoiPct: 12.4, winRatePct: 68, followersCount: 2847, riskLevel: 'Low' as const, style: 'Diversified Alpha', maxDrawdown: 5.2 },
  { id: '2', name: 'Jordan Lee', initials: 'JL', averageRoiPct: 18.2, winRatePct: 62, followersCount: 1923, riskLevel: 'Medium' as const, style: 'Momentum Scalper', maxDrawdown: 12.8 },
  { id: '3', name: 'Sam Chen', initials: 'SC', averageRoiPct: 9.8, winRatePct: 74, followersCount: 4102, riskLevel: 'Low' as const, style: 'Conservative Trend', maxDrawdown: 3.5 },
  { id: '4', name: 'Morgan Blake', initials: 'MB', averageRoiPct: 22.1, winRatePct: 58, followersCount: 1204, riskLevel: 'High' as const, style: 'Aggressive Aggregator', maxDrawdown: 18.4 },
]

const STEPS = [
  { step: 1, title: 'Strategy Screening', description: 'Analyze vetted performance profiles and historical metrics to find providers that match your ROI goals.', icon: User },
  { step: 2, title: 'Capital Allocation', description: 'Choose your deployment amount while maintaining 24/7 control over your account equity.', icon: Wallet },
  { step: 3, title: 'Instant Replication', description: 'Every trade is mirrored in real-time using our ultra-low latency bridging infrastructure.', icon: Copy },
  { step: 4, title: 'Performance Oversight', description: 'Monitor your portfolio live, adjust risk settings, or rotate providers with a single click.', icon: BarChart3 },
]

const BENEFITS = [
  { title: 'Systematic Replication', shortDescription: 'Replicate complex strategies with high-fidelity across all market conditions automatically.', icon: Zap },
  { title: 'Multi-Strategy Diversification', shortDescription: 'Allocate across different providers to mitigate concentration risk and smooth your equity curve.', icon: Layers },
  { title: 'Time-Efficient Management', shortDescription: 'Let professional systems manage the minutiae while you focus on high-level portfolio oversight.', icon: Clock },
  { title: 'Data-Driven Decision Making', shortDescription: 'Base your allocations on audited performance data and institutional-grade risk metrics.', icon: Target },
]

const MONTHLY_RETURNS = [
  { month: 'Jan', returnPct: 2.1 },
  { month: 'Feb', returnPct: -0.5 },
  { month: 'Mar', returnPct: 1.8 },
  { month: 'Apr', returnPct: 3.2 },
  { month: 'May', returnPct: 1.1 },
  { month: 'Jun', returnPct: 2.6 },
  { month: 'Jul', returnPct: -0.2 },
  { month: 'Aug', returnPct: 1.9 },
  { month: 'Sep', returnPct: 2.4 },
  { month: 'Oct', returnPct: 1.5 },
  { month: 'Nov', returnPct: 2.8 },
  { month: 'Dec', returnPct: 1.7 },
]

const RISK_LEVELS = [
  { value: 'Low', label: 'Low' },
  { value: 'Medium', label: 'Medium' },
  { value: 'High', label: 'High' },
]

function StepIcon({ Icon }: { Icon: any }) {
  return <Icon size={24} />
}

function BenefitIcon({ Icon }: { Icon: any }) {
  return <Icon size={22} />
}

function riskPillClass(risk: string) {
  if (risk === 'Low') return styles.riskLow
  if (risk === 'High') return styles.riskHigh
  return styles.riskMedium
}

export default function CopyTradingPage() {
  const [investment, setInvestment] = useState('10000')
  const [monthlyReturnPct, setMonthlyReturnPct] = useState('2')
  const [months, setMonths] = useState('12')

  const [riskInvestment, setRiskInvestment] = useState('10000')
  const [maxDrawdownPct, setMaxDrawdownPct] = useState('15')
  const [riskLevel, setRiskLevel] = useState('Medium')

  const profitResults = useMemo(() => {
    const inv = parseFloat(investment) || 0
    const r = (parseFloat(monthlyReturnPct) || 0) / 100
    const m = Math.max(0, Math.min(360, Math.floor(parseFloat(months) || 0)))
    if (inv <= 0 || m === 0) return { portfolioValue: 0, totalProfit: 0, growthPct: 0 }
    const portfolioValue = inv * Math.pow(1 + r, m)
    const totalProfit = portfolioValue - inv
    const growthPct = inv > 0 ? (totalProfit / inv) * 100 : 0
    return { portfolioValue, totalProfit, growthPct }
  }, [investment, monthlyReturnPct, months])

  const riskResults = useMemo(() => {
    const inv = parseFloat(riskInvestment) || 0
    const dd = Math.max(0, Math.min(100, parseFloat(maxDrawdownPct) || 0)) / 100
    const worstCaseLoss = inv * dd
    const remainingCapital = inv - worstCaseLoss
    return { worstCaseLoss, remainingCapital }
  }, [riskInvestment, maxDrawdownPct])

  const maxBarPct = useMemo(() => Math.max(...MONTHLY_RETURNS.map((r) => Math.abs(r.returnPct))), [])

  return (
    <>
      <section className={styles.hero}>
        <motion.h1 
          className={styles.heroTitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Copy Proven Trading Strategies with Precision
        </motion.h1>
        <motion.p 
          className={styles.heroDesc}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Leverage the expertise of vetted strategy providers through high-fidelity trade synchronization. 
          Our professional infrastructure ensures sub-millisecond execution for seamless portfolio growth.
        </motion.p>
        
        <motion.div 
          className={styles.heroTrustLine}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span>Fully automated</span>
          <div className={styles.trustSeparator} />
          <span>Real-time execution</span>
          <div className={styles.trustSeparator} />
          <span>Full control of funds</span>
        </motion.div>

        <motion.div 
          className={styles.heroActions}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link href="/register" className={styles.heroCtaPrimary}>
            Start Copy Trading <ChevronRight size={18} />
          </Link>
          <a href="#top-traders" className={styles.heroCtaSecondary}>View Top Traders</a>
        </motion.div>
      </section>

      <div className={styles.container}>
        {/* Profit Calculator */}
        <section className={styles.section} aria-labelledby="profit-calc-title">
          <h2 id="profit-calc-title" className={styles.sectionTitle}>Yield Projection Modeling</h2>
          <p className={styles.sectionSubtitle}>
            Forecast potential portfolio growth based on historical performance metrics.
          </p>
          <div className={styles.inputPanel}>
            <div className={styles.formGrid}>
              <div className={calcLayout.formGroup}>
                <label className={calcLayout.label} htmlFor="ct-investment">Investment amount</label>
                <input
                  id="ct-investment"
                  type="number"
                  min="0"
                  step="100"
                  className={calcLayout.input}
                  value={investment}
                  onChange={(e) => setInvestment(e.target.value)}
                />
              </div>
              <div className={calcLayout.formGroup}>
                <label className={calcLayout.label} htmlFor="ct-monthly">Avg. monthly return (%)</label>
                <input
                  id="ct-monthly"
                  type="number"
                  min="-100"
                  step="0.1"
                  className={calcLayout.input}
                  value={monthlyReturnPct}
                  onChange={(e) => setMonthlyReturnPct(e.target.value)}
                />
              </div>
              <div className={calcLayout.formGroup}>
                <label className={calcLayout.label} htmlFor="ct-months">Time period (months)</label>
                <input
                  id="ct-months"
                  type="number"
                  min="1"
                  max="360"
                  className={calcLayout.input}
                  value={months}
                  onChange={(e) => setMonths(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.resultRow}>
              <p className={styles.resultLabel}>Estimated portfolio value</p>
              <motion.p 
                key={profitResults.portfolioValue} 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }}
                className={styles.resultValue}
              >
                {profitResults.portfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </motion.p>
              <div className={styles.resultGrid}>
                <div className={styles.resultGridItem}>
                  <p className={styles.resultLabel}>Total profit</p>
                  <motion.p className={`${styles.resultValue} ${styles.profitPositive}`}>
                    {profitResults.totalProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </motion.p>
                </div>
                <div className={styles.resultGridItem}>
                  <p className={styles.resultLabel}>Growth</p>
                  <p className={styles.resultValue}>{profitResults.growthPct.toFixed(1)}%</p>
                </div>
              </div>
              
              <p className={styles.howThisWorks}>
                <Info size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                Calculated using compound interest based on average monthly returns. Yields are indicative of potential performance scenarios and are not guarantees of future results.
              </p>
              <p className={styles.microDisclaimer}>Returns are indicative and not guaranteed.</p>
            </div>
          </div>
        </section>

        {/* Top Traders */}
        <section className={styles.section} id="top-traders" aria-labelledby="leaderboard-title">
          <h2 id="leaderboard-title" className={styles.sectionTitle}>Strategic Performance Hub</h2>
          <p className={styles.sectionSubtitle}>
            Compare strategy providers based on performance, consistency, and risk profiles.
          </p>
          <div className={styles.leaderboardGrid}>
            {TRADERS.map((t) => (
              <motion.article 
                key={t.id} 
                className={styles.traderCard}
                whileHover={{ scale: 1.02, translateY: -5 }}
              >
                <div className={styles.traderHeader}>
                  <div className={styles.traderAvatar}>{t.initials}</div>
                  <div>
                    <div className={styles.traderName}>{t.name}</div>
                    <span className={styles.traderStyle}>{t.style}</span>
                    <span className={`${styles.riskPill} ${riskPillClass(t.riskLevel)}`}>{t.riskLevel} Risk</span>
                  </div>
                </div>
                <div className={styles.traderStats}>
                  <span className={styles.traderStat}>ROI <strong>{t.averageRoiPct}%</strong></span>
                  <span className={styles.traderStat}>Win rate <strong>{t.winRatePct}%</strong></span>
                </div>
                <div className={styles.traderSecondaryStats}>
                   <span className={styles.traderStat}>Max DD <strong>{t.maxDrawdown}%</strong></span>
                   <span className={styles.traderStat}>Followers <strong>{t.followersCount.toLocaleString()}</strong></span>
                </div>
                <Link href="/register" className={styles.traderCardCta}>Copy Trader</Link>
              </motion.article>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className={styles.section} aria-labelledby="how-title">
          <h2 id="how-title" className={styles.sectionTitle}>Operational Workflow</h2>
          <p className={styles.sectionSubtitle}>
            Four structured steps to synchronize your portfolio with professional trade signals. You stay in control at every step.
          </p>
          <div className={styles.stepsWrap}>
            {STEPS.map((s, idx) => (
              <motion.div 
                key={s.step} 
                className={styles.stepCard}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={styles.stepIcon}><StepIcon Icon={s.icon} /></div>
                <p className={styles.stepNum}>Step {s.step}</p>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepDesc}>{s.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Risk Simulator */}
        <section className={styles.section} aria-labelledby="risk-title">
          <h2 id="risk-title" className={styles.sectionTitle}>Exposure & Drawdown Simulator</h2>
          <p className={styles.sectionSubtitle}>
            Model worst-case scenarios based on maximum drawdown parameters to size your capital allocations responsibly.
          </p>
          <div className={styles.inputPanel}>
            <div className={styles.formGrid}>
              <div className={calcLayout.formGroup}>
                <label className={calcLayout.label} htmlFor="risk-investment">Investment amount</label>
                <input
                  id="risk-investment"
                  type="number"
                  min="0"
                  step="100"
                  className={calcLayout.input}
                  value={riskInvestment}
                  onChange={(e) => setRiskInvestment(e.target.value)}
                />
              </div>
              <div className={calcLayout.formGroup}>
                <label className={calcLayout.label} htmlFor="risk-drawdown">Maximum drawdown (%)</label>
                <input
                  id="risk-drawdown"
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  className={calcLayout.input}
                  value={maxDrawdownPct}
                  onChange={(e) => setMaxDrawdownPct(e.target.value)}
                />
              </div>
              <div className={calcLayout.formGroup}>
                <label className={calcLayout.label} htmlFor="risk-level">Risk level</label>
                <select
                  id="risk-level"
                  className={calcLayout.input}
                  value={riskLevel}
                  onChange={(e) => setRiskLevel(e.target.value)}
                >
                  {RISK_LEVELS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className={styles.resultRow}>
              <p className={styles.resultLabel}>Worst-case loss (at max drawdown)</p>
              <motion.p 
                key={riskResults.worstCaseLoss}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`${styles.resultValue} ${styles.riskResultLoss}`}
              >
                {riskResults.worstCaseLoss.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </motion.p>
              <p className={styles.resultLabel} style={{ marginTop: '1rem' }}>Remaining capital after loss</p>
              <motion.p 
                key={riskResults.remainingCapital}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`${styles.resultValue} ${styles.riskResultRemain}`}
              >
                {riskResults.remainingCapital.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </motion.p>

              <div className={styles.insightCard}>
                 <p><strong><AlertTriangle size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> What this means for your capital:</strong> Even top-tier professional strategies experience drawdowns. This simulator helps you visualize the necessary "capital cushion" required to survive volatility cycles without compromising your long-term tactical edge.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Performance insights */}
        <section className={styles.section} aria-labelledby="insights-title">
          <h2 id="insights-title" className={styles.sectionTitle}>Trader Performance Insights</h2>
          <p className={styles.sectionSubtitle}>
            Audited transparency is the foundation of institutional copy trading. Learn how to interpret performance data beyond simple ROI.
          </p>
          <div className={styles.insightsCard}>
             <div className={styles.insightCard} style={{ marginBottom: '2rem', background: 'rgba(0, 200, 150, 0.05)', borderLeft: '3px solid var(--color-accent)' }}>
                <p><strong><Info size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> How to Read This Data:</strong> While monthly returns fluctuate, consistency and capital preservation are the true indicators of a professional edge. Prioritize providers with stable equity curves and managed drawdown history over those with isolated "ROI spikes."</p>
             </div>
            <p className={styles.chartTitle}>Monthly returns (example)</p>
            <div className={styles.barsWrap}>
              {MONTHLY_RETURNS.map((r) => (
                <div key={r.month} className={styles.barItem}>
                  <div
                    className={r.returnPct >= 0 ? styles.bar : `${styles.bar} ${styles.barNegative}`}
                    style={{ height: `${(Math.abs(r.returnPct) / maxBarPct) * 80}px` }}
                    title={`${r.returnPct}%`}
                  />
                  <span className={styles.barLabel}>{r.month}</span>
                </div>
              ))}
            </div>
            <p className={styles.chartTitle}>Equity growth (example)</p>
            <div className={styles.equityCurve}>
              <svg className={styles.equityLine} viewBox="0 0 400 80" preserveAspectRatio="none" aria-hidden>
                <path d="M0 70 Q50 65 100 58 T200 45 T300 28 T400 15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div className={styles.riskScoreWrap}>
              <span className={styles.riskScoreBadge}>Risk score: Low</span>
              <span className={styles.stepDesc}>Based on volatility and drawdown history.</span>
            </div>
            
            <p className={styles.microDisclaimer} style={{ marginTop: '1.5rem', textAlign: 'center' }}>
               Example analytics. Past performance is not indicative of future results.
            </p>
          </div>
        </section>

        {/* Benefits */}
        <section className={styles.section} aria-labelledby="benefits-title">
          <h2 id="benefits-title" className={styles.sectionTitle}>Capital Efficiency & Diversification</h2>
          <p className={styles.sectionSubtitle}>
             Advanced strategy replication provides a systematic edge for institutional and retail portfolios.
          </p>
          <div className={styles.benefitsGrid}>
            {BENEFITS.map((b) => (
              <div key={b.title} className={styles.benefitCard}>
                <div className={styles.benefitIcon}><BenefitIcon Icon={b.icon} /></div>
                <h3 className={styles.benefitTitle}>{b.title}</h3>
                <p className={styles.benefitDesc}>{b.shortDescription}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Who is it for */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Who is Copy Trading For?</h2>
          <p className={styles.sectionSubtitle}>Tailored solutions for every stage of the trading journey.</p>
          <div className={styles.personaGrid}>
             <div className={styles.personaCard}>
                <div className={styles.personaIcon}><Users size={24} /></div>
                <h3 className={styles.personaTitle}>Beginners</h3>
                <p className={styles.personaDesc}>Accelerate your learning curve by observing and replicating the trade logic of experienced market professionals in real-time.</p>
             </div>
             <div className={styles.personaCard}>
                <div className={styles.personaIcon}><Briefcase size={24} /></div>
                <h3 className={styles.personaTitle}>Busy Professionals</h3>
                <p className={styles.personaDesc}>Access global markets without the time commitment of manual analysis. Let proven systems manage your capital while you focus on your career.</p>
             </div>
             <div className={styles.personaCard}>
                <div className={styles.personaIcon}><Layers size={24} /></div>
                <h3 className={styles.personaTitle}>Advanced Investors</h3>
                <p className={styles.personaDesc}>Diversify your portfolio across multiple asset classes and non-correlated strategies to smooth your returns and reduce systemic risk.</p>
             </div>
          </div>
        </section>

        {/* Risk Disclosure */}
        <section className={styles.riskDisclosureWrapper}>
           <p className={styles.riskDisclosureText}>
              <AlertTriangle size={14} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
              <strong>Institutional Risk Disclosure:</strong> Copy trading involve significant risk to your capital. Performance data presented is historical and not a guarantee of future returns. You should only allocate capital that you can afford to lose. We recommend diversifying across multiple strategy providers to mitigate individual manager risk.
           </p>
        </section>
      </div>

      {/* CTA */}
      <section className={styles.ctaSection} aria-labelledby="cta-title">
        <h2 id="cta-title" className={styles.ctaTitle}>Start Building a Smarter Trading Portfolio</h2>
        <p className={styles.ctaSubtitle}>Experience the power of professional automation with full transparency and control.</p>
        <div className={styles.ctaButtons}>
          <Link href="/register" className={styles.ctaBtnPrimary}>Open Trading Account</Link>
          <Link href="/register" className={styles.ctaBtnSecondary}>Start Copy Trading Now</Link>
        </div>
      </section>
    </>
  )
}
