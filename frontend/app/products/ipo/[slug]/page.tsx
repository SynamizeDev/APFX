import { notFound } from 'next/navigation';
import { getIPODetail, MOCK_IPO_LIST } from '@/lib/ipo/mockData';
import IPODetailContent from '@/components/sections/ipo/IPODetailContent';

export function generateStaticParams() {
  return MOCK_IPO_LIST.map((ipo) => ({ slug: ipo.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function IPODetailPage({ params }: PageProps) {
  const { slug } = await params;
  const ipo = getIPODetail(slug);
  if (!ipo) notFound();

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', paddingTop: '2rem' }}>
      <div className="container" style={{ paddingInline: 'var(--container-px)' }}>
        <IPODetailContent ipo={ipo} />
      </div>
    </div>
  );
}
