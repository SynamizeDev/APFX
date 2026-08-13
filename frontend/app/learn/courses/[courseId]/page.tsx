import { fetchYoutubePlaylist } from '@/lib/youtube';
import LearnCourseDetailClient from './LearnCourseDetailClient';

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ courseId: string }>;
}

function getPlaylistId(courseId: string): string {
  if (courseId === 'forex') return 'PLIioKedKLbjY';
  if (courseId === 'algo') return 'PLX2aFJVbtr_A';
  if (courseId === 'insights') return 'PLdjy75lQBLY8';
  return courseId;
}

export default async function LearnCourseDetailPage({ params }: PageProps) {
  const { courseId } = await params;
  const playlistId = getPlaylistId(courseId);

  let title = '';
  let description = '';
  
  if (courseId === 'forex' || playlistId === 'PLIioKedKLbjY') {
    title = 'Learn to Trade Forex with APFX × cTrader';
    description = 'Complete beginner video course designed to help traders understand Forex markets and the cTrader platform.';
  } else if (courseId === 'algo' || playlistId === 'PLX2aFJVbtr_A') {
    title = 'Algo Trading in APFX × cTrader';
    description = 'Learn how to build, backtest, and deploy automated trading bots directly inside the cTrader platform using Python and AI.';
  } else if (courseId === 'insights' || playlistId === 'PLdjy75lQBLY8') {
    title = 'APFX Market Insights';
    description = 'In-depth market analysis, live trade breakdowns, and expert commentary on Forex movements with APFX. Master key theoretical concepts including market structure, order blocks, and price action dynamics.';
  } else {
    title = 'Custom Course Path';
    description = 'Curated educational video playlist fetched directly from YouTube.';
  }

  const courseData = await fetchYoutubePlaylist(playlistId, title, description);

  if ('error' in courseData) {
    return <LearnCourseDetailClient course={null} error={courseData.error} />;
  }

  return <LearnCourseDetailClient course={courseData} error={null} />;
}
