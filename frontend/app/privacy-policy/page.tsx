import type { Metadata } from 'next'
import PrivacyPolicyClient from './PrivacyPolicyClient'

export const metadata: Metadata = {
    title: 'Privacy Policy | APFX Global Markets',
    description:
        'Official privacy policy for APFX Global Markets. Understand how we collect, use, and safeguard your personal and financial information.',
}

export default function PrivacyPolicyPage() {
    return <PrivacyPolicyClient />
}
