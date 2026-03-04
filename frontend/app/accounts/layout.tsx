import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Account Types — APFX',
    description:
        'Choose the account that fits your trading style. From commission-free Standard accounts to ultra-low spread Raw accounts for professionals.',
}

export default function AccountsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
