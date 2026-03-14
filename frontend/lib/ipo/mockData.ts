import type { IPOListItem, IPODetail, PastIPOItem } from './types';

export const MOCK_IPO_LIST: IPOListItem[] = [
  {
    slug: 'tech-solutions-ltd',
    companyName: 'Tech Solutions Ltd',
    industry: 'IT Services',
    openDate: '2025-04-01',
    closeDate: '2025-04-05',
    priceBandLow: 420,
    priceBandHigh: 442,
    issueSize: '₹1,250 Cr',
    lotSize: 34,
    listingDate: '2025-04-11',
    status: 'Upcoming',
  },
  {
    slug: 'green-energy-india',
    companyName: 'Green Energy India',
    industry: 'Renewable Energy',
    openDate: '2025-03-20',
    closeDate: '2025-03-24',
    priceBandLow: 280,
    priceBandHigh: 295,
    issueSize: '₹850 Cr',
    lotSize: 50,
    listingDate: '2025-03-31',
    status: 'Open',
  },
  {
    slug: 'pharma-care-ltd',
    companyName: 'Pharma Care Ltd',
    industry: 'Pharmaceuticals',
    openDate: '2025-03-10',
    closeDate: '2025-03-14',
    priceBandLow: 520,
    priceBandHigh: 548,
    issueSize: '₹2,100 Cr',
    lotSize: 27,
    listingDate: '2025-03-21',
    status: 'Closed',
  },
];

export function getIPODetail(slug: string): IPODetail | null {
  const base = MOCK_IPO_LIST.find((i) => i.slug === slug);
  if (!base) return null;
  return {
    ...base,
    overview: `${base.companyName} is a leading player in the ${base.industry} sector. The company is raising capital through this IPO to fund expansion, reduce debt, and for general corporate purposes.`,
    businessModel: 'The company operates through a mix of B2B and B2C channels. Revenue is derived from core offerings in the sector, with a focus on scalable technology and operational efficiency.',
    financialHighlights: [
      { label: 'Revenue (FY24)', value: '₹1,240 Cr' },
      { label: 'Net Profit (FY24)', value: '₹180 Cr' },
      { label: 'EPS', value: '₹12.5' },
      { label: 'ROE', value: '18.2%' },
    ],
    risks: [
      'Market volatility may affect listing and post-listing price.',
      'Valuation may be subject to debate; overvaluation could lead to correction.',
      'Allotment is not guaranteed; oversubscription may result in partial or no allotment.',
    ],
    opportunities: [
      'Early entry into a growing sector with strong fundamentals.',
      'Potential listing gains if the issue is priced attractively.',
      'Long-term growth aligned with sector tailwinds.',
    ],
  };
}

export const MOCK_PAST_IPOS: PastIPOItem[] = [
  { companyName: 'Digital Payments Ltd', issuePrice: 250, listingPrice: 312, listingGainPercent: 24.8, listingDate: '2025-02-15' },
  { companyName: 'Auto Components Inc', issuePrice: 180, listingPrice: 198, listingGainPercent: 10.0, listingDate: '2025-02-01' },
  { companyName: 'FMCG Ventures', issuePrice: 420, listingPrice: 399, listingGainPercent: -5.0, listingDate: '2025-01-20' },
  { companyName: 'Infra Build Ltd', issuePrice: 320, listingPrice: 368, listingGainPercent: 15.0, listingDate: '2025-01-08' },
];
