'use client'

import {
    createContext,
    useContext,
    useEffect,
    useRef,
    useCallback,
    ReactNode,
} from 'react'
import { usePathname } from 'next/navigation'
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
    scrollToTop: () => void
}

const LenisContext = createContext<LenisContextType>({
    scrollToTop: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    },
})

export function useLenis() {
    return useContext(LenisContext)
}

export function useScrollToTop() {
    return useContext(LenisContext).scrollToTop
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
    const scrollToTopRef = useRef(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    })
    const pathname = usePathname()

    const scrollToTop = useCallback(() => {
        scrollToTopRef.current()
    }, [])

    useEffect(() => {
        // Wait two rAF ticks so the new page DOM has fully painted
        // before Lenis/ScrollTrigger read the page height.
        // Without this, Lenis scrolls to 0 against the *old* layout
        // causing the "lands at footer" bug on navigation.
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                const lenis = lenisRef.current
                if (lenis) {
                    lenis.scrollTo(0, { immediate: true })
                } else {
                    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
                }
                ScrollTrigger.refresh()
            })
        })
    }, [pathname])

    useEffect(() => {
        // ── Skip Lenis when native scroll is preferable ───────
        const prefersReduced = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches
        const prefersCoarsePointer = window.matchMedia('(pointer: coarse)').matches
        const isNarrowViewport = window.matchMedia('(max-width: 768px)').matches

        if (prefersReduced || prefersCoarsePointer || isNarrowViewport) {
            scrollToTopRef.current = () => {
                window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' })
            }
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
        scrollToTopRef.current = () => {
            lenis.scrollTo(0, { duration: prefersReduced ? 0 : 1.2 })
        }

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
            scrollToTopRef.current = () => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }
        }
    }, [])

    return (
        <LenisContext.Provider value={{ scrollToTop }}>
            {children}
        </LenisContext.Provider>
    )
}