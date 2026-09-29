import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import ComplianceTipsClient from './ComplianceTipsClient'

export const metadata: Metadata = buildMetadata({
    title: 'Operational Compliance Standards | APFX Global Markets',
    description:
        'Our internal operational compliance standards and best practices for maintaining a secure and transparent trading environment.',
    path: '/compliance-tips',
})

export default function ComplianceTipsPage() {
    return <ComplianceTipsClient />
}
