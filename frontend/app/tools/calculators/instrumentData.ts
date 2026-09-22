/**
 * Institutional Instrument Definitions & Conversion Engine
 * APFX Trade Calculators Hub
 */

export interface InstrumentConfig {
    symbol: string
    name: string
    category: 'Majors' | 'Crosses' | 'Exotics' | 'Metals & Commodities' | 'Crypto' | 'Indices'
    base: string
    quote: string
    rate: number
    pipSize: number
    contractSize: number
}

export const INSTRUMENT_DEFINITIONS: InstrumentConfig[] = [
    // ── Majors ──────────────────────────────────────────────
    { symbol: 'EUR/USD', name: 'EUR/USD (Euro / US Dollar)', category: 'Majors', base: 'EUR', quote: 'USD', rate: 1.1000, pipSize: 0.0001, contractSize: 100_000 },
    { symbol: 'GBP/USD', name: 'GBP/USD (British Pound / US Dollar)', category: 'Majors', base: 'GBP', quote: 'USD', rate: 1.3000, pipSize: 0.0001, contractSize: 100_000 },
    { symbol: 'USD/JPY', name: 'USD/JPY (US Dollar / Japanese Yen)', category: 'Majors', base: 'USD', quote: 'JPY', rate: 150.00, pipSize: 0.01, contractSize: 100_000 },
    { symbol: 'USD/CHF', name: 'USD/CHF (US Dollar / Swiss Franc)', category: 'Majors', base: 'USD', quote: 'CHF', rate: 0.8800, pipSize: 0.0001, contractSize: 100_000 },
    { symbol: 'AUD/USD', name: 'AUD/USD (Australian Dollar / US Dollar)', category: 'Majors', base: 'AUD', quote: 'USD', rate: 0.6600, pipSize: 0.0001, contractSize: 100_000 },
    { symbol: 'USD/CAD', name: 'USD/CAD (US Dollar / Canadian Dollar)', category: 'Majors', base: 'USD', quote: 'CAD', rate: 1.3600, pipSize: 0.0001, contractSize: 100_000 },
    { symbol: 'NZD/USD', name: 'NZD/USD (New Zealand Dollar / US Dollar)', category: 'Majors', base: 'NZD', quote: 'USD', rate: 0.6100, pipSize: 0.0001, contractSize: 100_000 },

    // ── Crosses ─────────────────────────────────────────────
    { symbol: 'EUR/GBP', name: 'EUR/GBP (Euro / British Pound)', category: 'Crosses', base: 'EUR', quote: 'GBP', rate: 0.8460, pipSize: 0.0001, contractSize: 100_000 },
    { symbol: 'EUR/JPY', name: 'EUR/JPY (Euro / Japanese Yen)', category: 'Crosses', base: 'EUR', quote: 'JPY', rate: 165.00, pipSize: 0.01, contractSize: 100_000 },
    { symbol: 'EUR/AUD', name: 'EUR/AUD (Euro / Australian Dollar)', category: 'Crosses', base: 'EUR', quote: 'AUD', rate: 1.6660, pipSize: 0.0001, contractSize: 100_000 },
    { symbol: 'EUR/CAD', name: 'EUR/CAD (Euro / Canadian Dollar)', category: 'Crosses', base: 'EUR', quote: 'CAD', rate: 1.4960, pipSize: 0.0001, contractSize: 100_000 },
    { symbol: 'EUR/CHF', name: 'EUR/CHF (Euro / Swiss Franc)', category: 'Crosses', base: 'EUR', quote: 'CHF', rate: 0.9680, pipSize: 0.0001, contractSize: 100_000 },
    { symbol: 'EUR/NZD', name: 'EUR/NZD (Euro / New Zealand Dollar)', category: 'Crosses', base: 'EUR', quote: 'NZD', rate: 1.8030, pipSize: 0.0001, contractSize: 100_000 },
    { symbol: 'GBP/JPY', name: 'GBP/JPY (British Pound / Japanese Yen)', category: 'Crosses', base: 'GBP', quote: 'JPY', rate: 195.00, pipSize: 0.01, contractSize: 100_000 },
    { symbol: 'GBP/AUD', name: 'GBP/AUD (British Pound / Australian Dollar)', category: 'Crosses', base: 'GBP', quote: 'AUD', rate: 1.9690, pipSize: 0.0001, contractSize: 100_000 },
    { symbol: 'GBP/CAD', name: 'GBP/CAD (British Pound / Canadian Dollar)', category: 'Crosses', base: 'GBP', quote: 'CAD', rate: 1.7680, pipSize: 0.0001, contractSize: 100_000 },
    { symbol: 'GBP/CHF', name: 'GBP/CHF (British Pound / Swiss Franc)', category: 'Crosses', base: 'GBP', quote: 'CHF', rate: 1.1440, pipSize: 0.0001, contractSize: 100_000 },
    { symbol: 'GBP/NZD', name: 'GBP/NZD (British Pound / New Zealand Dollar)', category: 'Crosses', base: 'GBP', quote: 'NZD', rate: 2.1310, pipSize: 0.0001, contractSize: 100_000 },
    { symbol: 'AUD/JPY', name: 'AUD/JPY (Australian Dollar / Japanese Yen)', category: 'Crosses', base: 'AUD', quote: 'JPY', rate: 99.00, pipSize: 0.01, contractSize: 100_000 },
    { symbol: 'AUD/CAD', name: 'AUD/CAD (Australian Dollar / Canadian Dollar)', category: 'Crosses', base: 'AUD', quote: 'CAD', rate: 0.8970, pipSize: 0.0001, contractSize: 100_000 },
    { symbol: 'AUD/CHF', name: 'AUD/CHF (Australian Dollar / Swiss Franc)', category: 'Crosses', base: 'AUD', quote: 'CHF', rate: 0.5810, pipSize: 0.0001, contractSize: 100_000 },
    { symbol: 'AUD/NZD', name: 'AUD/NZD (Australian Dollar / New Zealand Dollar)', category: 'Crosses', base: 'AUD', quote: 'NZD', rate: 1.0820, pipSize: 0.0001, contractSize: 100_000 },
    { symbol: 'NZD/JPY', name: 'NZD/JPY (New Zealand Dollar / Japanese Yen)', category: 'Crosses', base: 'NZD', quote: 'JPY', rate: 91.50, pipSize: 0.01, contractSize: 100_000 },
    { symbol: 'NZD/CAD', name: 'NZD/CAD (New Zealand Dollar / Canadian Dollar)', category: 'Crosses', base: 'NZD', quote: 'CAD', rate: 0.8290, pipSize: 0.0001, contractSize: 100_000 },
    { symbol: 'NZD/CHF', name: 'NZD/CHF (New Zealand Dollar / Swiss Franc)', category: 'Crosses', base: 'NZD', quote: 'CHF', rate: 0.5370, pipSize: 0.0001, contractSize: 100_000 },
    { symbol: 'CAD/JPY', name: 'CAD/JPY (Canadian Dollar / Japanese Yen)', category: 'Crosses', base: 'CAD', quote: 'JPY', rate: 110.30, pipSize: 0.01, contractSize: 100_000 },
    { symbol: 'CAD/CHF', name: 'CAD/CHF (Canadian Dollar / Swiss Franc)', category: 'Crosses', base: 'CAD', quote: 'CHF', rate: 0.6470, pipSize: 0.0001, contractSize: 100_000 },
    { symbol: 'CHF/JPY', name: 'CHF/JPY (Swiss Franc / Japanese Yen)', category: 'Crosses', base: 'CHF', quote: 'JPY', rate: 170.45, pipSize: 0.01, contractSize: 100_000 },

    // ── Exotics ─────────────────────────────────────────────
    { symbol: 'USD/SGD', name: 'USD/SGD (US Dollar / Singapore Dollar)', category: 'Exotics', base: 'USD', quote: 'SGD', rate: 1.3200, pipSize: 0.0001, contractSize: 100_000 },
    { symbol: 'USD/HKD', name: 'USD/HKD (US Dollar / Hong Kong Dollar)', category: 'Exotics', base: 'USD', quote: 'HKD', rate: 7.7800, pipSize: 0.0001, contractSize: 100_000 },
    { symbol: 'USD/INR', name: 'USD/INR (US Dollar / Indian Rupee)', category: 'Exotics', base: 'USD', quote: 'INR', rate: 83.50, pipSize: 0.01, contractSize: 100_000 },
    { symbol: 'USD/AED', name: 'USD/AED (US Dollar / UAE Dirham)', category: 'Exotics', base: 'USD', quote: 'AED', rate: 3.6725, pipSize: 0.0001, contractSize: 100_000 },
    { symbol: 'USD/ZAR', name: 'USD/ZAR (US Dollar / South African Rand)', category: 'Exotics', base: 'USD', quote: 'ZAR', rate: 18.00, pipSize: 0.0001, contractSize: 100_000 },
    { symbol: 'USD/MXN', name: 'USD/MXN (US Dollar / Mexican Peso)', category: 'Exotics', base: 'USD', quote: 'MXN', rate: 19.50, pipSize: 0.0001, contractSize: 100_000 },
    { symbol: 'USD/TRY', name: 'USD/TRY (US Dollar / Turkish Lira)', category: 'Exotics', base: 'USD', quote: 'TRY', rate: 34.00, pipSize: 0.0001, contractSize: 100_000 },
    { symbol: 'USD/SEK', name: 'USD/SEK (US Dollar / Swedish Krona)', category: 'Exotics', base: 'USD', quote: 'SEK', rate: 10.40, pipSize: 0.0001, contractSize: 100_000 },
    { symbol: 'USD/NOK', name: 'USD/NOK (US Dollar / Norwegian Krone)', category: 'Exotics', base: 'USD', quote: 'NOK', rate: 10.60, pipSize: 0.0001, contractSize: 100_000 },
    { symbol: 'USD/PLN', name: 'USD/PLN (US Dollar / Polish Zloty)', category: 'Exotics', base: 'USD', quote: 'PLN', rate: 3.9500, pipSize: 0.0001, contractSize: 100_000 },
    { symbol: 'EUR/TRY', name: 'EUR/TRY (Euro / Turkish Lira)', category: 'Exotics', base: 'EUR', quote: 'TRY', rate: 37.40, pipSize: 0.0001, contractSize: 100_000 },
    { symbol: 'EUR/SEK', name: 'EUR/SEK (Euro / Swedish Krona)', category: 'Exotics', base: 'EUR', quote: 'SEK', rate: 11.45, pipSize: 0.0001, contractSize: 100_000 },

    // ── Metals & Commodities ────────────────────────────────
    { symbol: 'XAU/USD', name: 'XAU/USD (Gold / US Dollar)', category: 'Metals & Commodities', base: 'XAU', quote: 'USD', rate: 2650.00, pipSize: 0.01, contractSize: 100 },
    { symbol: 'XAG/USD', name: 'XAG/USD (Silver / US Dollar)', category: 'Metals & Commodities', base: 'XAG', quote: 'USD', rate: 31.50, pipSize: 0.001, contractSize: 5_000 },
    { symbol: 'XPT/USD', name: 'XPT/USD (Platinum / US Dollar)', category: 'Metals & Commodities', base: 'XPT', quote: 'USD', rate: 980.00, pipSize: 0.01, contractSize: 100 },
    { symbol: 'XPD/USD', name: 'XPD/USD (Palladium / US Dollar)', category: 'Metals & Commodities', base: 'XPD', quote: 'USD', rate: 1050.00, pipSize: 0.01, contractSize: 100 },
    { symbol: 'WTI/USD', name: 'WTI/USD (Crude Oil WTI)', category: 'Metals & Commodities', base: 'WTI', quote: 'USD', rate: 71.50, pipSize: 0.01, contractSize: 1_000 },
    { symbol: 'BRENT/USD', name: 'BRENT/USD (Brent Crude Oil)', category: 'Metals & Commodities', base: 'BRENT', quote: 'USD', rate: 75.00, pipSize: 0.01, contractSize: 1_000 },
    { symbol: 'NATGAS/USD', name: 'NATGAS/USD (Natural Gas)', category: 'Metals & Commodities', base: 'NATGAS', quote: 'USD', rate: 2.85, pipSize: 0.001, contractSize: 10_000 },
    { symbol: 'COPPER/USD', name: 'COPPER/USD (Copper)', category: 'Metals & Commodities', base: 'COPPER', quote: 'USD', rate: 4.35, pipSize: 0.0001, contractSize: 25_000 },

    // ── Crypto ──────────────────────────────────────────────
    { symbol: 'BTC/USD', name: 'BTC/USD (Bitcoin / US Dollar)', category: 'Crypto', base: 'BTC', quote: 'USD', rate: 64000.00, pipSize: 1.0, contractSize: 1 },
    { symbol: 'ETH/USD', name: 'ETH/USD (Ethereum / US Dollar)', category: 'Crypto', base: 'ETH', quote: 'USD', rate: 2650.00, pipSize: 0.1, contractSize: 1 },
    { symbol: 'SOL/USD', name: 'SOL/USD (Solana / US Dollar)', category: 'Crypto', base: 'SOL', quote: 'USD', rate: 150.00, pipSize: 0.01, contractSize: 1 },
    { symbol: 'BNB/USD', name: 'BNB/USD (BNB / US Dollar)', category: 'Crypto', base: 'BNB', quote: 'USD', rate: 590.00, pipSize: 0.1, contractSize: 1 },
    { symbol: 'XRP/USD', name: 'XRP/USD (Ripple / US Dollar)', category: 'Crypto', base: 'XRP', quote: 'USD', rate: 0.5900, pipSize: 0.0001, contractSize: 100 },
    { symbol: 'ADA/USD', name: 'ADA/USD (Cardano / US Dollar)', category: 'Crypto', base: 'ADA', quote: 'USD', rate: 0.3600, pipSize: 0.0001, contractSize: 100 },
    { symbol: 'DOGE/USD', name: 'DOGE/USD (Dogecoin / US Dollar)', category: 'Crypto', base: 'DOGE', quote: 'USD', rate: 0.1100, pipSize: 0.0001, contractSize: 1_000 },
    { symbol: 'AVAX/USD', name: 'AVAX/USD (Avalanche / US Dollar)', category: 'Crypto', base: 'AVAX', quote: 'USD', rate: 28.50, pipSize: 0.01, contractSize: 1 },

    // ── Indices ─────────────────────────────────────────────
    { symbol: 'US30/USD', name: 'US30/USD (Dow Jones 30)', category: 'Indices', base: 'US30', quote: 'USD', rate: 42000.00, pipSize: 1.0, contractSize: 1 },
    { symbol: 'US500/USD', name: 'US500/USD (S&P 500)', category: 'Indices', base: 'US500', quote: 'USD', rate: 5700.00, pipSize: 0.1, contractSize: 1 },
    { symbol: 'NAS100/USD', name: 'NAS100/USD (Nasdaq 100)', category: 'Indices', base: 'NAS100', quote: 'USD', rate: 20000.00, pipSize: 0.1, contractSize: 1 },
    { symbol: 'UK100/GBP', name: 'UK100/GBP (FTSE 100)', category: 'Indices', base: 'UK100', quote: 'GBP', rate: 8250.00, pipSize: 1.0, contractSize: 1 },
    { symbol: 'GER40/EUR', name: 'GER40/EUR (DAX 40)', category: 'Indices', base: 'GER40', quote: 'EUR', rate: 18800.00, pipSize: 1.0, contractSize: 1 },
    { symbol: 'FRA40/EUR', name: 'FRA40/EUR (CAC 40)', category: 'Indices', base: 'FRA40', quote: 'EUR', rate: 7550.00, pipSize: 1.0, contractSize: 1 },
    { symbol: 'EU50/EUR', name: 'EU50/EUR (Euro Stoxx 50)', category: 'Indices', base: 'EU50', quote: 'EUR', rate: 4900.00, pipSize: 1.0, contractSize: 1 },
    { symbol: 'JPN225/JPY', name: 'JPN225/JPY (Nikkei 225)', category: 'Indices', base: 'JPN225', quote: 'JPY', rate: 38000.00, pipSize: 1.0, contractSize: 1 },
]

