'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './HeroSection.module.css'

gsap.registerPlugin(ScrollTrigger)

// Lazy-load Three.js canvas — no SSR
const HeroCanvas = dynamic(() => import('@/components/canvas/HeroCanvas'), {
    ssr: false,
    loading: () => null,
})

export default function HeroSection() {
    const chipRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const subRef = useRef<HTMLParagraphElement>(null)
    const ctasRef = useRef<HTMLDivElement>(null)
    const trustRef = useRef<HTMLDivElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (prefersReduced) {
            ;[chipRef, titleRef, subRef, ctasRef, trustRef, scrollRef].forEach(
                (r) => { if (r.current) r.current.style.opacity = '1' }
            )
            return
        }

        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

        tl.to(chipRef.current, { opacity: 1, y: 0, duration: 0.7 }, 0.2)
            .to(titleRef.current, { opacity: 1, y: 0, duration: 0.9 }, 0.4)
            .to(subRef.current, { opacity: 1, y: 0, duration: 0.7 }, 0.65)
            .to(ctasRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.8)
            .to(trustRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.95)
            .to(scrollRef.current, { opacity: 1, duration: 0.5 }, 1.3)

        return () => { tl.kill() }
    }, [])

    return (
        <section className={styles.hero} aria-label="Hero">
            {/* Three.js particle canvas */}
            <div className={styles.canvas} aria-hidden="true">
                <HeroCanvas />
            </div>

            {/* Vignette overlay */}
            <div className={styles.vignette} aria-hidden="true" />
            <div className={styles.heroFade} aria-hidden="true" />

            <div className={styles.content}>
                {/* Chip label */}
                <div ref={chipRef} className={styles.chip}>
                    <span aria-hidden="true" />
                    Live Markets · Institutional Access
                </div>

                {/* Headline */}
                <h1 ref={titleRef} className={styles.headline}>
                    Trade Global Markets<br />
                    <span className={styles.accentLine}>with Confidence</span>
                </h1>

                {/* Sub-headline */}
                <p ref={subRef} className={styles.sub}>
                    Deep liquidity. Tight spreads. Sub-millisecond execution.
                    Built for traders who demand more from their broker.
                </p>

                {/* CTAs */}
                <div ref={ctasRef} className={styles.ctas}>
                    <Link href="/open-account" className={styles.ctaPrimary}>
                        Open Account — Free
                        <span aria-hidden="true">→</span>
                    </Link>
                    <Link href="/platforms" className={styles.ctaSecondary}>
                        View Platforms
                        <span aria-hidden="true">↗</span>
                    </Link>
                </div>

                {/* Trust pills */}
                <div ref={trustRef} className={styles.trust}>
                    {[
                        'Regulated & Licensed',
                        'No commission on Forex',
                        'Leverage up to 1:500',
                        '24/5 Expert Support',
                    ].map((t) => (
                        <div key={t} className={styles.trustItem}>
                            <span className={styles.trustCheck} aria-hidden="true">✓</span>
                            {t}
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll indicator */}
            <div ref={scrollRef} className={styles.scrollHint} aria-hidden="true">
                <div className={styles.scrollLine} />
                <span>Scroll</span>
            </div>
        </section>
    )
}
