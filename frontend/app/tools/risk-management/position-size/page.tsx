'use client'

import { useState, useMemo } from 'react'
import styles from '@/components/ui/CalculatorLayout.module.css'
import calcStyles from '../RiskCalc.module.css'

const PIP_VALUE_PER_LOT = 10

export default function RiskPositionSizePage() {
  const [balance, setBalance] = useState('10000')
  const [riskPct, setRiskPct] = useState('2')
  const [stopLossPips, setStopLossPips] = useState('30')

  const { riskAmount, lots } = useMemo(() => {
    const b = parseFloat(balance) || 0
    const r = parseFloat(riskPct) || 0
    const pips = parseFloat(stopLossPips) || 0
    const riskAmount = b * (r / 100)
    const lots = pips > 0 && PIP_VALUE_PER_LOT > 0 ? riskAmount / (pips * PIP_VALUE_PER_LOT) : 0
    return { riskAmount, lots }
  }, [balance, riskPct, stopLossPips])

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Position Size Calculator</h1>
        <p className={styles.subtitle}>
          Calculate the position size in lots based on your total capital, risk per trade, and stop loss in pips. Uses a standard pip value per lot for USD pairs.
        </p>
      </header>
      <div className={styles.inputPanel}>
        <div className={calcStyles.formGrid}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="ps-balance">Total capital</label>
            <input
              id="ps-balance"
              type="number"
              min="0"
              step="100"
              className={styles.input}
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="ps-risk">Risk per trade (%)</label>
            <input
              id="ps-risk"
              type="number"
              min="0"
              max="100"
              step="0.5"
              className={styles.input}
              value={riskPct}
              onChange={(e) => setRiskPct(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="ps-sl">Stop loss (pips)</label>
            <input
              id="ps-sl"
              type="number"
              min="0"
              step="1"
              className={styles.input}
              value={stopLossPips}
              onChange={(e) => setStopLossPips(e.target.value)}
            />
          </div>
        </div>
        <div className={calcStyles.resultRow}>
          <p className={calcStyles.resultLabel}>Risk amount per trade</p>
          <p className={calcStyles.resultValue}>
            {riskAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className={calcStyles.resultLabel} style={{ marginTop: '1rem' }}>Recommended position size</p>
          <p className={calcStyles.resultValue}>{lots.toFixed(2)} lots</p>
        </div>
      </div>
    </main>
  )
}
