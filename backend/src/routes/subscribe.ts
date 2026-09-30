import { Router, Request, Response } from 'express'
import { z } from 'zod'
import { logger } from '../lib/logger'

const router = Router()

const SubscribeSchema = z.object({
    email: z.string().email(),
})

router.post('/', async (req: Request, res: Response) => {
    try {
        const parsed = SubscribeSchema.safeParse(req.body)
        if (!parsed.success) {
            return res.status(400).json({ error: 'Invalid email address' })
        }

        const scriptUrl =
            process.env.GOOGLE_APPS_SCRIPT_URL ||
            process.env.GOOGLE_APPS_SCRIPT_NEWSLETTER_URL ||
            'https://script.google.com/macros/s/AKfycbwJ-8BT5y36r4V7rz2ZqT1dL_fGhQIduozgh22fvGqQS6lYkShR5t5XMWqR0Nj7gVqg-Q/exec'

        logger.info('Newsletter subscription attempt', { email: parsed.data.email })

        const scriptRes = await fetch(scriptUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: parsed.data.email }),
            redirect: 'follow',
        })

        const text = await scriptRes.text().catch(() => '')
        let data: { success?: boolean; status?: string; message?: string; error?: string } = {}
        try {
            data = JSON.parse(text)
        } catch {
            data = { message: text }
        }

        const msgLower = (data?.message || data?.error || data?.status || '').toString().toLowerCase()
        if (msgLower.includes('already') || msgLower.includes('exist')) {
            return res.status(200).json({ success: false, status: 'already_subscribed', message: "You're already subscribed!" })
        }

        if (!scriptRes.ok || data?.success === false) {
            logger.error('Google Apps Script subscribe error', { data, text })
            return res.status(400).json({ success: false, error: 'Subscription failed. Please try again.' })
        }

        return res.status(200).json({ success: true, message: "You're subscribed!" })
    } catch (error) {
        logger.error('Subscribe error', { error })
        return res.status(500).json({ error: 'Subscription failed. Please try again.' })
    }
})

export default router
