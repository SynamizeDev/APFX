import type { Metadata } from 'next'
import RestrictedCountriesClient from './RestrictedCountriesClient'

export const metadata: Metadata = {
    title: 'Restricted Countries Policy | APFX Global Markets',
    description:
        'Official policy regarding jurisdictions where APFX Global Markets does not provide services. Information on restricted regions and regulatory compliance.',
}

export default function RestrictedCountriesPage() {
    return <RestrictedCountriesClient />
}
