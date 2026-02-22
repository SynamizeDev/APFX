'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import styles from './EntryAnimation.module.css'

export default function EntryAnimation({ onComplete }: { onComplete: () => void }) {
    const overlayRef = useRef<HTMLDivElement>(null)
    const logoRef = useRef<HTMLDivElement>(null)
    const tagRef = useRef<HTMLParagraphElement>(null)
    const lineRef = useRef<HTMLDivElement>(null)
    const markRef = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        if (prefersReduced) {
            onComplete()
            return
        }

        const tl = gsap.timeline({
            onComplete: () => {
                // Fade out overlay then call onComplete
                gsap.to(overlayRef.current, {
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power2.inOut',
                    onComplete,
                })
            },
        })

        tl
            // Expand the line
            .to(lineRef.current, {
                width: 120,
                duration: 0.7,
                ease: 'power3.out',
            })
            // Fade + slide logo in
            .to(logoRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power4.out',
            }, '-=0.3')
            // Glow the mark
            .to(markRef.current, {
                boxShadow: '0 0 60px rgba(0, 200, 150, 0.6)',
                duration: 0.6,
                ease: 'power2.out',
            }, '-=0.4')
            // Fade tagline in
            .to(tagRef.current, {
                opacity: 1,
                duration: 0.5,
                ease: 'power2.out',
            }, '-=0.2')
            // Hold for 1 second
            .to({}, { duration: 1.1 })
            // Dim tagline
            .to(tagRef.current, { opacity: 0, duration: 0.3 }, '-=0.1')
            // Shrink line
            .to(lineRef.current, { width: 0, duration: 0.4, ease: 'power2.in' }, '-=0.2')

        return () => { tl.kill() }
    }, [onComplete])

    return (
        <div ref={overlayRef} className={styles.overlay} role="status" aria-label="Loading APFX">
            <div ref={lineRef} className={styles.line} />
            <div ref={logoRef} className={styles.logoWrap}>
                <span ref={markRef} className={styles.mark} aria-hidden="true">AP</span>
                <span className={styles.wordmark}>APFX</span>
            </div>
            <p ref={tagRef} className={styles.tagline} aria-hidden="true">
                Institutional Trading Platform
            </p>
        </div>
    )
}
