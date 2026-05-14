import type { Metadata } from 'next'
import DepositWithdrawalClient from './DepositWithdrawalClient'

export const metadata: Metadata = {
    title: 'Deposit & Withdrawal Policy | APFX Global Markets',
    description:
        'Official deposit and withdrawal policies for APFX Global Markets. Information on payment methods, processing times, and security procedures.',
}

export default function DepositWithdrawalPage() {
    return <DepositWithdrawalClient />
}
