// frontend/services/economicProviders/fmpProvider.ts
// Financial Modeling Prep — Primary provider for economic calendar data.
// Docs: https://site.financialmodelingprep.com/developer/docs/economic-calendar-api

import axios from 'axios';
import { ECONOMIC_PROVIDERS } from '@/config/economicProviders';
import { EconomicEvent } from '@/types/economic';
function genId(): string {
    return `fmp-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

interface FMPEvent {
    event: string;
    date: string;           // "2026-05-17 08:30:00"
    country: string;
    actual?: string | number | null;
    previous?: string | number | null;
    change?: number | null;
    changePercentage?: number | null;
    estimate?: string | number | null;
    impact?: string;        // "High" | "Medium" | "Low"
    unit?: string;
    currency?: string;
}

function normalizeFMPImpact(raw?: string): 'High' | 'Medium' | 'Low' {
    const s = (raw || '').toLowerCase();
    if (s === 'high') return 'High';
    if (s === 'medium') return 'Medium';
    return 'Low';
}

function safeStr(val: string | number | null | undefined): string | undefined {
    if (val === null || val === undefined || val === '') return undefined;
    return String(val);
}

function parseDateParts(dateStr: string): { date: string; time: string } {
    // FMP format: "2026-05-17 08:30:00" or ISO "2026-05-17T08:30:00"
    const normalized = dateStr.replace(' ', 'T');
    const d = new Date(normalized);
    if (isNaN(d.getTime())) {
        return { date: dateStr.slice(0, 10), time: '00:00' };
    }
    const date = d.toISOString().split('T')[0];
    const time = d.toISOString().split('T')[1].slice(0, 5);
    return { date, time };
}

import { enrichEvent } from './eventEnricher';

export async function fetchFromFMP(
    from: string,
    to: string
): Promise<EconomicEvent[] | null> {
    const { KEY, BASE_URL, ENABLED, TIMEOUT_MS } = ECONOMIC_PROVIDERS.FMP;

    if (!ENABLED || !KEY) {
        console.warn('[FMP] No API key configured. Skipping FMP provider.');
        return null;
    }

    try {
        const url = `${BASE_URL}/economic_calendar?from=${from}&to=${to}&apikey=${KEY}`;
        console.log(`[FMP] Fetching economic calendar: ${from} → ${to}`);

        const res = await axios.get<FMPEvent[]>(url, { timeout: TIMEOUT_MS });
        const raw = res.data;

        if (!Array.isArray(raw) || raw.length === 0) {
            console.warn('[FMP] Empty or invalid response.');
            return null;
        }

        const events: EconomicEvent[] = raw
            .filter((e) => e.event && e.date)
            .map((e): EconomicEvent => {
                const { date, time } = parseDateParts(e.date);
                const currency = e.currency || 'USD';
                const country = e.country || 'Unknown';

                return enrichEvent({
                    id: genId(),
                    date,
                    time,
                    country,
                    currency,
                    impact: normalizeFMPImpact(e.impact),
                    event: e.event,
                    actual: safeStr(e.actual),
                    forecast: safeStr(e.estimate) || '—',
                    previous: safeStr(e.previous) || '—',
                    provider: 'fmp',
                });
            });

        console.log(`[FMP] Successfully fetched ${events.length} events.`);
        return events;
    } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : String(error);
        console.warn(`[FMP] Fetch failed: ${msg}`);
        return null;
    }
}
