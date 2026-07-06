// frontend/services/marketAggregator.ts
//
// Strategy (rate-limit aware):
//  PRIMARY  — TwelveData /quote BATCH endpoint
//             All symbols fetched in ONE HTTP request (comma-separated).
//             Free tier: 8 req/min, 800/day — a single batch call is safe.
//
// Polygon removed from fallback: free tier is 5 req/min and blocks
//   indices (I:SPX, I:DJI) with 403. Parallel fallback calls cause 429s.
// Finnhub removed: free tier returns 403 for OANDA (Forex/Commodity) symbols.

import axios from 'axios';
import { PROVIDERS, SYMBOL_MAPPINGS } from '../config/providers';
import { MarketQuote } from './marketData';

const ALL_SYMBOLS = [
    ...SYMBOL_MAPPINGS.forex,
    ...SYMBOL_MAPPINGS.commodities,
    ...SYMBOL_MAPPINGS.crypto,
    ...SYMBOL_MAPPINGS.indices,
    ...SYMBOL_MAPPINGS.stocks,
];

// ── Rate-limit guard (module-level, survives NodeCache misses) ────────────────
// TwelveData free tier: 8 req/min. We enforce a minimum of 65s between calls
// so dev server hot-reloads (which wipe NodeCache) don't cause hammering.
const MIN_CALL_INTERVAL_MS = 65_000;
let lastCallTime = 0;
let lastSuccessfulResult: Record<string, MarketQuote> = {};

// ── 1. TwelveData BATCH fetch ──────────────────────────────────────────────────
async function fetchBatchFromTwelveData(): Promise<Record<string, MarketQuote>> {
    const key = PROVIDERS.TWELVEDATA.KEY;
    if (!key) return {};

    // Guard: don't call if less than 65 seconds since last call
    const now = Date.now();
    if (now - lastCallTime < MIN_CALL_INTERVAL_MS) {
        console.log(`[MarketAggregator] Rate-limit guard: returning cached result (next call in ${Math.ceil((MIN_CALL_INTERVAL_MS - (now - lastCallTime)) / 1000)}s).`);
        return lastSuccessfulResult;
    }
    lastCallTime = now;
    const symbolConfigs = ALL_SYMBOLS.filter(s => s.twelvedata);
    const symbolParam = symbolConfigs.map(s => s.twelvedata).join(',');

    try {
        // NOTE: Do NOT encodeURIComponent the whole symbolParam — that encodes commas
        // to %2C and TwelveData treats the entire string as one symbol.
        // Only encode individual symbols (for the slash in e.g. XAU/USD) then join with literal commas.
        const encodedSymbols = symbolConfigs.map(s => encodeURIComponent(s.twelvedata)).join(',');
        const res = await axios.get(
            `${PROVIDERS.TWELVEDATA.BASE_URL}/quote?symbol=${encodedSymbols}&apikey=${key}`,
            { timeout: 15_000 }
        );

        const data = res.data;
        if (!data) return {};

        const result: Record<string, MarketQuote> = {};
        const isMultiple = symbolConfigs.length > 1;

        if (isMultiple) {
            for (const config of symbolConfigs) {
                const entry = data[config.twelvedata];
                if (!entry || entry.status === 'error' || !entry.close) continue;

                const multiplier = (config as any).priceMultiplier ?? 1;
                const price = parseFloat(entry.close) * multiplier;
                const change = parseFloat(entry.change ?? '0') * multiplier;
                const pct = parseFloat(entry.percent_change ?? '0');
                result[config.display] = { symbol: config.display, price, change, percent_change: pct, up: change >= 0 };
            }
        } else {
            const config = symbolConfigs[0];
            if (config && data.close) {
                const price = parseFloat(data.close);
                const change = parseFloat(data.change ?? '0');
                const pct = parseFloat(data.percent_change ?? '0');
                result[config.display] = { symbol: config.display, price, change, percent_change: pct, up: change >= 0 };
            }
        }

        // Cache the result for rate-limit fallback
        if (Object.keys(result).length > 0) {
            lastSuccessfulResult = result;
        }
        return result;
    } catch (error: any) {
        if (error?.response?.status === 429) {
            console.warn('[MarketAggregator] TwelveData rate-limited (429). Returning last successful result.');
            // Return last known good data instead of empty — prevents UI from clearing
            return lastSuccessfulResult;
        } else {
            console.warn('[MarketAggregator] TwelveData batch failed:', error?.message);
        }
        return lastSuccessfulResult; // Always return last good data on error
    }
}

// ── 2. Polygon individual FALLBACK ─────────────────────────────────────────────
async function fetchFromPolygon(symbolConfig: any): Promise<MarketQuote | null> {
    const key = PROVIDERS.POLYGON.KEY;
    if (!key || !symbolConfig.polygon) return null;

    try {
        const res = await axios.get(
            `${PROVIDERS.POLYGON.BASE_URL}/aggs/ticker/${symbolConfig.polygon}/prev?apiKey=${key}`,
            { timeout: 10_000 }
        );
        const data = res.data;
        if (data?.results?.length > 0) {
            const r = data.results[0];
            const change = r.c - r.o;
            const pct = (change / r.o) * 100;
            return { symbol: symbolConfig.display, price: r.c, change, percent_change: pct, up: change >= 0 };
        }
    } catch (error: any) {
        console.warn(`[MarketAggregator] Polygon failed for ${symbolConfig.display}:`, error?.message);
    }
    return null;
}

// ── Main export ────────────────────────────────────────────────────────────────
export async function getAggregatedMarketData(): Promise<MarketQuote[]> {
    // Single batch call — one request for all symbols.
    // No Polygon fallback (rate limits + 403 on indices on free tier).
    console.log('[MarketAggregator] Fetching batch from TwelveData...');
    const results = await fetchBatchFromTwelveData();
    const count = Object.keys(results).length;
    console.log(`[MarketAggregator] TwelveData returned ${count}/${ALL_SYMBOLS.length} quotes.`);
    return Object.values(results);
}

// Kept for backward compatibility
export async function getMarketQuoteForAsset(symbolConfig: any): Promise<MarketQuote | null> {
    return fetchFromPolygon(symbolConfig);
}
