'use client'

import { useEffect, useState } from 'react'
import { subscribeMarketData, type MarketQuote } from '@/services/marketData'

export function useMarketQuotes() {
    const [quotes, setQuotes] = useState<MarketQuote[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = subscribeMarketData((data) => {
            // Always update quotes — including empty arrays.
            // If we skip empty updates, stale prices (e.g. old mock data)
            // stay on screen when the API is rate-limited or unavailable.
            setQuotes(data)
            setIsLoading(false)
        })

        return unsubscribe
    }, [])

    return { quotes, isLoading }
}
