'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { usePreferences } from '@/context/PreferencesContext'

const wrapperStyle = { position: 'relative' as const, width: '100%' }

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const { animationsEnabled } = usePreferences()
    const prefersReducedMotion = useReducedMotion()

    // Inner routes: no exit/wait transition — snappier navigation, less remount work
    const usePageFade = animationsEnabled && !prefersReducedMotion && pathname === '/'

    if (!usePageFade) {
        return <div style={wrapperStyle}>{children}</div>
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={wrapperStyle}
        >
            {children}
        </motion.div>
    )
}
