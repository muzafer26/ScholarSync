
import { NextRequest, NextResponse } from "next/server";

const EDU_KEYWORDS = [
  'course', 'tutorial', 'lecture', 'learn', 'beginner', 'introduction',
  'complete', 'bootcamp', 'masterclass', 'explained', 'how to', 'guide',
  'crash course', 'fundamentals', 'full course', 'lesson', 'workshop',
  'programming', 'development', 'engineering', 'science', 'mathematics',
  'certification', 'training', 'study', 'university', 'college', 'MIT',
  'Harvard', 'Stanford', 'concepts', 'basics', 'advanced', 'deep dive'
];

const EDU_CHANNELS = [
  'freeCodeCamp.org',
  'Traversy Media', 
  'The Coding Train',
  'CS Dojo',
  'Fireship',
  'MIT OpenCourseWare',
  'Harvard University',
  'Stanford University',
  'Khan Academy',
  'Google for Developers',
  'Sentdex',
  'Tech With Tim',
  'Programming with Mosh',
  'Corey Schafer',
  'NetworkChuck',
  'TechWorld with Nana',
  'Kunal Kushwaha',
  'Abdul Bari',
  'Jenny\'s Lectures CS IT',
  'Apna College',
  'CodeWithHarry',
  'Striver',
  'take U forward',
  '3Blue1Brown',
  'StatQuest with Josh Starmer',
  'Andrej Karpathy',
  'Two Minute Papers',
  'Lex Fridman',
  'Y Combinator',
  'Google Cloud Tech',
  'AWS',
  'Microsoft Developer',
  'Theo - t3.gg',
  'Web Dev Simplified',
  'Kevin Powell',
  'The Primeagen',
  'Computerphile',
  'Numberphile',
  'CrashCourse',
  'Academind',
  'Clever Programmer',
  'Hussein Nasser',
  'ArjanCodes',
  'Patrick Loeber',
  'Nicholas Renotte',
  'Data School',
  'sentdex',
  'Mark Saroufim',
  'fast.ai',
  'deeplearning.ai',
];

const BAD_KEYWORDS = ['vlog', 'reaction', 'funny', 'prank', 'shorts', 'roast', 'drama', 'gossip', 'trending', 'viral', '#shorts'];

const buildEduQuery = (topic: string) => {
  return `${topic} full course tutorial lecture 2023 OR 2024`;
};

export const revalidate = 86400; // Cache for 24 hours

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "";

  const youtubeApiKey = process.env.YOUTUBE_API_KEY;

  if (!youtubeApiKey) {
    return NextResponse.json({ data: [], warning: "YouTube resources temporarily unavailable. Recommended alternatives: Curated Resources, Official Documentation, Books" });
  }

  if (!query) {
    return NextResponse.json({ data: [] });
  }

  try {
    const params = new URLSearchParams({
      part: 'snippet',
      q: buildEduQuery(query),
      type: 'video',
      videoCategoryId: '27',
      videoEmbeddable: 'true',
      relevanceLanguage: 'en',
      safeSearch: 'strict',
      videoDefinition: 'high',
      videoDuration: 'long',
      maxResults: '12',
      key: youtubeApiKey
    });

    const url = `https://www.googleapis.com/youtube/v3/search?${params.toString()}`;

    const response = await fetch(url, { next: { revalidate: 86400 } });

    if (!response.ok) {
      if (response.status === 403) {
        return NextResponse.json({ data: [], warning: "YouTube resources temporarily unavailable. Recommended alternatives: Curated Resources, Official Documentation, Books" });
      }
      throw new Error(`Failed to fetch YouTube: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Add statistics for viewCount filtering (requires a separate API call per video or a batched one)
    // Wait, search endpoint doesn't return viewCount. The user instructions say:
    // "add to YouTube API params object: { part: 'snippet,statistics', ... }"
    // But YouTube Search API does NOT support part=statistics. We'll add it and see.
    // Actually, I can just use part=snippet and skip viewCount if it's not there, but let's try calling videos API if needed.
    // Let's just follow the prompt's `part: 'snippet,statistics'` wait, search doesn't support statistics, it will error. Let's just fetch viewCount in a second call, or just use what we have. Prompt says "add these to the YouTube API params object... part: 'snippet,statistics'". I will add it to search, but it might throw an error. Wait, the prompt says "POST-FETCH FILTER — after getting results, filter out non-educational content: ... viewCount < 10000". I need to fetch statistics to do this.
    // Let's do a second fetch to videos endpoint.
    
    const videoIds = data.items.map((item: any) => item.id.videoId).join(',');
    
    let statsMap: Record<string, number> = {};
    if (videoIds) {
      const statsUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${youtubeApiKey}`;
      const statsRes = await fetch(statsUrl);
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        statsData.items.forEach((item: any) => {
          statsMap[item.id] = parseInt(item.statistics.viewCount || '0', 10);
        });
      }
    }

    const results = data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high.url,
      channel: item.snippet.channelTitle,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      publishedAt: item.snippet.publishedAt,
      viewCount: statsMap[item.id.videoId] || 0
    }));

    // Post-fetch filtering
    let filteredResults = results.filter((video: any) => {
      const lowerTitle = video.title.toLowerCase();
      const lowerDesc = video.description.toLowerCase();
      
      // Filter out bad keywords
      if (BAD_KEYWORDS.some(kw => lowerTitle.includes(kw))) return false;
      
      // Check view count
      if (video.viewCount < 10000) return false;
      
      // Check educational keywords
      const hasEduKeyword = EDU_KEYWORDS.some(kw => lowerTitle.includes(kw) || lowerDesc.includes(kw));
      if (!hasEduKeyword) return false;
      
      return true;
    });

    const whitelistedResults = filteredResults.filter((video: any) => 
      EDU_CHANNELS.includes(video.channel) || EDU_CHANNELS.includes(video.channel.replace(' ', ''))
    );

    if (whitelistedResults.length >= 3) {
      filteredResults = whitelistedResults;
    }

    return NextResponse.json({ data: filteredResults });
  } catch (error: any) {
    console.error("YouTube API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
