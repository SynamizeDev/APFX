export type IPOStatus = 'Upcoming' | 'Open' | 'Closed';

export interface IPOListItem {
  slug: string;
  companyName: string;
  industry: string;
  openDate: string;
  closeDate: string;
  priceBandLow: number;
  priceBandHigh: number;
  issueSize: string;
  lotSize?: number;
  listingDate: string;
  status: IPOStatus;
}

export interface IPODetail extends IPOListItem {
  overview: string;
  businessModel: string;
  financialHighlights: { label: string; value: string }[];
  risks: string[];
  opportunities: string[];
}

export interface PastIPOItem {
  companyName: string;
  issuePrice: number;
  listingPrice: number;
  listingGainPercent: number;
  listingDate: string;
}
