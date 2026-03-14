// frontend/app/api/markets/route.ts
import { NextResponse } from 'next/server';
import NodeCache from 'node-cache';
import { getAggregatedMarketData } from '@/services/marketAggregator';

// Cache with 10 second TTL, checking for expiry every 2 seconds
const marketCache = new NodeCache({ stdTTL: 10, checkperiod: 2 });
const CACHE_KEY = 'aggregatedData';

// Prevent Next.js from aggressively statically caching this route
export const dynamic = 'force-dynamic';
// Revalidate every 5 seconds (this tells Next.js ISR)
export const revalidate = 5;

export async function GET() {
    try {
        // 1. Check in-memory fast cache first
        const cached = marketCache.get(CACHE_KEY);
        if (cached) {
            console.log('[API/Markets] Serving from Server Cache');
            return NextResponse.json(cached);
        }

        console.log('[API/Markets] Cache miss. Aggregating from Providers...');
        
        // 2. Fetch fresh from providers
        const freshData = await getAggregatedMarketData();

        // 3. Save to cache
        marketCache.set(CACHE_KEY, freshData);

        return NextResponse.json(freshData);
        
    } catch (error) {
        console.error('[API/Markets] Aggregation Error:', error);
        return NextResponse.json({ error: 'Failed to fetch market data' }, { status: 500 });
    }
}
