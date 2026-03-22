'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Info, Target, Shield, Zap, AlertTriangle, Calculator, Globe, Scale, TrendingDown } from 'lucide-react'
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
                <h1 className={styles.title}>Professional Position Size Calculator</h1>
                <p className={styles.subtitle}>
                    Determine the exact lot size for your trade based on your risk tolerance 
                    and stop-loss distance. The single most important tool for institutional-grade 
                    capital preservation and longevity.
                </p>
            </header>

            <div className={styles.inputPanel}>
                <div className={posStyles.formGrid}>
                    <div className={styles.formGroup}>
                        <div className={styles.labelWrapper}>
                            <label className={styles.label} htmlFor="pos-instrument">Instrument</label>
                            <div className={styles.tooltipContainer}>
                                <Globe size={14} />
                                <span className={styles.tooltipText}>The currency pair you are trading. Pip value varies per pair.</span>
                            </div>
                        </div>
                        <Select
                            id="pos-instrument"
                            value={instrument}
                            onChange={setInstrument}
                            options={INSTRUMENTS.map((p) => ({ value: p, label: p }))}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <div className={styles.labelWrapper}>
                            <label className={styles.label} htmlFor="pos-deposit">Account Currency</label>
                            <div className={styles.tooltipContainer}>
                                <Shield size={14} />
                                <span className={styles.tooltipText}>The base currency of your trading account.</span>
                            </div>
                        </div>
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
                        <div className={styles.labelWrapper}>
                            <label className={styles.label} htmlFor="pos-stoploss">Stop Loss (Pips)</label>
                            <div className={styles.tooltipContainer}>
                                <Target size={14} />
                                <span className={styles.tooltipText}>The distance in pips to your exit point if the trade goes against you.</span>
                            </div>
                        </div>
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
                        <div className={styles.labelWrapper}>
                            <label className={styles.label}>Account Balance</label>
                            <div className={styles.tooltipContainer}>
                                <Scale size={14} />
                                <span className={styles.tooltipText}>Your total account equity (capital) used for risk % calculation.</span>
                            </div>
                        </div>
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
                        <div className={styles.labelWrapper}>
                            <label className={styles.label}>Risk Preference (%)</label>
                            <div className={styles.tooltipContainer}>
                                <TrendingDown size={14} />
                                <span className={styles.tooltipText}>The percentage of your total balance you are willing to lose on this single trade. Best practice is 1-2%.</span>
                            </div>
                        </div>
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
                </div>

                <div className={posStyles.resultRow}>
                    <div className={posStyles.resultGrid}>
                        <div className={posStyles.resultItem}>
                            <motion.span 
                                key={lots}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={posStyles.resultItemValue}
                            >
                                {lots}
                            </motion.span>
                            <span className={posStyles.resultItemLabel}>Lots (Trade Size)</span>
                        </div>
                        <div className={posStyles.resultItem}>
                            <motion.span 
                                key={units}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={posStyles.resultItemValue}
                            >
                                {units.toLocaleString()}
                            </motion.span>
                            <span className={posStyles.resultItemLabel}>Total Units</span>
                        </div>
                        <div className={`${posStyles.resultItem} ${posStyles.resultItemHighlight}`}>
                            <motion.span 
                                key={riskAmount}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={`${posStyles.resultItemValue} ${posStyles.highlight}`}
                            >
                                {riskAmount.toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: depositCurrency,
                                })}
                            </motion.span>
                            <span className={posStyles.resultItemLabel}>Fixed Money At Risk</span>
                        </div>
                    </div>
                </div>

                <div className={styles.infoSection}>
                    <div className={`${styles.infoCard} ${styles.formulaCard}`}>
                        <h3 className={styles.infoTitle}>
                            <Calculator size={16} /> How it is Calculated
                        </h3>
                        <p className={styles.infoText}>
                            The formula is: <strong>Risk Amount (Balance × Risk %) / (Stop Loss × Pip Value per Unit)</strong>. This determines the exact mass of your trade so that your predetermined risk is never exceeded, regardless of the pair's volatility.
                        </p>
                    </div>

                    <div className={styles.infoCard}>
                        <h3 className={styles.infoTitle}>
                            <Target size={16} /> What This Calculator Does
                        </h3>
                        <p className={styles.infoText}>
                            It provides the specific lot size required to turn your <strong>Risk Preference (%)</strong> into a physical trade. It ensures that if your stop-loss is hit, your loss is exactly what you planned—nothing more, nothing less.
                        </p>
                    </div>
                    
                    <div className={styles.infoCard}>
                        <h3 className={styles.infoTitle}>
                            <Shield size={16} /> Why It Matters
                        </h3>
                        <p className={styles.infoText}>
                            Capital preservation is the only goal in institutional trading. By mathematically calculating position size, you prevent <strong>Over-Leverage</strong> and the emotional stress that comes with large, unplanned losses.
                        </p>
                    </div>

                    <div className={`${styles.infoCard} ${styles.proTipCard}`}>
                        <h3 className={styles.infoTitle}>
                            <Zap size={16} /> Professional Insight
                        </h3>
                        <p className={styles.infoText}>
                            Pro traders don't trade "lots"—they trade "risk units". If you risk 1% per trade, you have 100 "bullets" in your account. Even a losing streak of 10 trades only draws your account down by ~10%, making recovery fast and emotional impact low.
                        </p>
                    </div>

                    <div className={`${styles.infoCard} ${styles.mistakeCard}`}>
                        <h3 className={styles.infoTitle}>
                            <AlertTriangle size={16} /> Common Mistake
                        </h3>
                        <p className={styles.infoText}>
                            A major error is using a fixed lot size (e.g., always 1.0 lot) for every pair. Because pip values and average ranges differ between EUR/USD and GBP/JPY, a fixed lot size means your actual money at risk changes unpredictably with each trade.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}
