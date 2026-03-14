'use client'

import { useState, useMemo } from 'react'
import styles from '@/components/ui/CalculatorLayout.module.css'
import calcStyles from '../RiskCalc.module.css'

function getQuality(ratio: number): 'Poor' | 'Moderate' | 'Good' {
  if (ratio < 1) return 'Poor'
  if (ratio <= 2) return 'Moderate'
  return 'Good'
}

export default function RiskRewardPage() {
  const [entry, setEntry] = useState('100')
  const [stopLoss, setStopLoss] = useState('98')
  const [takeProfit, setTakeProfit] = useState('106')

  const { ratio, quality } = useMemo(() => {
    const e = parseFloat(entry) || 0
    const sl = parseFloat(stopLoss) || 0
    const tp = parseFloat(takeProfit) || 0
    const risk = Math.abs(e - sl)
    const reward = Math.abs(tp - e)
    const r = risk > 0 ? reward / risk : 0
    return { ratio: r, quality: getQuality(r) }
  }, [entry, stopLoss, takeProfit])

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Risk-Reward Ratio Calculator</h1>
        <p className={styles.subtitle}>
          Enter entry, stop loss, and take profit to see your risk-reward ratio and a simple trade quality indicator.
        </p>
      </header>
      <div className={styles.inputPanel}>
        <div className={calcStyles.formGrid}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="rr-entry">Entry price</label>
            <input
              id="rr-entry"
              type="number"
              min="0"
              step="any"
              className={styles.input}
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="rr-sl">Stop loss price</label>
            <input
              id="rr-sl"
              type="number"
              min="0"
              step="any"
              className={styles.input}
              value={stopLoss}
              onChange={(e) => setStopLoss(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="rr-tp">Take profit price</label>
            <input
              id="rr-tp"
              type="number"
              min="0"
              step="any"
              className={styles.input}
              value={takeProfit}
              onChange={(e) => setTakeProfit(e.target.value)}
            />
          </div>
        </div>
        <div className={calcStyles.resultRow}>
          <p className={calcStyles.resultLabel}>Risk-reward ratio</p>
          <p className={calcStyles.resultValue}>1 : {ratio.toFixed(2)}</p>
          <span className={`${calcStyles.indicator} ${quality === 'Poor' ? calcStyles.indicatorPoor : quality === 'Moderate' ? calcStyles.indicatorModerate : calcStyles.indicatorGood}`}>
            Trade quality: {quality}
          </span>
        </div>
      </div>
    </main>
  )
}
