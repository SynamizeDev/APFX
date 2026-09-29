import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import LegalHubClient from './LegalHubClient'

export const metadata: Metadata = buildMetadata({
    title: 'Legal Documents & Policies | APFX Global Markets',
    description:
        'Access all official legal documents, policies, and compliance statements for APFX Global Markets. Transparency and security for institutional traders.',
    path: '/legal',
})

export default function LegalHubPage() {
    return <LegalHubClient />
}
