import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import HighRiskDisclaimerClient from './HighRiskDisclaimerClient'

export const metadata: Metadata = buildMetadata({
    title: 'High-Risk Product Disclaimer | APFX Global Markets',
    description:
        'Official high-risk product disclaimer for APFX Global Markets. Understanding the significant risks associated with CFDs and leveraged forex trading.',
    path: '/high-risk-disclaimer',
})

export default function HighRiskDisclaimerPage() {
    return <HighRiskDisclaimerClient />
}
