'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Info, Target, Shield, Zap, AlertTriangle, Calculator, TrendingUp, Activity, Crosshair, BarChart3 } from 'lucide-react'
import styles from '@/components/ui/CalculatorLayout.module.css'
import calcStyles from '../RiskCalc.module.css'

function getQuality(ratio: number): 'Poor' | 'Moderate' | 'Good' {
  if (ratio < 1) return 'Poor'
  if (ratio <= 2.5) return 'Moderate'
  return 'Good'
}

export default function RiskRewardPage() {
  const [entry, setEntry] = useState('1.1000')
  const [stopLoss, setStopLoss] = useState('1.0950')
  const [takeProfit, setTakeProfit] = useState('1.1150')

  const { ratio, quality, breakevenWinRate } = useMemo(() => {
    const e = parseFloat(entry) || 0
    const sl = parseFloat(stopLoss) || 0
    const tp = parseFloat(takeProfit) || 0
    const risk = Math.abs(e - sl)
    const reward = Math.abs(tp - e)
    const r = risk > 0 ? reward / risk : 0
    const be = r > 0 ? (1 / (1 + r)) * 100 : 0
    return { ratio: r, quality: getQuality(r), breakevenWinRate: be }
  }, [entry, stopLoss, takeProfit])

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Asymmetric Risk-Reward Profiler</h1>
        <p className={styles.subtitle}>
          Objectively evaluate the viability of your setups by assessing risk-reward asymmetries. 
          Standardize your execution by prioritizing high-probability trades with mathematically 
          favorable ROI profiles.
        </p>
      </header>
      <div className={styles.inputPanel}>
        <div className={calcStyles.formGrid}>
          <div className={styles.formGroup}>
            <div className={styles.labelWrapper}>
              <label className={styles.label} htmlFor="rr-entry">Entry Price</label>
              <div className={styles.tooltipContainer}>
                <Crosshair size={14} />
                <span className={styles.tooltipText}>The level at which you plan to enter the market.</span>
              </div>
            </div>
            <input
              id="rr-entry"
              type="number"
              step="any"
              className={styles.input}
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <div className={styles.labelWrapper}>
              <label className={styles.label} htmlFor="rr-sl">Stop Loss</label>
              <div className={styles.tooltipContainer}>
                <Target size={14} />
                <span className={styles.tooltipText}>The level at which your trade thesis is invalidated.</span>
              </div>
            </div>
            <input
              id="rr-sl"
              type="number"
              step="any"
              className={styles.input}
              value={stopLoss}
              onChange={(e) => setStopLoss(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <div className={styles.labelWrapper}>
              <label className={styles.label} htmlFor="rr-tp">Take Profit</label>
              <div className={styles.tooltipContainer}>
                <TrendingUp size={14} />
                <span className={styles.tooltipText}>The target level where you will exit the trade with a profit.</span>
              </div>
            </div>
            <input
              id="rr-tp"
              type="number"
              step="any"
              className={styles.input}
              value={takeProfit}
              onChange={(e) => setTakeProfit(e.target.value)}
            />
          </div>
        </div>

        <div className={calcStyles.resultRow}>
          <div className={calcStyles.summaryResultGrid}>
            <div className={calcStyles.summaryItem}>
              <span className={calcStyles.resultLabel}>Risk-Reward Ratio</span>
              <motion.div 
                key={ratio}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`${calcStyles.resultValue} ${calcStyles.highlight}`}
              >
                1 : {ratio.toFixed(2)}
              </motion.div>
            </div>
            <div className={calcStyles.summaryItem}>
              <span className={calcStyles.resultLabel}>Required Win Rate</span>
              <motion.div 
                key={breakevenWinRate}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={calcStyles.resultValue}
              >
                {breakevenWinRate.toFixed(1)}%
              </motion.div>
            </div>
          </div>
          
          <div style={{ marginTop: '1.5rem' }}>
            <span className={`${calcStyles.indicator} ${quality === 'Poor' ? calcStyles.indicatorPoor : quality === 'Moderate' ? calcStyles.indicatorModerate : calcStyles.indicatorGood}`}>
              Profile Quality: {quality}
            </span>
          </div>
        </div>

        <div className={styles.infoSection}>
          <div className={`${styles.infoCard} ${styles.formulaCard}`}>
            <h3 className={styles.infoTitle}>
              <BarChart3 size={16} /> Breakeven Win Rate Matrix
            </h3>
            <div className={calcStyles.recoveryTableContainer}>
              <table className={calcStyles.recoveryTable}>
                <thead>
                  <tr>
                    <th>R:R Ratio</th>
                    <th>Req. Win Rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>1:1</td><td className={calcStyles.num}>50%</td></tr>
                  <tr><td>1:2</td><td className={calcStyles.num}>33%</td></tr>
                  <tr style={{ background: 'rgba(0, 200, 150, 0.05)' }}>
                    <td>1:3 (Pro Target)</td>
                    <td className={calcStyles.num}>25%</td></tr>
                  <tr><td>1:5</td><td className={calcStyles.num}>17%</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>
              <Activity size={16} /> The Asymmetry Advantage
            </h3>
            <p className={styles.infoText}>
              In institutional trading, "edge" is not just predicting direction—it is 
              securing <strong>Asymmetry</strong>. By targeting 1:3 RR, you can be wrong 
              70% of the time and still remain net profitable.
            </p>
          </div>
          
          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>
              <Shield size={16} /> Why It Matters
            </h3>
            <p className={styles.infoText}>
              Your R:R ratio is the bridge between win rate and account growth. It 
              removes the emotional need to "be right" and replaces it with the 
              mathematical necessity of "winning big."
            </p>
          </div>

          <div className={`${styles.infoCard} ${styles.proTipCard}`}>
            <h3 className={styles.infoTitle}>
              <Zap size={16} /> Professional Insight
            </h3>
            <p className={styles.infoText}>
              Hedge funds often ignore setups below 1:2.5. They understand that 
              slippage, commissions, and spread "decay" lower-ratio trades, turning 
              the math against you over a long enough sample size.
            </p>
          </div>

          <div className={`${styles.infoCard} ${styles.mistakeCard}`}>
            <h3 className={styles.infoTitle}>
              <AlertTriangle size={16} /> Common Mistake
            </h3>
            <p className={styles.infoText}>
              Forcing target levels just to "make the R:R look good." If the market 
              structure doesn't support the target, the trade will fail. Let market 
              structure dictate target, then check if R:R meets your minimum filter.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
