// frontend/services/marketData.ts

export interface MarketQuote {
    symbol: string;
    price: number;
    change: number;
    percent_change: number;
    up: boolean;
    // Used internally to mark fallback/mock quotes when provider APIs fail.
    mock?: boolean;
}

export const DEFAULT_SYMBOLS = [
    'EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD', 'NZD/USD',
    'BTC/USD', 'ETH/USD', 'XAU/USD', 'AAPL', 'TSLA', 'NVDA',
    'SPY', 'S&P500', 'NASDAQ', 'DOW'
];

// Central Cache inside browser to prevent layout tearing on interval overlap
let cachedQuotes: Record<string, MarketQuote> = {};
let lastFetchTime = 0;
let pendingRequest: Promise<MarketQuote[]> | null = null;
const BROWSER_CACHE_DURATION = 2000; // 2 seconds UI debounce, actual caching is on server

/**
 * Fetches market data from the centralized internal API.
 * This ensures the browser makes only ONE request.
 */
export async function fetchMarketData(): Promise<MarketQuote[]> {
    const now = Date.now();

    // 1. Return cache if valid (deduplication essentially)
    if (Object.keys(cachedQuotes).length > 0 && (now - lastFetchTime) < BROWSER_CACHE_DURATION) {
        return Object.values(cachedQuotes);
    }

    // 2. If already fetching, join the promise
    if (pendingRequest) {
        return pendingRequest;
    }

    // 3. New Fetch
    pendingRequest = (async () => {
        try {
            console.log("[MarketData] Fetching consolidated data from /api/markets");
            const response = await fetch('/api/markets');

            if (!response.ok) {
                throw new Error('Fallback to static data due to API error');
            }

            const data: MarketQuote[] = await response.json();

            if (data && data.length > 0) {
                const newMap: Record<string, MarketQuote> = {};
                data.forEach(q => { newMap[q.symbol] = q; });
                cachedQuotes = newMap;
                lastFetchTime = Date.now();
                return data;
            }

            return generateMockData();
        } catch (error) {
            console.warn('[MarketData] API failed, using mock data.', error);
            return generateMockData();
        } finally {
            pendingRequest = null;
        }
    })();

    return pendingRequest;
}

function generateMockData(): MarketQuote[] {
    return DEFAULT_SYMBOLS.map(sym => ({
        symbol: sym,
        price: 100 + (Math.random() * 50),
        change: Math.random() * 2 - 1,
        percent_change: Math.random() * 2,
        up: Math.random() > 0.5
    }));
}
