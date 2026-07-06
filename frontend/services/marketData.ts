// frontend/services/marketData.ts

export interface MarketQuote {
    symbol: string;
    price: number;
    change: number;
    percent_change: number;
    up: boolean;
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

export const POLL_INTERVAL_MS = 60_000; // Match server cache TTL (60s) to avoid redundant requests

type MarketDataListener = (quotes: MarketQuote[]) => void;

const listeners = new Set<MarketDataListener>();
let pollIntervalId: ReturnType<typeof setInterval> | null = null;
let visibilityListenerAttached = false;

function isDocumentHidden(): boolean {
    return typeof document !== 'undefined' && document.hidden;
}

function handleVisibilityChange() {
    if (isDocumentHidden()) {
        stopPolling();
        return;
    }

    if (listeners.size > 0) {
        void refreshAndNotify();
        startPolling();
    }
}

function ensureVisibilityListener() {
    if (visibilityListenerAttached || typeof document === 'undefined') return;
    visibilityListenerAttached = true;
    document.addEventListener('visibilitychange', handleVisibilityChange);
}

function removeVisibilityListener() {
    if (!visibilityListenerAttached || typeof document === 'undefined') return;
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    visibilityListenerAttached = false;
}

function notifyListeners(quotes: MarketQuote[]) {
    listeners.forEach((listener) => {
        try {
            listener(quotes);
        } catch (error) {
            console.error('[MarketData] listener error', error);
        }
    });
}

async function refreshAndNotify() {
    try {
        const quotes = await fetchMarketData();
        if (quotes.length > 0) {
            notifyListeners(quotes);
        }
    } catch (error) {
        console.warn('[MarketData] poll failed', error);
    }
}

function startPolling() {
    if (pollIntervalId !== null || isDocumentHidden()) return;
    void refreshAndNotify();
    pollIntervalId = setInterval(() => {
        void refreshAndNotify();
    }, POLL_INTERVAL_MS);
}

function stopPolling() {
    if (pollIntervalId !== null) {
        clearInterval(pollIntervalId);
        pollIntervalId = null;
    }
}

/**
 * Subscribe to shared market data polling. One interval serves all subscribers.
 */
export function subscribeMarketData(listener: MarketDataListener): () => void {
    listeners.add(listener);

    const cached = Object.values(cachedQuotes);
    if (cached.length > 0) {
        listener(cached);
    }

    if (listeners.size === 1) {
        ensureVisibilityListener();
        startPolling();
    }

    return () => {
        listeners.delete(listener);
        if (listeners.size === 0) {
            stopPolling();
            removeVisibilityListener();
        }
    };
}

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
