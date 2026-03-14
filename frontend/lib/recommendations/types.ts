export type RecommendationType = 'Buy' | 'Hold' | 'Watchlist';
export type TimeHorizon = 'Short-term' | 'Medium-term' | 'Long-term';

export interface RecommendationListItem {
  slug: string;
  stockName: string;
  sector: string;
  recommendationType: RecommendationType;
  targetPrice: number;
  currentPrice: number;
  timeHorizon: TimeHorizon;
  analystName: string;
  publishedAt: string;
}

export interface RecommendationDetail extends RecommendationListItem {
  expectedUpside: number;
  overview: string;
  investmentThesis: string;
  growthDrivers: string[];
  financialHighlights: { label: string; value: string }[];
  risks: string[];
}

export interface PerformanceRow {
  stockName: string;
  recommendationDate: string;
  entryPrice: number;
  currentPrice: number;
  performancePercent: number;
}

export interface MarketInsightItem {
  id: string;
  title: string;
  summary: string;
  type: 'sector' | 'trends' | 'outlook';
}

export interface TopPickItem {
  stockName: string;
  sector: string;
  reason: string;
  slug: string;
}

export interface ResearchReportItem {
  id: string;
  title: string;
  type: 'Company' | 'Sector' | 'Market outlook';
  date: string;
  slug?: string;
}
