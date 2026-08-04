import { fetchYoutubePlaylist } from '@/lib/youtube';
import CoursesClient from './CoursesClient';

// Cache revalidation can also be applied at the route level in Next.js App Router, 
// though we also passed it to the fetch calls in lib/youtube.ts
export const revalidate = 3600;

export default async function CoursesPage() {
  const courseData = await fetchYoutubePlaylist('PLIioKedKLbjY');
  
  return <CoursesClient course={courseData} />;
}
