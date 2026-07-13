import { redirect } from 'next/navigation'

/**
 * /tools/calculators — server-side redirect to canonical first sub-page.
 * Using server redirect() instead of client router.replace() so Googlebot
 * receives a proper HTTP 307 response and follows the canonical URL.
 */
export default function CalculatorsIndexPage() {
  redirect('/tools/calculators/pip')
}
