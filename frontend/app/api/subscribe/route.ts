import { NextResponse } from 'next/server'
import { GOOGLE_APPS_SCRIPT_NEWSLETTER_URL } from '@/config/urls'

export const dynamic = 'force-dynamic'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
    try {
        const body = await request.json().catch(() => null)
        const email = typeof body?.email === 'string' ? body.email.trim() : ''

        if (!email) {
            return NextResponse.json(
                { success: false, status: 'empty', message: 'Please enter an email address.' },
                { status: 400 }
            )
        }

        if (!EMAIL_REGEX.test(email)) {
            return NextResponse.json(
                { success: false, status: 'invalid', message: 'Please enter a valid email address.' },
                { status: 400 }
            )
        }

        const scriptUrl =
            process.env.GOOGLE_APPS_SCRIPT_NEWSLETTER_URL || GOOGLE_APPS_SCRIPT_NEWSLETTER_URL

        const scriptResponse = await fetch(scriptUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
            redirect: 'follow',
            cache: 'no-store',
        })

        const textResponse = await scriptResponse.text().catch(() => '')
        let data: { success?: boolean; status?: string; message?: string; error?: string; alreadySubscribed?: boolean } = {}

        try {
            data = JSON.parse(textResponse)
        } catch {
            data = { message: textResponse }
        }

        const msgLower = (data?.message || data?.error || data?.status || '').toString().toLowerCase()

        // Check for "already subscribed" indications from Google Apps Script
        const isAlreadySubscribed =
            msgLower.includes('already') ||
            msgLower.includes('exist') ||
            data?.alreadySubscribed === true ||
            data?.status === 'already_subscribed'

        if (isAlreadySubscribed) {
            return NextResponse.json({
                success: false,
                status: 'already_subscribed',
                message: "You're already subscribed!",
            })
        }

        // Check for errors returned by Google Apps Script or HTTP failures
        if (!scriptResponse.ok || data?.success === false || data?.error) {
            console.error('[API/Subscribe] Google Apps Script error:', data?.message || data?.error || textResponse)
            return NextResponse.json(
                { success: false, status: 'error', message: 'Unable to subscribe right now. Please try again later.' },
                { status: 400 }
            )
        }

        return NextResponse.json({
            success: true,
            status: 'success',
            message: "You're subscribed!",
        })
    } catch (error) {
        console.error('[API/Subscribe] Internal server error:', error)
        return NextResponse.json(
            { success: false, status: 'error', message: 'Unable to subscribe right now. Please try again later.' },
            { status: 500 }
        )
    }
}
