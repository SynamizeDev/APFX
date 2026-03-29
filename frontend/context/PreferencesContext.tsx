'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

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

export const PreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setThemeState] = useState<Theme>('dark')
    const [animationsEnabled, setAnimationsEnabledState] = useState(true)
    const [kpiMode, setKpiModeState] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    // Load from localStorage on mount
    useEffect(() => {
        const savedTheme = localStorage.getItem('apfx-theme') as Theme
        const savedAnimations = localStorage.getItem('apfx-animations')
        const savedKpi = localStorage.getItem('apfx-kpi')

        if (savedTheme) setThemeState(savedTheme)
        if (savedAnimations !== null) setAnimationsEnabledState(savedAnimations === 'true')
        if (savedKpi !== null) setKpiModeState(savedKpi === 'true')
        
        setIsMounted(true)
    }, [])

    // Sync with localStorage and document body classes
    useEffect(() => {
        if (!isMounted) return

        localStorage.setItem('apfx-theme', theme)
        localStorage.setItem('apfx-animations', String(animationsEnabled))
        localStorage.setItem('apfx-kpi', String(kpiMode))

        // Apply classes to root element
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
    }, [theme, animationsEnabled, kpiMode, isMounted])

    const setTheme = (t: Theme) => setThemeState(t)
    const setAnimationsEnabled = (e: boolean) => setAnimationsEnabledState(e)
    const setKpiMode = (k: boolean) => {
        setKpiModeState(k)
        if (k) {
            setAnimationsEnabledState(false)
        } else {
            setAnimationsEnabledState(true)
        }
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
