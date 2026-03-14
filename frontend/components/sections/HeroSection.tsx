'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import HeroCanvas from '@/components/canvas/HeroCanvas'
import InvestWithAPFX from '@/components/sections/InvestWithAPFX'
import ZeroFeesBlock from '@/components/sections/ZeroFeesBlock'
import styles from './HeroSection.module.css'

export default function HeroSection() {
    const rootRef = useRef<HTMLDivElement>(null)
    const mockupRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (prefersReduced) return

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: { ease: 'power3.out' },
            })

            tl.to(
                `.${styles.headline}`,
                { opacity: 1, y: 0, duration: 0.8 },
                '-=0.3'
            )

            if (mockupRef.current) {
                tl.fromTo(
                    mockupRef.current,
                    { opacity: 0, x: 48, scale: 0.92 },
                    { opacity: 1, x: 0, scale: 1, duration: 1, ease: 'power3.out' },
                    '-=0.4'
                )
            }
        }, rootRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={rootRef} className={styles.hero}>
            <div className={styles.canvas}>
                <HeroCanvas />
            </div>
            <div className={styles.orb1} />
            <div className={styles.orb2} />
            <div className={styles.vignette} />

            <div className={styles.content}>
                <div className={styles.contentLeft}>
                    <h1 className={styles.headline}>
                        Trade Global Markets
                        <span className={styles.accentLine}>With Absolute Precision</span>
                    </h1>
                    <InvestWithAPFX embedded />
                    <ZeroFeesBlock embedded />
                </div>
                <div ref={mockupRef} className={styles.mockupWrap} aria-hidden="true">
                    <img
                        src="/hero-mockup.svg"
                        alt=""
                        className={styles.heroMockup}
                    />
                </div>
            </div>

            <div className={styles.heroFade} />
        </section>
    )
}