import type { Metadata } from 'next'
import TermsOfServiceClient from './TermsOfServiceClient'

export const metadata: Metadata = {
    title: 'Terms of Service - Global Trading Agreement',
    description:
        'The legal framework governing your relationship with APFX. Transparent terms for professional traders and institutional clients.',
}

export default function TermsOfServicePage() {
    return <TermsOfServiceClient />
}
