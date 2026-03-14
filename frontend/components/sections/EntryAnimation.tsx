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
    const flashRef = useRef<HTMLDivElement>(null)
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

        // Initial State - cleaner, no abrupt flash
        gsap.set(glassRef.current, { opacity: 0 })
        gsap.set(logoContainerRef.current, { opacity: 0, scale: 0.95, y: 10 })
        gsap.set(lineRef.current, { width: 0, opacity: 0 })
        gsap.set(pulseRef.current, { scale: 1, opacity: 0 })

        // Sequence - Institutional & Smooth
        tl
            /* 1. Dark Glass Overlay (0ms) */
            .to(glassRef.current, { opacity: 1, duration: 0.4, ease: 'power2.inOut' }, 0)
            
            /* Background ready (200ms) */
            .call(() => {
                if (onReadyToReveal) onReadyToReveal()
            }, undefined, 0.2)
            
            /* 2. Smooth Logo Entry (400ms) */
            .to(logoContainerRef.current, { 
                opacity: 1, 
                scale: 1, 
                y: 0, 
                duration: 0.8, 
                ease: 'expo.out' 
            }, 0.4)
            
            /* 3. Subtle Line Expansion (600ms) */
            .to(lineRef.current, { 
                width: '120px', 
                opacity: 0.5, 
                duration: 1.0, 
                ease: 'power3.inOut' 
            }, 0.6)
            
            /* 4. Logo Slide-Merge Transition (1800ms) */
            .call(() => {
                const headerLogo = document.getElementById('header-logo');
                if (headerLogo && logoContainerRef.current) {
                    const hRect = headerLogo.getBoundingClientRect();
                    const lRect = logoContainerRef.current.getBoundingClientRect();
                    
                    // Calculate deltas to move from current center to header position
                    const dx = hRect.left - lRect.left;
                    const dy = hRect.top - lRect.top;
                    const targetScale = hRect.width / lRect.width;
                    
                    // The "Creamy Merge" - slightly longer, better easing, motion blur
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
            }, undefined, 1.8)

        return () => {
            tl.kill()
        }
    }, [onComplete, onReadyToReveal, onMergeStart])

    return (
        <>
            {/* Initial Green Flash Overlay */}
            <div
                ref={flashRef}
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 9999,
                    background: 'rgba(16, 185, 129, 0.15)',
                    pointerEvents: 'none',
                    opacity: 0
                }}
            />

            {/* Dark Glass Overlay */}
            <div
                ref={glassRef}
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 9997, 
                    background: 'rgba(3, 5, 10, 0.75)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    pointerEvents: 'none',
                    opacity: 0
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
                    perspective: '1000px'
                }}
            >
                <div 
                    ref={logoContainerRef} 
                    style={{ 
                        pointerEvents: 'none', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center',
                        position: 'relative'
                    }}
                >
                    <div className={styles.pulse} ref={pulseRef} />
                    
                    <Logo size="lg" />

                    <div className={styles.linePulseContainer}>
                        <div className={styles.line} ref={lineRef} />
                    </div>
                </div>
            </div>
        </>
    )
}