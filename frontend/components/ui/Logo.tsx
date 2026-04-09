'use client'

import React, { forwardRef } from 'react'
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
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40px', ...style }}
        >
            <img
                src="/assets/logo.png"
                alt="APFX Logo"
                style={{ height: '100%', width: 'auto', objectFit: 'contain', transform: 'scale(2.8)', transformOrigin: 'center center' }}
            />
        </div>
    )
})

Logo.displayName = 'Logo'

export default Logo