export const INSTRUMENTS = INSTRUMENT_DEFINITIONS.map((i) => i.symbol)

export const INSTRUMENT_MAP = new Map<string, InstrumentConfig>(
    INSTRUMENT_DEFINITIONS.map((i) => [i.symbol, i])
)

export const MOCK_RATES: Record<string, number> = Object.fromEntries(
    INSTRUMENT_DEFINITIONS.map((i) => [i.symbol, i.rate])
)

export const DEPOSIT_CURRENCIES = [
    { value: 'USD', label: 'US Dollar (USD)' },
    { value: 'EUR', label: 'Euro (EUR)' },
    { value: 'GBP', label: 'British Pound (GBP)' },
    { value: 'AUD', label: 'Australian Dollar (AUD)' },
    { value: 'CAD', label: 'Canadian Dollar (CAD)' },
    { value: 'CHF', label: 'Swiss Franc (CHF)' },
    { value: 'JPY', label: 'Japanese Yen (JPY)' },
    { value: 'NZD', label: 'New Zealand Dollar (NZD)' },
    { value: 'SGD', label: 'Singapore Dollar (SGD)' },
    { value: 'AED', label: 'UAE Dirham (AED)' },
    { value: 'INR', label: 'Indian Rupee (INR)' },
    { value: 'ZAR', label: 'South African Rand (ZAR)' },
] as const

