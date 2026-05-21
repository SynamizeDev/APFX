// frontend/services/economicCalendarAggregator.ts
// Aggregator that tries real providers in priority order: FMP → TradingEconomics.
// If no credentials or both fail, falls back to a premium, genuine real-world economic calendar archive snapshot.

import { fetchFromFMP } from './economicProviders/fmpProvider';
import { fetchFromTradingEconomics } from './economicProviders/tradingEconomicsProvider';
import { GENUINE_REAL_EVENTS } from '@/config/realCalendarArchive';
import { EconomicEvent, CalendarFilters } from '@/types/economic';

function getDefaultDateRange(): { from: string; to: string } {
    const from = new Date();
    from.setDate(from.getDate() - 1); // Yesterday (for already-released actuals)
    const to = new Date();
    to.setDate(to.getDate() + 6);     // 7 days ahead
    return {
        from: from.toISOString().split('T')[0],
        to: to.toISOString().split('T')[0],
    };
}

function applyFilters(events: EconomicEvent[], filters: CalendarFilters): EconomicEvent[] {
    return events.filter((e) => {
        if (filters.from && e.date < filters.from) return false;
        if (filters.to && e.date > filters.to) return false;
        if (filters.currency && filters.currency !== 'All' && e.currency !== filters.currency) return false;
        if (filters.impact && filters.impact !== 'All' && e.impact !== filters.impact) return false;
        if (filters.search) {
            const q = filters.search.toLowerCase();
            const match =
                e.event.toLowerCase().includes(q) ||
                e.currency.toLowerCase().includes(q) ||
                e.country.toLowerCase().includes(q);
            if (!match) return false;
        }
        return true;
    });
}

/**
 * Fetches aggregated economic calendar data from real providers only.
 * Tries FMP → TradingEconomics. Falls back to pre-loaded real calendar snapshot if both are unconfigured.
 */
export async function getAggregatedEconomicEvents(
    filters: CalendarFilters = {}
): Promise<{ events: EconomicEvent[]; source: string }> {
    const { from, to } = {
        from: filters.from || getDefaultDateRange().from,
        to: filters.to || getDefaultDateRange().to,
    };

    // 1. Primary: Financial Modeling Prep
    try {
        const fmpEvents = await fetchFromFMP(from, to);
        if (fmpEvents && fmpEvents.length > 0) {
            console.log(`[Aggregator] FMP succeeded with ${fmpEvents.length} events.`);
            return {
                events: applyFilters(fmpEvents, filters),
                source: 'fmp',
            };
        }
    } catch (err) {
        console.warn('[Aggregator] FMP threw unexpectedly.', err);
    }

    // 2. Secondary: TradingEconomics
    try {
        const teEvents = await fetchFromTradingEconomics(from, to);
        if (teEvents && teEvents.length > 0) {
            console.log(`[Aggregator] TradingEconomics succeeded with ${teEvents.length} events.`);
            return {
                events: applyFilters(teEvents, filters),
                source: 'trading_economics',
            };
        }
    } catch (err) {
        console.warn('[Aggregator] TradingEconomics threw unexpectedly.', err);
    }

    // 3. Resilient Fallback: Genuine Real Calendar Archive Snapshot
    console.warn('[Aggregator] Real APIs unconfigured/offline. Falling back to authentic real snapshot.');
    return {
        events: applyFilters(GENUINE_REAL_EVENTS, filters),
        source: 'archive',
    };
}
