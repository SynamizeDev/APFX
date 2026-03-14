'use client'

import { useRef, useEffect, useState } from 'react'
import styles from './Select.module.css'

export type SelectOption = { value: string; label: string }

export default function Select({
    value,
    onChange,
    options,
    id,
}: {
    value: string
    onChange: (value: string) => void
    options: SelectOption[]
    id?: string
}) {
    const [open, setOpen] = useState(false)
    const wrapperRef = useRef<HTMLDivElement>(null)

    const selectedLabel = options.find((o) => o.value === value)?.label ?? value

    useEffect(() => {
        if (!open) return
        const handleClickOutside = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [open])

    return (
        <div
            ref={wrapperRef}
            className={styles.wrapper}
            data-open={open}
        >
            <button
                type="button"
                id={id}
                className={styles.trigger}
                onClick={() => setOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-label={selectedLabel}
            >
                <span>{selectedLabel}</span>
                <svg className={styles.chevron} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>
            {open && (
                <ul
                    role="listbox"
                    className={styles.dropdown}
                    aria-activedescendant={value}
                >
                    {options
                        .filter((opt) => opt.value !== '')
                        .map((opt) => (
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
            )}
        </div>
    )
}
