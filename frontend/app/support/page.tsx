import type { Metadata } from 'next'
import SupportClient from './SupportClient'

export const metadata: Metadata = {
    title: 'Customer Support & Help Center - APFX Global Assistance',
    description:
        'Need help? Contact our institutional-grade support team. Available 24/5 for account, platform, and trading assistance via email and live support portal.',
}

export default function SupportPage() {
    return <SupportClient />
}
