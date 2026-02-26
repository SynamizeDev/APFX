'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import HeroCanvas from '@/components/canvas/HeroCanvas'
import styles from './HeroSection.module.css'

export default function HeroSection() {
    const rootRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (prefersReduced) return

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: {
                    ease: 'power3.out',
                },
            })

            tl
                .to(`.${styles.chip}`, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                })
                .to(
                    `.${styles.headline}`,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                    },
                    '-=0.3'
                )
                .to(
                    `.${styles.sub}`,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                    },
                    '-=0.4'
                )
                .to(
                    `.${styles.ctas}`,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                    },
                    '-=0.3'
                )
                .to(
                    `.${styles.trust}`,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                    },
                    '-=0.4'
                )
                .to(
                    `.${styles.scrollHint}`,
                    {
                        opacity: 1,
                        duration: 0.6,
                    },
                    '-=0.2'
                )
        }, rootRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={rootRef} className={styles.hero}>
            {/* Three.js background */}
            <div className={styles.canvas}>
                <HeroCanvas />
            </div>

            {/* Dark vignette */}
            <div className={styles.vignette} />

            {/* Content */}
            <div className={styles.content}>
                <div className={styles.chip}>
                    <span />
                    Institutional-Grade Trading
                </div>

                <h1 className={styles.headline}>
                    Trade Global Markets
                    <span className={styles.accentLine}>With Absolute Precision</span>
                </h1>

                <p className={styles.sub}>
                    Deep liquidity, ultra-low latency execution, and infrastructure
                    built to support professional trading at scale.
                </p>

                <div className={styles.ctas}>
                    <Link href="/register" className={styles.ctaPrimary}>
                        Start Trading
                    </Link>
                    <Link href="/platforms" className={styles.ctaSecondary}>
                        View Platforms
                    </Link>
                </div>

                <div className={styles.trust}>
                    <div className={styles.trustItem}>
                        <span className={styles.trustCheck}>✓</span>
                        Tier-1 Liquidity
                    </div>
                    <div className={styles.trustItem}>
                        <span className={styles.trustCheck}>✓</span>
                        12ms Avg Execution
                    </div>
                    <div className={styles.trustItem}>
                        <span className={styles.trustCheck}>✓</span>
                        24/5 Global Support
                    </div>
                </div>
            </div>

            {/* Scroll hint */}
            <div className={styles.scrollHint} aria-hidden="true">
                <span>Scroll</span>
                <div className={styles.scrollLine} />
            </div>

            {/* Bottom fade */}
            <div className={styles.heroFade} />
        </section>
    )
}