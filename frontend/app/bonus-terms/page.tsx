import type { Metadata } from 'next'
import BonusTermsClient from './BonusTermsClient'

export const metadata: Metadata = {
    title: 'Bonus Terms & Conditions | APFX Global Markets',
    description:
        'Example terms for promotional bonuses at APFX Global Markets. Understand trading volume requirements and withdrawal conditions.',
}

export default function BonusTermsPage() {
    return <BonusTermsClient />
}
