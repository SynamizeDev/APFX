'use client'

import React, { forwardRef } from 'react'
import { Sparkles } from 'lucide-react'
import styles from './Logo.module.css'

interface LogoProps {
    size?: 'sm' | 'md' | 'lg'
    className?: string
    style?: React.CSSProperties
    id?: string
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(({ 
    size = 'sm', 
    className = '', 
    style = {},
    id 
}, ref) => {
    return (
        <div 
            ref={ref}
            id={id}
            className={`${styles.logo} ${styles[size]} ${className}`}
            style={style}
        >
            <span className={styles.logoMark} aria-hidden="true">
                <Sparkles className={styles.logoIcon} />
            </span>
            <span className={styles.logoWordmark}>
                <span className={styles.logoPrefix}>AP</span>
                <span className={styles.logoFx}>FX</span>
            </span>
        </div>
    )
})

Logo.displayName = 'Logo'

export default Logo
