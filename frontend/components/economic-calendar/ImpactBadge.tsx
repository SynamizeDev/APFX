'use client'
// frontend/components/economic-calendar/ImpactBadge.tsx
// Animated glowing impact badge — High/Medium/Low

import React from 'react'

interface ImpactBadgeProps {
    impact: 'High' | 'Medium' | 'Low'
    showLabel?: boolean
}

const CONFIG = {
    High: {
        color: '#ef4444',
        glow: 'rgba(239,68,68,0.45)',
        bg: 'rgba(239,68,68,0.1)',
        border: 'rgba(239,68,68,0.3)',
        label: 'High',
    },
    Medium: {
        color: '#f59e0b',
        glow: 'rgba(245,158,11,0.4)',
        bg: 'rgba(245,158,11,0.08)',
        border: 'rgba(245,158,11,0.28)',
        label: 'Med',
    },
    Low: {
        color: '#64748b',
        glow: 'rgba(100,116,139,0.3)',
        bg: 'rgba(100,116,139,0.06)',
        border: 'rgba(100,116,139,0.2)',
        label: 'Low',
    },
}

export default function ImpactBadge({ impact, showLabel = true }: ImpactBadgeProps) {
    const cfg = CONFIG[impact]

    return (
        <span
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: showLabel ? '0.2rem 0.6rem 0.2rem 0.45rem' : '0',
                borderRadius: '999px',
                background: showLabel ? cfg.bg : 'transparent',
                border: showLabel ? `1px solid ${cfg.border}` : 'none',
                fontSize: '0.72rem',
                fontWeight: 700,
                color: cfg.color,
                letterSpacing: '0.04em',
                whiteSpace: 'nowrap',
                userSelect: 'none',
            }}
        >
            <span
                style={{
                    width: impact === 'High' ? '7px' : '6px',
                    height: impact === 'High' ? '7px' : '6px',
                    borderRadius: '50%',
                    background: cfg.color,
                    boxShadow: `0 0 ${impact === 'High' ? '8px' : '5px'} ${cfg.glow}`,
                    flexShrink: 0,
                    animation: impact === 'High' ? 'impactPulse 1.8s ease-in-out infinite' : 'none',
                }}
            />
            {showLabel && cfg.label}
            <style>{`
                @keyframes impactPulse {
                    0%, 100% { box-shadow: 0 0 6px rgba(239,68,68,0.5); }
                    50% { box-shadow: 0 0 14px rgba(239,68,68,0.9), 0 0 24px rgba(239,68,68,0.3); }
                }
            `}</style>
        </span>
    )
}
