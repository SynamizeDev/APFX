// frontend/types/economic.ts

export interface HistoricalRelease {
    date: string;       // e.g. "Apr 28, 2026"
    actual: string;
    forecast: string;
    previous: string;
}

export interface EconomicEvent {
    id: string;
    date: string;
    time: string;
    country: string;
    currency: string;
    impact: 'High' | 'Medium' | 'Low';
    event: string;
    actual?: string;
    forecast?: string;
    previous?: string;
    provider: string;
    mock?: boolean;
    // Rich detail fields (shown in expandable panel)
    description?: string;       // What the indicator measures
    whyTradersСare?: string;    // Why it moves markets
    usualEffect?: string;       // e.g. "Actual > Forecast is good for USD"
    frequency?: string;         // e.g. "Released monthly"
    nextRelease?: string;       // ISO date of next scheduled release
    dataSource?: string;        // e.g. "U.S. Bureau of Labor Statistics"
    history?: HistoricalRelease[];  // Last 5–6 historical releases
}

export interface CalendarFilters {
    from?: string;       // ISO date "YYYY-MM-DD"
    to?: string;         // ISO date "YYYY-MM-DD"
    currency?: string;   // "USD" | "EUR" | ... | "All"
    impact?: string;     // "High" | "Medium" | "Low" | "All"
    search?: string;
}

export interface CalendarApiResponse {
    success: boolean;
    source: string;
    cached: boolean;
    count: number;
    data: EconomicEvent[];
    fetchedAt: string;
}
