import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import EconomicCalendarClient from './EconomicCalendarClient'

export const metadata: Metadata = buildMetadata({
    title: 'Economic Calendar | APFX',
    description: 'Stay ahead of market-moving events with APFX\'s economic calendar. Track key economic indicators, central bank decisions, and data releases that impact forex and CFD markets.',
    path: '/tools/economic-calendar',
})

export default function EconomicCalendarPage() {
    return <EconomicCalendarClient />
}
