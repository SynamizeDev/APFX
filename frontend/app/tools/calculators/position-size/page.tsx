'use client'

import { useState, useMemo } from 'react'
import Select from '@/components/ui/Select'
import styles from '@/components/ui/CalculatorLayout.module.css'
import posStyles from './PositionSizeCalculator.module.css'

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

const mockRates: Record<string, number> = {
    'EUR/USD': 1.1,
    'GBP/USD': 1.3,
    'USD/JPY': 150,
    'USD/CHF': 0.88,
    'AUD/USD': 0.66,
    'USD/CAD': 1.36,
}

export default function PositionSizeCalculatorPage() {
    const [instrument, setInstrument] = useState('EUR/USD')
    const [depositCurrency, setDepositCurrency] = useState('USD')
    const [stopLossPips, setStopLossPips] = useState(200)
    const [accountBalance, setAccountBalance] = useState(100000)
    const [riskPercent, setRiskPercent] = useState(2)
    const [contractSize, setContractSize] = useState(100000)

    const pipSize = useMemo(
        () => (instrument.includes('JPY') ? 0.01 : 0.0001),
        [instrument]
    )

    const { riskAmount, units, lots } = useMemo(() => {
        const riskAmount = accountBalance * (riskPercent / 100)
        const quoteCurrency = instrument.split('/')[1]
        let pipValuePerLot = contractSize * pipSize

        if (quoteCurrency !== depositCurrency) {
            if (depositCurrency === 'USD') {
                if (quoteCurrency === 'CAD') pipValuePerLot /= mockRates['USD/CAD']
                if (quoteCurrency === 'CHF') pipValuePerLot /= mockRates['USD/CHF']
                if (quoteCurrency === 'JPY') pipValuePerLot /= mockRates['USD/JPY']
            }
        }

        const pipValuePerUnit = pipValuePerLot / contractSize
        const unitsCalculated =
            stopLossPips > 0 ? riskAmount / (stopLossPips * pipValuePerUnit) : 0
        const lotsCalculated = contractSize > 0 ? unitsCalculated / contractSize : 0

        return {
            riskAmount,
            units: Math.round(unitsCalculated),
            lots: Number(lotsCalculated.toFixed(2)),
        }
    }, [
        accountBalance,
        riskPercent,
        stopLossPips,
        instrument,
        depositCurrency,
        pipSize,
        contractSize,
    ])

    return (
        <main className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Position Size Calculator</h1>
                <p className={styles.subtitle}>
                    Manage your risk effectively. Calculate the exact position size
                    to trade based on your balance, risk percentage, and stop loss.
                </p>
            </header>

            <div className={styles.inputPanel}>
                <div className={posStyles.formGrid}>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="pos-instrument">
                            Instrument
                        </label>
                        <Select
                            id="pos-instrument"
                            value={instrument}
                            onChange={setInstrument}
                            options={INSTRUMENTS.map((p) => ({ value: p, label: p }))}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="pos-deposit">
                            Deposit currency
                        </label>
                        <Select
                            id="pos-deposit"
                            value={depositCurrency}
                            onChange={setDepositCurrency}
                            options={DEPOSIT_CURRENCIES.map((c) => ({
                                value: c.value,
                                label: c.label,
                            }))}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="pos-stoploss">
                            Stop loss (pips)
                        </label>
                        <input
                            id="pos-stoploss"
                            type="number"
                            className={styles.input}
                            value={stopLossPips}
                            onChange={(e) =>
                                setStopLossPips(Number(e.target.value) || 0)
                            }
                            min={1}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Account Balance</label>
                        <input
                            type="number"
                            className={styles.input}
                            value={accountBalance}
                            onChange={(e) =>
                                setAccountBalance(Number(e.target.value) || 0)
                            }
                            min={0}
                            step={100}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            {instrument} 1 Pip Size
                        </label>
                        <input
                            type="text"
                            className={posStyles.readOnlyField}
                            value={pipSize}
                            readOnly
                            aria-readonly
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Risk</label>
                        <div className={posStyles.riskRow}>
                            <input
                                type="number"
                                className={`${styles.input} ${posStyles.riskInput}`}
                                value={riskPercent}
                                onChange={(e) =>
                                    setRiskPercent(Number(e.target.value) || 0)
                                }
                                min={0.1}
                                step={0.1}
                                max={100}
                            />
                            <span className={posStyles.riskUnit}>%</span>
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="pos-contract">
                            Contract size (Units per Lot)
                        </label>
                        <input
                            id="pos-contract"
                            type="number"
                            className={styles.input}
                            value={contractSize}
                            onChange={(e) =>
                                setContractSize(Number(e.target.value) || 0)
                            }
                            min={1000}
                            step={1000}
                        />
                    </div>
                </div>

                <div className={posStyles.buttonRow}>
                    <button type="button" className={posStyles.calculateBtn}>
                        Calculate
                    </button>
                </div>

                <div className={posStyles.resultRow}>
                    <div className={posStyles.resultGrid}>
                        <div className={posStyles.resultItem}>
                            <span className={posStyles.resultItemLabel}>
                                Lots (trade size)
                            </span>
                            <span className={posStyles.resultItemValue}>
                                {lots}
                            </span>
                        </div>
                        <div className={posStyles.resultItem}>
                            <span className={posStyles.resultItemLabel}>
                                Units (trade size)
                            </span>
                            <span className={posStyles.resultItemValue}>
                                {units.toLocaleString()}
                            </span>
                        </div>
                        <div className={`${posStyles.resultItem} ${posStyles.resultItemHighlight}`}>
                            <span className={posStyles.resultItemLabel}>
                                Money at risk
                            </span>
                            <span
                                className={`${posStyles.resultItemValue} ${posStyles.highlight}`}
                            >
                                {riskAmount.toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: depositCurrency,
                                })}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
