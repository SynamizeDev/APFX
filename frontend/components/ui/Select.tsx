'use client'

import { useRef, useEffect, useState, useMemo } from 'react'
import styles from './Select.module.css'

export type SelectOption = {
    value: string
    label: string
    group?: string
}

export default function Select({
    value,
    onChange,
    options,
    id,
    triggerClassName = '',
    placeholder = 'Select option...',
    searchPlaceholder,
}: {
    value: string
    onChange: (value: string) => void
    options: SelectOption[]
    id?: string
    triggerClassName?: string
    placeholder?: string
    searchPlaceholder?: string
}) {
    const [open, setOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const wrapperRef = useRef<HTMLDivElement>(null)
    const searchInputRef = useRef<HTMLInputElement>(null)

    const selectedLabel = options.find((o) => o.value === value)?.label ?? value

    const showSearch = options.length > 8

    useEffect(() => {
        if (!open) {
            setSearchTerm('')
            return
        }
        if (showSearch) {
            const timer = setTimeout(() => {
                searchInputRef.current?.focus()
            }, 50)
            return () => clearTimeout(timer)
        }
    }, [open, showSearch])

    useEffect(() => {
        if (!open) return
        const handleClickOutside = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false)
        }
        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [open])

    const filteredOptions = useMemo(() => {
        const valid = options.filter((opt) => opt.value !== '')
        const raw = searchTerm.trim()
        if (!raw) return valid

        const term = raw.toLowerCase()
        const cleanTerm = term.replace(/[\s\/\-_]/g, '')

        const scored = valid
            .map((opt) => {
                const valLower = opt.value.toLowerCase()
                const labelLower = opt.label.toLowerCase()
                const cleanVal = valLower.replace(/[\s\/\-_]/g, '')
                const groupLower = (opt.group || '').toLowerCase()

                let score = 0
                if (valLower === term || cleanVal === cleanTerm) {
                    score = 100 // exact symbol match (e.g. "EUR/USD" or "EURUSD")
                } else if (valLower.startsWith(term) || cleanVal.startsWith(cleanTerm)) {
                    score = 80 // symbol starts with query (e.g. "USD/JPY" for "usd")
                } else if (valLower.includes(term) || cleanVal.includes(cleanTerm)) {
                    score = 60 // symbol contains query
                } else if (labelLower.includes(term)) {
                    score = 40 // descriptive name contains query (e.g. "Gold" or "US Dollar")
                } else if (groupLower.includes(term)) {
                    score = 20 // category name matches
                }

                return { opt, score }
            })
            .filter((item) => item.score > 0)
            .sort((a, b) => b.score - a.score)

        return scored.map((item) => item.opt)
    }, [options, searchTerm])

    // Group options if groups exist
    const hasGroups = useMemo(() => options.some((o) => o.group), [options])

    const groupedOptions = useMemo(() => {
        if (!hasGroups) return null
        const groups: Record<string, SelectOption[]> = {}
        filteredOptions.forEach((opt) => {
            const g = opt.group || 'Other'
            if (!groups[g]) groups[g] = []
            groups[g].push(opt)
        })
        return groups
    }, [filteredOptions, hasGroups])

    return (
        <div
            ref={wrapperRef}
            className={styles.wrapper}
            data-open={open}
        >
            <button
                type="button"
                id={id}
                className={`${styles.trigger} ${triggerClassName}`}
                onClick={() => setOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-label={selectedLabel}
            >
                <span>{selectedLabel || placeholder}</span>
                <svg className={styles.chevron} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>
            {open && (
                <div className={styles.dropdown} data-lenis-prevent="true">
                    {showSearch && (
                        <div className={styles.searchWrapper}>
                            <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <input
                                ref={searchInputRef}
                                type="text"
                                className={styles.searchInput}
                                placeholder={
                                    searchPlaceholder ??
                                    (hasGroups ? 'Search instrument...' : 'Search...')
                                }
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                            />
                            {searchTerm && (
                                <button
                                    type="button"
                                    className={styles.searchClear}
                                    onClick={() => setSearchTerm('')}
                                    aria-label="Clear search"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    )}
                    <ul
                        role="listbox"
                        className={styles.optionsList}
                        aria-activedescendant={value}
                        data-lenis-prevent="true"
                    >
                        {filteredOptions.length === 0 ? (
                            <li className={styles.noOptions}>No instruments found</li>
                        ) : groupedOptions ? (
                            Object.entries(groupedOptions).map(([groupName, groupItems]) => (
                                <li key={groupName} className={styles.groupWrapper}>
                                    <div className={styles.groupHeading}>{groupName}</div>
                                    <ul className={styles.groupList}>
                                        {groupItems.map((opt) => (
                                            <li key={opt.value} role="option" aria-selected={opt.value === value}>
                                                <button
                                                    type="button"
                                                    className={styles.option}
                                                    data-selected={opt.value === value}
                                                    onClick={() => {
                                                        onChange(opt.value)
                                                        setOpen(false)
                                                    }}
                                                >
                                                    {opt.label}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))
                        ) : (
                            filteredOptions.map((opt) => (
                                <li key={opt.value} role="option" aria-selected={opt.value === value}>
                                    <button
                                        type="button"
                                        className={styles.option}
                                        data-selected={opt.value === value}
                                        onClick={() => {
                                            onChange(opt.value)
                                            setOpen(false)
                                        }}
                                    >
                                        {opt.label}
                                    </button>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            )}
        </div>
    )
}
