'use client'

import { useState, useMemo } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BottomBar from '@/components/layout/BottomBar'
import styles from '@/components/ui/CalculatorLayout.module.css'

export default function PipCalculatorPage() {
    const [accountCurrency, setAccountCurrency] = useState('USD')
    const [pair, setPair] = useState('EUR/USD')
    const [tradeSize, setTradeSize] = useState<number>(100000) // 1 Standard Lot defaults to 100,000

    // Typical exchange rates for mock calculation (In a real app, you'd fetch live rates)
    const mockRates: Record<string, number> = {
        'EUR/USD': 1.1000,
        'GBP/USD': 1.3000,
        'USD/JPY': 150.00,
        'USD/CHF': 0.8800,
        'AUD/USD': 0.6600,
        'USD/CAD': 1.3600
    }

    const pipValue = useMemo(() => {
        let pipSize = 0.0001
        if (pair.includes('JPY')) {
            pipSize = 0.01
        }

        // Calculation: Pip Size * Trade Size
        let valueInQuoteCurrency = pipSize * tradeSize

        // Convert quote currency to account currency if they differ
        let quoteCurrency = pair.split('/')[1]
        let finalValue = valueInQuoteCurrency

        if (quoteCurrency !== accountCurrency) {
            // Very simplified conversion using mock rates or inverse
            const conversionPair = `${quoteCurrency}/${accountCurrency}`
            const inversePair = `${accountCurrency}/${quoteCurrency}`
            
            if (mockRates[conversionPair]) {
                finalValue = valueInQuoteCurrency * mockRates[conversionPair]
            } else if (mockRates[inversePair]) {
                finalValue = valueInQuoteCurrency / mockRates[inversePair]
            } else if (accountCurrency === 'USD') {
                // If quote is e.g. CAD and account is USD, divide by USD/CAD
                if (quoteCurrency === 'CAD') finalValue = valueInQuoteCurrency / mockRates['USD/CAD']
                if (quoteCurrency === 'CHF') finalValue = valueInQuoteCurrency / mockRates['USD/CHF']
                if (quoteCurrency === 'JPY') finalValue = valueInQuoteCurrency / mockRates['USD/JPY']
            }
        }

        return finalValue
    }, [accountCurrency, pair, tradeSize])

    return (
        <>
            <Header />
            <main className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Pip Calculator</h1>
                    <p className={styles.subtitle}>
                        Quickly calculate the exact value of a pip for any trade size
                        and currency pair before executing your position.
                    </p>
                </header>

                <div className={styles.grid}>
                    {/* INPUT PANEL */}
                    <div className={styles.inputPanel}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Account Currency</label>
                            <select 
                                className={styles.select}
                                value={accountCurrency}
                                onChange={(e) => setAccountCurrency(e.target.value)}
                            >
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="GBP">GBP</option>
                                <option value="AUD">AUD</option>
                            </select>
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

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Trade Size (Units)</label>
                            <input 
                                type="number" 
                                className={styles.input}
                                value={tradeSize}
                                onChange={(e) => setTradeSize(Number(e.target.value))}
                                min="1000"
                                step="1000"
                            />
                        </div>
                    </div>

                    {/* RESULT PANEL */}
                    <div className={styles.resultPanel}>
                        <div className={styles.resultTitle}>Pip Value</div>
                        <div className={styles.resultValue}>
                            {pipValue.toLocaleString('en-US', { style: 'currency', currency: accountCurrency })}
                        </div>
                    </div>
                </div>
            </main>
            <BottomBar />
        </>
    )
}
