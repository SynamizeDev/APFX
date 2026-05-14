import type { Metadata } from 'next'
import HighRiskDisclaimerClient from './HighRiskDisclaimerClient'

export const metadata: Metadata = {
    title: 'High-Risk Product Disclaimer | APFX Global Markets',
    description:
        'Official high-risk product disclaimer for APFX Global Markets. Understanding the significant risks associated with CFDs and leveraged forex trading.',
}

export default function HighRiskDisclaimerPage() {
    return <HighRiskDisclaimerClient />
}
