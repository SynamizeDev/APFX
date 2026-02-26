'use client'

import {
    createContext,
    useContext,
    useEffect,
    useRef,
    ReactNode,
} from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/* =========================================================
   SmoothScrollProvider — APFX
   Institutional-grade scroll orchestration layer
   ---------------------------------------------------------
   • Lenis for premium smooth scrolling
   • GSAP ScrollTrigger sync
   • Reduced-motion compliant
   • Zero layout or routing side-effects
   ========================================================= */

gsap.registerPlugin(ScrollTrigger)

/* ── Context Types ─────────────────────────────────────── */
interface LenisContextType {
    lenis: Lenis | null
}

const LenisContext = createContext<LenisContextType>({
    lenis: null,
})

export function useLenis() {
    return useContext(LenisContext)
}

/* ── Provider Props ────────────────────────────────────── */
interface SmoothScrollProviderProps {
    children: ReactNode
}

/* =========================================================
   Provider
   ========================================================= */
export function SmoothScrollProvider({
    children,
}: SmoothScrollProviderProps) {
    const lenisRef = useRef<Lenis | null>(null)

    useEffect(() => {
        // ── Accessibility: respect reduced motion ─────────────
        const prefersReduced = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches

        if (prefersReduced) {
            // Ensure ScrollTrigger still behaves correctly
            ScrollTrigger.refresh()
            return
        }

        // ── Initialize Lenis ─────────────────────────────────
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) =>
                Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Expo-out, institutional feel
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        })

        lenisRef.current = lenis

        // ── Sync Lenis → GSAP ScrollTrigger ──────────────────
        lenis.on('scroll', () => {
            ScrollTrigger.update()
        })

        const tickerCallback = (time: number) => {
            // GSAP ticker runs in seconds, Lenis expects ms
            lenis.raf(time * 1000)
        }

        gsap.ticker.add(tickerCallback)
        gsap.ticker.lagSmoothing(0)

        // Initial refresh ensures correct start positions
        ScrollTrigger.refresh()

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