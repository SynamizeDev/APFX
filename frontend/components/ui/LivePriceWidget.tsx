'use client'

import { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { MarketQuote } from '@/services/marketData'

interface LivePriceWidgetProps {
    quote: MarketQuote;
    className?: string;
    symbolClassName?: string;
    priceClassName?: string;
    changeClassName?: string;
    upClassName?: string;
    downClassName?: string;
}

export default function LivePriceWidget({
    quote,
    className = '',
    symbolClassName = '',
    priceClassName = '',
    changeClassName = '',
    upClassName = '',
    downClassName = ''
}: LivePriceWidgetProps) {
    const [prevPrice, setPrevPrice] = useState(quote.price)
    const controls = useAnimation()

    useEffect(() => {
        if (quote.price !== prevPrice) {
            const isHigher = quote.price > prevPrice;
            // Trigger 400ms blink animation (Yahoo Finance style)
            controls.start({
                backgroundColor: isHigher ? ['rgba(16, 185, 129, 0.45)', 'rgba(16, 185, 129, 0)'] : ['rgba(239, 68, 68, 0.45)', 'rgba(239, 68, 68, 0)'],
                transition: { duration: 0.4, ease: "easeOut" }
            });
            setPrevPrice(quote.price);
        }
    }, [quote.price, prevPrice, controls])

    // Format utility depending on instrument type
    const formatPrice = (price: number, symbol: string) => {
        if (symbol.includes('JPY') || price > 1000) return price.toFixed(2);
        if (price > 100) return price.toFixed(2);
        if (price < 1) return price.toFixed(4); // Or 5 for forex
        return price.toFixed(2); // Stocks/Crypto general
    }

    return (
        <motion.div
            animate={controls}
            className={className}
            style={{ borderRadius: '6px' }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <span className={symbolClassName}>{quote.symbol}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className={priceClassName}>{formatPrice(quote.price, quote.symbol)}</span>
                    <span className={`${changeClassName} ${quote.up ? upClassName : downClassName}`}>
                        {quote.up ? '+' : ''}{quote.percent_change.toFixed(2)}%
                    </span>
                </div>
            </div>
        </motion.div>
    )
}
