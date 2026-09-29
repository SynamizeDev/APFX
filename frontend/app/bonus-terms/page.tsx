import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import BonusTermsClient from './BonusTermsClient'

export const metadata: Metadata = buildMetadata({
    title: 'Bonus Terms & Conditions | APFX Global Markets',
    description:
        'Example terms for promotional bonuses at APFX Global Markets. Understand trading volume requirements and withdrawal conditions.',
    path: '/bonus-terms',
})

export default function BonusTermsPage() {
    return <BonusTermsClient />
}
