'use client'

import { useState, useCallback, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import EntryAnimation from '@/components/sections/EntryAnimation'

export default function GlobalEntry({ children }: { children: React.ReactNode }) {
  const [showAnimation, setShowAnimation] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const key = 'apfx.globalEntryAnimation.shown'

    const nav = performance.getEntriesByType?.('navigation')?.[0] as
      | PerformanceNavigationTiming
      | undefined
    const navType = nav?.type

    // Always show on hard reload.
    if (navType === 'reload') {
      setShowAnimation(true)
      setReady(false)
      return
    }

    // Only show once per tab session on normal navigation.
    let shouldShow = true
    try {
      shouldShow = sessionStorage.getItem(key) !== '1'
    } catch {
      shouldShow = true
    }

    setShowAnimation(shouldShow)
    setReady(!shouldShow)
  }, [])

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
