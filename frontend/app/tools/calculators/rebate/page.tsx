'use client'

import { useState, useMemo } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BottomBar from '@/components/layout/BottomBar'
import styles from '@/components/ui/CalculatorLayout.module.css'

export default function RebateCalculatorPage() {
    const [pair, setPair] = useState('EUR/USD')
    const [tradeVolumeLots, setTradeVolumeLots] = useState<number>(10)
    const [rebatePerLot, setRebatePerLot] = useState<number>(5)

    const totalRebate = useMemo(() => {
        return tradeVolumeLots * rebatePerLot;
    }, [tradeVolumeLots, rebatePerLot])

    return (
        <>
            <Header />
            <main className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Forex Rebate Calculator</h1>
                    <p className={styles.subtitle}>
                        Estimate the cashback or rebate you will receive based on your trading volume and your broker's rebate rate per lot.
                    </p>
                </header>

                <div className={styles.grid}>
                    <div className={styles.inputPanel}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Currency Pair</label>
                            <select 
                                className={styles.select}
                                value={pair}
                                onChange={(e) => setPair(e.target.value)}
                            >
                                <option value="EUR/USD">EUR/USD</option>
                                <option value="GBP/USD">GBP/USD</option>
                                <option value="USD/JPY">USD/JPY</option>
                                <option value="XAU/USD">XAU/USD (Gold)</option>
                                <option value="BTC/USD">BTC/USD</option>
                            </select>
                        </div>
                        
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Monthly Trade Volume (Lots)</label>
                            <input 
                                type="number" 
                                className={styles.input}
                                value={tradeVolumeLots}
                                onChange={(e) => setTradeVolumeLots(Number(e.target.value))}
                                min="0.01"
                                step="1"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Rebate Rate (USD per Lot)</label>
                            <input 
                                type="number" 
                                className={styles.input}
                                value={rebatePerLot}
                                onChange={(e) => setRebatePerLot(Number(e.target.value))}
                                min="0.1"
                                step="0.5"
                            />
                        </div>
                    </div>

                    <div className={styles.resultPanel}>
                        <div className={styles.resultTitle}>Estimated Cash Rebate</div>
                        <div className={styles.resultValue}>
                            {totalRebate.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                        </div>
                    </div>
                </div>
            </main>
            <BottomBar />
        </>
    )
}
