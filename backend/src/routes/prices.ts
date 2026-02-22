import { Router, Request, Response } from 'express'
import { logger } from '../lib/logger'

const router = Router()

// Supported pairs that we proxy from a public market data API
const PAIRS = ['EUR/USD', 'GBP/USD', 'USD/JPY', 'USD/CHF', 'AUD/USD', 'USD/CAD', 'XAU/USD']

// Simulate prices in dev; replace with real API (exchangerate-api, fixer.io, etc.)
function generateMockPrice(pair: string) {
    const bases: Record<string, number> = {
        'EUR/USD': 1.082,
        'GBP/USD': 1.263,
        'USD/JPY': 149.8,
        'USD/CHF': 0.896,
        'AUD/USD': 0.654,
        'USD/CAD': 1.362,
        'XAU/USD': 2018.5,
    }
    const base = bases[pair] || 1.0
    const spread = base * 0.0002
    const mid = base + (Math.random() - 0.5) * spread
    return {
        pair,
        bid: parseFloat((mid - spread / 2).toFixed(5)),
        ask: parseFloat((mid + spread / 2).toFixed(5)),
        mid: parseFloat(mid.toFixed(5)),
        change: parseFloat(((Math.random() - 0.5) * 0.5).toFixed(4)),
        timestamp: new Date().toISOString(),
    }
}

router.get('/', async (_req: Request, res: Response) => {
    try {
        const prices = PAIRS.map(generateMockPrice)
        res.setHeader('Cache-Control', 'no-store')
        return res.status(200).json({ success: true, data: prices })
    } catch (error) {
        logger.error('Prices fetch error', { error })
        return res.status(500).json({ error: 'Failed to fetch prices' })
    }
})

export default router
