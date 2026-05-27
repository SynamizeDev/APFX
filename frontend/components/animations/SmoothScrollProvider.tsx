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
   • Native scroll on touch / narrow viewports (no Lenis RAF)
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
        // ── Skip Lenis when native scroll is preferable ───────
        const prefersReduced = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches
        const prefersCoarsePointer = window.matchMedia('(pointer: coarse)').matches
        const isNarrowViewport = window.matchMedia('(max-width: 768px)').matches

        if (prefersReduced || prefersCoarsePointer || isNarrowViewport) {
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

        const addTicker = () => {
            gsap.ticker.add(tickerCallback)
            gsap.ticker.lagSmoothing(0)
        }

        const removeTicker = () => {
            gsap.ticker.remove(tickerCallback)
        }

        addTicker()

        const onVisibilityChange = () => {
            if (document.hidden) {
                removeTicker()
                return
            }

            addTicker()
            lenis.raf(performance.now())
            ScrollTrigger.refresh()
        }

        document.addEventListener('visibilitychange', onVisibilityChange)

        // Initial refresh ensures correct start positions
        ScrollTrigger.refresh()

        return () => {
            document.removeEventListener('visibilitychange', onVisibilityChange)
            removeTicker()
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