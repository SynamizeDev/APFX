import { redirect } from 'next/navigation'

/**
 * /academy — server-side redirect to the canonical blog listing.
 * Fixes the previous router.replace('/learn/courses') which redirected to a
 * rewrite alias instead of the canonical /academy/courses path.
 */
export default function AcademyIndexPage() {
  redirect('/academy/courses')
}
