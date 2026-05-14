import type { Metadata } from 'next'
import ComplaintHandlingClient from './ComplaintHandlingClient'

export const metadata: Metadata = {
    title: 'Complaint Handling Policy | APFX Global Markets',
    description:
        'Official complaint handling policy for APFX Global Markets. Learn about our commitment to resolving client issues fairly and efficiently.',
}

export default function ComplaintHandlingPage() {
    return <ComplaintHandlingClient />
}
