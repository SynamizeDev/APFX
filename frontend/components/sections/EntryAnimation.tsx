'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import styles from './EntryAnimation.module.css'

import Logo from '@/components/ui/Logo'
import { usePreferences } from '@/context/PreferencesContext'

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

    const { animationsEnabled } = usePreferences()

    const onMergeStartRef = useRef(onMergeStart)
    const onReadyToRevealRef = useRef(onReadyToReveal)
    const onCompleteRef = useRef(onComplete)

    useEffect(() => {
        onMergeStartRef.current = onMergeStart
        onReadyToRevealRef.current = onReadyToReveal
        onCompleteRef.current = onComplete
    }, [onMergeStart, onReadyToReveal, onComplete])

    useEffect(() => {
        const prefersReduced = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches

        if (prefersReduced || !animationsEnabled) {
            if (onReadyToReveal) onReadyToReveal()
            onComplete()
            return
        }

        // Hide the fixed header during branding entry animation.
        // Some pages/stacking contexts can still momentarily show it while the entry
        // overlays are animating, so we explicitly hide the header.
        const headerEl = document.querySelector('header[role="banner"]') as HTMLElement | null
        const prevHeaderStyles = headerEl
            ? {
                opacity: headerEl.style.opacity,
                visibility: headerEl.style.visibility,
                pointerEvents: headerEl.style.pointerEvents,
              }
            : null

        if (headerEl) {
            headerEl.style.opacity = '0'
            headerEl.style.visibility = 'hidden'
            headerEl.style.pointerEvents = 'none'
        }

        let finished = false
        const finish = () => {
            if (finished) return
            finished = true
            if (headerEl && prevHeaderStyles) {
                headerEl.style.opacity = prevHeaderStyles.opacity
                headerEl.style.visibility = prevHeaderStyles.visibility
                headerEl.style.pointerEvents = prevHeaderStyles.pointerEvents
            }
            if (onCompleteRef.current) onCompleteRef.current()
        }

        const tl = gsap.timeline()

        // Initial state: dark overlay visible from start, logo hidden
        gsap.set(glassRef.current, { opacity: 1 })
        gsap.set(logoContainerRef.current, { 
            opacity: 0, 
            scale: 1.5, // Start smaller to zoom in
            y: 0 
        })

        // Sequence: dark background first, then logo fades in for 3.0s
        const LOGO_FADE_DURATION = 1.5

        tl
            /* Dark overlay already at 1 — site stays dark for full 3s+ logo fade-in */
            .call(() => {
                if (onReadyToRevealRef.current) onReadyToRevealRef.current()
            }, undefined, 0)
            
            /* 2. Logo fades in over 3 seconds - branding hold */
            .to(logoContainerRef.current, { 
                opacity: 1, 
                scale: 3.0, // Settle size
                duration: LOGO_FADE_DURATION, 
                ease: 'power3.out' 
            }, 0.25)
            
            /* 4. Logo slide-merge to header (after 3s fade-in + brief hold) */
            .call(() => {
                const headerLogo = document.getElementById('header-logo');
                if (headerLogo && logoContainerRef.current) {
                    const hRect = headerLogo.getBoundingClientRect();
                    const lRect = logoContainerRef.current.getBoundingClientRect();
                    
                    if (lRect.width <= 0 || lRect.height <= 0) {
                        if (onMergeStartRef.current) onMergeStartRef.current();
                        finish();
                        return;
                    }

                    // Get current scale to find base size
                    const currentScale = gsap.getProperty(logoContainerRef.current, "scale") as number || 3.0;
                    const unscaledWidth = lRect.width / currentScale;

                    // Precise center-to-center coordinate calculation
                    const lCenter = {
                        x: lRect.left + lRect.width / 2,
                        y: lRect.top + lRect.height / 2
                    };
                    const hCenter = {
                        x: hRect.left + hRect.width / 2,
                        y: hRect.top + hRect.height / 2
                    };

                    const dx = hCenter.x - lCenter.x;
                    const dy = hCenter.y - lCenter.y;
                    const tScale = hRect.width / unscaledWidth;

                    // Use center origin for symmetrical shrinking
                    gsap.set(logoContainerRef.current, { transformOrigin: 'center center' });

                    gsap.to(logoContainerRef.current, { 
                        x: dx,
                        y: dy,
                        scale: tScale,
                        opacity: 1,
                        duration: 2.0, // Ultra-smooth, gradual shrink
                        ease: 'power2.inOut', 
                        force3D: true,
                        onUpdate: function() {
                            gsap.set(this.targets(), { filter: 'none' });
                        },
                        onComplete: () => {
                            if (onMergeStartRef.current) onMergeStartRef.current();
                            // Visual overlap hold for 1 frame to prevent flicker
                            gsap.delayedCall(0.02, () => {
                                gsap.set(logoContainerRef.current, { opacity: 0 });
                                finish();
                            });
                        }
                    });
                    
                    // Fade out glass transitionally to match logo flight
                    gsap.to(glassRef.current, { 
                        opacity: 0, 
                        duration: 1.2, 
                        ease: 'power3.inOut' 
                    });
                } else {
                    // Fallback if header logo not found
                    if (onMergeStartRef.current) onMergeStartRef.current();
                    finish();
                }
            }, undefined, LOGO_FADE_DURATION + 0.5)

        return () => {
            tl.kill()
            // Ensure header isn't left hidden if the animation is interrupted
            if (headerEl && prevHeaderStyles) {
                headerEl.style.opacity = prevHeaderStyles.opacity
                headerEl.style.visibility = prevHeaderStyles.visibility
                headerEl.style.pointerEvents = prevHeaderStyles.pointerEvents
            }
        }
    }, [animationsEnabled])

    return (
        <>
            {/* Dark overlay — keeps site dark for full logo fade-in (3s+) */}
            <div
                ref={glassRef}
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 9997, 
                    background: 'var(--color-bg)',
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
                <div
                    ref={logoContainerRef}
                    style={{
                        pointerEvents: 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        position: 'relative',
                        opacity: 0, // Prevent "double-logo" flash before GSAP init
                        transform: 'scale(1.5)', // Synchronize with GSAP starting state
                        willChange: 'transform, opacity'
                    }}
                >
                    <Logo size="sm" />
                </div>
            </div>
        </>
    )
}