import type { Metadata } from 'next'
import CommoditiesPage from './CommoditiesPage'

export const metadata: Metadata = {
  title: 'Commodities Trading',
  description:
    'Learn how commodities like gold, oil, and agricultural products are traded—basics, risks, and how to get started with APFX. Educational content only.',
}

export default function CommoditiesProductPage() {
  return <CommoditiesPage />
}
