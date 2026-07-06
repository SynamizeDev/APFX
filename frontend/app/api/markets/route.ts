// frontend/app/api/markets/route.ts
import { NextResponse } from 'next/server';
import NodeCache from 'node-cache';
import { getAggregatedMarketData } from '@/services/marketAggregator';

// Cache with 60 second TTL — keeps TwelveData calls to ≤1/min (free tier: 8/min)
const marketCache = new NodeCache({ stdTTL: 60, checkperiod: 10 });
const CACHE_KEY = 'aggregatedData';

// Prevent Next.js from aggressively statically caching this route
export const dynamic = 'force-dynamic';
// Revalidate every 60 seconds
export const revalidate = 60;

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
