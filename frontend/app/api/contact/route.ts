import { NextResponse } from 'next/server'
import { GOOGLE_APPS_SCRIPT_URL } from '@/config/urls'

export const dynamic = 'force-dynamic'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
    try {
        const body = await request.json().catch(() => null)
        
        const fullName = (typeof body?.fullName === 'string' ? body.fullName : typeof body?.name === 'string' ? body.name : '').trim()
        const email = (typeof body?.email === 'string' ? body.email : '').trim()
        const subject = (typeof body?.subject === 'string' ? body.subject : '').trim()
        const message = (typeof body?.message === 'string' ? body.message : '').trim()

        if (!fullName) {
            return NextResponse.json(
                { success: false, status: 'error', message: 'Please enter your full name.' },
                { status: 400 }
            )
        }

        if (!email) {
            return NextResponse.json(
                { success: false, status: 'error', message: 'Please enter an email address.' },
                { status: 400 }
            )
        }

        if (!EMAIL_REGEX.test(email)) {
            return NextResponse.json(
                { success: false, status: 'error', message: 'Please enter a valid email address.' },
                { status: 400 }
            )
        }

        if (!subject) {
            return NextResponse.json(
                { success: false, status: 'error', message: 'Please select a subject.' },
                { status: 400 }
            )
        }

        if (!message) {
            return NextResponse.json(
                { success: false, status: 'error', message: 'Please enter a message.' },
                { status: 400 }
            )
        }

        const scriptUrl =
            process.env.GOOGLE_APPS_SCRIPT_URL ||
            process.env.GOOGLE_APPS_SCRIPT_NEWSLETTER_URL ||
            GOOGLE_APPS_SCRIPT_URL

        const payload = {
            type: 'support',
            fullName,
            email,
            subject,
            message,
        }

        const scriptResponse = await fetch(scriptUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
            redirect: 'follow',
            cache: 'no-store',
        })

        const textResponse = await scriptResponse.text().catch(() => '')
        let data: { success?: boolean; status?: string; message?: string; error?: string } = {}

        try {
            data = JSON.parse(textResponse)
        } catch {
            data = { message: textResponse }
        }

        if (!scriptResponse.ok || data?.success === false || data?.error) {
            console.error('[API/Contact] Google Apps Script error:', data?.message || data?.error || textResponse)
            return NextResponse.json(
                { success: false, status: 'error', message: 'Unable to send message right now. Please try again shortly.' },
                { status: 400 }
            )
        }

        return NextResponse.json({
            success: true,
            status: 'success',
            message: 'Your message has been sent successfully.',
        })
    } catch (error) {
        console.error('[API/Contact] Internal server error:', error)
        return NextResponse.json(
            { success: false, status: 'error', message: 'Unable to send message right now. Please try again shortly.' },
            { status: 500 }
        )
    }
}
