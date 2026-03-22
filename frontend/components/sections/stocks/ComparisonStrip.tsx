'use client'

import { motion } from 'framer-motion'
import styles from './ComparisonStrip.module.css'

const DATA = [
    { asset: 'Stocks', leverage: 'Up to 1:20', hours: 'Market Specific', ownership: 'Direct / Fractional' },
    { asset: 'Forex', leverage: 'Up to 1:500', hours: '24/7', ownership: 'Contractual' },
    { asset: 'Crypto', leverage: 'Up to 1:50', hours: '24/7', ownership: 'Digital Wallet' },
]

export default function ComparisonStrip() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h3 className={styles.title}>Asset Class Comparison</h3>
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Feature</th>
                                {DATA.map(d => <th key={d.asset}>{d.asset}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Max Leverage</td>
                                {DATA.map(d => <td key={d.asset}>{d.leverage}</td>)}
                            </tr>
                            <tr>
                                <td>Trading Hours</td>
                                {DATA.map(d => <td key={d.asset}>{d.hours}</td>)}
                            </tr>
                            <tr>
                                <td>Ownership Model</td>
                                {DATA.map(d => <td key={d.asset}>{d.ownership}</td>)}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}
