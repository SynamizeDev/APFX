'use client'

import { useState, useMemo } from 'react'
import styles from '@/components/ui/CalculatorLayout.module.css'
import calcStyles from '../RiskCalc.module.css'

function getDiversification(totalRiskPct: number): string {
  if (totalRiskPct > 20) return 'High concentration — consider reducing exposure'
  if (totalRiskPct > 10) return 'Moderate — acceptable for active traders'
  if (totalRiskPct > 5) return 'Balanced — good diversification'
  return 'Conservative — consider adding strategies for growth'
}

export default function PortfolioRiskPage() {
  const [capital, setCapital] = useState('50000')
  const [riskPerStrategyPct, setRiskPerStrategyPct] = useState('2')
  const [numStrategies, setNumStrategies] = useState('3')

  const { totalRiskPct, diversification } = useMemo(() => {
    const cap = parseFloat(capital) || 0
    const r = parseFloat(riskPerStrategyPct) || 0
    const n = Math.max(0, Math.min(20, Math.floor(parseFloat(numStrategies) || 0)))
    const totalRiskPct = n * r
    return { totalRiskPct, diversification: getDiversification(totalRiskPct) }
  }, [capital, riskPerStrategyPct, numStrategies])

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Portfolio Risk Calculator</h1>
        <p className={styles.subtitle}>
          See your total portfolio risk exposure when running multiple strategies or trades and get a suggested diversification level.
        </p>
      </header>
      <div className={styles.inputPanel}>
        <div className={calcStyles.formGrid}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="pr-capital">Total capital</label>
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
            <label className={styles.label} htmlFor="pr-risk">Risk per strategy (%)</label>
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
            <label className={styles.label} htmlFor="pr-num">Number of strategies or trades</label>
            <input
              id="pr-num"
              type="number"
              min="0"
              max="20"
              step="1"
              className={styles.input}
              value={numStrategies}
              onChange={(e) => setNumStrategies(e.target.value)}
            />
          </div>
        </div>
        <div className={calcStyles.resultRow}>
          <p className={calcStyles.resultLabel}>Total portfolio risk exposure</p>
          <p className={calcStyles.resultValue}>{totalRiskPct.toFixed(1)}%</p>
          <p className={calcStyles.resultLabel} style={{ marginTop: '1rem' }}>Suggested diversification level</p>
          <p className={calcStyles.resultValue} style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-1)' }}>{diversification}</p>
        </div>
      </div>
    </main>
  )
}
