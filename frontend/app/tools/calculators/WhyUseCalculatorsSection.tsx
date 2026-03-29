'use client'

import {
    useState,
    useEffect,
    useRef,
    useLayoutEffect,
    useCallback,
} from 'react'
import styles from './CalculatorsLayout.module.css'

const WHY_ITEMS = [
    {
        icon: '🎯',
        title: 'Institutional Precision',
        body: 'In retail trading, a few pips seem small. In institutional trading, they represent millions in exposure. Precision is not optional.',
    },
    {
        icon: '🛡️',
        title: 'Risk Control',
        body: 'Calculators strip away emotion, providing cold, hard data to ensure you never over-leverage or exceed your risk parameters.',
    },
    {
        icon: '⚖️',
        title: 'Professional Discipline',
        body: 'Every successful trader calculates their exit and risk before they ever execute an entry. This is the cornerstone of discipline.',
    },
] as const

/** Must match `gap` on `.whyCarouselScroll` in CalculatorsLayout.module.css */
const WHY_CAROUSEL_GAP_PX = 12
const WHY_SLIDE_MS = 5500
const PHONE_MAX_PX = 768

type WhyLayout = 'desktop' | 'phoneStack' | 'phoneCarousel'

function readWhyLayout(): WhyLayout {
    if (typeof window === 'undefined') return 'desktop'
    const phone = window.matchMedia(`(max-width: ${PHONE_MAX_PX}px)`).matches
    if (!phone) return 'desktop'
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'phoneStack'
    return 'phoneCarousel'
}

function useWhyLayout(): WhyLayout {
    const [layout, setLayout] = useState<WhyLayout>('desktop')

    useLayoutEffect(() => {
        const sync = () => setLayout(readWhyLayout())
        sync()
        const mqPhone = window.matchMedia(`(max-width: ${PHONE_MAX_PX}px)`)
        const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)')
        mqPhone.addEventListener('change', sync)
        mqReduce.addEventListener('change', sync)
        return () => {
            mqPhone.removeEventListener('change', sync)
            mqReduce.removeEventListener('change', sync)
        }
    }, [])

    return layout
}

