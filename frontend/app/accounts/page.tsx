import type { Metadata } from 'next'
import AccountsClient from './AccountsClient'

export const metadata: Metadata = {
    title: 'Account Types — APFX',
    description:
        'Choose the account that fits your trading style. From commission-free Standard accounts to ultra-low spread Raw accounts for professionals.',
}

export default function AccountsPage() {
    return <AccountsClient />
}
