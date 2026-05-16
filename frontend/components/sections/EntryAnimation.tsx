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
            document.documentElement.classList.remove('hide-header-initially')
            if (headerEl && prevHeaderStyles) {
                headerEl.style.opacity = prevHeaderStyles.opacity
                headerEl.style.visibility = prevHeaderStyles.visibility
                headerEl.style.pointerEvents = prevHeaderStyles.pointerEvents
            }
            if (onCompleteRef.current) onCompleteRef.current()
        }

        const tl = gsap.timeline({
            onComplete: () => {
                if (onMergeStartRef.current) onMergeStartRef.current();
                finish();
            }
        });

        // ── The Quantum Scan Sequence ───────────────────
        
        // 1. Initial State
        gsap.set(glassRef.current, { opacity: 1 });
        gsap.set(logoContainerRef.current, { opacity: 0, scale: 0.8 });
        
        tl
            // 1. Digital Reveal (Slower & More Deliberate Blink)
            .to(logoContainerRef.current, { 
                opacity: 1, 
                scale: 1, 
                duration: 0.5 
            }, 0.5)
            .to(logoContainerRef.current, { 
                opacity: 0.3, 
                duration: 0.25, // Slower blink
                repeat: 3, 
                yoyo: true, 
                ease: 'power1.inOut' 
            })
            // Explicitly settle at full opacity before the "explosion"
            .to(logoContainerRef.current, {
                opacity: 1,
                duration: 0.4,
                ease: 'power2.out'
            })
            
            // 2. Transition: Subtle Scale Up and Fade for LOGO ONLY
            .to(logoContainerRef.current, {
                scale: 1.5, 
                opacity: 0,
                duration: 1.5,
                ease: 'power2.inOut'
            })
            
            // 3. Smooth Transition to Header Reveal
            .to(glassRef.current, {
                opacity: 0,
                duration: 1.2,
                ease: 'power2.inOut',
                onStart: () => {
                    // Instantly hide dots when reveal starts
                    gsap.set(`.${styles.dotsContainer}`, { display: 'none' });
                }
            }, "-=1.0");

        // Sequential "Load" for the dots (No scale, no yoyo-blink)
        const dotsTl = gsap.timeline({ repeat: -1 });
        const dots = document.querySelectorAll(`.${styles.dot}`);
        
        dots.forEach((dot, i) => {
            dotsTl.to(dot, { opacity: 1, duration: 0.3 }, i * 0.3);
        });
        dotsTl.to(dots, { opacity: 0.2, duration: 0.3, delay: 0.3 }); // Overlap for a seamless "zoom out" feel // Overlap with the dissolve for smoothness

        return () => {
            tl.kill()
            document.documentElement.classList.remove('hide-header-initially')
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
                    className={styles.logoWrapper}
                    style={{
                        pointerEvents: 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        position: 'relative',
                        opacity: 0,
                        transform: 'scale(0.8)',
                        willChange: 'transform, opacity'
                    }}
                >
                    <Logo variant="icon" size="md" />
                </div>

                <div className={styles.dotsContainer}>
                    <div className={styles.dot} />
                    <div className={styles.dot} />
                    <div className={styles.dot} />
                </div>
            </div>
        </>
    )
}