'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function CalculatorsIndexPage() {
    const router = useRouter()

    useEffect(() => {
        router.replace('/tools/calculators/pip')
    }, [router])

    return null
}
