import { redirect } from 'next/navigation'

/**
 * /tools/risk-management — server-side redirect to canonical first sub-page.
 * Using server redirect() instead of client router.replace() so Googlebot
 * receives a proper HTTP 307 response and follows the canonical URL.
 */
export default function RiskManagementIndexPage() {
  redirect('/tools/risk-management/risk-per-trade')
}
