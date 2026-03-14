'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RiskManagementIndexPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/tools/risk-management/risk-per-trade')
  }, [router])

  return null
}
