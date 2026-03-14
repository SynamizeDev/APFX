import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const UNDERLYINGS = [
    { symbol: 'NIFTY', name: 'Nifty 50', spot: 23510, changePercent: -0.48, up: false },
    { symbol: 'BANKNIFTY', name: 'Bank Nifty', spot: 52750, changePercent: 0.24, up: true },
    { symbol: 'FINNIFTY', name: 'Fin Nifty', spot: 25130, changePercent: -0.79, up: false },
    { symbol: 'MIDCPNIFTY', name: 'Midcap Select', spot: 60462, changePercent: -0.74, up: false },
    { symbol: 'SENSEX', name: 'Sensex', spot: 74563, changePercent: -0.18, up: false },
];

export function GET() {
    return NextResponse.json(UNDERLYINGS);
}
