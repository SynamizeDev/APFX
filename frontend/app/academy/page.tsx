import { redirect } from 'next/navigation'

/**
 * /academy — server-side redirect to the primary courses listing.
 */
export default function AcademyIndexPage() {
  redirect('/learn/courses')
}