/**
 * Currency conversion multiplier from a currency to USD.
 */
function getRateToUSD(currency: string): number {
    if (currency === 'USD') return 1.0
    if (MOCK_RATES[`${currency}/USD`]) return MOCK_RATES[`${currency}/USD`]
    if (MOCK_RATES[`USD/${currency}`]) return 1 / MOCK_RATES[`USD/${currency}`]
    // Crosses via EUR
    if (MOCK_RATES[`EUR/${currency}`] && MOCK_RATES['EUR/USD']) {
        return MOCK_RATES['EUR/USD'] / MOCK_RATES[`EUR/${currency}`]
    }
    return 1.0
}

/**
 * Converts an amount from `fromCurrency` to `toCurrency`.
 */
export function convertCurrency(
    amount: number,
    fromCurrency: string,
    toCurrency: string
): number {
    if (fromCurrency === toCurrency || amount === 0) return amount

    const directPair = `${fromCurrency}/${toCurrency}`
    if (MOCK_RATES[directPair]) return amount * MOCK_RATES[directPair]

    const inversePair = `${toCurrency}/${fromCurrency}`
    if (MOCK_RATES[inversePair]) return amount / MOCK_RATES[inversePair]

    const fromUSD = getRateToUSD(fromCurrency)
    const toUSD = getRateToUSD(toCurrency)

    return amount * (fromUSD / toUSD)
}

