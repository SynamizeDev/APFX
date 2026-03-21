'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Info, Target, Shield, Zap, AlertTriangle, Calculator, TrendingUp, Activity, TrendingDown, Landmark } from 'lucide-react'
import styles from '@/components/ui/CalculatorLayout.module.css'
import calcStyles from '../RiskCalc.module.css'

const RECOVERY_TABLE_ROWS = [5, 10, 15, 20, 25, 30, 40, 50, 60, 75, 90]

export default function DrawdownRecoveryPage() {
  const [balance, setBalance] = useState('100000')
  const [drawdownPct, setDrawdownPct] = useState('20')

  const { capitalLost, returnRequiredPct, currentEquity } = useMemo(() => {
    const b = parseFloat(balance) || 0
    const dd = Math.min(99.9, Math.max(0, parseFloat(drawdownPct) || 0)) / 100
    const lost = b * dd
    const returnRequiredPct = dd < 1 ? (1 / (1 - dd) - 1) * 100 : 0
    return { capitalLost: lost, returnRequiredPct, currentEquity: b - lost }
  }, [balance, drawdownPct])

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>The Math of Misery: Drawdown Logistics</h1>
        <p className={styles.subtitle}>
          Analyze the mathematical and psychological overhead of drawdown. This tool 
          quantifies the exact return required to restore parity after a period of 
          volatility, helping you manage the logistics of portfolio recovery.
        </p>
      </header>
      <div className={styles.inputPanel}>
        <div className={calcStyles.formGrid}>
          <div className={styles.formGroup}>
            <div className={styles.labelWrapper}>
              <label className={styles.label} htmlFor="dd-balance">Starting Capital</label>
              <div className={styles.tooltipContainer}>
                <Landmark size={14} />
                <span className={styles.tooltipText}>The initial balance before the drawdown occurred.</span>
              </div>
            </div>
            <input
              id="dd-balance"
              type="number"
              min="0"
              step="100"
              className={styles.input}
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <div className={styles.labelWrapper}>
              <label className={styles.label} htmlFor="dd-pct">Observed Drawdown (%)</label>
              <div className={styles.tooltipContainer}>
                <TrendingDown size={14} />
                <span className={styles.tooltipText}>The cumulative percentage loss from the peak account value.</span>
              </div>
            </div>
            <input
              id="dd-pct"
              type="number"
              min="0"
              max="99.9"
              step="1"
              className={styles.input}
              value={drawdownPct}
              onChange={(e) => setDrawdownPct(e.target.value)}
            />
          </div>
        </div>

        <div className={calcStyles.resultRow}>
          <div className={calcStyles.riskMeterContainer}>
             <div className={calcStyles.riskMeterLabel}>
              Recovery Difficulty: <span className={parseFloat(drawdownPct) >= 25 ? calcStyles.riskHigh : calcStyles.riskSafe}>
                {parseFloat(drawdownPct) >= 50 ? 'Extreme' : parseFloat(drawdownPct) >= 25 ? 'Significant' : 'Managed'}
              </span>
            </div>
            <div className={calcStyles.progressBar}>
              <motion.div 
                className={calcStyles.progressFill}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(parseFloat(drawdownPct) * 2, 100)}%` }}
                style={{ backgroundColor: parseFloat(drawdownPct) >= 50 ? '#ff4d4d' : parseFloat(drawdownPct) >= 25 ? '#ffa500' : 'var(--color-accent)' }}
              />
            </div>
          </div>

          <div className={calcStyles.summaryResultGrid}>
            <div className={calcStyles.summaryItem}>
              <span className={calcStyles.resultLabel}>Required Return to Parity</span>
              <motion.div 
                key={returnRequiredPct}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`${calcStyles.resultValue} ${calcStyles.highlight}`}
              >
                {returnRequiredPct.toFixed(1)}%
              </motion.div>
            </div>
            <div className={calcStyles.summaryItem}>
              <span className={calcStyles.resultLabel}>Remaining Equity</span>
              <motion.div 
                key={currentEquity}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={calcStyles.resultValue}
              >
                {currentEquity.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
              </motion.div>
            </div>
          </div>
        </div>

        <div className={styles.infoSection}>
          <div className={`${styles.infoCard} ${styles.formulaCard}`}>
            <h3 className={styles.infoTitle}>
              <Calculator size={16} /> Recovery Asymmetry Matrix
            </h3>
            <div className={calcStyles.recoveryTableContainer}>
              <table className={calcStyles.recoveryTable}>
                <thead>
                  <tr>
                    <th>Drawdown</th>
                    <th>Required Gain</th>
                  </tr>
                </thead>
                <tbody>
                  {RECOVERY_TABLE_ROWS.slice(0, 8).map((dd) => (
                    <tr key={dd} style={parseFloat(drawdownPct) === dd ? { background: 'rgba(0, 200, 150, 0.05)' } : {}}>
                      <td>{dd}%</td>
                      <td className={calcStyles.num}>{((1 / (1 - dd / 100) - 1) * 100).toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>
              <Activity size={16} /> What This Tool Does
            </h3>
            <p className={styles.infoText}>
              It visualizes the "Exponential Cost of Loss." While loss is linear, 
              recovery is exponential. This tool shows you exactly why heavy losses 
              are so difficult to repair.
            </p>
          </div>
          
          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>
              <TrendingUp size={16} /> Why It Matters
            </h3>
            <p className={styles.infoText}>
              A 50% loss requires a 100% gain to break even. A 90% loss requires 
              a 900% gain. Risk management is about keeping drawdowns in the 
              "Linear Zone" (0-15%) where recovery is manageable.
            </p>
          </div>

          <div className={`${styles.infoCard} ${styles.proTipCard}`}>
            <h3 className={styles.infoTitle}>
              <Zap size={16} /> Professional Insight
            </h3>
            <p className={styles.infoText}>
              Institutional risk managers use a "Hard Stop" at 20-25% drawdown. 
              At this point, the entire strategy is often halted and re-evaluated, 
              as the mathematical burden of recovery begins to outweigh the edge.
            </p>
          </div>

          <div className={`${styles.infoCard} ${styles.mistakeCard}`}>
            <h3 className={styles.infoTitle}>
              <AlertTriangle size={16} /> Common Mistake
            </h3>
            <p className={styles.infoText}>
              "Doubling Down" into a drawdown. Many traders increase their bet sizes 
              to try and "recover fast." This behavior accelerates your travel down 
              the asymmetry curve, making total ruin almost certain.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
