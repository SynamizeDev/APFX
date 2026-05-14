import type { Metadata } from 'next'
import LegalHubClient from './LegalHubClient'

export const metadata: Metadata = {
    title: 'Legal Documents & Policies | APFX Global Markets',
    description:
        'Access all official legal documents, policies, and compliance statements for APFX Global Markets. Transparency and security for institutional traders.',
}

export default function LegalHubPage() {
    return <LegalHubClient />
}
