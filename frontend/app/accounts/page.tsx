import type { Metadata } from 'next'
import AccountsClient from './AccountsClient'

export const metadata: Metadata = {
    title: 'Professional Trading Accounts - Raw Spreads & Zero Commission',
    description:
        'Choose from Standard, Raw Spread, or Institutional account tiers. Engineered for scalpers, day traders, and professional investors looking for deep liquidity.',
}

export default function AccountsPage() {
    return <AccountsClient />
}
