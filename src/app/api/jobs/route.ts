import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "software engineer";
  const location = searchParams.get("location") || "India";
  const remote = searchParams.get("remote") === "true";
  const page = searchParams.get("page") || "1";

  try {
    const appId = "8e98b54e";
    const appKey = "6fc41e054aab821648a8a374750688e1";
    
    // Adzuna API URL for India (in)
    const url = new URL(`https://api.adzuna.com/v1/api/jobs/in/search/${page}`);
    url.searchParams.set("app_id", appId);
    url.searchParams.set("app_key", appKey);
    url.searchParams.set("what", q);
    url.searchParams.set("where", location === "India" ? "" : location);
    url.searchParams.set("results_per_page", "20");
    if (remote) {
      url.searchParams.set("what", `${q} remote`);
    }

    const res = await fetch(url.toString());

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Adzuna API Error (${res.status}):`, errorText);
      return NextResponse.json({ data: [], error: `API Error: ${res.status}` }, { status: res.status });
    }

    const json = await res.json();
    
    // Map Adzuna results to our standard format
    const jobs = (json.results || []).map((job: any) => ({
      id: job.id,
      title: job.title.replace(/<\/?[^>]+(>|$)/g, ""), // Clean HTML tags
      company: job.company?.display_name || "Unknown Company",
      location: job.location?.display_name || "India",
      url: job.redirect_url,
      description: job.description.replace(/<\/?[^>]+(>|$)/g, ""),
      salary: job.salary_min ? `₹${(job.salary_min/100000).toFixed(1)}L - ₹${(job.salary_max/100000).toFixed(1)}L` : "Salary Undisclosed",
      posted_at: job.created,
      type: job.contract_type === "permanent" ? "Full-time" : "Contract",
    }));

    return NextResponse.json({ data: jobs });
  } catch (error: any) {
    console.error("Jobs API Error:", error);
    return NextResponse.json({ data: [], error: error.message }, { status: 500 });
  }
}
