import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol') || 'EUR/USD';
    const timeframe = searchParams.get('timeframe') || '1D';

    // In a full implementation, you would branch here based on the provider
    // configured for the specific symbol (e.g., Finnhub for Forex, Polygon for Stocks)
    // and make the respective REST API calls (e.g., Finnhub /stock/candle).

    // For this integration phase without active premium API keys, we generate
    // realistic mock OHLC data to ensure the lightweight-charts component
    // renders correctly and handles data formatting.

    const candles = generateMockCandles(symbol, timeframe);

    return NextResponse.json({
        data: candles,
        symbol,
        timeframe,
        source: 'mock_fallback' // Indicates no valid historical API key was available
    });
}

function generateMockCandles(symbol: string, timeframe: string) {
    const data = [];
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Start of day

    // Base price pseudo-randomized by symbol length/chars
    let currentPrice = 100 + (symbol.length * 10) + (symbol.charCodeAt(0));
    if (symbol.includes('USD')) {
        currentPrice = symbol.startsWith('BTC') ? 63000 : symbol.startsWith('ETH') ? 3400 : 1.10;
    }

    // Candle count and time step by timeframe
    let count = 100;
    let timeStepMs = 24 * 60 * 60 * 1000; // 1D default
    if (timeframe === '15M') {
        timeStepMs = 15 * 60 * 1000;
    } else if (timeframe === '1H') {
        timeStepMs = 60 * 60 * 1000;
    } else if (timeframe === '1W') {
        count = 52;
        timeStepMs = 7 * 24 * 60 * 60 * 1000;
    } else if (timeframe === '1M') {
        count = 60;
        timeStepMs = 30 * 24 * 60 * 60 * 1000;
    } else if (timeframe === '3M') {
        count = 90;
        timeStepMs = 24 * 60 * 60 * 1000;
    } else if (timeframe === '6M') {
        count = 120;
        timeStepMs = 24 * 60 * 60 * 1000;
    } else if (timeframe === '1Y') {
        count = 252;
        timeStepMs = 24 * 60 * 60 * 1000;
    } else if (timeframe === 'ALL') {
        count = 365;
        timeStepMs = 24 * 60 * 60 * 1000;
    }

    // Start time in the past
    let currentTime = now.getTime() - (count * timeStepMs);

    for (let i = 0; i < count; i++) {
        // Random walk
        const volatility = currentPrice * 0.005; // 0.5% volatility
        const change = (Math.random() - 0.5) * volatility;

        const open = currentPrice;
        const close = open + change;
        const high = Math.max(open, close) + (Math.random() * volatility * 0.5);
        const low = Math.min(open, close) - (Math.random() * volatility * 0.5);

        data.push({
            time: Math.floor(currentTime / 1000), // lightweight-charts expects UNIX timestamp in seconds
            open: Number(open.toFixed(5)),
            high: Number(high.toFixed(5)),
            low: Number(low.toFixed(5)),
            close: Number(close.toFixed(5)),
        });

        currentPrice = close;
        currentTime += timeStepMs;
    }

    return data;
}
