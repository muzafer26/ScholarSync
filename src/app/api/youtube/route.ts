import { NextRequest, NextResponse } from 'next/server';

const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 30 * 60 * 1000; // 30 min

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') || 'programming tutorial';
  const max = req.nextUrl.searchParams.get('max') || '8';

  const cacheKey = `yt-${q}`;
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return NextResponse.json(cached.data);
  }

  try {
    const url = new URL('https://www.googleapis.com/youtube/v3/search');
    url.searchParams.set('part', 'snippet');
    url.searchParams.set('q', q + ' free course tutorial');
    url.searchParams.set('type', 'video');
    url.searchParams.set('maxResults', max);
    url.searchParams.set('order', 'relevance');
    url.searchParams.set('videoDuration', 'medium');
    url.searchParams.set('key', process.env.YOUTUBE_API_KEY || '');

    const res = await fetch(url.toString());
    if (!res.ok) {
      return NextResponse.json({ data: [] }, { status: 429 });
    }

    const json = await res.json();
    const result = {
      data: (json.items || []).map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        channel: item.snippet.channelTitle,
        thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
        description: item.snippet.description?.slice(0, 150),
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        published: item.snippet.publishedAt,
      })),
    };

    cache.set(cacheKey, { data: result, timestamp: Date.now() });
    return NextResponse.json(result);
  } catch (err) {
    console.error('YouTube API error:', err);
    return NextResponse.json({ data: [] }, { status: 500 });
  }
}
