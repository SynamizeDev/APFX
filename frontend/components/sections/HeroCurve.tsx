'use client'

import styles from './HeroCurve.module.css'

/**
 * Right-side organic curve from stats section up to header.
 * Renders as SVG with theme gradient; place inside a relative wrapper that contains hero + stats.
 */
export default function HeroCurve() {
    return (
        <div className={styles.curve} aria-hidden="true">
            <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="heroCurveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(3, 5, 10, 0)" />
                        <stop offset="40%" stopColor="rgba(0, 200, 150, 0.03)" />
                        <stop offset="100%" stopColor="rgba(0, 200, 150, 0.08)" />
                    </linearGradient>
                </defs>
                {/* Organic blob: right side filled, smooth S-curve left edge */}
                <path
                    d="M 100 0 L 100 100 L 0 100 Q 35 85 0 70 Q 30 55 0 40 Q 32 22 0 5 L 0 0 Z"
                    fill="url(#heroCurveGrad)"
                />
            </svg>
        </div>
    )
}
