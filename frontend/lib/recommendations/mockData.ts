import type {
  RecommendationListItem,
  RecommendationDetail,
  PerformanceRow,
  MarketInsightItem,
  TopPickItem,
  ResearchReportItem,
} from './types';

export const MOCK_RECOMMENDATIONS: RecommendationListItem[] = [
  {
    slug: 'tech-major-ltd',
    stockName: 'Tech Major Ltd',
    sector: 'IT Services',
    recommendationType: 'Buy',
    targetPrice: 1850,
    currentPrice: 1620,
    timeHorizon: 'Medium-term',
    analystName: 'Equity Research Team',
    publishedAt: '2025-03-10',
  },
  {
    slug: 'pharma-growth-inc',
    stockName: 'Pharma Growth Inc',
    sector: 'Pharmaceuticals',
    recommendationType: 'Buy',
    targetPrice: 920,
    currentPrice: 845,
    timeHorizon: 'Long-term',
    analystName: 'Healthcare Research',
    publishedAt: '2025-03-08',
  },
  {
    slug: 'bank-stock-co',
    stockName: 'Bank Stock Co',
    sector: 'Banking',
    recommendationType: 'Hold',
    targetPrice: 680,
    currentPrice: 652,
    timeHorizon: 'Short-term',
    analystName: 'Financials Team',
    publishedAt: '2025-03-05',
  },
  {
    slug: 'fmcg-leader',
    stockName: 'FMCG Leader',
    sector: 'FMCG',
    recommendationType: 'Watchlist',
    targetPrice: 2100,
    currentPrice: 1980,
    timeHorizon: 'Long-term',
    analystName: 'Consumer Research',
    publishedAt: '2025-03-01',
  },
];

export function getRecommendationDetail(slug: string): RecommendationDetail | null {
  const base = MOCK_RECOMMENDATIONS.find((r) => r.slug === slug);
  if (!base) return null;
  const expectedUpside = ((base.targetPrice - base.currentPrice) / base.currentPrice) * 100;
  return {
    ...base,
    expectedUpside: Number(expectedUpside.toFixed(1)),
    overview: `${base.stockName} is a well-established player in the ${base.sector} sector with a strong market position and consistent financial performance. We believe the stock offers attractive risk-reward at current levels.`,
    investmentThesis: 'Our recommendation is based on improving fundamentals, sector tailwinds, and valuation comfort. We expect earnings to compound at a healthy rate over the investment horizon, supporting our target price.',
    growthDrivers: [
      'Market share gains in core segments',
      'Margin expansion from operational leverage',
      'New product launches and geographic expansion',
      'Favourable regulatory environment',
    ],
    financialHighlights: [
      { label: 'Revenue (FY24)', value: '₹12,400 Cr' },
      { label: 'Net Profit (FY24)', value: '₹1,850 Cr' },
      { label: 'ROE', value: '18.5%' },
      { label: 'Debt/Equity', value: '0.4x' },
    ],
    risks: [
      'Sector cyclicality and competition could pressure margins.',
      'Regulatory changes may impact business model.',
      'Macro slowdown could affect demand.',
    ],
  };
}

export const MOCK_PERFORMANCE: PerformanceRow[] = [
  { stockName: 'Digital Payments Ltd', recommendationDate: '2025-01-15', entryPrice: 250, currentPrice: 312, performancePercent: 24.8 },
  { stockName: 'Auto Components Inc', recommendationDate: '2025-01-10', entryPrice: 180, currentPrice: 198, performancePercent: 10.0 },
  { stockName: 'Infra Build Ltd', recommendationDate: '2025-01-05', entryPrice: 320, currentPrice: 368, performancePercent: 15.0 },
  { stockName: 'FMCG Ventures', recommendationDate: '2024-12-20', entryPrice: 420, currentPrice: 399, performancePercent: -5.0 },
];

export const MOCK_INSIGHTS: MarketInsightItem[] = [
  { id: '1', title: 'Sector opportunities', type: 'sector', summary: 'IT and Pharma continue to offer selective opportunities. We favour large-cap quality names with visible earnings growth and reasonable valuations.' },
  { id: '2', title: 'Market trends', type: 'trends', summary: 'Domestic flows remain supportive. Volatility may persist around global rates and commodity prices. We maintain a balanced approach between growth and value.' },
  { id: '3', title: 'Monthly outlook', type: 'outlook', summary: 'Focus on companies with strong execution and margin resilience. We are cautious on highly leveraged names and prefer sectors with pricing power.' },
];

export const MOCK_TOP_PICKS_SHORT: TopPickItem[] = [
  { stockName: 'Tech Major Ltd', sector: 'IT', reason: 'Earnings upgrade cycle', slug: 'tech-major-ltd' },
  { stockName: 'Bank Stock Co', sector: 'Banking', reason: 'NIM stability', slug: 'bank-stock-co' },
];

export const MOCK_TOP_PICKS_LONG: TopPickItem[] = [
  { stockName: 'Pharma Growth Inc', sector: 'Pharma', reason: 'Pipeline and exports', slug: 'pharma-growth-inc' },
  { stockName: 'FMCG Leader', sector: 'FMCG', reason: 'Structural growth', slug: 'fmcg-leader' },
];

export const MOCK_REPORTS: ResearchReportItem[] = [
  { id: '1', title: 'IT Sector Q1 2025 Outlook', type: 'Sector', date: '2025-03-01' },
  { id: '2', title: 'Tech Major Ltd – Company Update', type: 'Company', date: '2025-02-28' },
  { id: '3', title: 'Market Outlook – March 2025', type: 'Market outlook', date: '2025-02-25' },
];
