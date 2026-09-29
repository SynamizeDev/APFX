import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import PaymentDisclaimerClient from './PaymentDisclaimerClient'

export const metadata: Metadata = buildMetadata({
    title: 'Payment Disclaimer | APFX Global Markets',
    description:
        'Official payment disclaimer for APFX Global Markets. Understand processing times, third-party delays, and applicable fees.',
    path: '/payment-disclaimer',
})

export default function PaymentDisclaimerPage() {
    return <PaymentDisclaimerClient />
}
