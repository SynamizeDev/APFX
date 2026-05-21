// frontend/services/economicProviders/tradingEconomicsProvider.ts
// TradingEconomics — Secondary provider for economic calendar data.
// Docs: https://docs.tradingeconomics.com/#calendar

import axios from 'axios';
import { ECONOMIC_PROVIDERS, TE_IMPORTANCE_MAP, COUNTRY_CURRENCY_MAP } from '@/config/economicProviders';
import { EconomicEvent } from '@/types/economic';
function genId(): string {
    return `te-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

interface TEEvent {
    CalendarId?: string;
    Date?: string;           // ISO 8601
    Country?: string;
    Category?: string;       // This is the event name in TE
    Event?: string;
    Actual?: string;
    Previous?: string;
    Forecast?: string;
    TEForecast?: string;
    Importance?: number;     // 1 = Low, 2 = Medium, 3 = High
    Currency?: string;
    Unit?: string;
    Revised?: string;
}

function resolveCurrency(country: string, rawCurrency?: string): string {
    if (rawCurrency && rawCurrency.length === 3) return rawCurrency.toUpperCase();
    const lower = (country || '').toLowerCase().trim();
    return COUNTRY_CURRENCY_MAP[lower] || 'USD';
}

function normalizeTEImpact(importance?: number): 'High' | 'Medium' | 'Low' {
    if (importance === undefined || importance === null) return 'Low';
    return TE_IMPORTANCE_MAP[importance] || 'Low';
}

function parseTEDate(dateStr?: string): { date: string; time: string } {
    if (!dateStr) return { date: new Date().toISOString().split('T')[0], time: '00:00' };
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return { date: dateStr.slice(0, 10), time: '00:00' };
    return {
        date: d.toISOString().split('T')[0],
        time: d.toISOString().split('T')[1].slice(0, 5),
    };
}

function safeStr(val?: string | null): string | undefined {
    if (!val || val.trim() === '') return undefined;
    return val.trim();
}

import { enrichEvent } from './eventEnricher';

export async function fetchFromTradingEconomics(
    from: string,
    to: string
): Promise<EconomicEvent[] | null> {
    const { KEY, BASE_URL, ENABLED, TIMEOUT_MS } = ECONOMIC_PROVIDERS.TRADING_ECONOMICS;

    if (!ENABLED || !KEY) {
        console.warn('[TradingEconomics] No API key configured. Skipping TE provider.');
        return null;
    }

    try {
        // TE calendar endpoint: GET /calendar/country/all/{from}/{to}?c={key}
        const url = `${BASE_URL}/calendar/country/all/${from}/${to}?c=${KEY}`;
        console.log(`[TradingEconomics] Fetching economic calendar: ${from} → ${to}`);

        const res = await axios.get<TEEvent[]>(url, { timeout: TIMEOUT_MS });
        const raw = res.data;

        if (!Array.isArray(raw) || raw.length === 0) {
            console.warn('[TradingEconomics] Empty or invalid response.');
            return null;
        }

        const events: EconomicEvent[] = raw
            .filter((e) => (e.Category || e.Event) && e.Country)
            .map((e): EconomicEvent => {
                const { date, time } = parseTEDate(e.Date);
                const country = e.Country || 'Unknown';
                const currency = resolveCurrency(country, e.Currency);
                const eventName = e.Category || e.Event || 'Unknown Event';
                const forecastVal = safeStr(e.Forecast) || safeStr(e.TEForecast);

                return enrichEvent({
                    id: e.CalendarId ? `te-${e.CalendarId}` : genId(),
                    date,
                    time,
                    country,
                    currency,
                    impact: normalizeTEImpact(e.Importance),
                    event: eventName,
                    actual: safeStr(e.Actual),
                    forecast: forecastVal || '—',
                    previous: safeStr(e.Previous) || '—',
                    provider: 'trading_economics',
                });
            });

        console.log(`[TradingEconomics] Successfully fetched ${events.length} events.`);
        return events;
    } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : String(error);
        console.warn(`[TradingEconomics] Fetch failed: ${msg}`);
        return null;
    }
}
