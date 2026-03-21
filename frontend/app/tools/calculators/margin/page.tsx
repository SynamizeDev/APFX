'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Info, Target, Shield, Zap, AlertTriangle, Calculator, Globe, Scale } from 'lucide-react'
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
                <h1 className={styles.title}>Professional Margin Calculator</h1>
                <p className={styles.subtitle}>
                    Calculate the exact collateral (margin) required to open and maintain 
                    trading positions. Essential for managing account equity and 
                    understanding the impact of leverage on your trading capital.
                </p>
            </header>

            <div className={styles.inputPanel}>
                <div className={marginStyles.formGrid}>
                    <div className={styles.formGroup}>
                        <div className={styles.labelWrapper}>
                            <label className={styles.label} htmlFor="margin-instrument">Instrument</label>
                            <div className={styles.tooltipContainer}>
                                <Globe size={14} />
                                <span className={styles.tooltipText}>The currency pair you intend to trade. Notional value is calculated based on current market price.</span>
                            </div>
                        </div>
                        <Select
                            id="margin-instrument"
                            value={instrument}
                            onChange={setInstrument}
                            options={INSTRUMENTS.map((p) => ({ value: p, label: p }))}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <div className={styles.labelWrapper}>
                            <label className={styles.label} htmlFor="margin-deposit">Account Currency</label>
                            <div className={styles.tooltipContainer}>
                                <Shield size={14} />
                                <span className={styles.tooltipText}>The base currency of your account for the margin requirement calculation.</span>
                            </div>
                        </div>
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
                        <div className={styles.labelWrapper}>
                            <label className={styles.label} htmlFor="margin-leverage">Leverage Ratio</label>
                            <div className={styles.tooltipContainer}>
                                <Scale size={14} />
                                <span className={styles.tooltipText}>The leverage provided by the broker (e.g., 100 means you need 1% margin). 100:1 is common for institutional setup.</span>
                            </div>
                        </div>
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
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <div className={styles.labelWrapper}>
                            <label className={styles.label} htmlFor="margin-lots">Lots (Trade Size)</label>
                            <div className={styles.tooltipContainer}>
                                <Zap size={14} />
                                <span className={styles.tooltipText}>1 standard lot = 100,000 units. Size significantly impacts required margin.</span>
                            </div>
                        </div>
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
                        <div className={styles.labelWrapper}>
                            <label className={styles.label} htmlFor="margin-price">Current Price</label>
                            <div className={styles.tooltipContainer}>
                                <Target size={14} />
                                <span className={styles.tooltipText}>The current exchange rate of the instrument. Changes in price affect notional value and margin.</span>
                            </div>
                        </div>
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

                <div className={marginStyles.resultRow}>
                    <div className={styles.resultTitle}>Required Margin (Collateral)</div>
                    <AnimatePresence mode="wait">
                        <motion.div 
                            key={marginRequired}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={styles.resultValue}
                        >
                            {marginRequired.toLocaleString('en-US', {
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
                            The required margin is calculated as: <strong>(Contract Size × Lots × Market Price) / Leverage</strong>. This determines the portion of your account balance that will be "locked" as a good-faith deposit to hold the position open.
                        </p>
                    </div>

                    <div className={styles.infoCard}>
                        <h3 className={styles.infoTitle}>
                            <Target size={16} /> What This Calculator Does
                        </h3>
                        <p className={styles.infoText}>
                            It provides a precise dollar-value (or base currency value) of the equity required to open a trade. In institutional trading, this helps manage <strong>Free Margin</strong>—the amount available to open additional positions or withstand drawdown.
                        </p>
                    </div>
                    
                    <div className={styles.infoCard}>
                        <h3 className={styles.infoTitle}>
                            <Shield size={16} /> Why It Matters
                        </h3>
                        <p className={styles.infoText}>
                            Margin is not a fee; it's a security deposit. Failing to monitor margin requirements can lead to <strong>Margin Calls</strong>, where the broker automatically liquidates your positions to prevent a negative account balance during high volatility.
                        </p>
                    </div>

                    <div className={`${styles.infoCard} ${styles.proTipCard}`}>
                        <h3 className={styles.infoTitle}>
                            <Zap size={16} /> Professional Insight
                        </h3>
                        <p className={styles.infoText}>
                            Institutional risk managers focus on <strong>Used Margin vs. Total Equity</strong>. Professional discipline dictates keeping total margin usage below 10-20% of account equity to maintain a "safety buffer" for market swings.
                        </p>
                    </div>

                    <div className={`${styles.infoCard} ${styles.mistakeCard}`}>
                        <h3 className={styles.infoTitle}>
                            <AlertTriangle size={16} /> Common Mistake
                        </h3>
                        <p className={styles.infoText}>
                            A common trap is assuming that having enough margin to open a trade means you have enough to keep it open. If the price moves against you, your <strong>Free Margin</strong> drops, potentially triggering a liquidation even if the trade eventually recovers.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}
