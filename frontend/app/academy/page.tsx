'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AcademyIndexPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/academy/blog')
  }, [router])

  return null
}
