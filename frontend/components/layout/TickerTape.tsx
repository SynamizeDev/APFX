'use client'

import { useEffect, useState } from 'react'
import styles from './TickerTape.module.css'

interface PriceItem {
    pair: string
    price: string
    change: string
    up: boolean
}

const MOCK_PRICES: PriceItem[] = [
    { pair: 'EUR/USD', price: '1.08245', change: '+0.12%', up: true },
    { pair: 'GBP/USD', price: '1.26318', change: '-0.08%', up: false },
    { pair: 'USD/JPY', price: '149.824', change: '+0.21%', up: true },
    { pair: 'XAU/USD', price: '2018.50', change: '+0.34%', up: true },
    { pair: 'USD/CHF', price: '0.89641', change: '-0.05%', up: false },
    { pair: 'AUD/USD', price: '0.65412', change: '+0.09%', up: true },
    { pair: 'USD/CAD', price: '1.36245', change: '-0.14%', up: false },
    { pair: 'EUR/GBP', price: '0.85681', change: '+0.06%', up: true },
    { pair: 'NZD/USD', price: '0.61023', change: '-0.11%', up: false },
    { pair: 'USD/SGD', price: '1.34512', change: '+0.03%', up: true },
]

export default function TickerTape() {
    const [prices, setPrices] = useState<PriceItem[]>(MOCK_PRICES)

    // Attempt live fetch from our backend; fallback to mock
    useEffect(() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

        async function fetchPrices() {
            try {
                const res = await fetch(`${apiUrl}/api/prices`, { cache: 'no-store' })
                if (!res.ok) return
                const json = await res.json()
                if (json?.data?.length) {
                    setPrices(
                        json.data.map((d: { pair: string; mid: number; change: number }) => ({
                            pair: d.pair,
                            price: d.mid.toFixed(5),
                            change: `${d.change >= 0 ? '+' : ''}${d.change.toFixed(2)}%`,
                            up: d.change >= 0,
                        }))
                    )
                }
            } catch {
                // silently fall back to mock data
            }
        }

        fetchPrices()
        const interval = setInterval(fetchPrices, 10000)
        return () => clearInterval(interval)
    }, [])

    // Duplicate array for seamless infinite loop
    const items = [...prices, ...prices]

    return (
        <div className={styles.ticker} aria-label="Live forex prices ticker">
            <div className={styles.track}>
                {items.map((item, i) => (
                    <div key={`${item.pair}-${i}`} className={styles.item}>
                        <span className={styles.dot} aria-hidden="true" />
                        <span className={styles.pair}>{item.pair}</span>
                        <span className={styles.price}>{item.price}</span>
                        <span className={`${styles.change} ${item.up ? styles.up : styles.down}`}>
                            {item.change}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}
