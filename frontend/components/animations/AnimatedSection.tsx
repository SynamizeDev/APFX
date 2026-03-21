'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { usePreferences } from '@/context/PreferencesContext'

interface AnimatedSectionProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    id?: string;
    ariaLabelledby?: string;
}

export default function AnimatedSection({
    children,
    className = '',
    delay = 0,
    id,
    ariaLabelledby
}: AnimatedSectionProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px 0px" })
    const { animationsEnabled } = usePreferences()

    if (!animationsEnabled) {
        return (
            <div id={id} className={className} ref={ref}>
                {children}
            </div>
        )
    }

    return (
        <motion.div
            ref={ref}
            id={id}
            aria-labelledby={ariaLabelledby}
            className={className}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{
                duration: 0.8,
                delay: delay,
                ease: [0.16, 1, 0.3, 1], // Custom APFX ease-out
            }}
        >
            {children}
        </motion.div>
    )
}
