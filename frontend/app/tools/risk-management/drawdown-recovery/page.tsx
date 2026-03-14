'use client'

import { useState, useMemo } from 'react'
import styles from '@/components/ui/CalculatorLayout.module.css'
import calcStyles from '../RiskCalc.module.css'

const RECOVERY_TABLE_ROWS = [5, 10, 15, 20, 25, 30, 40, 50]

export default function DrawdownRecoveryPage() {
  const [balance, setBalance] = useState('10000')
  const [drawdownPct, setDrawdownPct] = useState('20')

  const { capitalLost, returnRequiredPct } = useMemo(() => {
    const b = parseFloat(balance) || 0
    const dd = Math.min(99, Math.max(0, parseFloat(drawdownPct) || 0)) / 100
    const lost = b * dd
    const returnRequiredPct = dd < 1 ? (1 / (1 - dd) - 1) * 100 : 0
    return { capitalLost: lost, returnRequiredPct }
  }, [balance, drawdownPct])

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Drawdown Recovery Calculator</h1>
        <p className={styles.subtitle}>
          See how much capital is lost at a given drawdown and what percentage return you need to recover to break even.
        </p>
      </header>
      <div className={styles.inputPanel}>
        <div className={calcStyles.formGrid}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="dd-balance">Current account balance</label>
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
            <label className={styles.label} htmlFor="dd-pct">Drawdown percentage</label>
            <input
              id="dd-pct"
              type="number"
              min="0"
              max="99"
              step="1"
              className={styles.input}
              value={drawdownPct}
              onChange={(e) => setDrawdownPct(e.target.value)}
            />
          </div>
        </div>
        <div className={calcStyles.resultRow}>
          <p className={calcStyles.resultLabel}>Capital lost</p>
          <p className={calcStyles.resultValue}>
            {capitalLost.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className={calcStyles.resultLabel} style={{ marginTop: '1rem' }}>Percentage return required to recover</p>
          <p className={calcStyles.resultValue}>{returnRequiredPct.toFixed(1)}%</p>
        </div>
        <p className={calcStyles.resultLabel} style={{ marginTop: '1.5rem', textAlign: 'left' }}>Recovery by drawdown level</p>
        <table className={calcStyles.recoveryTable}>
          <thead>
            <tr>
              <th>Drawdown %</th>
              <th>Return needed to recover</th>
            </tr>
          </thead>
          <tbody>
            {RECOVERY_TABLE_ROWS.map((dd) => {
              const req = dd < 100 ? (1 / (1 - dd / 100) - 1) * 100 : 0
              return (
                <tr key={dd}>
                  <td className={calcStyles.num}>{dd}%</td>
                  <td className={calcStyles.num}>{req.toFixed(1)}%</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </main>
  )
}
