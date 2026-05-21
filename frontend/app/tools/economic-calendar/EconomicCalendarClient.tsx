'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { fetchEconomicCalendar, invalidateCalendarCache } from '@/services/economicCalendar'
import { CalendarFilters, EconomicEvent } from '@/types/economic'
import CalendarFiltersUI from '@/components/economic-calendar/CalendarFilters'
import EconomicCalendarTable from '@/components/economic-calendar/EconomicCalendarTable'
import CountdownWidget from '@/components/economic-calendar/CountdownWidget'
import ErrorState from '@/components/economic-calendar/ErrorState'
import styles from '@/components/economic-calendar/EconomicCalendar.module.css'

const AUTO_REFRESH_MS = 60_000
const STORAGE_KEY = 'apfx_ec_filters'

function getDefaultFilters(): CalendarFilters {
    const today = new Date()
    const nextWeek = new Date(today)
    nextWeek.setDate(nextWeek.getDate() + 7)
    return {
        from: today.toISOString().split('T')[0],
        to: nextWeek.toISOString().split('T')[0],
        currency: 'All',
        impact: 'All',
        search: '',
    }
}

export default function EconomicCalendarClient() {
    const [filters, setFilters] = useState<CalendarFilters>(getDefaultFilters)
    const [events, setEvents] = useState<EconomicEvent[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [error, setError] = useState(false)
    const [lastUpdated, setLastUpdated] = useState<string | null>(null)
    const [source, setSource] = useState<string | null>(null)
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY)
            if (raw) setFilters(f => ({ ...f, ...JSON.parse(raw) }))
        } catch { /* ignore */ }
    }, [])

    useEffect(() => {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(filters)) } catch { /* ignore */ }
    }, [filters])

    const loadData = useCallback(async (showLoader = false, invalidate = false) => {
        if (showLoader) setIsLoading(true)
        else setIsRefreshing(true)
        setError(false)
        if (invalidate) invalidateCalendarCache()
        try {
            const res = await fetchEconomicCalendar(filters)
            if (!res.success && res.data.length === 0) {
                setError(true)
            } else {
                setEvents(res.data)
                setLastUpdated(res.fetchedAt)
                setSource(res.source)
            }
        } catch {
            setError(true)
        } finally {
            setIsLoading(false)
            setIsRefreshing(false)
        }
    }, [filters])

    useEffect(() => { loadData(true) }, [loadData])

    useEffect(() => {
        timerRef.current = setInterval(() => loadData(false, true), AUTO_REFRESH_MS)
        return () => { if (timerRef.current) clearInterval(timerRef.current) }
    }, [loadData])

    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    })

    return (
        <main className={styles.page}>
            <section className={styles.hero}>
                <div className={styles.heroInner}>
                    <p className={styles.eyebrow}>Trading Tools</p>
                    <h1 className={styles.title}>
                        Economic <span className={styles.accent}>Calendar</span>
                    </h1>
                    <p className={styles.subtitle}>
                        Track high-impact economic events, central bank decisions, and
                        market-moving data releases in real time.
                    </p>
                    <div className={styles.statsBar}>
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>{events.length}</span>
                            <span className={styles.statLabel}>Events</span>
                        </div>
                        <div className={styles.statDivider} />
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>{events.filter(e => e.impact === 'High').length}</span>
                            <span className={styles.statLabel}>High Impact</span>
                        </div>
                        <div className={styles.statDivider} />
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>{[...new Set(events.map(e => e.currency))].length}</span>
                            <span className={styles.statLabel}>Currencies</span>
                        </div>
                        <div className={styles.statDivider} />
                        <div className={styles.statItem}>
                            <span className={`${styles.statValue} ${styles.statLive}`}>
                                <span className={styles.liveDot} />Live
                            </span>
                            <span className={styles.statLabel}>60s refresh</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.calendarSection}>
                <div className={styles.inner}>
                    {!isLoading && events.length > 0 && <CountdownWidget events={events} />}

                    <CalendarFiltersUI
                        filters={filters}
                        onChange={setFilters}
                        onRefresh={() => loadData(false, true)}
                        isRefreshing={isRefreshing}
                        lastUpdated={lastUpdated}
                        source={source}
                    />

                    <div className={styles.toolbar}>
                        <div className={styles.dateDisplay}>
                            <span className={styles.dateDot} />
                            <span>{today}</span>
                        </div>
                        {!isLoading && (
                            <span className={styles.eventCount}>
                                Showing <strong>{events.length}</strong> events
                            </span>
                        )}
                    </div>

                    {error ? (
                        <ErrorState onRetry={() => loadData(false, true)} />
                    ) : (
                        <EconomicCalendarTable
                            events={events}
                            isLoading={isLoading}
                            onClearFilters={() => setFilters(getDefaultFilters())}
                        />
                    )}

                    <p className={styles.disclaimer}>
                        * Economic data is indicative and sourced from third-party providers.
                        Release times and values are subject to change. Trading CFDs carries significant risk.
                    </p>
                </div>
            </section>
        </main>
    )
}
