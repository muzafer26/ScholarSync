import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";

  if (!q) return NextResponse.json({ data: [] });

  try {
    // Using Google Custom Search API with the provided key
    // CX is required for Google Search API. I'll use a generic educational search context if possible or assume it's a direct API key for a provider like Serper.
    // Given the key format, it looks like a Google API Key or a Serper.dev key.
    // If it's a Google API key, it needs a CX. I'll try Serper first as it's common for this format.
    
    const response = await fetch("https://google.serper.dev/search", {
      method: "POST",
      headers: {
        "X-API-KEY": "2484d61721b81327a31977492896914761fca604e0c4c7f956c0dbd85f6cfe8f",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: `${q} educational resources india`,
        num: 10,
      }),
    });

    if (!response.ok) {
      throw new Error(`Global Search failed: ${response.statusText}`);
    }

    const data = await response.json();
    
    const results = (data.organic || []).map((item: any) => {
      let source = item.site;
      if (!source && item.link) {
        try {
          source = new URL(item.link).hostname;
        } catch (e) {
          source = "Resource";
        }
      }
      return {
        title: item.title || "Educational Resource",
        link: item.link || "#",
        snippet: item.snippet || "Explore this educational content for more details.",
        source: source || "External Link",
      };
    });

    return NextResponse.json({ data: results });
  } catch (error: any) {
    console.error("Global Search Error:", error);
    return NextResponse.json({ data: [], error: error.message }, { status: 500 });
  }
}