/**
 * Calculates pip step size for any instrument.
 */
export function getPipSize(symbol: string): number {
    const config = INSTRUMENT_MAP.get(symbol)
    if (config) return config.pipSize
    if (symbol.includes('JPY')) return 0.01
    return 0.0001
}

/**
 * Retrieves standard lot contract size for an instrument.
 */
export function getContractSize(symbol: string): number {
    const config = INSTRUMENT_MAP.get(symbol)
    if (config) return config.contractSize
    return 100_000
}

/**
 * Calculates exact pip value in deposit currency.
 */
export function calculatePipValue(
    symbol: string,
    pips: number,
    lots: number,
    depositCurrency: string
): number {
    if (lots === 0 || pips === 0) return 0
    const config = INSTRUMENT_MAP.get(symbol)
    const pipSize = config ? config.pipSize : getPipSize(symbol)
    const contractSize = config ? config.contractSize : getContractSize(symbol)
    const quoteCurrency = config ? config.quote : (symbol.split('/')[1] || 'USD')

    const valueInQuote = pipSize * pips * (lots * contractSize)
    return convertCurrency(valueInQuote, quoteCurrency, depositCurrency)
}

/**
 * Calculates margin required in deposit currency.
 */
export function calculateMargin(
    symbol: string,
    lots: number,
    price: number,
    leverage: number,
    depositCurrency: string
): number {
    if (lots === 0 || leverage === 0) return 0
    const config = INSTRUMENT_MAP.get(symbol)
    const contractSize = config ? config.contractSize : getContractSize(symbol)
    const baseCurrency = config ? config.base : (symbol.split('/')[0] || 'USD')

    const marginInBase = (lots * contractSize) / leverage
    return convertCurrency(marginInBase, baseCurrency, depositCurrency)
}
