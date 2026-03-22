'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { usePreferences } from '@/context/PreferencesContext'

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const { animationsEnabled } = usePreferences()

    if (!animationsEnabled) {
        return <div style={{ position: 'relative', width: '100%' }}>{children}</div>
    }

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ position: 'relative', width: '100%' }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}
