'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import styles from './EntryAnimation.module.css'

export default function EntryAnimation({
    onComplete,
}: {
    onComplete: () => void
}) {
    const overlayRef = useRef<HTMLDivElement>(null)
    const logoRef = useRef<HTMLDivElement>(null)
    const tagRef = useRef<HTMLParagraphElement>(null)
    const lineRef = useRef<HTMLDivElement>(null)
    const markRef = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        const prefersReduced = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches

        // Respect reduced motion immediately
        if (prefersReduced) {
            onComplete()
            return
        }

        const tl = gsap.timeline({
            defaults: {
                ease: 'power3.out',
            },
            onComplete: () => {
                // Clean exit: fade overlay, then release app
                gsap.to(overlayRef.current, {
                    opacity: 0,
                    duration: 0.55,
                    ease: 'power2.inOut',
                    onComplete,
                })
            },
        })

        tl
            /* ── Signal: line draws attention ───────────── */
            .to(lineRef.current, {
                width: 120,
                duration: 0.7,
            })

            /* ── Reveal: logo rises in ──────────────────── */
            .to(
                logoRef.current,
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.85,
                    ease: 'power4.out',
                },
                '-=0.25'
            )

            /* ── Energy: mark glow intensifies ─────────── */
            .to(
                markRef.current,
                {
                    boxShadow: '0 0 70px rgba(0, 200, 150, 0.55)',
                    duration: 0.6,
                    ease: 'power2.out',
                },
                '-=0.45'
            )

            /* ── Confirmation: tagline appears ─────────── */
            .to(
                tagRef.current,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: 'power2.out',
                },
                '-=0.25'
            )

            /* ── Hold: allow brand to register ─────────── */
            .to({}, { duration: 1 })

            /* ── Resolve: tagline fades ────────────────── */
            .to(
                tagRef.current,
                {
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.in',
                },
                '-=0.05'
            )

            /* ── Exit signal: line retracts ────────────── */
            .to(
                lineRef.current,
                {
                    width: 0,
                    duration: 0.4,
                    ease: 'power2.in',
                },
                '-=0.15'
            )

        return () => {
            tl.kill()
        }
    }, [onComplete])

    return (
        <div
            ref={overlayRef}
            className={styles.overlay}
            role="status"
            aria-label="Loading APFX"
        >
            <div ref={lineRef} className={styles.line} />

            <div ref={logoRef} className={styles.logoWrap}>
                <span
                    ref={markRef}
                    className={styles.mark}
                    aria-hidden="true"
                >
                    AP
                </span>
                <span className={styles.wordmark}>APFX</span>
            </div>

            <p
                ref={tagRef}
                className={styles.tagline}
                aria-hidden="true"
            >
                Institutional Trading Infrastructure
            </p>
        </div>
    )
}