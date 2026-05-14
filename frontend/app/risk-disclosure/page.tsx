import type { Metadata } from 'next'
import RiskDisclosureClient from './RiskDisclosureClient'

export const metadata: Metadata = {
    title: 'Risk Disclosure Statement | APFX Global Markets',
    description:
        'Official risk disclosure statement for APFX Global Markets. Understand the significant risks associated with leveraged trading of Forex, CFDs, and cryptocurrencies.',
}

export default function RiskDisclosurePage() {
    return <RiskDisclosureClient />
}
