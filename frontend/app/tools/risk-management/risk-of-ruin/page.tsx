'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Info, Target, Shield, Zap, AlertTriangle, Calculator, TrendingUp, Activity, Crosshair, BarChart3, Binary, Flame } from 'lucide-react'
import styles from '@/components/ui/CalculatorLayout.module.css'
import calcStyles from '../RiskCalc.module.css'

export default function RiskOfRuinPage() {
  const [winRatePct, setWinRatePct] = useState('55')
  const [riskPerTradePct, setRiskPerTradePct] = useState('1')
  const [rewardRiskRatio, setRewardRiskRatio] = useState('1.5')
  const [numTrades, setNumTrades] = useState('100')

  const { ruinPct, riskLevel, edge } = useMemo(() => {
    const W = (parseFloat(winRatePct) || 0) / 100
    const R = parseFloat(rewardRiskRatio) || 0
    const riskPct = parseFloat(riskPerTradePct) || 0
    const n = Math.max(1, Math.min(1000, Math.floor(parseFloat(numTrades) || 0)))
    const edgeVal = W * R - (1 - W)
    const units = riskPct > 0 ? 100 / riskPct : 100
    let ruinPctValue = 0
    
    if (edgeVal <= 0) {
      ruinPctValue = 100
    } else {
      // Gambler's Ruin formula: ((1-edge)/(1+edge))^units
      const q = (1 - (W * R - (1 - W)) / (W * R + (1 - W)))
      ruinPctValue = Math.min(100, Math.pow(q, Math.min(units, n)) * 100)
    }
    
    const level = ruinPctValue > 20 ? 'Critical' : ruinPctValue > 5 ? 'High' : ruinPctValue > 1 ? 'Moderate' : 'Institutional'
    return { ruinPct: ruinPctValue, riskLevel: level, edge: edgeVal }
  }, [winRatePct, riskPerTradePct, rewardRiskRatio, numTrades])

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Statistical Survival: Risk of Ruin</h1>
        <p className={styles.subtitle}>
          The ultimate boundary of survival. This tool uses probability theory to 
          estimate the likelihood of total capital depletion based on your edge, 
          execution frequency, and risk intensity.
        </p>
      </header>
      <div className={styles.inputPanel}>
        <div className={calcStyles.formGrid}>
          <div className={styles.formGroup}>
            <div className={styles.labelWrapper}>
              <label className={styles.label} htmlFor="ror-win">Historical Win Rate (%)</label>
              <div className={styles.tooltipContainer}>
                <Activity size={14} />
                <span className={styles.tooltipText}>The percentage of trades that result in a profit.</span>
              </div>
            </div>
            <input
              id="ror-win"
              type="number"
              min="1"
              max="99"
              step="1"
              className={styles.input}
              value={winRatePct}
              onChange={(e) => setWinRatePct(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <div className={styles.labelWrapper}>
              <label className={styles.label} htmlFor="ror-risk">Risk Per Trade (%)</label>
              <div className={styles.tooltipContainer}>
                <Flame size={14} />
                <span className={styles.tooltipText}>The portion of capital exposed to loss on an individual trade.</span>
              </div>
            </div>
            <input
              id="ror-risk"
              type="number"
              min="0.1"
              max="20"
              step="0.1"
              className={styles.input}
              value={riskPerTradePct}
              onChange={(e) => setRiskPerTradePct(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <div className={styles.labelWrapper}>
              <label className={styles.label} htmlFor="ror-rr">Avg. Reward/Risk Ratio</label>
              <div className={styles.tooltipContainer}>
                <TrendingUp size={14} />
                <span className={styles.tooltipText}>The average ratio of profit units to risk units in your setups.</span>
              </div>
            </div>
            <input
              id="ror-rr"
              type="number"
              min="0.1"
              step="0.1"
              className={styles.input}
              value={rewardRiskRatio}
              onChange={(e) => setRewardRiskRatio(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <div className={styles.labelWrapper}>
              <label className={styles.label} htmlFor="ror-trades">Simulation Horizon</label>
              <div className={styles.tooltipContainer}>
                <Binary size={14} />
                <span className={styles.tooltipText}>The number of trades over which the ruin probability is calculated.</span>
              </div>
            </div>
            <input
              id="ror-trades"
              type="number"
              min="10"
              max="5000"
              step="10"
              className={styles.input}
              value={numTrades}
              onChange={(e) => setNumTrades(e.target.value)}
            />
          </div>
        </div>

        <div className={calcStyles.resultRow}>
          <div className={calcStyles.riskMeterContainer}>
             <div className={calcStyles.riskMeterLabel}>
              Depletion Probability: <span className={ruinPct > 5 ? calcStyles.riskHigh : calcStyles.riskSafe}>
                {riskLevel}
              </span>
            </div>
            <div className={calcStyles.progressBar}>
              <motion.div 
                className={calcStyles.progressFill}
                initial={{ width: 0 }}
                animate={{ width: `${ruinPct}%` }}
                style={{ backgroundColor: ruinPct > 10 ? '#ff4d4d' : ruinPct > 1 ? '#ffa500' : 'var(--color-accent)' }}
              />
            </div>
          </div>

          <div className={calcStyles.summaryResultGrid}>
            <div className={calcStyles.summaryItem}>
              <span className={calcStyles.resultLabel}>Risk of Ruin</span>
              <motion.div 
                key={ruinPct}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`${calcStyles.resultValue} ${calcStyles.highlight}`}
              >
                {ruinPct < 0.01 ? '< 0.01%' : `${ruinPct.toFixed(2)}%`}
              </motion.div>
            </div>
            <div className={calcStyles.summaryItem}>
              <span className={calcStyles.resultLabel}>Mathematical Edge</span>
              <motion.div 
                key={edge}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={calcStyles.resultValue}
                style={{ color: edge > 0 ? 'var(--color-accent)' : '#ff4d4d' }}
              >
                {edge > 0 ? `+${edge.toFixed(2)}` : edge.toFixed(2)}
              </motion.div>
            </div>
          </div>
        </div>

        <div className={styles.infoSection}>
          <div className={`${styles.infoCard} ${styles.formulaCard}`}>
            <h3 className={styles.infoTitle}>
              <Calculator size={16} /> The Ruin Equation
            </h3>
            <p className={styles.infoText}>
              Based on the <strong>Gambler's Ruin</strong> theorem. It checks if your edge is sufficient to outrun the "variance-induced depletion" that accompanies any series of random outcomes.
            </p>
          </div>

          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>
              <Binary size={16} /> What This Tool Does
            </h3>
            <p className={styles.infoText}>
              It calculates the <strong>Ultimate Frontier</strong> of your trading business. If this tool shows a ruin probability above 1%, your strategy is mathematically destined for failure, regardless of short-term gains.
            </p>
          </div>
          
          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>
              <Shield size={16} /> Why It Matters
            </h3>
            <p className={styles.infoText}>
              A 0% Risk of Ruin is non-negotiable for professional firms. It ensures 
              that even the worst possible sequence of losses (the "tail event") 
              cannot remove the firm from the marketplace.
            </p>
          </div>

          <div className={`${styles.infoCard} ${styles.proTipCard}`}>
            <h3 className={styles.infoTitle}>
              <Zap size={16} /> Professional Insight
            </h3>
            <p className={styles.infoText}>
              If your Risk of Ruin is high, the solution is rarely to "be a better 
              trader." The solution is to <strong>lower your risk per trade</strong> 
              until the units of capital can survive the variance of your edge.
            </p>
          </div>

          <div className={`${styles.infoCard} ${styles.mistakeCard}`}>
            <h3 className={styles.infoTitle}>
              <AlertTriangle size={16} /> Common Mistake
            </h3>
            <p className={styles.infoText}>
              Confusing a "Positive Edge" with "Invincibility." You can have a 
              profitable strategy but still have a 100% Risk of Ruin if your 
              position sizes are too aggressive relative to your win rate.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
