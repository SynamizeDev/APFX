'use client'

import { useState, useMemo } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BottomBar from '@/components/layout/BottomBar'
import styles from '@/components/ui/CalculatorLayout.module.css'

export default function MarginCalculatorPage() {
    const [accountCurrency, setAccountCurrency] = useState('USD')
    const [pair, setPair] = useState('EUR/USD')
    const [leverage, setLeverage] = useState<number>(100)
    const [tradeSize, setTradeSize] = useState<number>(100000)

    const mockRates: Record<string, number> = {
        'EUR/USD': 1.1000,
        'GBP/USD': 1.3000,
        'USD/JPY': 150.00,
        'USD/CHF': 0.8800,
        'AUD/USD': 0.6600,
        'USD/CAD': 1.3600
    }

    const marginRequired = useMemo(() => {
        // Base currency is the first in pair (e.g. EUR in EUR/USD)
        const baseCurrency = pair.split('/')[0]
        
        // Step 1: calculate notional value in base currency
        let notionalValue = tradeSize

        // Step 2: apply leverage
        let requiredMarginBase = notionalValue / leverage

        // Step 3: convert to account currency
        let finalMargin = requiredMarginBase

        if (baseCurrency !== accountCurrency) {
            const conversionPair = `${baseCurrency}/${accountCurrency}`
            const inversePair = `${accountCurrency}/${baseCurrency}`
            
            if (mockRates[conversionPair]) {
                finalMargin = requiredMarginBase * mockRates[conversionPair]
            } else if (mockRates[inversePair]) {
                finalMargin = requiredMarginBase / mockRates[inversePair]
            } else if (accountCurrency === 'USD') {
                if (baseCurrency === 'EUR') finalMargin = requiredMarginBase * 1.10
                if (baseCurrency === 'GBP') finalMargin = requiredMarginBase * 1.30
                if (baseCurrency === 'AUD') finalMargin = requiredMarginBase * 0.66
            }
        }

        return finalMargin
    }, [accountCurrency, pair, leverage, tradeSize])

    return (
        <>
            <Header />
            <main className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Margin Calculator</h1>
                    <p className={styles.subtitle}>
                        Calculate the exact margin required to open a trading position based on your leverage and trade size.
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
                            <label className={styles.label}>Leverage (1:X)</label>
                            <select 
                                className={styles.select}
                                value={leverage}
                                onChange={(e) => setLeverage(Number(e.target.value))}
                            >
                                <option value="10">1:10</option>
                                <option value="30">1:30</option>
                                <option value="50">1:50</option>
                                <option value="100">1:100</option>
                                <option value="200">1:200</option>
                                <option value="500">1:500</option>
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

                    <div className={styles.resultPanel}>
                        <div className={styles.resultTitle}>Required Margin</div>
                        <div className={styles.resultValue}>
                            {marginRequired.toLocaleString('en-US', { style: 'currency', currency: accountCurrency })}
                        </div>
                    </div>
                </div>
            </main>
            <BottomBar />
        </>
    )
}
