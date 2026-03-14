'use client'

import { useState, useMemo, useEffect } from 'react'
import Select from '@/components/ui/Select'
import styles from '@/components/ui/CalculatorLayout.module.css'
import marginStyles from './MarginCalculator.module.css'

const INSTRUMENTS = [
    'EUR/USD',
    'GBP/USD',
    'USD/JPY',
    'USD/CHF',
    'AUD/USD',
    'USD/CAD',
] as const

const DEPOSIT_CURRENCIES = [
    { value: 'USD', label: 'US Dollar' },
    { value: 'EUR', label: 'Euro' },
    { value: 'GBP', label: 'British Pound' },
    { value: 'AUD', label: 'Australian Dollar' },
] as const

const CONTRACT_SIZE = 100_000

const mockRates: Record<string, number> = {
    'EUR/USD': 1.1000,
    'GBP/USD': 1.3000,
    'USD/JPY': 150.0,
    'USD/CHF': 0.88,
    'AUD/USD': 0.66,
    'USD/CAD': 1.36,
}

export default function MarginCalculatorPage() {
    const [instrument, setInstrument] = useState('EUR/USD')
    const [depositCurrency, setDepositCurrency] = useState('USD')
    const [leverage, setLeverage] = useState(100)
    const [lots, setLots] = useState(1)
    const [price, setPrice] = useState(1.14152)

    useEffect(() => {
        const rate = mockRates[instrument]
        if (rate != null) setPrice(rate)
    }, [instrument])

    const marginRequired = useMemo(() => {
        const quoteCurrency = instrument.split('/')[1]
        const notionalInQuote = CONTRACT_SIZE * lots * price
        let marginInQuote = notionalInQuote / leverage

        if (quoteCurrency !== depositCurrency) {
            const conversionPair = `${quoteCurrency}/${depositCurrency}`
            const inversePair = `${depositCurrency}/${quoteCurrency}`
            if (mockRates[conversionPair]) {
                marginInQuote *= mockRates[conversionPair]
            } else if (mockRates[inversePair]) {
                marginInQuote /= mockRates[inversePair]
            } else if (depositCurrency === 'USD') {
                if (quoteCurrency === 'CAD') marginInQuote /= mockRates['USD/CAD']
                if (quoteCurrency === 'CHF') marginInQuote /= mockRates['USD/CHF']
                if (quoteCurrency === 'JPY') marginInQuote /= mockRates['USD/JPY']
            }
        }
        return marginInQuote
    }, [instrument, depositCurrency, leverage, lots, price])

    return (
        <main className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Forex Margin Calculator</h1>
                <p className={styles.subtitle}>
                    Calculate the exact margin required to open a trading position
                    based on your leverage, lot size, and instrument price.
                </p>
            </header>

            <div className={styles.inputPanel}>
                <div className={marginStyles.formGrid}>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="margin-instrument">
                            Instrument
                        </label>
                        <Select
                            id="margin-instrument"
                            value={instrument}
                            onChange={setInstrument}
                            options={INSTRUMENTS.map((p) => ({ value: p, label: p }))}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="margin-deposit">
                            Deposit currency
                        </label>
                        <Select
                            id="margin-deposit"
                            value={depositCurrency}
                            onChange={setDepositCurrency}
                            options={DEPOSIT_CURRENCIES.map((c) => ({
                                value: c.value,
                                label: c.label,
                            }))}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="margin-leverage">
                            Leverage
                        </label>
                        <input
                            id="margin-leverage"
                            type="number"
                            className={styles.input}
                            value={leverage}
                            onChange={(e) => {
                                const n = parseInt(e.target.value, 10)
                                if (!Number.isNaN(n) && n >= 1) setLeverage(n)
                            }}
                            min={1}
                            placeholder="100"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="margin-lots">
                            Lots (trade size)
                        </label>
                        <input
                            id="margin-lots"
                            type="number"
                            className={styles.input}
                            value={lots}
                            onChange={(e) => setLots(Number(e.target.value) || 0)}
                            min={0.01}
                            step={0.01}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="margin-price">
                            {instrument} Price
                        </label>
                        <input
                            id="margin-price"
                            type="number"
                            className={styles.input}
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value) || 0)}
                            min={0}
                            step={0.00001}
                        />
                    </div>
                </div>

                <div className={marginStyles.buttonRow}>
                    <button type="button" className={marginStyles.calculateBtn}>
                        Calculate
                    </button>
                </div>

                <div className={marginStyles.resultRow}>
                    <div className={marginStyles.resultLabel}>
                        Deposit amount to open the trade
                    </div>
                    <div className={marginStyles.resultAmount}>
                        {marginRequired.toLocaleString('en-US', {
                            style: 'currency',
                            currency: depositCurrency,
                        })}
                    </div>
                </div>
            </div>
        </main>
    )
}
