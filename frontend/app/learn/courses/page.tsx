import { fetchYoutubePlaylist } from '@/lib/youtube';
import LearnCoursesClient from './LearnCoursesClient';

export const revalidate = 3600;

export default async function LearnCoursesPage() {
  const [forexCourse, algoCourse, course3] = await Promise.all([
    fetchYoutubePlaylist(
      'PLIioKedKLbjY',
      'Learn to Trade Forex with APFX × cTrader',
      'Complete beginner video course designed to help traders understand Forex markets and the cTrader platform.'
    ),
    fetchYoutubePlaylist(
      'PLX2aFJVbtr_A',
      'Algo Trading in APFX × cTrader',
      'Learn how to build, backtest, and deploy automated trading bots directly inside the cTrader platform using Python and AI.'
    ),
    fetchYoutubePlaylist(
      'PLdjy75lQBLY8',
      'APFX Market Insights',
      'In-depth market analysis, live trade breakdowns, and expert commentary on Forex movements with APFX. Master key theoretical concepts including market structure, order blocks, and price action dynamics.'
    ),
  ]);

  return <LearnCoursesClient forexCourse={forexCourse} algoCourse={algoCourse} course3={course3} />;
}
