import type { Metadata } from 'next'
import PaymentDisclaimerClient from './PaymentDisclaimerClient'

export const metadata: Metadata = {
    title: 'Payment Disclaimer | APFX Global Markets',
    description:
        'Official payment disclaimer for APFX Global Markets. Understand processing times, third-party delays, and applicable fees.',
}

export default function PaymentDisclaimerPage() {
    return <PaymentDisclaimerClient />
}
