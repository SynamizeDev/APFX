import type { Course, CourseVideo } from '../app/academy/courses/coursesData';

function parseDuration(duration: string) {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return '0:00';
  
  const hours = (match[1] || '').replace('H', '');
  const minutes = (match[2] || '').replace('M', '') || '0';
  const seconds = (match[3] || '').replace('S', '') || '0';
  
  const m = parseInt(minutes, 10) || 0;
  const s = parseInt(seconds, 10).toString().padStart(2, '0');
  
  if (hours) {
    const h = parseInt(hours, 10);
    return `${h}:${m.toString().padStart(2, '0')}:${s}`;
  }
  
  return `${m}:${s}`;
}

export async function fetchYoutubePlaylist(
  playlistId: string,
  title = 'Learn to Trade Forex with APFX × cTrader',
  subtitle = 'Complete beginner video course designed to help traders understand Forex markets and the cTrader platform.'
): Promise<Course | { error: string }> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    return { error: 'The playlist cannot be fetched because the API key is not configured.' };
  }

  try {
    const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}`;
    const playlistRes = await fetch(playlistUrl, { next: { revalidate: 3600 } });
    if (!playlistRes.ok) {
      const errBody = await playlistRes.json().catch(() => null);
      const errMsg = errBody?.error?.message ?? `HTTP ${playlistRes.status}`;
      console.error('YouTube API error (playlistItems):', JSON.stringify(errBody, null, 2));
      const devHint = process.env.NODE_ENV === 'development'
        ? ` Google said: "${errMsg}" — check your API key and playlist visibility.`
        : '';
      throw new Error(`YouTube playlist fetch failed (${playlistRes.status}).${devHint}`);
    }
    const playlistData = await playlistRes.json();
    
    const items = playlistData.items || [];
    if (items.length === 0) {
       return {
          id: playlistId,
          title,
          subtitle,
          playlistId: playlistId,
          videos: []
       };
    }

    const videoIds = items.map((item: any) => item.snippet.resourceId.videoId);
    
    // Batch fetch video details for duration and higher quality thumbnails
    const videosUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${videoIds.join(',')}&key=${apiKey}`;
    const videosRes = await fetch(videosUrl, { next: { revalidate: 3600 } });
    if (!videosRes.ok) {
      const errBody = await videosRes.json().catch(() => null);
      const errMsg = errBody?.error?.message ?? `HTTP ${videosRes.status}`;
      console.error('YouTube API error (videos):', JSON.stringify(errBody, null, 2));
      throw new Error(`YouTube videos fetch failed: ${errMsg}`);
    }
    const videosData = await videosRes.json();
    
    const videosMap = new Map(videosData.items.map((v: any) => [v.id, v]));

    const videos: CourseVideo[] = items.map((item: any, index: number) => {
      const videoId = item.snippet.resourceId.videoId;
      const videoDetail: any = videosMap.get(videoId);
      
      const duration = videoDetail ? parseDuration(videoDetail.contentDetails.duration) : 'N/A';
      
      // Get highest quality thumbnail
      const snippet = videoDetail ? videoDetail.snippet : item.snippet;
      const thumbnails = snippet.thumbnails;
      const thumbnail = (thumbnails.maxres || thumbnails.high || thumbnails.medium || thumbnails.default)?.url || '';
      
      return {
        id: videoId,
        title: snippet.title,
        thumbnail,
        duration,
        episode: index + 1,
        youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`
      };
    });

    return {
      id: playlistId,
      title,
      subtitle,
      playlistId: playlistId,
      videos
    };

  } catch (error: any) {
    console.error('Error fetching YouTube playlist:', error);
    const devMessage = process.env.NODE_ENV === 'development'
      ? error?.message ?? 'Unknown error'
      : 'Failed to fetch playlist data.';
    return { error: devMessage };
  }
}
