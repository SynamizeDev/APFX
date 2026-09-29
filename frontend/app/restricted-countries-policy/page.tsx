import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import RestrictedCountriesClient from './RestrictedCountriesClient'

export const metadata: Metadata = buildMetadata({
    title: 'Restricted Countries Policy | APFX Global Markets',
    description:
        'Official policy regarding jurisdictions where APFX Global Markets does not provide services. Information on restricted regions and regulatory compliance.',
    path: '/restricted-countries-policy',
})

export default function RestrictedCountriesPage() {
    return <RestrictedCountriesClient />
}
