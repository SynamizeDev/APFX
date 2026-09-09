import { VideoTestimonial } from '../types/testimonial';
import { MOCK_TESTIMONIALS } from '../data/mockTestimonials';
import { TESTIMONIAL_METADATA_MAP } from '../data/testimonialMetadata';

export interface PlaylistFetchResult {
  videos: VideoTestimonial[];
  source: 'youtube_api' | 'youtube_rss' | 'mock_fallback';
  error?: string;
}

/**
 * Parses ISO 8601 duration string (e.g., PT4M15S, PT1H2M3S) into standard mm:ss or hh:mm:ss string.
 */
function parseISO8601Duration(durationStr?: string): string | undefined {
  if (!durationStr) return undefined;
  const match = durationStr.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return undefined;
  const hours = match[1] ? parseInt(match[1], 10) : 0;
  const minutes = match[2] ? parseInt(match[2], 10) : 0;
  const seconds = match[3] ? parseInt(match[3], 10) : 0;

  const paddedSeconds = seconds.toString().padStart(2, '0');
  if (hours > 0) {
    const paddedMinutes = minutes.toString().padStart(2, '0');
    return `${hours}:${paddedMinutes}:${paddedSeconds}`;
  }
  return `${minutes}:${paddedSeconds}`;
}

function decodeXmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

/**
 * Public RSS Feed Fetcher (No API Key Required).
 * Fetches the public YouTube XML feed for playlist PLZOZmm4tTOOE.
 */
