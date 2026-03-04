import { NextResponse } from 'next/server';

// Symbols we support
const SYMBOL_MAP: Record<string, string> = {
    'EUR/USD': 'OANDA:EUR_USD',
    'GBP/USD': 'OANDA:GBP_USD',
    'USD/JPY': 'OANDA:USD_JPY',
    'AUD/USD': 'OANDA:AUD_USD',
    'NZD/USD': 'OANDA:NZD_USD',
    'BTC/USD': 'BINANCE:BTCUSDT',
    'ETH/USD': 'BINANCE:ETHUSDT',
    'XAU/USD': 'OANDA:XAU_USD',
    'AAPL': 'AAPL',
    'TSLA': 'TSLA',
    'NVDA': 'NVDA',
    'SPY': 'SPY',
    'S&P500': 'SPY',
    'NASDAQ': 'QQQ',
    'DOW': 'DIA',
    'IXIC': 'QQQ'
};

const API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;

export async function GET() {
    if (!API_KEY || API_KEY === 'your_finnhub_key_here') {
        return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    try {
        const symbols = Object.keys(SYMBOL_MAP);

        // Fetch all in parallel on the server
        const promises = symbols.map(async (displaySym) => {
            const apiSym = SYMBOL_MAP[displaySym];
            try {
                const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${apiSym}&token=${API_KEY}`, {
                    next: { revalidate: 30 } // Cache on the server for 30s
                });
                if (!res.ok) return null;
                const data = await res.json();

                if (data && data.c !== undefined && data.c !== 0) {
                    return {
                        symbol: displaySym,
                        price: data.c,
                        change: data.d,
                        percent_change: data.dp,
                        up: data.d >= 0
                    };
                }
            } catch (err) {
                return null;
            }
            return null;
        });

        const results = await Promise.all(promises);
        const validResults = results.filter(r => r !== null);

        // Return a single object with all data
        return NextResponse.json(validResults, {
            headers: {
                'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30'
            }
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch market data' }, { status: 500 });
    }
}
