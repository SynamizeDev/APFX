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
  forex: 'Forex Trading Terms',
  technical: 'Technical Analysis Terms',
  risk: 'Risk Management Terms',
  investment: 'Investment Terms',
  market: 'Market Terminology',
}

export const GLOSSARY_ENTRIES: GlossaryEntry[] = [
  {
    id: 'ask',
    term: 'Ask',
    definition: 'The price at which you can buy a currency pair or asset. The ask is always higher than the bid.',
    example: 'If EUR/USD ask is 1.1050, you pay 1.1050 to buy euros.',
    category: 'forex',
    relatedTermIds: ['bid', 'spread'],
    detailedExplanation: 'The ask (or offer) is the lowest price a seller is willing to accept. When you buy, you trade at the ask. The difference between bid and ask is the spread, which represents the broker’s cost or profit.',
    toolLinks: [{ label: 'Pip Calculator', href: '/tools/calculators/pip' }],
  },
  {
    id: 'candlestick',
    term: 'Candlestick',
    definition: 'A chart type that shows open, high, low, and close for a period. The body and wicks show price action at a glance.',
    category: 'technical',
    relatedTermIds: ['pip'],
    detailedExplanation: 'Candlestick charts are widely used in technical analysis. Each candle represents one time period; the body shows the range between open and close, and the wicks show the high and low. Green (or white) often means close above open; red (or black) means close below open.',
    blogLinks: [{ label: 'Introduction to Technical Analysis', href: '/academy/blog/technical-analysis-intro' }],
  },
  {
    id: 'bid',
    term: 'Bid',
    definition: 'The price at which you can sell a currency pair or asset. The bid is always lower than the ask.',
    example: 'If EUR/USD bid is 1.1048, you receive 1.1048 when selling euros.',
    category: 'forex',
    relatedTermIds: ['ask', 'spread'],
    detailedExplanation: 'The bid is the highest price a buyer is willing to pay. When you sell, you trade at the bid. Together with the ask, the bid defines the spread and the cost of entering or exiting a trade.',
    toolLinks: [{ label: 'Pip Calculator', href: '/tools/calculators/pip' }],
  },
  {
    id: 'cfd',
    term: 'CFD',
    definition: 'Contract for Difference. A derivative that lets you speculate on price movement without owning the underlying asset.',
    category: 'market',
    relatedTermIds: ['leverage', 'margin'],
    detailedExplanation: 'With a CFD, you agree to exchange the difference in the asset’s price between when you open and close the trade. CFDs are leveraged products: you can gain or lose more than your initial deposit. They are popular in Forex and indices trading.',
    blogLinks: [{ label: 'Beginner\'s Guide to Forex Trading', href: '/academy/blog/beginners-guide-forex' }],
  },
  {
    id: 'dividend',
    term: 'Dividend',
    definition: 'A share of a company’s profit paid to shareholders. Dividends can be paid in cash or as additional shares.',
    category: 'investment',
    detailedExplanation: 'Dividend-paying stocks provide income on top of potential price appreciation. Dividend yield is the annual dividend per share divided by the stock price. Not all companies pay dividends; growth companies often reinvest profits instead.',
  },
  {
    id: 'drawdown',
    term: 'Drawdown',
    definition: 'The peak-to-trough decline in your account or a strategy’s value before it recovers.',
    example: 'If your account goes from $10,000 to $8,000, that’s a 20% drawdown.',
    category: 'risk',
    relatedTermIds: ['margin', 'risk-reward'],
    detailedExplanation: 'Drawdown measures how much you lose from a previous high. A 20% drawdown means you need a 25% return to get back to the starting balance. Managing drawdown is central to risk management.',
    toolLinks: [{ label: 'Drawdown Recovery Calculator', href: '/tools/risk-management/drawdown-recovery' }, { label: 'Risk Management Tools', href: '/tools/risk-management' }],
    blogLinks: [{ label: 'Risk Management Strategies', href: '/academy/blog/risk-management-strategies' }],
  },
  {
    id: 'leverage',
    term: 'Leverage',
    definition: 'Borrowed capital that lets you control a larger position than your account balance. It amplifies both gains and losses.',
    example: 'With 10:1 leverage, $1,000 can control a $10,000 position.',
    category: 'forex',
    relatedTermIds: ['margin', 'lot'],
    detailedExplanation: 'Leverage allows you to open positions larger than your deposit. For example, 100:1 leverage means you need only 1% of the position size as margin. While this can increase profits, it also increases the risk of losing your capital quickly.',
    toolLinks: [{ label: 'Margin Calculator', href: '/tools/calculators/margin' }, { label: 'Position Size Calculator', href: '/tools/calculators/position-size' }],
    blogLinks: [{ label: 'Understanding Leverage', href: '/academy/blog/understanding-leverage' }],
  },
  {
    id: 'lot',
    term: 'Lot',
    definition: 'A standard unit of trade size in Forex. One standard lot is typically 100,000 units of the base currency.',
    example: 'One standard lot of EUR/USD = 100,000 euros.',
    category: 'forex',
    relatedTermIds: ['pip', 'leverage', 'margin'],
    detailedExplanation: 'Lot sizes determine how much you’re trading. Standard lot = 100,000 units; mini lot = 10,000; micro lot = 1,000. Lot size affects pip value and risk: larger lots mean larger gains or losses per pip.',
    toolLinks: [{ label: 'Pip Calculator', href: '/tools/calculators/pip' }, { label: 'Position Size Calculator', href: '/tools/calculators/position-size' }],
  },
  {
    id: 'margin',
    term: 'Margin',
    definition: 'The amount of your own capital required to open and maintain a leveraged position. It acts as collateral.',
    example: 'With 2% margin requirement, a $10,000 position needs $200 in margin.',
    category: 'forex',
    relatedTermIds: ['leverage', 'margin-call'],
    detailedExplanation: 'Margin is the portion of your account that is “locked” when you open a trade. If your losses approach your margin, you may receive a margin call and need to add funds or close positions. Free margin is the amount left available to open new trades.',
    toolLinks: [{ label: 'Forex Margin Calculator', href: '/tools/calculators/margin' }, { label: 'Risk Per Trade Calculator', href: '/tools/risk-management/risk-per-trade' }],
    blogLinks: [{ label: 'Understanding Leverage', href: '/academy/blog/understanding-leverage' }],
  },
  {
    id: 'margin-call',
    term: 'Margin Call',
    definition: 'A broker’s request to add more funds when your account equity falls below the required margin level.',
    category: 'risk',
    relatedTermIds: ['margin', 'leverage', 'drawdown'],
    detailedExplanation: 'If open losses shrink your equity so that it no longer covers the margin requirement, the broker may issue a margin call. Failing to meet it can lead to automatic closing of positions (liquidation).',
    toolLinks: [{ label: 'Margin Calculator', href: '/tools/calculators/margin' }, { label: 'Risk Management Tools', href: '/tools/risk-management' }],
  },
  {
    id: 'pip',
    term: 'Pip',
    definition: 'The smallest price movement in most currency pairs. For most pairs, one pip is 0.0001; for JPY pairs it is 0.01.',
    example: 'If EUR/USD moves from 1.1000 to 1.1001, it moved 1 pip.',
    category: 'forex',
    relatedTermIds: ['lot', 'spread'],
    detailedExplanation: 'Pip stands for “percentage in point.” It’s the standard unit for measuring change in a currency pair. Pip value depends on lot size and the pair: for a standard lot in EUR/USD, one pip is usually worth about $10.',
    toolLinks: [{ label: 'Pip Calculator', href: '/tools/calculators/pip' }],
    blogLinks: [{ label: 'How to Use the Pip Calculator', href: '/academy/blog/pip-calculator-guide' }],
  },
  {
    id: 'risk-reward',
    term: 'Risk-Reward Ratio',
    definition: 'The comparison between how much you risk on a trade and how much you aim to gain. A 1:2 ratio means you risk 1 unit to make 2.',
    category: 'risk',
    relatedTermIds: ['stop-loss', 'take-profit'],
    detailedExplanation: 'Risk-reward ratio helps you decide if a trade is worth taking. For example, with 1:2 you can be wrong half the time and still break even. Many traders aim for at least 1:2 by placing take-profit farther than stop-loss.',
    toolLinks: [{ label: 'Risk-Reward Ratio Calculator', href: '/tools/risk-management/risk-reward' }, { label: 'Risk Management Tools', href: '/tools/risk-management' }],
    blogLinks: [{ label: 'Risk Management Strategies', href: '/academy/blog/risk-management-strategies' }],
  },
  {
    id: 'spread',
    term: 'Spread',
    definition: 'The difference between the bid and ask price. It represents the cost of opening a trade.',
    example: 'If bid is 1.1000 and ask is 1.1002, the spread is 2 pips.',
    category: 'forex',
    relatedTermIds: ['bid', 'ask', 'pip'],
    detailedExplanation: 'The spread is how many brokers make money. Tighter spreads mean lower trading costs. Spreads can widen during volatile news or when liquidity is low.',
    toolLinks: [{ label: 'Pip Calculator', href: '/tools/calculators/pip' }],
  },
  {
    id: 'stop-loss',
    term: 'Stop Loss',
    definition: 'An order that automatically closes your position at a set price to limit losses if the market moves against you.',
    example: 'You buy EUR/USD at 1.1000 and set a stop loss at 1.0950 to cap loss at 50 pips.',
    category: 'risk',
    relatedTermIds: ['take-profit', 'risk-reward', 'margin'],
    detailedExplanation: 'A stop loss (SL) is a risk management tool. Once the market reaches your SL price, your trade is closed at the best available price. It helps prevent emotional decisions and limits damage from a single trade.',
    toolLinks: [{ label: 'Position Size Calculator', href: '/tools/calculators/position-size' }, { label: 'Risk Per Trade Calculator', href: '/tools/risk-management/risk-per-trade' }],
    blogLinks: [{ label: 'How Stop Loss Works', href: '/academy/blog/how-stop-loss-works' }],
  },
  {
    id: 'take-profit',
    term: 'Take Profit',
    definition: 'An order that automatically closes your position at a set price to lock in profits when the market reaches your target.',
    example: 'You buy EUR/USD at 1.1000 and set take profit at 1.1100 to secure 100 pips profit.',
    category: 'risk',
    relatedTermIds: ['stop-loss', 'risk-reward'],
    detailedExplanation: 'A take profit (TP) order closes your trade when price reaches your target. Using both stop loss and take profit helps you stick to your plan and avoid closing too early or too late.',
    toolLinks: [{ label: 'Risk-Reward Ratio Calculator', href: '/tools/risk-management/risk-reward' }],
    blogLinks: [{ label: 'How Stop Loss Works', href: '/academy/blog/how-stop-loss-works' }],
  },
].sort((a, b) => a.term.localeCompare(b.term, 'en'))

export const POPULAR_TERM_IDS = ['pip', 'leverage', 'margin', 'stop-loss', 'take-profit']
