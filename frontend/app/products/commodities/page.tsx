import type { Metadata } from 'next'
import CommoditiesPage from './CommoditiesPage'

export const metadata: Metadata = {
  title: 'Commodities Trading - Gold, Oil & Energy CFDs',
  description:
    'Trade hard and soft commodities with competitive spreads. Institutional access to Gold, Crude Oil, and Natural Gas markets with high-speed execution.',
}

export default function CommoditiesProductPage() {
  return <CommoditiesPage />
}
