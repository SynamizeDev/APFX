'use client'

import { useEffect, useRef, useState, Fragment } from 'react'
import styles from './StatsBar.module.css'

interface Stat {
    prefix?: string
    value: number
    suffix: string
    label: string
    decimals?: number
}

const STATS: Stat[] = [
    { prefix: '$', value: 2, suffix: 'B+', label: 'Daily Trading Volume' },
    { value: 150, suffix: '+', label: 'Countries Served' },
    { value: 27, suffix: 'K+', label: 'Tradeable Instruments' },
    { value: 99.9, suffix: '%', label: 'Platform Uptime', decimals: 1 },
]

function Counter({ stat }: { stat: Stat }) {
    const ref = useRef<HTMLSpanElement>(null)
    const [fired, setFired] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el || fired) return
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return
            observer.disconnect()
            setFired(true)

            if (prefersReduced) {
                el.textContent = `${stat.prefix ?? ''}${stat.value.toFixed(stat.decimals ?? 0)}${stat.suffix}`
                return
            }

            const start = performance.now()
            const dur = 2200
            function tick(now: number) {
                const t = Math.min((now - start) / dur, 1)
                const e = t === 1 ? 1 : 1 - Math.pow(2, -10 * t) // expo-out
                el!.textContent = `${stat.prefix ?? ''}${(stat.value * e).toFixed(stat.decimals ?? 0)}${stat.suffix}`
                if (t < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
        }, { threshold: 0.4 })

        observer.observe(el)
        return () => observer.disconnect()
    }, [stat, fired])

    return <span ref={ref} className={styles.value}>{`${stat.prefix ?? ''}0${stat.suffix}`}</span>
}

export default function StatsBar() {
    return (
        <section className={styles.statsBar} aria-label="Platform statistics">
            <div className={styles.grid}>
                {STATS.map((stat, i) => (
                    <Fragment key={stat.label}>
                        <div className={styles.item}>
                            <Counter stat={stat} />
                            <span className={styles.label}>{stat.label}</span>
                        </div>
                        {i < STATS.length - 1 && (
                            <div key={`div-${i}`} className={styles.divider} aria-hidden="true" />
                        )}
                    </Fragment>
                ))}
            </div>
        </section>
    )
}
