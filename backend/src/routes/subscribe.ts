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

        // TODO: Integrate with your email marketing provider (Mailchimp / Kit / Loops)
        logger.info('Newsletter subscription', { email: parsed.data.email })
        return res.status(200).json({ success: true, message: 'Successfully subscribed!' })
    } catch (error) {
        logger.error('Subscribe error', { error })
        return res.status(500).json({ error: 'Subscription failed. Please try again.' })
    }
})

export default router
