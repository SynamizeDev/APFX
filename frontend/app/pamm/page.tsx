import type { Metadata } from 'next'
import PammClient from './PammClient'

export const metadata: Metadata = {
    title: 'PAMM Allocation Infrastructure | APFX',
    description: 'Institutional-grade percentage allocation management designed for transparent strategy participation and professional capital distribution.',
}

export default function PammPage() {
    return <PammClient />
}
