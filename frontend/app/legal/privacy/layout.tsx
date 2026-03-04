import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Privacy Policy — APFX',
    description:
        'Learn how APFX collects, uses, and protects your personal data in accordance with global privacy and regulatory standards.',
}

export default function PrivacyLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
