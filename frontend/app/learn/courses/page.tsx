import { fetchYoutubePlaylist } from '@/lib/youtube';
import LearnCoursesClient from './LearnCoursesClient';

export const revalidate = 3600;

export default async function LearnCoursesPage() {
  const [forexCourse, algoCourse] = await Promise.all([
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
  ]);

  return <LearnCoursesClient forexCourse={forexCourse} algoCourse={algoCourse} />;
}
