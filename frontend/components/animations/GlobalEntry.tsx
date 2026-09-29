'use client'

import { useState, useCallback, useEffect, useSyncExternalStore } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence } from 'framer-motion'
import EntryAnimation from '@/components/sections/EntryAnimation'

const noopSubscribe = () => () => {}

function getInitialShouldShowAnimation(): boolean {
  try {
    if (typeof window === 'undefined') return false
    const isHome = window.location.pathname === '/' || window.location.pathname === ''
    if (!isHome) return false

    const nav = performance.getEntriesByType?.('navigation')?.[0] as
      | PerformanceNavigationTiming
      | undefined
    const isReload =
      nav?.type === 'reload' ||
      (performance as unknown as { navigation?: { type: number } })?.navigation?.type === 1

    if (isReload) return true
    return sessionStorage.getItem('apfx.globalEntryAnimation.shown') !== '1'
  } catch {
    return false
  }
}

export default function GlobalEntry({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHome = pathname === '/'

  const initialShouldShow = useSyncExternalStore(
    noopSubscribe,
    getInitialShouldShowAnimation,
    () => false
  )

  const [completed, setCompleted] = useState(false)
  const showAnimation = isHome && initialShouldShow && !completed

  const handleAnimationComplete = useCallback(() => {
    setCompleted(true)
    document.documentElement.classList.remove('hide-header-initially')
    document.documentElement.classList.remove('entry-animating-initially')

    try {
      sessionStorage.setItem('apfx.globalEntryAnimation.shown', '1')
    } catch {
      // ignore
    }
  }, [])

  useEffect(() => {
    if (showAnimation) {
      // Ensure the page starts at the top during the entry animation.
      // The inline anti-FOUC script handles this pre-hydration, but Lenis
      // or late browser scroll restoration can still fight back.
      window.scrollTo(0, 0)
    }
    if (!showAnimation) {
      document.documentElement.classList.remove('hide-header-initially')
      document.documentElement.classList.remove('entry-animating-initially')
    }
  }, [showAnimation])

  return (
    <>
      <AnimatePresence>
        {showAnimation && (
          <EntryAnimation
            onComplete={handleAnimationComplete}
          />
        )}
      </AnimatePresence>

      {children}
    </>
  )
}
