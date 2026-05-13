import { NextRequest, NextResponse } from 'next/server';

// Cache jobs for 1 hour to stay within RapidAPI free tier limits
const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') || 'software engineer intern';
  const page = req.nextUrl.searchParams.get('page') || '1';
  const remote = req.nextUrl.searchParams.get('remote') || 'false';

  const cacheKey = `${q}-${page}-${remote}`;
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return NextResponse.json(cached.data);
  }

  try {
    const url = new URL('https://jsearch.p.rapidapi.com/search');
    url.searchParams.set('query', q);
    url.searchParams.set('page', page);
    url.searchParams.set('num_pages', '1');
    if (remote === 'true') url.searchParams.set('remote_jobs_only', 'true');

    const res = await fetch(url.toString(), {
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY || '',
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
      },
    });

    if (!res.ok) {
      console.error('JSearch API error:', res.status);
      return NextResponse.json({ data: [], error: 'API limit reached' }, { status: 429 });
    }

    const json = await res.json();
    const result = {
      data: (json.data || []).slice(0, 10).map((job: any) => ({
        id: job.job_id,
        title: job.job_title,
        company: job.employer_name,
        logo: job.employer_logo,
        location: job.job_city ? `${job.job_city}, ${job.job_country}` : job.job_country || 'Remote',
        type: job.job_employment_type,
        remote: job.job_is_remote,
        url: job.job_apply_link,
        posted: job.job_posted_at_datetime_utc,
        description: job.job_description?.slice(0, 200) + '...',
      })),
    };

    cache.set(cacheKey, { data: result, timestamp: Date.now() });
    return NextResponse.json(result);
  } catch (err) {
    console.error('Jobs API error:', err);
    return NextResponse.json({ data: [], error: 'Failed to fetch jobs' }, { status: 500 });
  }
}
