import Link from 'next/link'

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
                padding: '2rem',
            }}
        >
            <span style={{ fontSize: '5rem', fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' }}>
                404
            </span>
            <h1 style={{ fontSize: 'var(--text-3xl)', marginTop: '1rem', fontFamily: 'var(--font-display)' }}>
                Page Not Found
            </h1>
            <p style={{ color: 'var(--color-text-2)', marginTop: '1rem', maxWidth: '400px' }}>
                The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <Link
                href="/"
                style={{
                    marginTop: '2rem',
                    padding: '0.75rem 2rem',
                    background: 'var(--color-accent)',
                    color: '#000',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: 600,
                    fontSize: 'var(--text-sm)',
                }}
            >
                Back to Home
            </Link>
        </main>
    )
}
