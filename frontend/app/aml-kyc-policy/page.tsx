import type { Metadata } from 'next'
import AMLKYCClient from './AMLKYCClient'

export const metadata: Metadata = {
    title: 'AML & KYC Policy | APFX Global Markets',
    description:
        'Our Anti-Money Laundering and Know Your Customer policies. Learn about client verification requirements and suspicious activity monitoring at APFX.',
}

export default function AMLKYCPage() {
    return <AMLKYCClient />
}
