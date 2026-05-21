// frontend/services/economicCalendar.ts
// Browser-side service layer — mirrors services/marketData.ts exactly.
// Handles deduplication, debounce caching, and auto-refresh.

import { EconomicEvent, CalendarFilters, CalendarApiResponse } from '@/types/economic';

// ── Browser-side debounce cache ────────────────────────────────────────
let cachedEvents: EconomicEvent[] = [];
let cachedFiltersKey = '';
let lastFetchTime = 0;
let pendingRequest: Promise<CalendarApiResponse> | null = null;

const BROWSER_CACHE_DURATION_MS = 5_000; // 5s UI debounce; server cache is 60s

function filtersToKey(filters: CalendarFilters): string {
    return JSON.stringify({
        from: filters.from || '',
        to: filters.to || '',
        currency: filters.currency || 'All',
        impact: filters.impact || 'All',
        search: filters.search || '',
    });
}

function filtersToQueryString(filters: CalendarFilters): string {
    const params = new URLSearchParams();
    if (filters.from) params.set('from', filters.from);
    if (filters.to) params.set('to', filters.to);
    if (filters.currency && filters.currency !== 'All') params.set('currency', filters.currency);
    if (filters.impact && filters.impact !== 'All') params.set('impact', filters.impact);
    return params.toString();
}

/**
 * Fetches economic calendar data from the internal Next.js API route.
 * Implements deduplication and browser-level debounce caching —
 * identical pattern to fetchMarketData() in services/marketData.ts.
 */
export async function fetchEconomicCalendar(
    filters: CalendarFilters = {}
): Promise<CalendarApiResponse> {
    const now = Date.now();
    const key = filtersToKey(filters);

    // 1. Return cache if valid and filters haven't changed
    if (
        cachedEvents.length > 0 &&
        cachedFiltersKey === key &&
        now - lastFetchTime < BROWSER_CACHE_DURATION_MS
    ) {
        return {
            success: true,
            source: 'browser-cache',
            cached: true,
            count: cachedEvents.length,
            data: cachedEvents,
            fetchedAt: new Date(lastFetchTime).toISOString(),
        };
    }

    // 2. If already fetching same filters, join the pending promise
    if (pendingRequest && cachedFiltersKey === key) {
        return pendingRequest;
    }

    // 3. New fetch
    cachedFiltersKey = key;
    pendingRequest = (async (): Promise<CalendarApiResponse> => {
        try {
            const qs = filtersToQueryString(filters);
            const url = `/api/economic-calendar${qs ? `?${qs}` : ''}`;
            console.log(`[EconomicCalendar] Fetching from ${url}`);

            const response = await fetch(url);
            if (!response.ok) throw new Error(`API returned ${response.status}`);

            const data: CalendarApiResponse = await response.json();

            if (data.success && data.data.length > 0) {
                cachedEvents = data.data;
                lastFetchTime = Date.now();
                return data;
            }

            return generateFallbackResponse();
        } catch (error) {
            console.warn('[EconomicCalendar] API failed, using client fallback.', error);
            return generateFallbackResponse();
        } finally {
            pendingRequest = null;
        }
    })();

    return pendingRequest;
}

/** Clears the browser-side cache (e.g. on manual refresh) */
export function invalidateCalendarCache(): void {
    cachedEvents = [];
    cachedFiltersKey = '';
    lastFetchTime = 0;
    pendingRequest = null;
}

function generateFallbackResponse(): CalendarApiResponse {
    return {
        success: false,
        source: 'client-fallback',
        cached: false,
        count: 0,
        data: [],
        fetchedAt: new Date().toISOString(),
    };
}
