'use client'

import { useState, useMemo } from 'react'
import Select from '@/components/ui/Select'
import styles from '@/components/ui/CalculatorLayout.module.css'
import rebateStyles from './RebateCalculator.module.css'

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

const REBATE_UNITS = [
    { value: 'pips', label: 'Pips' },
    { value: 'USD', label: 'USD' },
] as const

const CONTRACT_SIZE = 100_000

const mockRates: Record<string, number> = {
    'EUR/USD': 1.1,
    'GBP/USD': 1.3,
    'USD/JPY': 150,
    'USD/CHF': 0.88,
    'AUD/USD': 0.66,
    'USD/CAD': 1.36,
}

export default function RebateCalculatorPage() {
    const [instrument, setInstrument] = useState('EUR/USD')
    const [depositCurrency, setDepositCurrency] = useState('USD')
    const [rebatePerLotRaw, setRebatePerLotRaw] = useState('0.7')
    const [rebateUnit, setRebateUnit] = useState('pips')
    const rebatePerLot = useMemo(() => {
        const n = parseFloat(rebatePerLotRaw)
        return Number.isNaN(n) || n < 0 ? 0 : n
    }, [rebatePerLotRaw])
    const [lotsTraded, setLotsTraded] = useState(1)

    const pipSize = useMemo(
        () => (instrument.includes('JPY') ? 0.01 : 0.0001),
        [instrument]
    )

    const totalRebate = useMemo(() => {
        if (rebateUnit === 'USD') {
            return rebatePerLot * lotsTraded
        }
        const quoteCurrency = instrument.split('/')[1]
        let pipValuePerLot = CONTRACT_SIZE * pipSize
        if (quoteCurrency !== depositCurrency) {
            if (depositCurrency === 'USD') {
                if (quoteCurrency === 'CAD') pipValuePerLot /= mockRates['USD/CAD']
                if (quoteCurrency === 'CHF') pipValuePerLot /= mockRates['USD/CHF']
                if (quoteCurrency === 'JPY') pipValuePerLot /= mockRates['USD/JPY']
            }
        }
        return rebatePerLot * pipValuePerLot * lotsTraded
    }, [instrument, depositCurrency, rebatePerLot, rebateUnit, lotsTraded, pipSize])

    return (
        <main className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Forex Rebate Calculator</h1>
                <p className={styles.subtitle}>
                    Estimate the cashback or rebate you will receive based on your
                    trading volume and your broker&apos;s rebate rate per lot.
                </p>
            </header>

            <div className={styles.inputPanel}>
                <div className={rebateStyles.formGrid}>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="rebate-instrument">
                            Instrument
                        </label>
                        <Select
                            id="rebate-instrument"
                            value={instrument}
                            onChange={setInstrument}
                            options={INSTRUMENTS.map((p) => ({ value: p, label: p }))}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="rebate-deposit">
                            Deposit currency
                        </label>
                        <Select
                            id="rebate-deposit"
                            value={depositCurrency}
                            onChange={setDepositCurrency}
                            options={DEPOSIT_CURRENCIES.map((c) => ({
                                value: c.value,
                                label: c.label,
                            }))}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="rebate-per-lot">
                            Rebate per lot
                        </label>
                        <div className={rebateStyles.rebatePerLotRow}>
                            <input
                                id="rebate-per-lot"
                                type="number"
                                inputMode="decimal"
                                className={`${styles.input} ${rebateStyles.rebateInput}`}
                                value={rebatePerLotRaw}
                                onChange={(e) => setRebatePerLotRaw(e.target.value)}
                                onBlur={() => {
                                    const n = parseFloat(rebatePerLotRaw)
                                    if (rebatePerLotRaw === '' || Number.isNaN(n) || n < 0) {
                                        setRebatePerLotRaw('0')
                                    } else {
                                        setRebatePerLotRaw(String(n))
                                    }
                                }}
                                min={0}
                                step={0.1}
                                placeholder="0.7"
                            />
                            <Select
                                value={rebateUnit}
                                onChange={setRebateUnit}
                                options={REBATE_UNITS.map((u) => ({
                                    value: u.value,
                                    label: u.label,
                                }))}
                                id="rebate-unit"
                            />
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="rebate-lots">
                            Lots traded
                        </label>
                        <input
                            id="rebate-lots"
                            type="number"
                            className={styles.input}
                            value={lotsTraded}
                            onChange={(e) =>
                                setLotsTraded(Number(e.target.value) || 0)
                            }
                            min={0.01}
                            step={0.01}
                        />
                    </div>
                </div>

                <div className={rebateStyles.readOnlyRow}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            {instrument} 1 Pip Size
                        </label>
                        <input
                            type="text"
                            className={rebateStyles.readOnlyField}
                            value={pipSize}
                            readOnly
                            aria-readonly
                        />
                    </div>
                </div>

                <div className={rebateStyles.buttonRow}>
                    <button type="button" className={rebateStyles.calculateBtn}>
                        Calculate
                    </button>
                </div>

                <div className={rebateStyles.resultRow}>
                    <div className={rebateStyles.resultAmount}>
                        {totalRebate.toLocaleString('en-US', {
                            style: 'currency',
                            currency: depositCurrency,
                        })}
                    </div>
                </div>
            </div>
        </main>
    )
}
