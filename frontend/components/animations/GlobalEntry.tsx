'use client'

import { useState, useCallback, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { AnimatePresence } from 'framer-motion'

const EntryAnimation = dynamic(
  () => import('@/components/sections/EntryAnimation'),
  { ssr: false }
)

export default function GlobalEntry({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHome = pathname === '/'

  const [showAnimation, setShowAnimation] = useState(false)
  const [ready, setReady] = useState(!isHome)

  useEffect(() => {
    if (!isHome) {
      setShowAnimation(false)
      setReady(true)
      return
    }

    const key = 'apfx.globalEntryAnimation.shown'

    const nav = performance.getEntriesByType?.('navigation')?.[0] as
      | PerformanceNavigationTiming
      | undefined
    const navType = nav?.type

    // Branding entry only on homepage hard reload.
    if (navType === 'reload') {
      setShowAnimation(true)
      setReady(false)
      return
    }

    // Once per tab session on normal homepage navigation.
    let shouldShow = true
    try {
      shouldShow = sessionStorage.getItem(key) !== '1'
    } catch {
      shouldShow = true
    }

    setShowAnimation(shouldShow)
    setReady(!shouldShow)
  }, [isHome])

  const handleReadyToReveal = useCallback(() => {
    setReady(true)
  }, [])

  const handleAnimationComplete = useCallback(() => {
    setShowAnimation(false)
    setReady(true)

    try {
      sessionStorage.setItem('apfx.globalEntryAnimation.shown', '1')
    } catch {
      // ignore
    }
  }, [])

  return (
    <>
      {!ready && !showAnimation && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9996,
            background: '#03050A',
          }}
        />
      )}

      <AnimatePresence>
        {showAnimation && (
          <EntryAnimation
            onComplete={handleAnimationComplete}
            onReadyToReveal={handleReadyToReveal}
          />
        )}
      </AnimatePresence>

      {ready && children}
    </>
  )
}
