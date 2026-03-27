import type { Metadata } from 'next'
import PrivacyPolicyClient from './PrivacyPolicyClient'

export const metadata: Metadata = {
    title: 'Privacy Policy - Data Security at APFX',
    description:
        'Learn how APFX protects and manages your personal data. Our commitment to transparency, high-grade encryption, and information security.',
}

export default function PrivacyPolicyPage() {
    return <PrivacyPolicyClient />
}
