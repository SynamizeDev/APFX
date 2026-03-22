'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Info, Target, Shield, Zap, AlertTriangle, Calculator, Globe, TrendingUp, HandCoins } from 'lucide-react'
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
                <h1 className={styles.title}>Professional Rebate Calculator</h1>
                <p className={styles.subtitle}>
                    Estimate the cashback or rebate yield from your trading volume. 
                    Institutional strategies often rely on rebates to offset the cost 
                    of spreads and commissions, improving net profitability.
                </p>
            </header>

            <div className={styles.inputPanel}>
                <div className={rebateStyles.formGrid}>
                    <div className={styles.formGroup}>
                        <div className={styles.labelWrapper}>
                            <label className={styles.label} htmlFor="rebate-instrument">Instrument</label>
                            <div className={styles.tooltipContainer}>
                                <Globe size={14} />
                                <span className={styles.tooltipText}>The currency pair traded. Required if calculating rebate based on pips.</span>
                            </div>
                        </div>
                        <Select
                            id="rebate-instrument"
                            value={instrument}
                            onChange={setInstrument}
                            options={INSTRUMENTS.map((p) => ({ value: p, label: p }))}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <div className={styles.labelWrapper}>
                            <label className={styles.label} htmlFor="rebate-deposit">Account Currency</label>
                            <div className={styles.tooltipContainer}>
                                <Shield size={14} />
                                <span className={styles.tooltipText}>The currency in which the rebate will be paid out.</span>
                            </div>
                        </div>
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
                        <div className={styles.labelWrapper}>
                            <label className={styles.label} htmlFor="rebate-per-lot">Rebate Rate</label>
                            <div className={styles.tooltipContainer}>
                                <TrendingUp size={14} />
                                <span className={styles.tooltipText}>The amount of cashback per lot traded, either in fixed currency or in pips.</span>
                            </div>
                        </div>
                        <div className={rebateStyles.rebatePerLotRow}>
                            <input
                                id="rebate-per-lot"
                                type="number"
                                inputMode="decimal"
                                className={`${styles.input} ${rebateStyles.rebateInput}`}
                                value={rebatePerLotRaw}
                                onChange={(e) => setRebatePerLotRaw(e.target.value)}
                                min={0}
                                step={0.1}
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
                        <div className={styles.labelWrapper}>
                            <label className={styles.label} htmlFor="rebate-lots">Lots Traded</label>
                            <div className={styles.tooltipContainer}>
                                <Zap size={14} />
                                <span className={styles.tooltipText}>Total trading volume for the period you wish to calculate for.</span>
                            </div>
                        </div>
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

                <div className={rebateStyles.resultRow}>
                    <div className={styles.resultTitle}>Estimated Cashback Yield</div>
                    <AnimatePresence mode="wait">
                        <motion.div 
                            key={totalRebate}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={styles.resultValue}
                        >
                            {totalRebate.toLocaleString('en-US', {
                                style: 'currency',
                                currency: depositCurrency,
                            })}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className={styles.infoSection}>
                    <div className={`${styles.infoCard} ${styles.formulaCard}`}>
                        <h3 className={styles.infoTitle}>
                            <Calculator size={16} /> How it is Calculated
                        </h3>
                        <p className={styles.infoText}>
                            If paid in USD, it is simply <strong>Rebate Rate × Lots</strong>. If paid in pips, it is <strong>Rebate Rate (Pips) × Pip Value × Lots</strong>. This provides a clear picture of the net cost reduction on every trade entered.
                        </p>
                    </div>

                    <div className={styles.infoCard}>
                        <h3 className={styles.infoTitle}>
                            <HandCoins size={16} /> What This Calculator Does
                        </h3>
                        <p className={styles.infoText}>
                            It projects the total cashback you can expect from your trading activity. For high-volume traders, rebates are not just "extra"—they are a core component of the total return on investment.
                        </p>
                    </div>
                    
                    <div className={styles.infoCard}>
                        <h3 className={styles.infoTitle}>
                            <TrendingUp size={16} /> Why It Matters
                        </h3>
                        <p className={styles.infoText}>
                            In tight-margin trading environments like scalping, the cost of the spread can eat up to 50% of your gains. Rebates return a portion of that cost to you, effectively widening your profit margins.
                        </p>
                    </div>

                    <div className={`${styles.infoCard} ${styles.proTipCard}`}>
                        <h3 className={styles.infoTitle}>
                            <Zap size={16} /> Professional Insight
                        </h3>
                        <p className={styles.infoText}>
                            Institutional "Rebate Arbitrage" involves using high-volume, low-volatility strategies where the profit from the rebate itself is the primary target, rather than the price movement of the asset.
                        </p>
                    </div>

                    <div className={`${styles.infoCard} ${styles.mistakeCard}`}>
                        <h3 className={styles.infoTitle}>
                            <AlertTriangle size={16} /> Common Mistake
                        </h3>
                        <p className={styles.infoText}>
                            Never sacrifice execution quality for high rebates. A broker offering massive cashback often makes up for it with <strong>High Slippage</strong> or <strong>Requotes</strong>, which can cost you more than the rebate is worth.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}
