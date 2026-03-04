import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Risk Disclosure — APFX',
    description:
        'Trading financial instruments carries significant risk. This disclosure outlines the risks involved and your responsibilities as a trader.',
}

export default function RiskLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
