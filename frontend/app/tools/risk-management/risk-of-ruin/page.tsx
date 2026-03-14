'use client'

import { useState, useMemo } from 'react'
import styles from '@/components/ui/CalculatorLayout.module.css'
import calcStyles from '../RiskCalc.module.css'

export default function RiskOfRuinPage() {
  const [winRatePct, setWinRatePct] = useState('55')
  const [riskPerTradePct, setRiskPerTradePct] = useState('1')
  const [rewardRiskRatio, setRewardRiskRatio] = useState('1.5')
  const [numTrades, setNumTrades] = useState('100')

  const { ruinPct, riskLevel } = useMemo(() => {
    const W = (parseFloat(winRatePct) || 0) / 100
    const R = parseFloat(rewardRiskRatio) || 0
    const riskPct = parseFloat(riskPerTradePct) || 0
    const n = Math.max(1, Math.min(1000, Math.floor(parseFloat(numTrades) || 0)))
    const edge = W * R - (1 - W)
    const units = riskPct > 0 ? 100 / riskPct : 100
    let ruinPct = 0
    if (edge <= 0) {
      ruinPct = 100
    } else {
      const q = (1 - edge) / (1 + edge)
      ruinPct = Math.min(100, Math.pow(q, Math.min(units, n)) * 100)
    }
    const riskLevel = ruinPct > 30 ? 'High' : ruinPct > 10 ? 'Moderate' : 'Low'
    return { ruinPct, riskLevel }
  }, [winRatePct, riskPerTradePct, rewardRiskRatio, numTrades])

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Risk of Ruin Calculator</h1>
        <p className={styles.subtitle}>
          Estimate the probability of depleting your account based on win rate, risk per trade, reward-to-risk ratio, and number of trades.
        </p>
      </header>
      <div className={styles.inputPanel}>
        <div className={calcStyles.formGrid}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="ror-win">Win rate (%)</label>
            <input
              id="ror-win"
              type="number"
              min="0"
              max="100"
              step="1"
              className={styles.input}
              value={winRatePct}
              onChange={(e) => setWinRatePct(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="ror-risk">Risk per trade (%)</label>
            <input
              id="ror-risk"
              type="number"
              min="0"
              max="100"
              step="0.5"
              className={styles.input}
              value={riskPerTradePct}
              onChange={(e) => setRiskPerTradePct(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="ror-rr">Reward-to-risk ratio</label>
            <input
              id="ror-rr"
              type="number"
              min="0"
              step="0.1"
              className={styles.input}
              value={rewardRiskRatio}
              onChange={(e) => setRewardRiskRatio(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="ror-trades">Number of trades</label>
            <input
              id="ror-trades"
              type="number"
              min="1"
              max="1000"
              step="1"
              className={styles.input}
              value={numTrades}
              onChange={(e) => setNumTrades(e.target.value)}
            />
          </div>
        </div>
        <div className={calcStyles.resultRow}>
          <p className={calcStyles.resultLabel}>Probability of account ruin</p>
          <p className={calcStyles.resultValue}>{ruinPct.toFixed(1)}%</p>
          <span className={`${calcStyles.indicator} ${riskLevel === 'High' ? calcStyles.indicatorHigh : riskLevel === 'Low' ? calcStyles.indicatorLow : calcStyles.indicatorModerate}`}>
            Risk level: {riskLevel}
          </span>
        </div>
      </div>
    </main>
  )
}
