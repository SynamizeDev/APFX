'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AcademyIndexPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/learn/blog')
  }, [router])

  return null
}
