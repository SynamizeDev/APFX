// frontend/services/marketAggregator.ts
import axios from 'axios';
import { PROVIDERS, SYMBOL_MAPPINGS } from '../config/providers';
import { MarketQuote } from './marketData';

// Polyfill mapping iteration
const ALL_SYMBOLS = [
    ...SYMBOL_MAPPINGS.forex,
    ...SYMBOL_MAPPINGS.commodities,
    ...SYMBOL_MAPPINGS.crypto,
    ...SYMBOL_MAPPINGS.indices,
    ...SYMBOL_MAPPINGS.stocks
];

async function fetchFromFinnhub(symbolConfig: any): Promise<MarketQuote | null> {
    if (!PROVIDERS.FINNHUB.KEY || !symbolConfig.finnhub) return null;
    try {
        const res = await axios.get(`${PROVIDERS.FINNHUB.BASE_URL}/quote?symbol=${symbolConfig.finnhub}&token=${PROVIDERS.FINNHUB.KEY}`);
        const data = res.data;
        if (data && data.c) { // Current price is 'c' in Finnhub
            return {
                symbol: symbolConfig.display,
                price: data.c,
                change: data.d, // Change
                percent_change: data.dp, // Percent change
                up: data.d >= 0
            };
        }
    } catch (error) {
        console.warn(`Finnhub fetch failed for ${symbolConfig.display}`, error);
    }
    return null;
}

async function fetchFromPolygon(symbolConfig: any): Promise<MarketQuote | null> {
    if (!PROVIDERS.POLYGON.KEY || !symbolConfig.polygon) return null;
    try {
        const res = await axios.get(`${PROVIDERS.POLYGON.BASE_URL}/aggs/ticker/${symbolConfig.polygon}/prev?apiKey=${PROVIDERS.POLYGON.KEY}`);
        const data = res.data;
        if (data && data.results && data.results.length > 0) {
            const result = data.results[0];
            const change = result.c - result.o;
            const percent_change = (change / result.o) * 100;
            return {
                symbol: symbolConfig.display,
                price: result.c,
                change: change,
                percent_change: percent_change,
                up: change >= 0
            };
        }
    } catch (error) {
        console.warn(`Polygon fetch failed for ${symbolConfig.display}`, error);
    }
    return null;
}

async function fetchFromTwelveData(symbolConfig: any): Promise<MarketQuote | null> {
    if (!PROVIDERS.TWELVEDATA.KEY || !symbolConfig.twelvedata) return null;
    try {
        const res = await axios.get(`${PROVIDERS.TWELVEDATA.BASE_URL}/quote?symbol=${symbolConfig.twelvedata}&apikey=${PROVIDERS.TWELVEDATA.KEY}`);
        const data = res.data;
        if (data && data.close) {
            const price = parseFloat(data.close);
            const change = parseFloat(data.change);
            const percent_change = parseFloat(data.percent_change);
            return {
                symbol: symbolConfig.display,
                price: price,
                change: change,
                percent_change: percent_change,
                up: change >= 0
            };
        }
    } catch (error) {
        console.warn(`TwelveData fetch failed for ${symbolConfig.display}`, error);
    }
    return null;
}

// Single asset aggregation logic
export async function getMarketQuoteForAsset(symbolConfig: any): Promise<MarketQuote | null> {
    // 1. Primary: Finnhub (Forex/Indices usually better here)
    let quote = await fetchFromFinnhub(symbolConfig);
    if (quote) return quote;

    // 2. Secondary: Polygon (Stocks/Crypto usually better here)
    quote = await fetchFromPolygon(symbolConfig);
    if (quote) return quote;

    // 3. Fallback: TwelveData
    quote = await fetchFromTwelveData(symbolConfig);
    if (quote) return quote;

    return null;
}

// Fetch all market data at once
export async function getAggregatedMarketData(): Promise<MarketQuote[]> {
    const promises = ALL_SYMBOLS.map(async (config) => {
        let quote = await getMarketQuoteForAsset(config);
        if (!quote) {
            // Give a mock fallback if ALL APIs fail/are unconfigured so the site never crashes
            quote = {
                symbol: config.display,
                price: 100 + (Math.random() * 50),
                change: Math.random() * 2 - 1,
                percent_change: Math.random() * 2,
                up: Math.random() > 0.5
            };
            quote.mock = true; // Mark as mock so we know it's fallback
        }
        return quote;
    });

    const results = await Promise.all(promises);
    return results.filter(q => q !== null) as MarketQuote[];
}
