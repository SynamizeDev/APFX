// frontend/app/api/economic-calendar/route.ts
// Next.js Route Handler — mirrors app/api/markets/route.ts exactly.
// Caches aggregated economic events for 60 seconds server-side.

import { NextRequest, NextResponse } from 'next/server';
import NodeCache from 'node-cache';
import { getAggregatedEconomicEvents } from '@/services/economicCalendarAggregator';
import { CalendarFilters } from '@/types/economic';

// 60-second TTL; checks for expiry every 10 seconds
const calendarCache = new NodeCache({ stdTTL: 60, checkperiod: 10 });

// Prevent Next.js from statically caching this route
export const dynamic = 'force-dynamic';
export const revalidate = 0;

function buildCacheKey(filters: CalendarFilters): string {
    return [
        filters.from || 'default',
        filters.to || 'default',
        filters.currency || 'All',
        filters.impact || 'All',
    ].join('|');
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        const filters: CalendarFilters = {
            from: searchParams.get('from') || undefined,
            to: searchParams.get('to') || undefined,
            currency: searchParams.get('currency') || undefined,
            impact: searchParams.get('impact') || undefined,
            search: searchParams.get('search') || undefined,
        };

        const cacheKey = buildCacheKey(filters);

        // 1. Check server-side in-memory cache
        const cached = calendarCache.get(cacheKey);
        if (cached) {
            console.log(`[API/EconomicCalendar] Cache HIT for key: ${cacheKey}`);
            return NextResponse.json({
                success: true,
                source: (cached as { source: string }).source || 'cache',
                cached: true,
                count: (cached as { data: unknown[] }).data?.length || 0,
                data: (cached as { data: unknown[] }).data,
                fetchedAt: (cached as { fetchedAt: string }).fetchedAt,
            });
        }

        // 2. Cache MISS — aggregate from providers
        console.log(`[API/EconomicCalendar] Cache MISS. Fetching from providers...`);
        const { events, source } = await getAggregatedEconomicEvents(filters);
        
        const fetchedAt = new Date().toISOString();

        // 3. Store in cache
        const payload = { data: events, source, fetchedAt };
        calendarCache.set(cacheKey, payload);

        return NextResponse.json({
            success: true,
            source,
            cached: false,
            count: events.length,
            data: events,
            fetchedAt,
        });
    } catch (error) {
        console.error('[API/EconomicCalendar] Unhandled error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch economic calendar data', data: [] },
            { status: 500 }
        );
    }
}
