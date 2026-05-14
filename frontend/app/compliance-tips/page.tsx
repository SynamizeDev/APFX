import type { Metadata } from 'next'
import ComplianceTipsClient from './ComplianceTipsClient'

export const metadata: Metadata = {
    title: 'Operational Compliance Standards | APFX Global Markets',
    description:
        'Our internal operational compliance standards and best practices for maintaining a secure and transparent trading environment.',
}

export default function ComplianceTipsPage() {
    return <ComplianceTipsClient />
}
