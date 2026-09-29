'use client'

import React, {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
    useSyncExternalStore,
} from 'react'

type Theme = 'dark' | 'light'

interface PreferencesContextType {
    theme: Theme
    setTheme: (theme: Theme) => void
    animationsEnabled: boolean
    setAnimationsEnabled: (enabled: boolean) => void
    kpiMode: boolean
    setKpiMode: (enabled: boolean) => void
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined)

const noopSubscribe = (callback: () => void) => {
    if (typeof window === 'undefined') return () => {}
    window.addEventListener('storage', callback)
    return () => window.removeEventListener('storage', callback)
}

function getStoredTheme(): Theme {
    try {
        const val = localStorage.getItem('apfx-theme')
        return val === 'dark' || val === 'light' ? val : 'light'
    } catch {
        return 'light'
    }
}

function getStoredAnimations(): boolean {
    try {
        const val = localStorage.getItem('apfx-animations')
        return val !== null ? val === 'true' : true
    } catch {
        return true
    }
}

function getStoredKpi(): boolean {
    try {
        const val = localStorage.getItem('apfx-kpi')
        return val !== null ? val === 'true' : false
    } catch {
        return false
    }
}

export const PreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const storedTheme = useSyncExternalStore<Theme>(noopSubscribe, getStoredTheme, () => 'light')
    const storedAnimations = useSyncExternalStore<boolean>(noopSubscribe, getStoredAnimations, () => true)
    const storedKpi = useSyncExternalStore<boolean>(noopSubscribe, getStoredKpi, () => false)

    const [themeOverride, setThemeOverride] = useState<Theme | null>(null)
    const [animationsOverride, setAnimationsOverride] = useState<boolean | null>(null)
    const [kpiOverride, setKpiOverride] = useState<boolean | null>(null)

    const theme = themeOverride ?? storedTheme
    const animationsEnabled = animationsOverride ?? storedAnimations
    const kpiMode = kpiOverride ?? storedKpi

    const isFirstRender = useRef(true)

    // Synchronize updates to documentElement classes & localStorage
    useEffect(() => {
        const root = document.documentElement

        if (theme === 'light') {
            root.classList.add('light-mode')
        } else {
            root.classList.remove('light-mode')
        }

        if (kpiMode) {
            root.classList.add('kpi-mode')
        } else {
            root.classList.remove('kpi-mode')
        }

        if (!animationsEnabled) {
            root.classList.add('no-animations')
        } else {
            root.classList.remove('no-animations')
        }

        if (!isFirstRender.current) {
            try {
                localStorage.setItem('apfx-theme', theme)
                localStorage.setItem('apfx-animations', String(animationsEnabled))
                localStorage.setItem('apfx-kpi', String(kpiMode))
            } catch {
                // Storage unavailable / quota exceeded
            }
        }
        isFirstRender.current = false
    }, [theme, animationsEnabled, kpiMode])

    const setTheme = (t: Theme) => {
        setThemeOverride(t)
        try {
            localStorage.setItem('apfx-theme', t)
        } catch {}
    }

    const setAnimationsEnabled = (e: boolean) => {
        setAnimationsOverride(e)
        try {
            localStorage.setItem('apfx-animations', String(e))
        } catch {}
    }

    const setKpiMode = (k: boolean) => {
        setKpiOverride(k)
        setAnimationsOverride(!k)
        try {
            localStorage.setItem('apfx-kpi', String(k))
            localStorage.setItem('apfx-animations', String(!k))
        } catch {}
    }

    return (
        <PreferencesContext.Provider
            value={{
                theme,
                setTheme,
                animationsEnabled,
                setAnimationsEnabled,
                kpiMode,
                setKpiMode,
            }}
        >
            {children}
        </PreferencesContext.Provider>
    )
}

export const usePreferences = () => {
    const context = useContext(PreferencesContext)
    if (context === undefined) {
        throw new Error('usePreferences must be used within a PreferencesProvider')
    }
    return context
}
