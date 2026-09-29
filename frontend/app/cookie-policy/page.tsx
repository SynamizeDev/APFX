import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import CookiePolicyClient from './CookiePolicyClient'

export const metadata: Metadata = buildMetadata({
    title: 'Cookie Policy | APFX Global Markets',
    description:
        'Official cookie policy for APFX Global Markets. Learn how we use cookies to improve your experience and manage your preferences.',
    path: '/cookie-policy',
})

export default function CookiePolicyPage() {
    return <CookiePolicyClient />
}
