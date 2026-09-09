import { getPlaylistVideos } from '@/lib/youtube';
import { ReviewsClientPage } from '@/components/ReviewsClientPage';

// Next.js Incremental Static Revalidation: revalidate playlist data every 1 hour (3600 seconds)
export const revalidate = 3600;

export default async function ReviewsHomePage() {
  const fetchResult = await getPlaylistVideos();

  return (
    <ReviewsClientPage
      initialTestimonials={fetchResult.videos}
      dataSource={fetchResult.source}
      error={fetchResult.error}
    />
  );
}
