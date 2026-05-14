import type { Metadata } from 'next'
import TermsOfServiceClient from './TermsOfServiceClient'

export const metadata: Metadata = {
    title: 'Terms & Conditions | APFX Global Markets',
    description:
        'The comprehensive legal framework governing your relationship with APFX Global Markets. Transparent terms for professional traders and institutional clients.',
}

export default function TermsOfServicePage() {
    return <TermsOfServiceClient />
}
