'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Info, Target, Shield, Zap, AlertTriangle, Calculator, TrendingUp, HandCoins, Activity, Percent } from 'lucide-react'
import styles from '@/components/ui/CalculatorLayout.module.css'
import calcStyles from '../RiskCalc.module.css'

const PIP_VALUE_PER_LOT = 10 

export default function RiskPerTradePage() {
  const [balance, setBalance] = useState('10000')
  const [riskPct, setRiskPct] = useState('1')
  const [stopLossPips, setStopLossPips] = useState('20')

  const { maxLoss, positionSizeLots } = useMemo(() => {
    const b = parseFloat(balance) || 0
    const r = parseFloat(riskPct) || 0
    const pips = parseFloat(stopLossPips) || 0
    const maxLoss = b * (r / 100)
    const positionSizeLots = pips > 0 && PIP_VALUE_PER_LOT > 0 ? maxLoss / (pips * PIP_VALUE_PER_LOT) : 0
    return { maxLoss, positionSizeLots }
  }, [balance, riskPct, stopLossPips])

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Positional Exposure & Risk Modeling</h1>
        <p className={styles.subtitle}>
          Institutional-grade risk management begins with precise exposure modeling. Use this tool 
          to calculate optimal position sizes based on your account equity and hard-stop thresholds, 
          ensuring systemic capital preservation across every trade.
        </p>
      </header>
      <div className={styles.inputPanel}>
        <div className={calcStyles.formGrid}>
          <div className={styles.formGroup}>
            <div className={styles.labelWrapper}>
              <label className={styles.label} htmlFor="rpt-balance">Account Balance</label>
              <div className={styles.tooltipContainer}>
                <HandCoins size={14} />
                <span className={styles.tooltipText}>The total funds currently in your trading account.</span>
              </div>
            </div>
            <input
              id="rpt-balance"
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
              <label className={styles.label} htmlFor="rpt-risk">Risk Preference (%)</label>
              <div className={styles.tooltipContainer}>
                <Percent size={14} />
                <span className={styles.tooltipText}>The percentage of your total balance you are willing to lose on this single trade.</span>
              </div>
            </div>
            <input
              id="rpt-risk"
              type="number"
              min="0.1"
              max="100"
              step="0.1"
              className={styles.input}
              value={riskPct}
              onChange={(e) => setRiskPct(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <div className={styles.labelWrapper}>
              <label className={styles.label} htmlFor="rpt-sl">Stop Loss (Pips)</label>
              <div className={styles.tooltipContainer}>
                <Target size={14} />
                <span className={styles.tooltipText}>The distance from your entry price to your exit point if the trade goes against you.</span>
              </div>
            </div>
            <input
              id="rpt-sl"
              type="number"
              min="1"
              step="1"
              className={styles.input}
              value={stopLossPips}
              onChange={(e) => setStopLossPips(e.target.value)}
            />
          </div>
        </div>

        <div className={calcStyles.resultRow}>
          <div className={calcStyles.riskMeterContainer}>
            <div className={calcStyles.riskMeterLabel}>
              Risk Intensity: <span className={parseFloat(riskPct) >= 2 ? calcStyles.riskHigh : calcStyles.riskSafe}>
                {parseFloat(riskPct) >= 5 ? 'High Risk' : parseFloat(riskPct) >= 2 ? 'Aggressive' : 'Institutional'}
              </span>
            </div>
            <div className={calcStyles.progressBar}>
              <motion.div 
                className={calcStyles.progressFill}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(parseFloat(riskPct) * 10, 100)}%` }}
                style={{ backgroundColor: parseFloat(riskPct) >= 5 ? '#ff4d4d' : parseFloat(riskPct) >= 2 ? '#ffa500' : 'var(--color-accent)' }}
              />
            </div>
          </div>

          <div className={calcStyles.summaryResultGrid}>
            <div className={calcStyles.summaryItem}>
              <span className={calcStyles.resultLabel}>Maximum Dollar Risk</span>
              <motion.span 
                key={maxLoss}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`${calcStyles.resultValue} ${calcStyles.highlight}`}
              >
                {maxLoss.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
              </motion.span>
            </div>
            <div className={calcStyles.summaryItem}>
              <span className={calcStyles.resultLabel}>Calculated Position Size</span>
              <motion.span 
                key={positionSizeLots}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={calcStyles.resultValue}
              >
                {positionSizeLots.toFixed(2)} Lots
              </motion.span>
            </div>
          </div>
        </div>

        <div className={styles.infoSection}>
          <div className={`${styles.infoCard} ${styles.formulaCard}`}>
            <h3 className={styles.infoTitle}>
              <Calculator size={16} /> How it is Calculated
            </h3>
            <p className={styles.infoText}>
              The model solves for: <strong>(Balance × Risk%) / (Stop Loss × Pip Value)</strong>. This ensures that even if you are stopped out, your loss is mathematically capped at your predetermined threshold.
            </p>
          </div>

          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>
              <Activity size={16} /> What This Tool Does
            </h3>
            <p className={styles.infoText}>
              It transforms your risk tolerance into an actionable execution size. Instead of guessing how many lots to trade, you use hard data to align your position with your account's survival needs.
            </p>
          </div>
          
          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>
              <Shield size={16} /> The Survival Factor
            </h3>
            <p className={styles.infoText}>
              Trading is a game of probability. By risking only 1% per trade, you require <strong>100 consecutive losses</strong> to blow your account. This "statistical buffer" allows professionals to survive losing streaks that would bankrupt a gambler.
            </p>
          </div>

          <div className={`${styles.infoCard} ${styles.proTipCard}`}>
            <h3 className={styles.infoTitle}>
              <Zap size={16} /> Professional Insight
            </h3>
            <p className={styles.infoText}>
              Top-tier hedge funds rarely risk more than 0.5% to 1% per trade. They understand that preserving capital during high-volatility events depends on low exposure and high precision.
            </p>
          </div>

          <div className={`${styles.infoCard} ${styles.mistakeCard}`}>
            <h3 className={styles.infoTitle}>
              <AlertTriangle size={16} /> Common Mistake
            </h3>
            <p className={styles.infoText}>
              "Revenge Trading" — doubling your risk after a loss to "recover fast." This is the primary reason for account ruin. Institutional discipline requires you to <strong>reduce</strong> risk during drawdowns, not increase it.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
