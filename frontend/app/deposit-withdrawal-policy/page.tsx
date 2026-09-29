import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import DepositWithdrawalClient from './DepositWithdrawalClient'

export const metadata: Metadata = buildMetadata({
    title: 'Deposit & Withdrawal Policy | APFX Global Markets',
    description:
        'Official deposit and withdrawal policies for APFX Global Markets. Information on payment methods, processing times, and security procedures.',
    path: '/deposit-withdrawal-policy',
})

export default function DepositWithdrawalPage() {
    return <DepositWithdrawalClient />
}
