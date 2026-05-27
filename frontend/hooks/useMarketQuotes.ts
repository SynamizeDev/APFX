'use client'

import { useEffect, useState } from 'react'
import { subscribeMarketData, type MarketQuote } from '@/services/marketData'

export function useMarketQuotes() {
    const [quotes, setQuotes] = useState<MarketQuote[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = subscribeMarketData((data) => {
            if (data.length > 0) {
                setQuotes(data)
                setIsLoading(false)
            }
        })

        return unsubscribe
    }, [])

    return { quotes, isLoading }
}
