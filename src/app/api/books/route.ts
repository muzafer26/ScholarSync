import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') || 'programming';
  try {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}&maxResults=8&filter=free-ebooks&orderBy=relevance`;
    const res = await fetch(url);
    const json = await res.json();
    const result = {
      data: (json.items || []).map((item: any) => ({
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors || ['Unknown'],
        cover: item.volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:') || null,
        description: item.volumeInfo.description?.slice(0, 150) || '',
        previewUrl: item.volumeInfo.previewLink,
        infoUrl: item.volumeInfo.infoLink,
        pages: item.volumeInfo.pageCount,
        rating: item.volumeInfo.averageRating,
      })),
    };
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ data: [] }, { status: 500 });
  }
}
