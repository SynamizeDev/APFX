'use client'

import { useEffect, useRef, useState, type RefObject } from 'react'

type UseInViewportOptions = {
    rootMargin?: string
    threshold?: number
    targetRef?: RefObject<HTMLElement | null>
}

export function useInViewport(options: UseInViewportOptions = {}) {
    const { rootMargin = '100px 0px', threshold = 0, targetRef } = options
    const internalRef = useRef<HTMLElement | null>(null)
    const observedRef = (targetRef ?? internalRef) as RefObject<HTMLElement | null>
    const [isInViewport, setIsInViewport] = useState(false)

    useEffect(() => {
        const el = observedRef.current
        if (!el) return

        const observer = new IntersectionObserver(
            ([entry]) => setIsInViewport(entry.isIntersecting),
            { rootMargin, threshold },
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [observedRef, rootMargin, threshold])

    return { ref: observedRef, isInViewport }
}