async function fetchPlaylistFromRss(playlistId: string): Promise<VideoTestimonial[]> {
  const rssUrl = `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`;
  const response = await fetch(rssUrl, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`YouTube RSS feed HTTP error! status: ${response.status}`);
  }

  const xmlText = await response.text();
  const entries: VideoTestimonial[] = [];
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
  let match;

  while ((match = entryRegex.exec(xmlText)) !== null) {
    const entryXml = match[1];

    const videoIdMatch = entryXml.match(/<yt:videoId>(.*?)<\/yt:videoId>/);
    const titleMatch = entryXml.match(/<title>(.*?)<\/title>/);
    const publishedMatch = entryXml.match(/<published>(.*?)<\/published>/);
    const descriptionMatch = entryXml.match(/<media:description>([\s\S]*?)<\/media:description>/);
    const thumbnailMatch = entryXml.match(/<media:thumbnail url="(.*?)"/);
    const authorMatch = entryXml.match(/<name>(.*?)<\/name>/);

    const videoId = videoIdMatch ? videoIdMatch[1] : '';
    if (!videoId) continue;

    const title = titleMatch ? decodeXmlEntities(titleMatch[1]) : 'APFX Client Testimonial';
    const publishedAt = publishedMatch ? publishedMatch[1].split('T')[0] : '';
    const rawDescription = descriptionMatch ? decodeXmlEntities(descriptionMatch[1]) : '';
    const thumbnailUrl = thumbnailMatch ? thumbnailMatch[1] : `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    const authorName = authorMatch ? decodeXmlEntities(authorMatch[1]) : 'APFX Trader';

    const metadata = TESTIMONIAL_METADATA_MAP[videoId];

    entries.push({
      id: videoId,
      youtubeId: videoId,
      clientName: metadata?.clientName || authorName,
      role: metadata?.role,
      country: metadata?.country,
      countryCode: metadata?.countryCode,
      rating: metadata?.rating,
      title: metadata?.customTitle || title,
      body: metadata?.customBody || rawDescription,
      thumbnailUrl: thumbnailUrl,
      category: metadata?.category,
      verified: metadata?.verified ?? false,
      featured: metadata?.featured ?? false,
      publishedAt: publishedAt,
      duration: metadata?.duration,
      tradingAccountId: metadata?.tradingAccountId,
    });
  }

  return entries;
}

/**
 * Server-side abstraction for fetching YouTube playlist items.
 * Safe to call inside Next.js Server Components.
 * Uses YouTube Data API when YOUTUBE_API_KEY is present, or falls back seamlessly to public YouTube RSS feed.
 */
export async function getPlaylistVideos(): Promise<PlaylistFetchResult> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const playlistId = process.env.YOUTUBE_PLAYLIST_ID || 'PLZOZmm4tTOOE';

  // If no API key is provided, fetch via public YouTube RSS feed directly
  if (!apiKey) {
    try {
      const rssVideos = await fetchPlaylistFromRss(playlistId);
      return {
        videos: rssVideos.length > 0 ? rssVideos : MOCK_TESTIMONIALS,
        source: 'youtube_rss',
      };
    } catch (rssErr: any) {
      console.warn('[YouTube RSS Fetch Warning]:', rssErr?.message || rssErr);
      return {
        videos: MOCK_TESTIMONIALS,
        source: 'mock_fallback',
        error: 'Failed to fetch YouTube playlist RSS feed.',
      };
    }
  }

  try {
    let rawItems: any[] = [];
    let nextPageToken: string | undefined = undefined;

    // 1. Paginate through all playlist items
    do {
      const pageTokenQuery: string = nextPageToken ? `&pageToken=${nextPageToken}` : '';
      const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=50&playlistId=${playlistId}${pageTokenQuery}&key=${apiKey}`;
      
      const response = await fetch(url, {
        next: { revalidate: 3600 }, // Revalidate cache every hour
      });

      if (!response.ok) {
        throw new Error(`YouTube API HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.items && Array.isArray(data.items)) {
        rawItems = rawItems.concat(data.items);
      }

      nextPageToken = data.nextPageToken;
    } while (nextPageToken);

    // Filter out deleted/private videos
    const validItems = rawItems.filter((item: any) => {
      const title = item.snippet?.title;
      return title && title !== 'Private video' && title !== 'Deleted video';
    });

    if (validItems.length === 0) {
      return {
        videos: [],
        source: 'youtube_api',
      };
    }

    // 2. Extract video IDs for batch fetching details
    const videoIds = validItems
      .map((item: any) => item.snippet?.resourceId?.videoId || item.contentDetails?.videoId)
      .filter(Boolean);

    const videoDetailsMap: Record<string, { duration?: string; thumbnail?: string }> = {};

    for (let i = 0; i < videoIds.length; i += 50) {
      const chunk = videoIds.slice(i, i + 50);
      const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${chunk.join(',')}&key=${apiKey}`;
      
      const detailsRes = await fetch(detailsUrl, {
        next: { revalidate: 3600 },
      });

      if (detailsRes.ok) {
        const detailsData = await detailsRes.json();
        if (detailsData.items && Array.isArray(detailsData.items)) {
          for (const v of detailsData.items) {
            const duration = parseISO8601Duration(v.contentDetails?.duration);
            const thumbs = v.snippet?.thumbnails;
            const thumbnail = thumbs?.maxres?.url || thumbs?.high?.url || thumbs?.standard?.url || thumbs?.medium?.url;
            videoDetailsMap[v.id] = { duration, thumbnail };
          }
        }
      }
    }

    // 3. Map YouTube items to internal VideoTestimonial data model
    const videos: VideoTestimonial[] = validItems.map((item: any, index: number) => {
      const snippet = item.snippet;
      const videoId = snippet.resourceId?.videoId || item.contentDetails?.videoId || `yt-${index}`;
      const publishedAt = snippet.publishedAt ? snippet.publishedAt.split('T')[0] : '2026-08-01';
      
      const detail = videoDetailsMap[videoId] || {};
      const thumbnailUrl = detail.thumbnail || snippet.thumbnails?.high?.url || snippet.thumbnails?.medium?.url || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

      const metadata = TESTIMONIAL_METADATA_MAP[videoId];

      return {
        id: videoId,
        youtubeId: videoId,
        clientName: metadata?.clientName || snippet.videoOwnerChannelTitle || snippet.channelTitle,
        role: metadata?.role,
        country: metadata?.country,
        countryCode: metadata?.countryCode,
        rating: metadata?.rating,
        title: metadata?.customTitle || snippet.title || 'APFX Video Review',
        body: metadata?.customBody || snippet.description || '',
        thumbnailUrl: thumbnailUrl,
        category: metadata?.category,
        verified: metadata?.verified ?? false,
        featured: metadata?.featured ?? false,
        publishedAt: publishedAt,
        duration: detail.duration || metadata?.duration,
        tradingAccountId: metadata?.tradingAccountId,
      };
    });

    return {
      videos,
      source: 'youtube_api',
    };
  } catch (error: any) {
    console.warn('[YouTube API Fetch Warning, attempting RSS fallback]:', error?.message || error);
    try {
      const rssVideos = await fetchPlaylistFromRss(playlistId);
      return {
        videos: rssVideos.length > 0 ? rssVideos : MOCK_TESTIMONIALS,
        source: 'youtube_rss',
      };
    } catch (rssErr: any) {
      return {
        videos: MOCK_TESTIMONIALS,
        source: 'mock_fallback',
        error: error?.message || 'Failed to fetch YouTube playlist',
      };
    }
  }
}
