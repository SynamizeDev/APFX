'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Info, Target, Shield, Zap, AlertTriangle, Calculator, TrendingUp, Activity, Layers, Briefcase, Flame } from 'lucide-react'
import styles from '@/components/ui/CalculatorLayout.module.css'
import calcStyles from '../RiskCalc.module.css'

function getDiversification(totalRiskPct: number): string {
  if (totalRiskPct > 15) return 'High Concentration'
  if (totalRiskPct > 8) return 'Moderate Exposure'
  if (totalRiskPct > 3) return 'Institutional Balance'
  return 'Conservative'
}

export default function PortfolioRiskPage() {
  const [capital, setCapital] = useState('100000')
  const [riskPerStrategyPct, setRiskPerStrategyPct] = useState('2')
  const [numStrategies, setNumStrategies] = useState('4')

  const { totalRiskPct, diversification, riskLevel } = useMemo(() => {
    const r = parseFloat(riskPerStrategyPct) || 0
    const n = Math.max(0, Math.min(50, Math.floor(parseFloat(numStrategies) || 0)))
    const total = n * r
    const level = total > 15 ? 'Critical' : total > 8 ? 'High' : total > 3 ? 'Safe' : 'Low'
    return { totalRiskPct: total, diversification: getDiversification(total), riskLevel: level }
  }, [riskPerStrategyPct, numStrategies])

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Aggregate Portfolio Risk & Heat Analysis</h1>
        <p className={styles.subtitle}>
          Individual trade risk is only half the story. Portfolio risk measures 
          the "Total Heat" on your account, accounting for cumulative exposure 
          across all active positions and strategies.
        </p>
      </header>
      <div className={styles.inputPanel}>
        <div className={calcStyles.formGrid}>
          <div className={styles.formGroup}>
            <div className={styles.labelWrapper}>
              <label className={styles.label} htmlFor="pr-capital">Total Account Equity</label>
              <div className={styles.tooltipContainer}>
                <Briefcase size={14} />
                <span className={styles.tooltipText}>The total net value of your account, including all realized and unrealized P/L.</span>
              </div>
            </div>
            <input
              id="pr-capital"
              type="number"
              min="0"
              step="1000"
              className={styles.input}
              value={capital}
              onChange={(e) => setCapital(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <div className={styles.labelWrapper}>
              <label className={styles.label} htmlFor="pr-risk">Avg. Risk Per Unit (%)</label>
              <div className={styles.tooltipContainer}>
                <Flame size={14} />
                <span className={styles.tooltipText}>The typical risk percentage allocated to a single trade or strategy.</span>
              </div>
            </div>
            <input
              id="pr-risk"
              type="number"
              min="0"
              max="100"
              step="0.5"
              className={styles.input}
              value={riskPerStrategyPct}
              onChange={(e) => setRiskPerStrategyPct(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <div className={styles.labelWrapper}>
              <label className={styles.label} htmlFor="pr-num">Active Positions / Strategies</label>
              <div className={styles.tooltipContainer}>
                <Layers size={14} />
                <span className={styles.tooltipText}>The number of independent trades or automated strategies currently active.</span>
              </div>
            </div>
            <input
              id="pr-num"
              type="number"
              min="0"
              max="50"
              step="1"
              className={styles.input}
              value={numStrategies}
              onChange={(e) => setNumStrategies(e.target.value)}
            />
          </div>
        </div>

        <div className={calcStyles.resultRow}>
          <div className={calcStyles.riskMeterContainer}>
             <div className={calcStyles.riskMeterLabel}>
              Portfolio Heat: <span className={totalRiskPct >= 8 ? calcStyles.riskHigh : calcStyles.riskSafe}>
                {diversification}
              </span>
            </div>
            <div className={calcStyles.progressBar}>
              <motion.div 
                className={calcStyles.progressFill}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(totalRiskPct * 4, 100)}%` }}
                style={{ backgroundColor: totalRiskPct >= 15 ? '#ff4d4d' : totalRiskPct >= 8 ? '#ffa500' : 'var(--color-accent)' }}
              />
            </div>
          </div>

          <div className={calcStyles.summaryResultGrid}>
            <div className={calcStyles.summaryItem}>
              <span className={calcStyles.resultLabel}>Total Percentage Exposure</span>
              <motion.div 
                key={totalRiskPct}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`${calcStyles.resultValue} ${calcStyles.highlight}`}
              >
                {totalRiskPct.toFixed(1)}%
              </motion.div>
            </div>
            <div className={calcStyles.summaryItem}>
              <span className={calcStyles.resultLabel}>Total Dollar Exposure</span>
              <motion.div 
                key={totalRiskPct}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={calcStyles.resultValue}
              >
                {( (parseFloat(capital) || 0) * (totalRiskPct / 100) ).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
              </motion.div>
            </div>
          </div>
        </div>

        <div className={styles.infoSection}>
          <div className={`${styles.infoCard} ${styles.formulaCard}`}>
            <h3 className={styles.infoTitle}>
              <Calculator size={16} /> The "Heat" Calculation
            </h3>
            <p className={styles.infoText}>
              The model calculates: <strong>Avg Risk × Unit Count</strong>. While this assumes no correlation, it represents your "Worst Case" exposure if all positions fail simultaneously.
            </p>
          </div>

          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>
              <Activity size={16} /> What This Tool Does
            </h3>
            <p className={styles.infoText}>
              It aggregates individual risks into a single <strong>Portfolio Metric</strong>. This allows you to see the "Total Pressure" on your account equity at any given moment.
            </p>
          </div>
          
          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>
              <Shield size={16} /> Correlation: The Silent Killer
            </h3>
            <p className={styles.infoText}>
              Diversification only works if risks are <strong>uncorrelated</strong>. If you have 5 trades all long USD, your actual risk is much higher than 5 independent trades because they will likely move in unison.
            </p>
          </div>

          <div className={`${styles.infoCard} ${styles.proTipCard}`}>
            <h3 className={styles.infoTitle}>
              <Zap size={16} /> Professional Insight
            </h3>
            <p className={styles.infoText}>
              Institutional desks limit "Strategic Heat" to 10-15%. Going beyond 
              this makes the account vulnerable to "Black Swan" events where 
              stop-losses may slip and correlations spike to 1.0.
            </p>
          </div>

          <div className={`${styles.infoCard} ${styles.mistakeCard}`}>
            <h3 className={styles.infoTitle}>
              <AlertTriangle size={16} /> Common Mistake
            </h3>
            <p className={styles.infoText}>
              Assuming that 5 strategies in different USD pairs is diversification. 
              If the USD Index spikes, all positions will likely hit their stop 
              losses simultaneously, resulting in a <strong>Max Heat</strong> event.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
