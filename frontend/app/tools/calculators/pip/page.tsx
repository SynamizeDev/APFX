'use client'

import { useState, useMemo } from 'react'
import Select from '@/components/ui/Select'
import styles from '@/components/ui/CalculatorLayout.module.css'
import pipStyles from './PipCalculator.module.css'

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

const UNITS_PER_LOT = 100_000

const mockRates: Record<string, number> = {
    'EUR/USD': 1.1000,
    'GBP/USD': 1.3000,
    'USD/JPY': 150.0,
    'USD/CHF': 0.88,
    'AUD/USD': 0.66,
    'USD/CAD': 1.36,
}

export default function PipCalculatorPage() {
    const [pips, setPips] = useState(1)
    const [lots, setLots] = useState(1)
    const [instrument, setInstrument] = useState('EUR/USD')
    const [depositCurrency, setDepositCurrency] = useState('USD')

    const pipSize = useMemo(() => {
        return instrument.includes('JPY') ? 0.01 : 0.0001
    }, [instrument])

    const pipValue = useMemo(() => {
        const quoteCurrency = instrument.split('/')[1]
        const units = lots * UNITS_PER_LOT
        let valueInQuote = pipSize * pips * units

        if (quoteCurrency !== depositCurrency) {
            const conversionPair = `${quoteCurrency}/${depositCurrency}`
            const inversePair = `${depositCurrency}/${quoteCurrency}`
            if (mockRates[conversionPair]) {
                valueInQuote *= mockRates[conversionPair]
            } else if (mockRates[inversePair]) {
                valueInQuote /= mockRates[inversePair]
            } else if (depositCurrency === 'USD') {
                if (quoteCurrency === 'CAD') valueInQuote /= mockRates['USD/CAD']
                if (quoteCurrency === 'CHF') valueInQuote /= mockRates['USD/CHF']
                if (quoteCurrency === 'JPY') valueInQuote /= mockRates['USD/JPY']
            }
        }
        return valueInQuote
    }, [pipSize, pips, lots, instrument, depositCurrency])

    return (
        <main className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Pip Calculator</h1>
                <p className={styles.subtitle}>
                    Quickly calculate the exact value of a pip for any trade size
                    and currency pair before executing your position.
                </p>
            </header>

            <div className={styles.inputPanel}>
                <div className={pipStyles.formGrid}>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="pip-pips">
                            Pips
                        </label>
                        <input
                            id="pip-pips"
                            type="number"
                            className={styles.input}
                            value={pips}
                            onChange={(e) => setPips(Number(e.target.value) || 0)}
                            min={0}
                            step={1}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="pip-instrument">
                            Instrument
                        </label>
                        <Select
                            id="pip-instrument"
                            value={instrument}
                            onChange={setInstrument}
                            options={INSTRUMENTS.map((p) => ({ value: p, label: p }))}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="pip-lots">
                            Lots (trade size)
                        </label>
                        <input
                            id="pip-lots"
                            type="number"
                            className={styles.input}
                            value={lots}
                            onChange={(e) => setLots(Number(e.target.value) || 0)}
                            min={0.01}
                            step={0.01}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="pip-deposit">
                            Deposit currency
                        </label>
                        <Select
                            id="pip-deposit"
                            value={depositCurrency}
                            onChange={setDepositCurrency}
                            options={DEPOSIT_CURRENCIES.map((c) => ({ value: c.value, label: c.label }))}
                        />
                    </div>
                </div>

                <div className={pipStyles.readOnlyRow}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            {instrument} 1 Pip Size
                        </label>
                        <input
                            type="text"
                            className={pipStyles.readOnlyField}
                            value={pipSize}
                            readOnly
                            aria-readonly
                        />
                    </div>
                </div>

                <div className={pipStyles.buttonRow}>
                    <button type="button" className={pipStyles.calculateBtn}>
                        Calculate
                    </button>
                </div>

                <div className={pipStyles.resultRow}>
                    <div className={styles.resultValue}>
                        {pipValue.toLocaleString('en-US', {
                            style: 'currency',
                            currency: depositCurrency,
                        })}
                    </div>
                </div>
            </div>
        </main>
    )
}
