'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import styles from './EntryAnimation.module.css'

export default function EntryAnimation({
    onComplete,
    onReadyToReveal,
}: {
    onComplete: () => void
    onReadyToReveal?: () => void
}) {
    const flashRef = useRef<HTMLDivElement>(null)
    const glassRef = useRef<HTMLDivElement>(null)
    const logoContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const prefersReduced = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches

        if (prefersReduced) {
            if (onReadyToReveal) onReadyToReveal()
            onComplete()
            return
        }

        const tl = gsap.timeline({
            onComplete: () => {
                onComplete()
            },
        })

        // Ensure GSAP initializes properly
        gsap.set(flashRef.current, { opacity: 0 })
        gsap.set(glassRef.current, { opacity: 0 })
        gsap.set(logoContainerRef.current, { opacity: 0, scale: 0.95 })

        // Target:
        // 0ms -> green flash
        // 250ms -> dark glass overlay
        // 500ms -> APFX logo fades in
        // 1100ms -> logo fades out
        // 1700ms -> overlay fades out

        tl
            /* 1. Green Flash */
            .to(flashRef.current, { opacity: 1, duration: 0.1, ease: 'power1.out' }, 0)
            .to(flashRef.current, { opacity: 0, duration: 0.15, ease: 'power1.in' }, 0.1)
            
            /* 2. Glass Overlay Appears (250ms mark) */
            .to(glassRef.current, { opacity: 1, duration: 0.2, ease: 'power2.out' }, 0.25)
            
            /* Trigger background render behind the glass */
            .call(() => {
                if (onReadyToReveal) onReadyToReveal()
            }, undefined, 0.4)
            
            /* 3. Reveal APFX Logo (500ms mark, 600ms duration) */
            .to(logoContainerRef.current, { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }, 0.5)
            
            /* 4. Logo Exit (1100ms mark) */
            .to(logoContainerRef.current, { opacity: 0, scale: 0.95, duration: 0.5, ease: 'power2.inOut' }, 1.1)
            
            /* 5. Overlay Exit (1700ms mark, 600-800ms duration) */
            .to(glassRef.current, { opacity: 0, duration: 0.7, ease: 'power2.inOut' }, 1.7)

        return () => {
            tl.kill()
        }
    }, [onComplete, onReadyToReveal])

    return (
        <>
            {/* Initial Green Flash Overlay (z-60) */}
            <div
                ref={flashRef}
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 60,
                    background: 'rgba(16, 185, 129, 0.15)',
                    pointerEvents: 'none',
                    opacity: 0 // Crucial: prevents early pop during SSR
                }}
            />

            {/* Dark Glass Overlay (z-40) */}
            <div
                ref={glassRef}
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 40,
                    background: 'rgba(3, 5, 10, 0.8)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    pointerEvents: 'none',
                    opacity: 0 // Crucial
                }}
            />

            {/* Logo Container Layer (z-50) */}
            <div
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 50,
                    pointerEvents: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div 
                    ref={logoContainerRef} 
                    style={{ 
                        pointerEvents: 'none', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center',
                        opacity: 0, // Crucial
                        transform: 'scale(0.95)' // Match GSAP start state
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span className={styles.mark} aria-hidden="true">AP</span>
                        <span className={styles.wordmark}>APFX</span>
                    </div>
                </div>
            </div>
        </>
    )
}