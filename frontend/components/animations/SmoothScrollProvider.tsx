'use client'

import { createContext, useContext, useEffect, useRef, ReactNode } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface LenisContextType {
    lenis: Lenis | null
}

const LenisContext = createContext<LenisContextType>({ lenis: null })

export function useLenis() {
    return useContext(LenisContext)
}

interface SmoothScrollProviderProps {
    children: ReactNode
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
    const lenisRef = useRef<Lenis | null>(null)

    useEffect(() => {
        // ── Respect reduced motion ────────────────────────────────
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (prefersReduced) return

        // ── Initialize Lenis ──────────────────────────────────────
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Expo out
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        })
        lenisRef.current = lenis

        // ── Sync Lenis → GSAP ScrollTrigger ──────────────────────
        lenis.on('scroll', ScrollTrigger.update)

        const tickerCallback = (time: number) => lenis.raf(time * 1000)
        gsap.ticker.add(tickerCallback)
        gsap.ticker.lagSmoothing(0)

        return () => {
            gsap.ticker.remove(tickerCallback)
            lenis.destroy()
            lenisRef.current = null
        }
    }, [])

    return (
        <LenisContext.Provider value={{ lenis: lenisRef.current }}>
            {children}
        </LenisContext.Provider>
    )
}
