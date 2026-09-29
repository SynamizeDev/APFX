import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import ComplaintHandlingClient from './ComplaintHandlingClient'

export const metadata: Metadata = buildMetadata({
    title: 'Complaint Handling Policy | APFX Global Markets',
    description:
        'Official complaint handling policy for APFX Global Markets. Learn about our commitment to resolving client issues fairly and efficiently.',
    path: '/complaint-handling-policy',
})

export default function ComplaintHandlingPage() {
    return <ComplaintHandlingClient />
}
