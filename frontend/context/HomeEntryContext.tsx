'use client'

import {
  createContext,
  useContext,
  useState,
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
 *
 * Uses the React-documented "adjusting state during render" pattern to track the
 * previous pathname without reading refs during render or calling setState inside effects.
 * See: https://react.dev/reference/react/useState#storing-information-from-previous-renders
 */
export function HomeEntryProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  // ── "Adjusting state during render" pattern ────────────────────────
  // React explicitly supports calling setState during render *only* to adjust
  // state based on a changed prop/hook value, as long as the call is conditional
  // (runs at most once per render, won't loop).  This avoids both:
  //   • reading refs during render  (react-hooks/refs)
  //   • calling setState inside effects  (react-hooks/set-state-in-effect)
  const [prevPath, setPrevPath] = useState<string | null>(null)
  const [skipHomeEntryAnimation, setSkip] = useState(false)

  if (pathname !== prevPath) {
    // Pathname changed — derive the new skip value from the outgoing prevPath.
    const shouldSkip =
      pathname === '/' &&
      prevPath !== null &&
      prevPath !== '/'
    setSkip(shouldSkip)
    setPrevPath(pathname)
  }

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
