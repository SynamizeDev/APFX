'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import calcLayout from '@/components/ui/CalculatorLayout.module.css'
import styles from './CopyTrading.module.css'

/* ─── Mock data ───────────────────────────────────────────────── */
const TRADERS = [
  { id: '1', name: 'Alex Rivera', initials: 'AR', averageRoiPct: 12.4, winRatePct: 68, followersCount: 2847, riskLevel: 'Low' as const },
  { id: '2', name: 'Jordan Lee', initials: 'JL', averageRoiPct: 18.2, winRatePct: 62, followersCount: 1923, riskLevel: 'Medium' as const },
  { id: '3', name: 'Sam Chen', initials: 'SC', averageRoiPct: 9.8, winRatePct: 74, followersCount: 4102, riskLevel: 'Low' as const },
  { id: '4', name: 'Morgan Blake', initials: 'MB', averageRoiPct: 22.1, winRatePct: 58, followersCount: 1204, riskLevel: 'High' as const },
]

const STEPS = [
  { step: 1, title: 'Choose a trader to copy', description: 'Browse performance, risk level, and strategy to pick a trader that fits your goals.', icon: 'User' },
  { step: 2, title: 'Allocate funds to copy trading', description: 'Set the amount you want to allocate; you stay in control of your capital.', icon: 'Wallet' },
  { step: 3, title: 'Trades are automatically replicated', description: 'Every qualifying trade from your chosen trader is copied into your account in real time.', icon: 'Copy' },
  { step: 4, title: 'Monitor and manage performance', description: 'Track results, adjust allocation, or switch traders anytime from your dashboard.', icon: 'Chart' },
]

