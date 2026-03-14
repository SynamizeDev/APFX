'use client'

import { useState, useMemo } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BottomBar from '@/components/layout/BottomBar'
import styles from '@/components/ui/CalculatorLayout.module.css'

export default function PositionSizeCalculatorPage() {
    const [accountCurrency, setAccountCurrency] = useState('USD')
    const [accountBalance, setAccountBalance] = useState<number>(10000)
    const [riskPercentage, setRiskPercentage] = useState<number>(1)
    const [stopLossPips, setStopLossPips] = useState<number>(50)
    const [pair, setPair] = useState('EUR/USD')

    const mockRates: Record<string, number> = {
        'EUR/USD': 1.1000,
        'GBP/USD': 1.3000,
        'USD/JPY': 150.00,
        'USD/CHF': 0.8800,
        'AUD/USD': 0.6600,
        'USD/CAD': 1.3600
    }

    const { riskAmount, units, lots } = useMemo(() => {
        // Amount at risk
        const riskAmount = accountBalance * (riskPercentage / 100)

        // Determine pip value in account currency for 1 standard lot (100k)
        let pipSize = pair.includes('JPY') ? 0.01 : 0.0001
        let quoteCurrency = pair.split('/')[1]
        
        let pipValuePerLot = 100000 * pipSize

        if (quoteCurrency !== accountCurrency) {
            if (accountCurrency === 'USD') {
                if (quoteCurrency === 'CAD') pipValuePerLot /= mockRates['USD/CAD']
                if (quoteCurrency === 'CHF') pipValuePerLot /= mockRates['USD/CHF']
                if (quoteCurrency === 'JPY') pipValuePerLot /= mockRates['USD/JPY']
            }
        }

        // Calculate Position Size: (Risk Amount) / (Stop Loss Pips * Pip Value Per Unit)
        // Wait, units = Risk Amount / (Stop Loss Pips * Pip Value per 1 unit)
        let pipValuePerUnit = pipValuePerLot / 100000
        let unitsCalculated = riskAmount / (stopLossPips * pipValuePerUnit)
        
        let lotsCalculated = unitsCalculated / 100000

        return {
            riskAmount,
            units: Math.round(unitsCalculated),
            lots: Number(lotsCalculated.toFixed(2))
        }
    }, [accountBalance, riskPercentage, stopLossPips, pair, accountCurrency])

    return (
        <>
            <Header />
            <main className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Position Size Calculator</h1>
                    <p className={styles.subtitle}>
                        Manage your risk effectively. Calculate the exact position size to trade based on your balance, risk percentage, and stop loss.
                    </p>
                </header>

                <div className={styles.grid}>
                    <div className={styles.inputPanel}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Account Currency</label>
                            <select 
                                className={styles.select}
                                value={accountCurrency}
                                onChange={(e) => setAccountCurrency(e.target.value)}
                            >
                                <option value="USD">USD</option>
                            </select>
                        </div>
                        
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Account Balance</label>
                            <input 
                                type="number" 
                                className={styles.input}
                                value={accountBalance}
                                onChange={(e) => setAccountBalance(Number(e.target.value))}
                                min="100"
                                step="100"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Risk Percentage (%)</label>
                            <input 
                                type="number" 
                                className={styles.input}
                                value={riskPercentage}
                                onChange={(e) => setRiskPercentage(Number(e.target.value))}
                                min="0.1"
                                step="0.1"
                                max="100"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Stop Loss (Pips)</label>
                            <input 
                                type="number" 
                                className={styles.input}
                                value={stopLossPips}
                                onChange={(e) => setStopLossPips(Number(e.target.value))}
                                min="1"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Currency Pair</label>
                            <select 
                                className={styles.select}
                                value={pair}
                                onChange={(e) => setPair(e.target.value)}
                            >
                                {Object.keys(mockRates).map(p => (
                                    <option key={p} value={p}>{p}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className={styles.resultPanel}>
                        <div className={styles.resultTitle}>Amount at Risk</div>
                        <div className={styles.resultValue} style={{ fontSize: '2rem', marginBottom: '2rem' }}>
                            {riskAmount.toLocaleString('en-US', { style: 'currency', currency: accountCurrency })}
                        </div>

                        <div className={styles.resultTitle}>Position Size (Units)</div>
                        <div className={styles.resultValue} style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>
                            {units.toLocaleString()}
                        </div>

                        <div className={styles.resultTitle}>Standard Lots</div>
                        <div className={styles.resultValue}>
                            {lots}
                        </div>
                    </div>
                </div>
            </main>
            <BottomBar />
        </>
    )
}
