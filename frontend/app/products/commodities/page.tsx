import type { Metadata } from 'next'
import CommoditiesPage from './CommoditiesPage'

export const metadata: Metadata = {
  title: 'Commodities Trading',
  description:
    'Real-world demand, derivatives, and risk—commodity education with scenarios, drivers, and habits. APFX; educational only.',
}

export default function CommoditiesProductPage() {
  return <CommoditiesPage />
}
