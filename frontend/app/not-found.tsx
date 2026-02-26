'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function NotFound() {
    return (
        <main
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--color-bg)',
                color: 'var(--color-text-1)',
                fontFamily: 'var(--font-body)',
                textAlign: 'center',
                padding: '2.5rem',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Ambient accent glow */}
            <div
                style={{
                    position: 'absolute',
                    inset: '-40%',
                    background:
                        'radial-gradient(circle, rgba(0,200,150,0.12), transparent 60%)',
                    filter: 'blur(120px)',
                    opacity: 0.35,
                    pointerEvents: 'none',
                }}
            />

            <motion.span
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                style={{
                    fontSize: '5.5rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-accent)',
                    letterSpacing: '-0.04em',
                }}
            >
                404
            </motion.span>

            <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
                style={{
                    fontSize: 'var(--text-3xl)',
                    marginTop: '1rem',
                    fontFamily: 'var(--font-display)',
                    letterSpacing: '-0.02em',
                }}
            >
                Page Not Found
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                style={{
                    color: 'var(--color-text-2)',
                    marginTop: '1.25rem',
                    maxWidth: '420px',
                    lineHeight: 1.6,
                }}
            >
                The page you’re looking for doesn’t exist, has been moved,
                or is temporarily unavailable.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
            >
                <Link
                    href="/"
                    style={{
                        marginTop: '2.5rem',
                        display: 'inline-block',
                        padding: '0.9rem 2.75rem',
                        background: 'var(--color-accent)',
                        color: '#000',
                        borderRadius: 'var(--radius-full)',
                        fontWeight: 700,
                        fontSize: 'var(--text-sm)',
                        boxShadow:
                            '0 12px 32px rgba(0,200,150,0.45)',
                        transition:
                            'transform 0.2s ease, box-shadow 0.2s ease',
                    }}
                >
                    Back to Home
                </Link>
            </motion.div>
        </main>
    )
}