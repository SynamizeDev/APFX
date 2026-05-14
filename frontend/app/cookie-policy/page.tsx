import type { Metadata } from 'next'
import CookiePolicyClient from './CookiePolicyClient'

export const metadata: Metadata = {
    title: 'Cookie Policy | APFX Global Markets',
    description:
        'Official cookie policy for APFX Global Markets. Learn how we use cookies to improve your experience and manage your preferences.',
}

export default function CookiePolicyPage() {
    return <CookiePolicyClient />
}
