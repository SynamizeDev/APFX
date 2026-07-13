import { redirect } from 'next/navigation'

/**
 * /academy — server-side redirect to the canonical blog listing.
 * Fixes the previous router.replace('/learn/blog') which redirected to a
 * rewrite alias instead of the canonical /academy/blog path.
 */
export default function AcademyIndexPage() {
  redirect('/academy/blog')
}
