'use client'
// frontend/components/economic-calendar/CurrencyFlag.tsx

import React from 'react'
import { CURRENCY_FLAGS } from '@/config/economicProviders'

interface CurrencyFlagProps {
    currency: string
    showCode?: boolean
    size?: 'sm' | 'md'
}

export default function CurrencyFlag({ currency, showCode = true, size = 'md' }: CurrencyFlagProps) {
    const flag = CURRENCY_FLAGS[currency] || '🌐'
    const fontSize = size === 'sm' ? '0.9rem' : '1.05rem'
    const textSize = size === 'sm' ? '0.72rem' : '0.8rem'

    return (
        <span
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                userSelect: 'none',
            }}
        >
            <span style={{ fontSize, lineHeight: 1 }}>{flag}</span>
            {showCode && (
                <span
                    style={{
                        fontSize: textSize,
                        fontWeight: 700,
                        color: 'var(--color-text-1)',
                        fontFamily: 'var(--font-display)',
                        letterSpacing: '0.03em',
                    }}
                >
                    {currency}
                </span>
            )}
        </span>
    )
}