const BENEFITS = [
  { title: 'Follow experienced traders', shortDescription: 'Copy strategies from verified traders with proven track records.', icon: 'UserCheck' },
  { title: 'Automated trading strategies', shortDescription: 'Trades execute automatically—no need to watch the markets 24/7.', icon: 'Zap' },
  { title: 'Diversification of strategies', shortDescription: 'Spread risk by copying multiple traders with different styles.', icon: 'Layers' },
  { title: 'Passive investing opportunity', shortDescription: 'Potential to grow your capital while you focus on other priorities.', icon: 'TrendingUp' },
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

function StepIcon({ name }: { name: string }) {
  const size = 24
  if (name === 'User') return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
  if (name === 'Wallet') return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>
  if (name === 'Copy') return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
  if (name === 'Chart') return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
  return null
}

function BenefitIcon({ name }: { name: string }) {
  const size = 22
  if (name === 'UserCheck') return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><polyline points="16 11 18 13 22 9" /></svg>
  if (name === 'Zap') return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
  if (name === 'Layers') return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /></svg>
  if (name === 'TrendingUp') return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
  return null
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
        <h1 className={styles.heroTitle}>Copy Trading Tools</h1>
        <p className={styles.heroDesc}>
          Follow experienced traders and automatically copy their trades into your account. Use the tools below to explore potential returns, risk, and top performers.
        </p>
        <div className={styles.heroActions}>
          <Link href="/register" className={styles.heroCtaPrimary}>Start Copy Trading</Link>
          <a href="#top-traders" className={styles.heroCtaSecondary}>Explore Top Traders</a>
        </div>
      </section>

      <div className={styles.container}>
        {/* Profit Calculator */}
        <section className={styles.section} aria-labelledby="profit-calc-title">
          <h2 id="profit-calc-title" className={styles.sectionTitle}>Copy Trading Profit Calculator</h2>
          <p className={styles.sectionSubtitle}>
            Estimate how your portfolio could grow based on an average monthly return and time horizon.
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
                <label className={calcLayout.label} htmlFor="ct-monthly">Average monthly return (%)</label>
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
              <p className={styles.resultValue}>
                {profitResults.portfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <div className={styles.resultGrid}>
                <div className={styles.resultGridItem}>
                  <p className={styles.resultLabel}>Total profit</p>
                  <p className={styles.resultValue}>{profitResults.totalProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
                <div className={styles.resultGridItem}>
                  <p className={styles.resultLabel}>Growth</p>
                  <p className={styles.resultValue}>{profitResults.growthPct.toFixed(1)}%</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Top Traders */}
        <section className={styles.section} id="top-traders" aria-labelledby="leaderboard-title">
          <h2 id="leaderboard-title" className={styles.sectionTitle}>Top Traders Leaderboard</h2>
          <p className={styles.sectionSubtitle}>
            Example traders you can copy. Performance and risk vary; always do your own research.
          </p>
          <div className={styles.leaderboardGrid}>
            {TRADERS.map((t) => (
              <article key={t.id} className={styles.traderCard}>
                <div className={styles.traderHeader}>
                  <div className={styles.traderAvatar}>{t.initials}</div>
                  <div>
                    <div className={styles.traderName}>{t.name}</div>
                    <span className={`${styles.riskPill} ${riskPillClass(t.riskLevel)}`}>{t.riskLevel}</span>
                  </div>
                </div>
                <div className={styles.traderStats}>
                  <span className={styles.traderStat}>ROI <strong>{t.averageRoiPct}%</strong></span>
                  <span className={styles.traderStat}>Win rate <strong>{t.winRatePct}%</strong></span>
                  <span className={styles.traderStat}>Followers <strong>{t.followersCount.toLocaleString()}</strong></span>
                </div>
                <Link href="/register" className={styles.traderCardCta}>Copy Trader</Link>
              </article>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className={styles.section} aria-labelledby="how-title">
          <h2 id="how-title" className={styles.sectionTitle}>How Copy Trading Works</h2>
          <p className={styles.sectionSubtitle}>
            Four simple steps to start copying trades from experienced traders.
          </p>
          <div className={styles.stepsWrap}>
            {STEPS.map((s) => (
              <div key={s.step} className={styles.stepCard}>
                <div className={styles.stepIcon}><StepIcon name={s.icon} /></div>
                <p className={styles.stepNum}>Step {s.step}</p>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepDesc}>{s.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Risk Simulator */}
        <section className={styles.section} aria-labelledby="risk-title">
          <h2 id="risk-title" className={styles.sectionTitle}>Risk Simulator Tool</h2>
          <p className={styles.sectionSubtitle}>
            See a worst-case scenario based on maximum drawdown so you can size your copy-trading allocation responsibly.
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
              <p className={`${styles.resultValue} ${styles.riskResultLoss}`}>
                {riskResults.worstCaseLoss.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <p className={styles.resultLabel} style={{ marginTop: '1rem' }}>Remaining capital after loss</p>
              <p className={`${styles.resultValue} ${styles.riskResultRemain}`}>
                {riskResults.remainingCapital.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </section>

        {/* Performance insights */}
        <section className={styles.section} aria-labelledby="insights-title">
          <h2 id="insights-title" className={styles.sectionTitle}>Trader Performance Insights</h2>
          <p className={styles.sectionSubtitle}>
            Example analytics to show the kind of transparency you get when evaluating copy traders.
          </p>
          <div className={styles.insightsCard}>
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
          </div>
        </section>

        {/* Benefits */}
        <section className={styles.section} aria-labelledby="benefits-title">
          <h2 id="benefits-title" className={styles.sectionTitle}>Benefits of Copy Trading</h2>
          <p className={styles.sectionSubtitle}>
            Why many traders use copy trading to diversify and automate their approach.
          </p>
          <div className={styles.benefitsGrid}>
            {BENEFITS.map((b) => (
              <div key={b.title} className={styles.benefitCard}>
                <div className={styles.benefitIcon}><BenefitIcon name={b.icon} /></div>
                <h3 className={styles.benefitTitle}>{b.title}</h3>
                <p className={styles.benefitDesc}>{b.shortDescription}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* CTA */}
      <section className={styles.ctaSection} aria-labelledby="cta-title">
        <h2 id="cta-title" className={styles.ctaTitle}>Ready to Start Copy Trading?</h2>
        <p className={styles.ctaSubtitle}>Open an account and begin copying top traders in minutes.</p>
        <div className={styles.ctaButtons}>
          <Link href="/register" className={styles.ctaBtnPrimary}>Open Trading Account</Link>
          <Link href="/register" className={styles.ctaBtnSecondary}>Start Copy Trading</Link>
        </div>
      </section>
    </>
  )
}
