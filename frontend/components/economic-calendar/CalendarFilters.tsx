'use client'
// frontend/components/economic-calendar/CalendarFilters.tsx
// Filter bar: currency, impact, search, date range, refresh button.
// Persists state to localStorage.

import React, { useCallback } from 'react'
import { CalendarFilters as FiltersType } from '@/types/economic'
import { SUPPORTED_CURRENCIES, CURRENCY_FLAGS } from '@/config/economicProviders'
import styles from './EconomicCalendar.module.css'

const IMPACT_OPTIONS = ['All', 'High', 'Medium', 'Low'] as const
const CURRENCY_OPTIONS = ['All', ...SUPPORTED_CURRENCIES] as const

interface CalendarFiltersProps {
    filters: FiltersType
    onChange: (f: FiltersType) => void
    onRefresh: () => void
    isRefreshing: boolean
    lastUpdated: string | null
    source: string | null
}

function impactDotColor(impact: string): string {
    if (impact === 'High') return '#ef4444'
    if (impact === 'Medium') return '#f59e0b'
    if (impact === 'Low') return '#64748b'
    return 'transparent'
}

export default function CalendarFilters({
    filters,
    onChange,
    onRefresh,
    isRefreshing,
    lastUpdated,
    source,
}: CalendarFiltersProps) {
    const set = useCallback(
        (patch: Partial<FiltersType>) => onChange({ ...filters, ...patch }),
        [filters, onChange]
    )

    const today = new Date().toISOString().split('T')[0]
    const sevenDays = new Date(Date.now() + 7 * 86400_000).toISOString().split('T')[0]

    return (
        <div className={styles.filterBar}>
            {/* Row 1: search + dates + refresh */}
            <div className={styles.filterRow}>
                {/* Search */}
                <div className={styles.searchWrap}>
                    <svg className={styles.searchIcon} viewBox="0 0 20 20" fill="none">
                        <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.6" />
                        <path d="M13 13l3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                    <input
                        id="ec-search"
                        className={styles.searchInput}
                        type="text"
                        placeholder="Search events, currencies…"
                        value={filters.search || ''}
                        onChange={(e) => set({ search: e.target.value })}
                    />
                    {filters.search && (
                        <button className={styles.searchClear} onClick={() => set({ search: '' })}>✕</button>
                    )}
                </div>

                {/* Date From */}
                <label className={styles.dateLabel}>
                    <span className={styles.dateLabelText}>From</span>
                    <input
                        id="ec-from"
                        type="date"
                        className={styles.dateInput}
                        value={filters.from || today}
                        onChange={(e) => set({ from: e.target.value })}
                    />
                </label>

                {/* Date To */}
                <label className={styles.dateLabel}>
                    <span className={styles.dateLabelText}>To</span>
                    <input
                        id="ec-to"
                        type="date"
                        className={styles.dateInput}
                        value={filters.to || sevenDays}
                        onChange={(e) => set({ to: e.target.value })}
                    />
                </label>

                {/* Refresh button */}
                <button
                    id="ec-refresh"
                    className={styles.refreshBtn}
                    onClick={onRefresh}
                    disabled={isRefreshing}
                    title="Refresh calendar data"
                >
                    <svg
                        viewBox="0 0 20 20"
                        fill="none"
                        className={`${styles.refreshIcon} ${isRefreshing ? styles.refreshSpin : ''}`}
                    >
                        <path
                            d="M4 10a6 6 0 1 1 1.5 4"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                        />
                        <path d="M4 14v-4h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {isRefreshing ? 'Refreshing…' : 'Refresh'}
                </button>
            </div>

            {/* Row 2: impact chips + currency chips */}
            <div className={styles.filterRow}>
                {/* Impact chips */}
                <div className={styles.chipGroup}>
                    <span className={styles.chipGroupLabel}>Impact</span>
                    {IMPACT_OPTIONS.map((imp) => (
                        <button
                            key={imp}
                            id={`ec-impact-${imp.toLowerCase()}`}
                            className={`${styles.chip} ${(filters.impact || 'All') === imp ? styles.chipActive : ''}`}
                            onClick={() => set({ impact: imp })}
                            style={
                                imp !== 'All' && (filters.impact || 'All') === imp
                                    ? { borderColor: impactDotColor(imp), color: impactDotColor(imp) }
                                    : {}
                            }
                        >
                            {imp !== 'All' && (
                                <span
                                    className={styles.chipDot}
                                    style={{ background: impactDotColor(imp) }}
                                />
                            )}
                            {imp}
                        </button>
                    ))}
                </div>

                {/* Currency chips */}
                <div className={`${styles.chipGroup} ${styles.chipGroupCurrency}`}>
                    <span className={styles.chipGroupLabel}>Currency</span>
                    <div className={styles.chipScroll}>
                        {CURRENCY_OPTIONS.map((c) => (
                            <button
                                key={c}
                                id={`ec-currency-${c.toLowerCase()}`}
                                className={`${styles.chip} ${(filters.currency || 'All') === c ? styles.chipActive : ''}`}
                                onClick={() => set({ currency: c })}
                            >
                                {c !== 'All' && CURRENCY_FLAGS[c] && (
                                    <span style={{ fontSize: '0.85rem' }}>{CURRENCY_FLAGS[c]}</span>
                                )}
                                {c}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Meta row: last updated + source indicator */}
            {lastUpdated && (
                <div className={styles.metaRow}>
                    <span className={styles.sourceBadge}>
                        {source === 'fmp' ? '📡 Financial Modeling Prep'
                            : source === 'trading_economics' ? '📡 TradingEconomics'
                            : source === 'archive' ? '📡 Real-World Snapshot'
                            : '📡 Live'}
                    </span>
                    <span className={styles.lastUpdated}>
                        Last updated: {new Date(lastUpdated).toLocaleTimeString()}
                    </span>
                </div>
            )}
        </div>
    )
}
