'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import styles from './EntryAnimation.module.css'

import Logo from '@/components/ui/Logo'

export default function EntryAnimation({
    onComplete,
    onReadyToReveal,
    onMergeStart,
}: {
    onComplete: () => void
    onReadyToReveal?: () => void
    onMergeStart?: () => void
}) {
    const glassRef = useRef<HTMLDivElement>(null)
    const logoContainerRef = useRef<HTMLDivElement>(null)
    const lineRef = useRef<HTMLDivElement>(null)
    const pulseRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const prefersReduced = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches

        if (prefersReduced) {
            if (onReadyToReveal) onReadyToReveal()
            onComplete()
            return
        }

        const tl = gsap.timeline()

        // Initial state: dark overlay visible from start, logo hidden
        gsap.set(glassRef.current, { opacity: 1 })
        gsap.set(logoContainerRef.current, { opacity: 0, scale: 0.98, y: 8 })
        gsap.set(lineRef.current, { width: 0, opacity: 0 })
        gsap.set(pulseRef.current, { scale: 1, opacity: 0 })

        // Sequence: dark background first, then logo fades in for at least 3s
        const LOGO_FADE_DURATION = 3

        tl
            /* Dark overlay already at 1 — site stays dark for full 3s+ logo fade-in */
            /* Background ready so header can mount (hidden behind overlay) */
            .call(() => {
                if (onReadyToReveal) onReadyToReveal()
            }, undefined, 0.15)
            
            /* 2. Logo fades in over 3 seconds - branding hold */
            .to(logoContainerRef.current, { 
                opacity: 1, 
                scale: 1, 
                y: 0, 
                duration: LOGO_FADE_DURATION, 
                ease: 'power2.inOut' 
            }, 0.25)
            
            /* 3. Subtle line after logo is visible */
            .to(lineRef.current, { 
                width: '120px', 
                opacity: 0.5, 
                duration: 0.8, 
                ease: 'power3.inOut' 
            }, LOGO_FADE_DURATION + 0.2)
            
            /* 4. Logo slide-merge to header (after 3s fade-in + brief hold) */
            .call(() => {
                const headerLogo = document.getElementById('header-logo');
                if (headerLogo && logoContainerRef.current) {
                    const hRect = headerLogo.getBoundingClientRect();
                    const lRect = logoContainerRef.current.getBoundingClientRect();
                    if (lRect.width <= 0 || lRect.height <= 0) {
                        if (onMergeStart) onMergeStart();
                        onComplete();
                        return;
                    }
                    const dx = hRect.left - lRect.left;
                    const dy = hRect.top - lRect.top;
                    const targetScale = hRect.width / lRect.width;
                    gsap.set(logoContainerRef.current, { transformOrigin: '0 0' });
                    gsap.to(logoContainerRef.current, { 
                        x: dx,
                        y: dy,
                        scale: targetScale,
                        opacity: 0.9, // Higher opacity during flight
                        duration: 1.1, // Slightly slower for grace
                        ease: 'power4.inOut', // Institutional, heavy-weight easing
                        force3D: true, // Hardware acceleration
                        onStart: () => {
                           // Subtle motion blur start
                           gsap.to(logoContainerRef.current, { filter: 'blur(2px)', duration: 0.3 });
                        },
                        onComplete: () => {
                            // Instant hand-off to Header logo
                            if (onMergeStart) onMergeStart();
                            gsap.to(logoContainerRef.current, { 
                                opacity: 0, 
                                filter: 'blur(0px)',
                                duration: 0.15 
                            });
                            onComplete(); // Finish the sequence
                        }
                    });

                    // Fade out secondary elements with corresponding grace
                    gsap.to([lineRef.current, pulseRef.current], { 
                        opacity: 0, 
                        duration: 0.6,
                        ease: 'power2.inOut'
                    });
                    
                    // Fade out glass transitionally to match logo flight
                    gsap.to(glassRef.current, { 
                        opacity: 0, 
                        duration: 1.2, 
                        ease: 'power3.inOut' 
                    });
                } else {
                    // Fallback if header logo not found
                    if (onMergeStart) onMergeStart();
                    onComplete();
                }
            }, undefined, LOGO_FADE_DURATION + 0.5)

        return () => {
            tl.kill()
        }
    }, [onComplete, onReadyToReveal, onMergeStart])

    return (
        <>
            {/* Dark overlay — keeps site dark for full logo fade-in (3s+) */}
            <div
                ref={glassRef}
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 9997, 
                    background: '#03050A',
                    pointerEvents: 'none',
                    opacity: 1
                }}
            />

            {/* Logo Container Layer */}
            <div
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 9998,
                    pointerEvents: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: '1.25rem',
                    perspective: '1000px'
                }}
            >
                <div className={styles.pulse} ref={pulseRef} />
                <div
                    ref={logoContainerRef}
                    style={{
                        pointerEvents: 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        position: 'relative',
                    }}
                >
                    <Logo size="lg" />
                </div>
                <div className={styles.linePulseContainer}>
                    <div className={styles.line} ref={lineRef} />
                </div>
            </div>
        </>
    )
}