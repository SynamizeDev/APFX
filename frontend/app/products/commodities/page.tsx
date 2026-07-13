import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import CommoditiesPage from './CommoditiesPage'

export const metadata: Metadata = buildMetadata({
  title: 'Commodities Trading — Gold, Oil & Energy CFDs',
  description:
    'Trade hard and soft commodities with institutional-grade spreads. Access Gold (XAU/USD), Crude Oil (WTI & Brent), Silver, Natural Gas, and Agricultural commodities with fast execution.',
  path: '/products/commodities',
  keywords: [
    'commodities trading',
    'gold trading',
    'crude oil CFD',
    'energy trading',
    'commodity CFDs',
    'XAU/USD',
    'silver trading',
  ],
})

export default function CommoditiesProductPage() {
  return <CommoditiesPage />
}
