import { notFound } from 'next/navigation';
import { getRecommendationDetail } from '@/lib/recommendations/mockData';
import RecommendationDetailContent from '@/components/sections/recommendations/RecommendationDetailContent';
import { MOCK_RECOMMENDATIONS } from '@/lib/recommendations/mockData';

export function generateStaticParams() {
  return MOCK_RECOMMENDATIONS.map((r) => ({ slug: r.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function RecommendationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const rec = getRecommendationDetail(slug);
  if (!rec) notFound();

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', paddingTop: '2rem' }}>
      <div className="container" style={{ paddingInline: 'var(--container-px)' }}>
        <RecommendationDetailContent rec={rec} />
      </div>
    </div>
  );
}
