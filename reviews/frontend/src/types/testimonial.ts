export type ReviewCategory = 'All' | 'Trading' | 'Prop Trading' | 'API & Execution' | 'Institutional' | 'Education';

export type ReviewSortOption = 'featured' | 'latest' | 'highest';

export interface VideoTestimonial {
  id: string;
  youtubeId: string;
  clientName?: string;
  role?: string;
  country?: string;
  countryCode?: string;
  rating?: number;
  title: string;
  body: string;
  thumbnailUrl?: string;
  category?: Exclude<ReviewCategory, 'All'>;
  verified?: boolean;
  featured?: boolean;
  publishedAt: string;
  duration?: string;
  tradingAccountId?: string;
}

