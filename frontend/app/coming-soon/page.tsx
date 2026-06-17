import { redirect } from 'next/navigation'
import { PORTAL_URL } from '@/config/urls'

export default function ComingSoonPage() {
    redirect(PORTAL_URL)
}
