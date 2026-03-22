'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
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
                gsap.set(mockupRef.current, {
                    transformOrigin: '70% 70%',
                    transformPerspective: 900,
                })
                tl.fromTo(
                    mockupRef.current,
                    { opacity: 0, x: 220, y: 24, rotateZ: -14, rotateY: -18, scale: 0.88 },
                    { opacity: 1, x: 0, y: 0, rotateZ: 2, rotateY: 0, scale: 1, duration: 5.5, ease: 'power2.out' },
                    '-=0.35'
                )
                    .to(
                        mockupRef.current,
                        { rotateZ: 3, duration: 0.25, ease: 'power2.inOut' },
                        '-=0.15'
                    )
                    .to(
                        mockupRef.current,
                        { rotateZ: 0, duration: 1.2, ease: 'back.out(1.4)' },
                        '-=0.1'
                    )
                tl.to(
                    mockupRef.current,
                    {
                        y: -14,
                        rotateZ: -2,
                        scale: 1.03,
                        duration: 2.8,
                        ease: 'sine.inOut',
                        yoyo: true,
                        repeat: -1,
                    },
                    '+=0.15'
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
                    <div className={styles.zeroFeesDesktop}>
                        <ZeroFeesBlock embedded />
                    </div>
                </div>
                <div ref={mockupRef} className={styles.mockupWrap} aria-hidden="true">
                    <Image
                        src="/hero-mockup.svg"
                        alt="Trading Platform Mockup"
                        className={styles.heroMockup}
                        width={800}
                        height={600}
                        priority
                    />
                </div>
                <div className={styles.zeroFeesMobile}>
                    <ZeroFeesBlock embedded />
                </div>
            </div>

            <div className={styles.heroFade} />
        </section>
    )
}