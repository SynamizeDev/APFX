'use client'

import { useEffect, useState, useRef } from 'react'
import { fetchMarketData, MarketQuote } from '@/services/marketData'
import styles from './TickerTape.module.css'

// The specific symbols the user requested for the bottom ticker
const TICKER_SYMBOLS = [
    'EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD', 'NZD/USD',
    'BTC/USD', 'ETH/USD',
    'XAU/USD',
    'SPY', 'S&P 500', 'NASDAQ', 'Dow Jones',
    'Apple', 'Tesla', 'Nvidia'
];

function TickerItem({ item }: { item: MarketQuote }) {
    const prevPriceRef = useRef(item.price);
    const [flashClass, setFlashClass] = useState('');

    useEffect(() => {
        if (item.price > prevPriceRef.current) {
            setFlashClass(styles.flashUp);
            setTimeout(() => setFlashClass(''), 400);
        } else if (item.price < prevPriceRef.current) {
            setFlashClass(styles.flashDown);
            setTimeout(() => setFlashClass(''), 400);
        }
        prevPriceRef.current = item.price;
    }, [item.price]);

    return (
        <div className={`${styles.item} ${flashClass}`}>
            <span className={styles.dot} aria-hidden="true" />
            <span className={styles.pair}>{item.symbol}</span>
            <span className={styles.price}>{item.price.toFixed(item.symbol.includes('JPY') ? 3 : 5)}</span>
            <span className={`${styles.change} ${item.up ? styles.up : styles.down}`}>
                {item.up ? '▲' : '▼'} {item.percent_change.toFixed(2)}%
            </span>
        </div>
    )
}

export default function TickerTape() {
    const [prices, setPrices] = useState<MarketQuote[]>([])

    useEffect(() => {
        let isMounted = true;

        async function loadPrices() {
            try {
                const data = await fetchMarketData()

                if (isMounted && data && data.length > 0) {
                    const tickerData = data.filter(q => TICKER_SYMBOLS.includes(q.symbol));
                    setPrices(tickerData)
                }
            } catch (error) {
                console.error('Ticker fetch error:', error)
            }
        }

        loadPrices()
        const interval = setInterval(loadPrices, 10000) // 10s polling

        return () => {
            isMounted = false
            clearInterval(interval)
        }
    }, [])

    const items = [...prices, ...prices]

    if (prices.length === 0) {
        return (
            <div className={styles.ticker} aria-label="Live forex prices ticker">
                <div className={styles.track}></div>
            </div>
        )
    }

    return (
        <div className={styles.ticker} aria-label="Live forex prices ticker">
            <div className={styles.track}>
                {items.map((item, i) => (
                    <TickerItem key={`${item.symbol}-${i}`} item={item} />
                ))}
            </div>
        </div>
    )
}
