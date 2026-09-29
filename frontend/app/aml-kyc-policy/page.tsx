import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import AMLKYCClient from './AMLKYCClient'

export const metadata: Metadata = buildMetadata({
    title: 'AML & KYC Policy | APFX Global Markets',
    description:
        'Our Anti-Money Laundering and Know Your Customer policies. Learn about client verification requirements and suspicious activity monitoring at APFX.',
    path: '/aml-kyc-policy',
})

export default function AMLKYCPage() {
    return <AMLKYCClient />
}
