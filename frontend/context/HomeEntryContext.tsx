'use client'

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from 'react'
import { usePathname } from 'next/navigation'

type HomeEntryContextValue = {
  /** True when user reached `/` via client-side navigation from another route (skip entry animation). */
  skipHomeEntryAnimation: boolean
}

const HomeEntryContext = createContext<HomeEntryContextValue | null>(null)

/**
 * Tracks pathname transitions while the app shell stays mounted so the home page can
 * show the full entry animation only on first paint / reload, not when navigating from other routes.
 */
export function HomeEntryProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const prevPathRef = useRef<string | null>(null)

  const prev = prevPathRef.current
  const skipHomeEntryAnimation =
    pathname === '/' &&
    prev !== null &&
    prev !== '/'

  // Important: update "previous path" AFTER render.
  // In React 18 StrictMode (dev), render can run twice; mutating refs during render
  // can make `prev` appear as the current route and break the "skip on navigation" rule.
  useEffect(() => {
    prevPathRef.current = pathname
  }, [pathname])

  return (
    <HomeEntryContext.Provider value={{ skipHomeEntryAnimation }}>
      {children}
    </HomeEntryContext.Provider>
  )
}

export function useHomeEntryNavigation(): HomeEntryContextValue {
  const ctx = useContext(HomeEntryContext)
  if (!ctx) {
    throw new Error(
      'useHomeEntryNavigation must be used within HomeEntryProvider'
    )
  }
  return ctx
}
