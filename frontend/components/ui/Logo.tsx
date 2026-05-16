'use client'

import React, { forwardRef } from 'react'
import styles from './Logo.module.css'

interface LogoProps {
    size?: 'sm' | 'md' | 'lg'
    variant?: 'full' | 'icon'
    className?: string
    style?: React.CSSProperties
    id?: string
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(({
    size = 'sm',
    variant = 'full',
    className = '',
    style = {},
    id
}, ref) => {
    return (
        <div
            ref={ref}
            id={id}
            className={`${styles.logo} ${styles[size]} ${className}`}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '18px',
                height: '40px',
                ...style
            }}
        >
            <img
                id={id ? `${id}-icon` : undefined}
                src="/assets/apfx-icon.png"
                alt="APFX Icon"
                className={styles.logoIcon}
            />
            {variant === 'full' && (
                <img
                    src="/assets/apfx-text.png"
                    alt="APFX"
                    className={styles.logoText}
                />
            )}
        </div>
    )
})

Logo.displayName = 'Logo'

export default Logo
