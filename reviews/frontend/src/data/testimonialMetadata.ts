import { ReviewCategory } from '../types/testimonial';

export interface TestimonialMetadataOverride {
  youtubeId: string;
  clientName?: string;
  role?: string;
  country?: string;
  countryCode?: string;
  rating?: number;
  category?: Exclude<ReviewCategory, 'All'>;
  verified?: boolean;
  featured?: boolean;
  customTitle?: string;
  customBody?: string;
  duration?: string;
  tradingAccountId?: string;
}

/**
 * Local metadata mapping layer.
 * Allows assigning APFX-specific testimonial metadata (client name, country, rating, category, etc.)
 * to specific YouTube video IDs without fabricating fake data for unmapped videos.
 */
export const TESTIMONIAL_METADATA_MAP: Record<string, TestimonialMetadataOverride> = {
  // Example overrides can be added here indexed by YouTube Video ID:
  // "dQw4w9WgXcQ": {
  //   youtubeId: "dQw4w9WgXcQ",
  //   clientName: "Alex Rivera",
  //   role: "Senior Prop Trader",
  //   country: "United States",
  //   rating: 5,
  //   category: "Prop Trading",
  //   verified: true,
  //   featured: true,
  // },
};
