import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Contact APFX — Global Support & Institutional Relations',
    description:
        'Get in touch with our global support team or institutional representatives. We are available 24/7 to assist with your trading requirements.',
}

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
