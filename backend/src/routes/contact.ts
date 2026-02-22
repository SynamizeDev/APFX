import { Router, Request, Response } from 'express'
import { z } from 'zod'
import { Resend } from 'resend'
import { logger } from '../lib/logger'

const router = Router()

// Lazy init — avoids crash when RESEND_API_KEY is not set in dev
function getResend() {
    const key = process.env.RESEND_API_KEY
    if (!key) {
        logger.warn('RESEND_API_KEY not set — emails will not be sent in this environment')
        return null
    }
    return new Resend(key)
}


const ContactSchema = z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    phone: z.string().optional(),
    subject: z.string().min(5).max(200),
    message: z.string().min(10).max(2000),
})

router.post('/', async (req: Request, res: Response) => {
    try {
        const parsed = ContactSchema.safeParse(req.body)
        if (!parsed.success) {
            return res.status(400).json({ error: 'Invalid input', details: parsed.error.flatten() })
        }

        const { name, email, phone, subject, message } = parsed.data

        const resend = getResend()
        if (resend) {
            await resend.emails.send({
                from: 'APFX Contact <noreply@apfx.com>',
                to: process.env.CONTACT_EMAIL || 'support@apfx.com',
                replyTo: email,
                subject: `[APFX Contact] ${subject}`,
                html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            <p><strong>Subject:</strong> ${subject}</p>
            <hr/>
            <p>${message.replace(/\n/g, '<br/>')}</p>
          `,
            })
        }

        logger.info('Contact form submitted', { name, email, subject })
        return res.status(200).json({ success: true, message: 'Message sent successfully.' })
    } catch (error) {
        logger.error('Contact form error', { error })
        return res.status(500).json({ error: 'Failed to send message. Please try again.' })
    }
})

export default router
