'use client'

import { useEffect, useRef, RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

/* ── Signature easing ──────────────────────────────────────── */
export const EASE_OUT = 'power4.out'
export const EASE_INOUT = 'power3.inOut'
export const EASE_EXPO = 'expo.out'

/* ── Stagger reveal from below ─────────────────────────────── */
export function useFadeUpReveal(
    ref: RefObject<HTMLElement | null>,
    options?: {
        y?: number
        duration?: number
        stagger?: number
        delay?: number
        start?: string
    }
) {
    useEffect(() => {
        if (!ref.current) return
        const el = ref.current
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (prefersReduced) return

        const ctx = gsap.context(() => {
            gsap.from(el, {
                y: options?.y ?? 50,
                opacity: 0,
                duration: options?.duration ?? 1,
                delay: options?.delay ?? 0,
                ease: EASE_OUT,
                scrollTrigger: {
                    trigger: el,
                    start: options?.start ?? 'top 85%',
                    once: true,
                },
            })
        }, el)

        return () => ctx.revert()
    }, [ref, options?.y, options?.duration, options?.stagger, options?.delay, options?.start])
}

/* ── Character stagger for headlines ───────────────────────── */
export function useTextReveal(
    ref: RefObject<HTMLElement | null>,
    options?: { delay?: number; stagger?: number }
) {
    useEffect(() => {
        if (!ref.current) return
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (prefersReduced) return

        const ctx = gsap.context(() => {
            const split = new SplitText(ref.current!, { type: 'chars,words' })

            gsap.from(split.chars, {
                y: 60,
                opacity: 0,
                rotateX: -30,
                stagger: options?.stagger ?? 0.035,
                duration: 0.8,
                delay: options?.delay ?? 0,
                ease: EASE_OUT,
                scrollTrigger: {
                    trigger: ref.current,
                    start: 'top 80%',
                    once: true,
                },
            })
        }, ref.current!)

        return () => ctx.revert()
    }, [ref, options?.delay, options?.stagger])
}

/* ── Animated counter ───────────────────────────────────────── */
export function useCountUp(
    ref: RefObject<HTMLElement | null>,
    target: number,
    options?: { duration?: number; prefix?: string; suffix?: string; decimals?: number }
) {
    useEffect(() => {
        if (!ref.current) return
        const el = ref.current
        const { duration = 2, prefix = '', suffix = '', decimals = 0 } = options || {}

        const obj = { value: 0 }
        const trigger = ScrollTrigger.create({
            trigger: el,
            start: 'top 85%',
            once: true,
            onEnter: () => {
                gsap.to(obj, {
                    value: target,
                    duration,
                    ease: EASE_OUT,
                    onUpdate: () => {
                        el.textContent = `${prefix}${obj.value.toFixed(decimals)}${suffix}`
                    },
                })
            },
        })

        return () => trigger.kill()
    }, [ref, target, options?.duration, options?.prefix, options?.suffix, options?.decimals])
}

/* ── Parallax element ───────────────────────────────────────── */
export function useParallax(
    ref: RefObject<HTMLElement | null>,
    speed: number = 0.3
) {
    useEffect(() => {
        if (!ref.current) return
        const el = ref.current
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (prefersReduced) return

        const ctx = gsap.context(() => {
            gsap.to(el, {
                yPercent: speed * -100,
                ease: 'none',
                scrollTrigger: {
                    trigger: el.parentElement,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            })
        }, el)

        return () => ctx.revert()
    }, [ref, speed])
}