function WhyItemsGrid({ variant }: { variant: 'desktop' | 'stack' }) {
    const prefix = variant === 'desktop' ? 'desktop' : 'stack'
    return (
        <div className={variant === 'desktop' ? styles.whyGrid : `${styles.whyGrid} ${styles.whyGridSingleCol}`}>
            {WHY_ITEMS.map((item) => (
                <div key={`${prefix}-${item.title}`} className={styles.whyItem}>
                    <span className={styles.whyIcon}>{item.icon}</span>
                    <div>
                        <strong>{item.title}</strong>
                        <p>{item.body}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

function WhyCarousel() {
    const [carouselIndex, setCarouselIndex] = useState(0)
    const scrollRef = useRef<HTMLDivElement>(null)
    const indexRef = useRef(0)
    const scrollSyncTimerRef = useRef<number | undefined>(undefined)

    indexRef.current = carouselIndex

    const scrollStep = useCallback((el: HTMLDivElement) => el.clientWidth + WHY_CAROUSEL_GAP_PX, [])

    const syncIndexFromScroll = useCallback(() => {
        const el = scrollRef.current
        if (!el) return
        const step = scrollStep(el)
        if (step <= WHY_CAROUSEL_GAP_PX) return
        const i = Math.min(
            WHY_ITEMS.length - 1,
            Math.max(0, Math.round(el.scrollLeft / step)),
        )
        setCarouselIndex((prev) => (prev === i ? prev : i))
    }, [scrollStep])

    useLayoutEffect(() => {
        const el = scrollRef.current
        if (!el) return
        const step = scrollStep(el)
        if (step <= WHY_CAROUSEL_GAP_PX) return
        const target = carouselIndex * step
        if (Math.abs(el.scrollLeft - target) < 8) return
        el.scrollTo({ left: target, behavior: 'smooth' })
    }, [carouselIndex, scrollStep])

    useEffect(() => {
        const el = scrollRef.current
        if (!el) return

        const onScroll = () => {
            if (scrollSyncTimerRef.current !== undefined) {
                window.clearTimeout(scrollSyncTimerRef.current)
            }
            scrollSyncTimerRef.current = window.setTimeout(() => {
                scrollSyncTimerRef.current = undefined
                syncIndexFromScroll()
            }, 60)
        }

        const onScrollEnd = () => {
            if (scrollSyncTimerRef.current !== undefined) {
                window.clearTimeout(scrollSyncTimerRef.current)
                scrollSyncTimerRef.current = undefined
            }
            syncIndexFromScroll()
        }

        el.addEventListener('scroll', onScroll, { passive: true })
        el.addEventListener('scrollend', onScrollEnd)
        return () => {
            el.removeEventListener('scroll', onScroll)
            el.removeEventListener('scrollend', onScrollEnd)
            if (scrollSyncTimerRef.current !== undefined) {
                window.clearTimeout(scrollSyncTimerRef.current)
            }
        }
    }, [syncIndexFromScroll])

    useEffect(() => {
        const el = scrollRef.current
        if (!el) return

        const applySize = () => {
            const w = el.clientWidth
            if (!w) return
            el.style.setProperty('--slide-width', `${w}px`)
            el.style.setProperty('--why-carousel-gap', `${WHY_CAROUSEL_GAP_PX}px`)
            const step = w + WHY_CAROUSEL_GAP_PX
            el.scrollTo({ left: indexRef.current * step, behavior: 'auto' })
        }

        const ro = new ResizeObserver(applySize)
        ro.observe(el)
        applySize()
        return () => ro.disconnect()
    }, [])

    useEffect(() => {
        const mqPhone = window.matchMedia(`(max-width: ${PHONE_MAX_PX}px)`)
        const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)')
        const shouldAuto = () => mqPhone.matches && !mqReduce.matches

        let id: number | undefined

        const arm = () => {
            if (id !== undefined) {
                window.clearInterval(id)
                id = undefined
            }
            if (!shouldAuto()) return
            id = window.setInterval(() => {
                setCarouselIndex((i) => (i + 1) % WHY_ITEMS.length)
            }, WHY_SLIDE_MS)
        }

        arm()
        mqPhone.addEventListener('change', arm)
        mqReduce.addEventListener('change', arm)
        return () => {
            if (id !== undefined) window.clearInterval(id)
            mqPhone.removeEventListener('change', arm)
            mqReduce.removeEventListener('change', arm)
        }
    }, [])

    return (
        <div
            className={styles.whyCarouselWrap}
            role="region"
            aria-roledescription="carousel"
            aria-label="Why use trading calculators"
            aria-live="polite"
        >
            <div className={styles.whyCarouselViewport}>
                <div
                    ref={scrollRef}
                    className={styles.whyCarouselScroll}
                    tabIndex={0}
                    aria-label="Swipe or scroll horizontally for each point"
                    onKeyDown={(e) => {
                        if (e.key === 'ArrowLeft') {
                            e.preventDefault()
                            setCarouselIndex((i) => Math.max(0, i - 1))
                        } else if (e.key === 'ArrowRight') {
                            e.preventDefault()
                            setCarouselIndex((i) => Math.min(WHY_ITEMS.length - 1, i + 1))
                        }
                    }}
                >
                    {WHY_ITEMS.map((item, i) => (
                        <div
                            key={item.title}
                            className={styles.whyCarouselSlide}
                            role="group"
                            aria-roledescription="slide"
                            aria-label={`${i + 1} of ${WHY_ITEMS.length}: ${item.title}`}
                            aria-hidden={i !== carouselIndex}
                        >
                            <div className={styles.whyCarouselCard}>
                                <div className={styles.whyItem}>
                                    <span className={styles.whyIcon}>{item.icon}</span>
                                    <div>
                                        <strong>{item.title}</strong>
                                        <p>{item.body}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.whyCarouselDots} role="tablist" aria-label="Slides">
                {WHY_ITEMS.map((_, i) => (
                    <button
                        key={i}
                        type="button"
                        role="tab"
                        aria-selected={i === carouselIndex}
                        aria-label={`Slide ${i + 1} of ${WHY_ITEMS.length}`}
                        className={
                            i === carouselIndex ? styles.whyCarouselDotActive : styles.whyCarouselDot
                        }
                        onClick={() => setCarouselIndex(i)}
                    />
                ))}
            </div>
        </div>
    )
}

export default function WhyUseCalculatorsSection() {
    const layout = useWhyLayout()

    return (
        <div className={styles.whyUseCalculators}>
            <h2 className={styles.whyTitle}>Why Use Trading Calculators?</h2>

            {layout === 'desktop' && <WhyItemsGrid variant="desktop" />}
            {layout === 'phoneStack' && <WhyItemsGrid variant="stack" />}
            {layout === 'phoneCarousel' && <WhyCarousel />}
        </div>
    )
}
