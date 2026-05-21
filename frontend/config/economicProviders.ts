// frontend/config/economicProviders.ts
// Mirrors the architecture of config/providers.ts for market data.

export const ECONOMIC_PROVIDERS = {
    FMP: {
        BASE_URL: 'https://financialmodelingprep.com/api/v3',
        KEY: process.env.FMP_API_KEY || '',
        ENABLED: !!process.env.FMP_API_KEY,
        TIMEOUT_MS: 8000,
        PRIORITY: 1,
    },
    TRADING_ECONOMICS: {
        BASE_URL: 'https://api.tradingeconomics.com',
        KEY: process.env.TRADING_ECONOMICS_KEY || '',
        SECRET: process.env.TRADING_ECONOMICS_SECRET || '',
        ENABLED: !!process.env.TRADING_ECONOMICS_KEY,
        TIMEOUT_MS: 8000,
        PRIORITY: 2,
    },
    MOCK: {
        ENABLED: true,
        PRIORITY: 3,
    },
} as const;

// Currencies covered across all providers
export const SUPPORTED_CURRENCIES = [
    'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'NZD',
    'CNY', 'INR', 'SGD', 'HKD', 'KRW', 'MXN', 'BRL', 'ZAR',
] as const;

export type SupportedCurrency = typeof SUPPORTED_CURRENCIES[number];

// Importance mapping for TradingEconomics
export const TE_IMPORTANCE_MAP: Record<number, 'High' | 'Medium' | 'Low'> = {
    1: 'Low',
    2: 'Medium',
    3: 'High',
};

// Country → currency mapping (used for flag display and normalization)
export const COUNTRY_CURRENCY_MAP: Record<string, string> = {
    'united states': 'USD',
    'us': 'USD',
    'usa': 'USD',
    'euro area': 'EUR',
    'european union': 'EUR',
    'eurozone': 'EUR',
    'united kingdom': 'GBP',
    'uk': 'GBP',
    'japan': 'JPY',
    'australia': 'AUD',
    'canada': 'CAD',
    'switzerland': 'CHF',
    'new zealand': 'NZD',
    'china': 'CNY',
    'india': 'INR',
    'singapore': 'SGD',
    'hong kong': 'HKD',
    'south korea': 'KRW',
    'mexico': 'MXN',
    'brazil': 'BRL',
    'south africa': 'ZAR',
};

// Currency → country flag emoji
export const CURRENCY_FLAGS: Record<string, string> = {
    USD: '🇺🇸',
    EUR: '🇪🇺',
    GBP: '🇬🇧',
    JPY: '🇯🇵',
    AUD: '🇦🇺',
    CAD: '🇨🇦',
    CHF: '🇨🇭',
    NZD: '🇳🇿',
    CNY: '🇨🇳',
    INR: '🇮🇳',
    SGD: '🇸🇬',
    HKD: '🇭🇰',
    KRW: '🇰🇷',
    MXN: '🇲🇽',
    BRL: '🇧🇷',
    ZAR: '🇿🇦',
};
