'use client'

import { useState, useMemo } from 'react'
import styles from '@/components/ui/CalculatorLayout.module.css'
import calcStyles from '../RiskCalc.module.css'

const PIP_VALUE_PER_LOT = 10 // USD per pip for standard lot (100k), typical for USD pairs

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
        <h1 className={styles.title}>Risk Per Trade Calculator</h1>
        <p className={styles.subtitle}>
          See how much you could lose per trade and the recommended position size based on your account balance, risk percentage, and stop loss in pips.
        </p>
      </header>
      <div className={styles.inputPanel}>
        <div className={calcStyles.formGrid}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="rpt-balance">Account balance</label>
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
            <label className={styles.label} htmlFor="rpt-risk">Risk percentage per trade</label>
            <input
              id="rpt-risk"
              type="number"
              min="0"
              max="100"
              step="0.1"
              className={styles.input}
              value={riskPct}
              onChange={(e) => setRiskPct(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="rpt-sl">Stop loss (pips)</label>
            <input
              id="rpt-sl"
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
          <p className={calcStyles.resultLabel}>Maximum loss amount</p>
          <p className={calcStyles.resultValue}>
            {maxLoss.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className={calcStyles.resultLabel} style={{ marginTop: '1rem' }}>Recommended position size</p>
          <p className={calcStyles.resultValue}>{positionSizeLots.toFixed(2)} lots</p>
        </div>
      </div>
    </main>
  )
}
