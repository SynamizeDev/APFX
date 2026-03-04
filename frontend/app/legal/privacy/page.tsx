import type { Metadata } from 'next'
import PrivacyClient from './PrivacyClient'

export const metadata: Metadata = {
    title: 'Privacy Policy — APFX',
    description:
        'Learn how APFX collects, uses, and protects your personal data in accordance with global privacy and regulatory standards.',
}

export default function PrivacyPage() {
    return <PrivacyClient />
}
