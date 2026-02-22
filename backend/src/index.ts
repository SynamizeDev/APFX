import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import { logger } from './lib/logger'

// Routes
import contactRoutes from './routes/contact'
import pricesRoutes from './routes/prices'
import subscribeRoutes from './routes/subscribe'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// ── Security Middleware ────────────────────────────────────────────
app.use(helmet())
app.use(
    cors({
        origin: process.env.ALLOWED_ORIGIN || 'http://localhost:3000',
        credentials: true,
    })
)

// ── Rate Limiting ──────────────────────────────────────────────────
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests, please try again later.' },
})
app.use(limiter)

// ── Body Parsing ───────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))

// ── Health Check ───────────────────────────────────────────────────
app.get('/health', (_req, res) => {
    res.status(200).json({
        status: 'healthy',
        service: 'apfx-backend',
        timestamp: new Date().toISOString(),
    })
})

// ── API Routes ─────────────────────────────────────────────────────
app.use('/api/contact', contactRoutes)
app.use('/api/prices', pricesRoutes)
app.use('/api/subscribe', subscribeRoutes)

// ── 404 Handler ────────────────────────────────────────────────────
app.use((_req, res) => {
    res.status(404).json({ error: 'Route not found' })
})

// ── Global Error Handler ───────────────────────────────────────────
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    logger.error('Unhandled error', { error: err.message, stack: err.stack })
    res.status(500).json({ error: 'Internal server error' })
})

// ── Start Server ───────────────────────────────────────────────────
app.listen(PORT, () => {
    logger.info(`APFX Backend running on port ${PORT}`)
})

export default app
