/**
 * Glossary entries: term, definition, category, optional detail and links.
 * Keep alphabetical by term for display.
 */
export type GlossaryCategory = 'forex' | 'technical' | 'risk' | 'investment' | 'market'

export interface GlossaryEntry {
  id: string
  term: string
  definition: string
  example?: string
  category: GlossaryCategory
  relatedTermIds?: string[]
  detailedExplanation?: string
  exampleInContext?: string
  toolLinks?: { label: string; href: string }[]
  blogLinks?: { label: string; href: string }[]
}

export const CATEGORY_LABELS: Record<GlossaryCategory, string> = {
  forex: 'Forex & Liquidity',
  technical: 'Technical Analysis & Charting',
  risk: 'Risk Architecture',
  investment: 'Strategic Investment',
  market: 'Market Infrastructure',
}

const UNSORTED_GLOSSARY_ENTRIES: GlossaryEntry[] = [
  {
    id: 'ask',
    term: 'Ask',
    definition: 'The specific price at which a market participant can purchase an asset or currency pair. In any given quote, the Ask price is always higher than the Bid price.',
    category: 'forex',
    relatedTermIds: ['bid', 'spread', 'slippage'],
    detailedExplanation: 'The Ask (or offer) represent the lowest price sellers are currently willing to accept. When executing a "Buy" order, you are transacting at the Ask.',
    example: 'If EUR/USD is quoted at 1.0850/1.0852, the Ask price is 1.0852.',
    toolLinks: [{ label: 'Pip Calculator', href: '/tools/calculators/pip' }],
  },
  {
    id: 'bid',
    term: 'Bid',
    definition: 'The specific price at which a market participant can sell an asset or currency pair. The Bid price represents the highest price buyers are currently willing to pay.',
    category: 'forex',
    relatedTermIds: ['ask', 'spread', 'liquidity'],
    detailedExplanation: 'The Bid is the price you receive when closing a long position or opening a short position. The difference between the Bid and the Ask is the transaction cost, known as the spread.',
    example: 'In a quote of 1.0850/1.0852, the Bid price is 1.0850.',
  },
  {
    id: 'spread',
    term: 'Spread',
    definition: 'The numerical difference between the Bid and Ask prices of an asset. It serves as a primary measure of market liquidity and transaction cost.',
    category: 'forex',
    relatedTermIds: ['bid', 'ask', 'pip', 'liquidity'],
    detailedExplanation: 'Low spreads indicate high liquidity and lower trading costs. Institutional-grade brokers aim for "raw" spreads close to zero during peak market hours.',
    example: 'If the Bid is 1.2500 and the Ask is 1.2501, the spread is 1 pip.',
  },
  {
    id: 'leverage',
    term: 'Leverage',
    definition: 'The use of borrowed capital to increase a participant\'s market exposure beyond their actual account equity. It allows for the control of larger positions with a smaller deposit.',
    category: 'forex',
    relatedTermIds: ['margin', 'lot', 'equity'],
    detailedExplanation: 'Leverage is a "force multiplier." While it can accelerate portfolio growth, it equally amplifies the impact of adverse price movements on your capital.',
    example: 'With 100:1 leverage, a $1,000 deposit can control a $100,000 position.',
    blogLinks: [{ label: 'Understanding Leverage', href: '/learn/blog/understanding-leverage' }],
  },
  {
    id: 'margin',
    term: 'Margin',
    definition: 'The collateral required to open or maintain a leveraged position. It is not a fee, but a portion of account equity "locked" by the broker as security.',
    category: 'risk',
    relatedTermIds: ['leverage', 'margin-call', 'free-margin'],
    detailedExplanation: 'Professional risk management involves keeping a significant buffer of "Free Margin" to withstand market volatility without triggering liquidation.',
    example: 'A 1% margin requirement on a $100,000 position requires $1,000 of locked equity.',
  },
  {
    id: 'pip',
    term: 'Pip',
    definition: 'Short for "Percentage in Point," it is the standard unit of measurement for price movement in Forex. For most pairs, it is the fourth decimal place (0.0001).',
    category: 'forex',
    relatedTermIds: ['lot', 'spread', 'volatility'],
    detailedExplanation: 'In JPY pairs, a pip is the second decimal place (0.01). Institutional traders use pip values to calculate exact risk-per-trade in their base currency.',
    example: 'If EUR/USD moves from 1.1000 to 1.1001, it has moved 1 pip.',
  },
  {
    id: 'lot',
    term: 'Lot',
    definition: 'The standardized unit of trade size in the financial markets. In Forex, a standard lot represents 100,000 units of the base currency.',
    category: 'forex',
    relatedTermIds: ['pip', 'leverage', 'margin'],
    detailedExplanation: 'Traders can also utilize smaller units: Mini Lots (10,000 units), Micro Lots (1,000 units), or Nano Lots (100 units) for precise position sizing.',
    example: 'Buying 1 standard lot of EUR/USD means you are controlling 100,000 Euros.',
  },
  {
    id: 'equity',
    term: 'Equity',
    definition: 'The real-time total value of a trading account, calculated as the cash balance adjusted for the unrealized profit or loss of all open positions.',
    category: 'market',
    relatedTermIds: ['balance', 'free-margin', 'margin'],
    detailedExplanation: 'Equity is your "true" account value. Traders should monitor Equity more closely than Balance when positions are active, as it determines margin health.',
    example: 'Balance of $10,000 + Unrealized Profit of $500 = $10,500 Equity.',
  },
  {
    id: 'balance',
    term: 'Balance',
    definition: 'The total amount of settled cash in a trading account. It does not include unrealized profits or losses from currently open positions.',
    category: 'market',
    relatedTermIds: ['equity', 'margin', 'swap'],
    detailedExplanation: 'Your balance only changes when a position is closed, a deposit/withdrawal is made, or interest swaps are credited/debited.',
  },
  {
    id: 'free-margin',
    term: 'Free Margin',
    definition: 'The portion of account equity that is not currently being used as collateral for open positions. It is available to open new trades or absorb losses.',
    category: 'risk',
    relatedTermIds: ['margin', 'equity', 'margin-call'],
    detailedExplanation: 'Free Margin serves as your primary defense against Margin Calls. A higher Free Margin percentage indicates a lower risk of forced liquidation.',
  },
  {
    id: 'drawdown',
    term: 'Drawdown',
    definition: 'The peak-to-trough decline in a trading account\'s equity or a strategy\'s performance over a specific period, measured from the highest point to the subsequent low.',
    category: 'risk',
    relatedTermIds: ['margin-call', 'volatility', 'equity'],
    detailedExplanation: 'Drawdown is the ultimate measure of risk for institutional investors. Managing maximum drawdown is more critical than maximizing absolute returns.',
    example: 'An account dropping from $10,000 to $8,000 has experienced a 20% drawdown.',
  },
  {
    id: 'margin-call',
    term: 'Margin Call',
    definition: 'An automated alert or action initiated by a broker when a trading account\'s equity falls below the required maintenance margin level.',
    category: 'risk',
    relatedTermIds: ['margin', 'equity', 'drawdown'],
    detailedExplanation: 'In high-speed electronic trading, a margin call often leads to the automatic liquidation of the largest losing positions to prevent account deficit.',
  },
  {
    id: 'liquidity',
    term: 'Liquidity',
    definition: 'The extent to which an asset can be quickly bought or sold in the market without significantly affecting its price stability.',
    category: 'forex',
    relatedTermIds: ['slippage', 'spread', 'execution-speed'],
    detailedExplanation: 'High-liquidity markets (like EUR/USD) feature tight spreads and minimal slippage. Illiquid markets can cause large "price gaps" during thin trading hours.',
  },
  {
    id: 'volatility',
    term: 'Volatility',
    definition: 'A statistical measure of the dispersion of returns for a given security or market. It represents the frequency and magnitude of price fluctuations.',
    category: 'technical',
    relatedTermIds: ['liquidity', 'candlestick', 'drawdown'],
    detailedExplanation: 'High volatility offers greater profit potential but requires wider stop losses and stricter position sizing to manage the increased risk.',
  },
  {
    id: 'slippage',
    term: 'Slippage',
    definition: 'The difference between the expected price of a trade and the actual price at which the trade is executed by the liquidity provider.',
    category: 'forex',
    relatedTermIds: ['liquidity', 'execution-speed', 'market-order'],
    detailedExplanation: 'While often viewed negatively, "positive slippage" can occurs when a limit order is filled at a better price than requested during fast-moving markets.',
  },
  {
    id: 'market-order',
    term: 'Market Order',
    definition: 'An instruction to execute a trade immediately at the best available current price in the market.',
    category: 'forex',
    relatedTermIds: ['limit-order', 'stop-order', 'execution-speed'],
    detailedExplanation: 'Market orders prioritize execution speed over price precision. Use them when immediate entry or exit is more critical than the exact fill price.',
  },
  {
    id: 'limit-order',
    term: 'Limit Order',
    definition: 'A pending instruction to buy or sell an asset at a specific price or better. A buy limit is placed below market price; a sell limit above.',
    category: 'forex',
    relatedTermIds: ['market-order', 'stop-order', 'slippage'],
    detailedExplanation: 'Limit orders provide price control but carry execution risk; the market may never reach your specified level, leaving the order unfilled.',
  },
  {
    id: 'stop-order',
    term: 'Stop Order',
    definition: 'An order that becomes a Market Order once a specific price level (the "stop price") is reached. A buy stop is placed above market price; a sell stop below.',
    category: 'forex',
    relatedTermIds: ['market-order', 'limit-order', 'stop-loss'],
    detailedExplanation: 'Commonly used for breakout strategies to enter a trend once momentum is confirmed. Unlike limit orders, they do not guarantee a specific fill price.',
  },
  {
    id: 'execution-speed',
    term: 'Execution Speed',
    definition: 'The total time (latency) between the moment an order is transmitted and the moment it is filled by the exchange or liquidity provider.',
    category: 'market',
    relatedTermIds: ['liquidity', 'slippage', 'market-order'],
    detailedExplanation: 'In institutional trading, execution speed is measured in microseconds. APFX utilizes NY4/LD4 data centers to provide "sub-millisecond" fills.',
  },
  {
    id: 'swap',
    term: 'Swap / Overnight Fee',
    definition: 'The interest rate differential paid or earned for holding a position overnight. It represents the cost of carrying a position to the next trading day.',
    category: 'investment',
    relatedTermIds: ['balance', 'dividend', 'cfd'],
    detailedExplanation: 'For long-term "carry trades," positive swaps can become a significant source of secondary income, while negative swaps represent a carrying cost.',
  },
  {
    id: 'stop-loss',
    term: 'Stop Loss',
    definition: 'A critical risk management order designed to automatically close a position at a predetermined price level to limit potential downside exposure.',
    category: 'risk',
    relatedTermIds: ['take-profit', 'risk-reward', 'margin-call'],
    detailedExplanation: 'A stop loss should be based on technical structure, not arbitrary dollar amounts. It is the primary tool for capital preservation in volatile markets.',
  },
  {
    id: 'take-profit',
    term: 'Take Profit',
    definition: 'An automated standing order used to close a profitable position once the asset reaches a specific target price level.',
    category: 'risk',
    relatedTermIds: ['stop-loss', 'risk-reward'],
    detailedExplanation: 'Using Take Profit orders helps remove emotional decision-making, ensuring that gains are secured according to your original trading plan.',
  },
  {
    id: 'risk-reward',
    term: 'Risk-Reward Ratio',
    definition: 'A mathematical comparison between the potential loss (risk) and the potential gain (reward) of a planned trade.',
    category: 'risk',
    relatedTermIds: ['stop-loss', 'take-profit', 'drawdown'],
    detailedExplanation: 'A positive risk-reward ratio (e.g., 1:2) allows a trader to remain profitable even with a win rate below 50%. It is a cornerstone of portfolio management.',
  },
  {
    id: 'candlestick',
    term: 'Candlestick',
    definition: 'A visual charting method that displays the Open, High, Low, and Close (OHLC) prices of an asset for a specific time interval.',
    category: 'technical',
    relatedTermIds: ['volatility', 'pip'],
    detailedExplanation: 'Candlestick patterns provide insight into market psychology and sentiment. They are the primary tool for price action analysis in all timeframes.',
  },
  {
    id: 'dividend',
    term: 'Dividend',
    definition: 'A distribution of a portion of a company\'s earnings to its shareholders, usually issued as cash payments or additional stock.',
    category: 'investment',
    detailedExplanation: 'Dividend-paying stocks are often favored by long-term investors for income. For CFD traders, dividend adjustments may be applied to their accounts.',
  },
  {
    id: 'cfd',
    term: 'CFD (Contract for Difference)',
    definition: 'An agreement between a trader and a broker to exchange the price difference of an underlying asset between the opening and closing of the contract.',
    category: 'market',
    relatedTermIds: ['leverage', 'margin', 'swap'],
    detailedExplanation: 'CFDs allow traders to speculate on price movements in both directions (long and short) without requiring physical ownership of the underlying asset.',
  },
]

// Keep entries sorted for UI rendering, while preserving correct `GlossaryCategory` typing.
export const GLOSSARY_ENTRIES: GlossaryEntry[] = [...UNSORTED_GLOSSARY_ENTRIES].sort((a, b) =>
  a.term.localeCompare(b.term, 'en')
)

export const POPULAR_TERM_IDS = ['pip', 'leverage', 'margin', 'stop-loss', 'take-profit']
