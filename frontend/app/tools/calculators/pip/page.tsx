'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Info, Target, Shield, Zap, AlertTriangle, Calculator, Globe } from 'lucide-react'
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
                <h1 className={styles.title}>Professional Pip Value Calculator</h1>
                <p className={styles.subtitle}>
                    Accurately determine the precise value of a single pip for your specific 
                    trade size and currency pair. Essential for calculating risk exposure 
                    and managing position sizing with institutional precision.
                </p>
            </header>

            <div className={styles.inputPanel}>
                <div className={pipStyles.formGrid}>
                    <div className={styles.formGroup}>
                        <div className={styles.labelWrapper}>
                            <label className={styles.label} htmlFor="pip-pips">Pips</label>
                            <div className={styles.tooltipContainer}>
                                <Info size={14} />
                                <span className={styles.tooltipText}>The number of pips you want to calculate the value for. Usually 1 for base calculations.</span>
                            </div>
                        </div>
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
                        <div className={styles.labelWrapper}>
                            <label className={styles.label} htmlFor="pip-instrument">Instrument</label>
                            <div className={styles.tooltipContainer}>
                                <Globe size={14} />
                                <span className={styles.tooltipText}>The currency pair you are trading. Pip size varies between standard pairs (4 digits) and JPY pairs (2 digits).</span>
                            </div>
                        </div>
                        <Select
                            id="pip-instrument"
                            value={instrument}
                            onChange={setInstrument}
                            options={INSTRUMENTS.map((p) => ({ value: p, label: p }))}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <div className={styles.labelWrapper}>
                            <label className={styles.label} htmlFor="pip-lots">Lots (trade size)</label>
                            <div className={styles.tooltipContainer}>
                                <Zap size={14} />
                                <span className={styles.tooltipText}>Your trade volume. 1 standard lot = 100,000 units of the base currency.</span>
                            </div>
                        </div>
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
                        <div className={styles.labelWrapper}>
                            <label className={styles.label} htmlFor="pip-deposit">Account Currency</label>
                            <div className={styles.tooltipContainer}>
                                <Shield size={14} />
                                <span className={styles.tooltipText}>The base currency of your trading account for the final calculation.</span>
                            </div>
                        </div>
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
                            Current {instrument} Pip Step Size
                        </label>
                        <input
                            type="text"
                            className={pipStyles.readOnlyField}
                            value={pipSize}
                            readOnly
                        />
                    </div>
                </div>

                <div className={pipStyles.resultRow}>
                    <div className={styles.resultTitle}>Total Pip Value</div>
                    <AnimatePresence mode="wait">
                        <motion.div 
                            key={pipValue}
                            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            className={styles.resultValue}
                        >
                            {pipValue.toLocaleString('en-US', {
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
                            The pip value is derived by multiplying the <strong>Pip Size</strong> (usually 0.0001 or 0.01 for JPY) by the <strong>Trade Volume</strong> (Lots × 100,000). If your account is in a different currency than the pair's quote currency, an additional conversion rate is applied for institutional accuracy.
                        </p>
                    </div>

                    <div className={styles.infoCard}>
                        <h3 className={styles.infoTitle}>
                            <Target size={16} /> What This Calculator Does
                        </h3>
                        <p className={styles.infoText}>
                            It translates abstract "pips" into actual currency. In the institutional world, traders use this to understand exactly how much equity is at risk per unit of price movement before committing capital.
                        </p>
                    </div>
                    
                    <div className={styles.infoCard}>
                        <h3 className={styles.infoTitle}>
                            <Shield size={16} /> Why It Matters
                        </h3>
                        <p className={styles.infoText}>
                            Without knowing your pip value, you cannot set an intelligent stop-loss. This tool ensures your risk-per-trade remains within your 1-2% comfort zone, protecting your principal capital from unexpected volatility.
                        </p>
                    </div>

                    <div className={`${styles.infoCard} ${styles.proTipCard}`}>
                        <h3 className={styles.infoTitle}>
                            <Zap size={16} /> Professional Insight
                        </h3>
                        <p className={styles.infoText}>
                            Institutional traders normalize risk by adjusting position sizes based on variable pip values. This ensures that a 20-pip stop on GBP/USD has the same financial weight as a 20-pip stop on EUR/GBP.
                        </p>
                    </div>

                    <div className={`${styles.infoCard} ${styles.mistakeCard}`}>
                        <h3 className={styles.infoTitle}>
                            <AlertTriangle size={16} /> Common Mistake
                        </h3>
                        <p className={styles.infoText}>
                            Many traders assume a pip is always worth $10 per standard lot. However, for non-USD quote pairs (like EUR/GBP), the value varies significantly based on current exchange rates.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}
