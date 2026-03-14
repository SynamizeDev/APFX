import { NextResponse } from 'next/server';
import type { OptionsChainResponse, StrikeRow, OptionQuote } from '@/lib/options/types';

export const dynamic = 'force-dynamic';

const UNDERLYING_META: Record<string, { name: string; spot: number; changePercent: number; up: boolean }> = {
    NIFTY: { name: 'Nifty 50', spot: 23510, changePercent: -0.48, up: false },
    BANKNIFTY: { name: 'Bank Nifty', spot: 52750, changePercent: 0.24, up: true },
    FINNIFTY: { name: 'Fin Nifty', spot: 25130, changePercent: -0.79, up: false },
    MIDCPNIFTY: { name: 'Midcap Select', spot: 60462, changePercent: -0.74, up: false },
    SENSEX: { name: 'Sensex', spot: 74563, changePercent: -0.18, up: false },
};

const EXPIRIES = ['2025-03-27', '2025-04-03', '2025-04-10', '2025-04-24', '2025-05-29'];

function randomOi(): number {
    return Math.floor(10000 + Math.random() * 90000);
}

function randomIv(): number {
    return Number((12 + Math.random() * 8).toFixed(2));
}

function buildChain(symbol: string, expiry: string): StrikeRow[] {
    const meta = UNDERLYING_META[symbol] ?? UNDERLYING_META.NIFTY;
    const spot = meta.spot;
    const step = symbol === 'NIFTY' || symbol === 'FINNIFTY' ? 50 : 100;
    const start = Math.floor((spot - 500) / step) * step;
    const strikes: number[] = [];
    for (let i = 0; i < 21; i++) strikes.push(start + i * step);

    return strikes.map((strike) => {
        const ceItm = strike < spot;
        const peItm = strike > spot;
        const ceLtp = ceItm ? Math.max(0, spot - strike + 50 + Math.random() * 100) : Math.max(0, 20 + Math.random() * 150);
        const peLtp = peItm ? Math.max(0, strike - spot + 50 + Math.random() * 100) : Math.max(0, 20 + Math.random() * 150);
        return {
            strike,
            ce: {
                ltp: Number(ceLtp.toFixed(2)),
                bid: Number((ceLtp - 0.5).toFixed(2)),
                ask: Number((ceLtp + 0.5).toFixed(2)),
                oi: randomOi(),
                changeInOi: Math.floor((Math.random() - 0.5) * 5000),
                iv: randomIv(),
                volume: Math.floor(Math.random() * 5000),
            } as OptionQuote,
            pe: {
                ltp: Number(peLtp.toFixed(2)),
                bid: Number((peLtp - 0.5).toFixed(2)),
                ask: Number((peLtp + 0.5).toFixed(2)),
                oi: randomOi(),
                changeInOi: Math.floor((Math.random() - 0.5) * 5000),
                iv: randomIv(),
                volume: Math.floor(Math.random() * 5000),
            } as OptionQuote,
        };
    });
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol') || 'NIFTY';
    const expiry = searchParams.get('expiry') || EXPIRIES[0];

    const meta = UNDERLYING_META[symbol] ?? UNDERLYING_META.NIFTY;
    const rows = buildChain(symbol, expiry);
    const totalCeOi = rows.reduce((s, r) => s + r.ce.oi, 0);
    const totalPeOi = rows.reduce((s, r) => s + r.pe.oi, 0);
    const totalCeVol = rows.reduce((s, r) => s + r.ce.volume, 0);
    const totalPeVol = rows.reduce((s, r) => s + r.pe.volume, 0);

    const body: OptionsChainResponse = {
        symbol,
        name: meta.name,
        spot: meta.spot,
        changePercent: meta.changePercent,
        up: meta.up,
        expiries: EXPIRIES,
        selectedExpiry: expiry,
        pcrOi: totalPeOi / totalCeOi,
        pcrVolume: totalPeVol / totalCeVol,
        rows,
    };

    return NextResponse.json(body);
}
