'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const ChatWidget = dynamic(() => import('@/components/ui/ChatWidget'), {
    ssr: false,
})

const DEFER_MS = 2000

export default function LazyChatWidget() {
    const [ready, setReady] = useState(false)

    useEffect(() => {
        let cancelled = false

        const mount = () => {
            if (!cancelled) setReady(true)
        }

        if (typeof window.requestIdleCallback === 'function') {
            const idleId = window.requestIdleCallback(mount, { timeout: DEFER_MS })
            return () => {
                cancelled = true
                window.cancelIdleCallback(idleId)
            }
        }

        const timerId = window.setTimeout(mount, DEFER_MS)
        return () => {
            cancelled = true
            window.clearTimeout(timerId)
        }
    }, [])

    if (!ready) return null

    return <ChatWidget />
}
