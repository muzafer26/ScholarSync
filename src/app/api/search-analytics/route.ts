import { NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query, timestamp, resultsCount, clickedResult } = body;

    // 1. Production Console Logs for remote log aggregators (e.g., Datadog, Vercel telemetry)
    console.log(`[ANALYTICS] Query: "${query}" | Results: ${resultsCount} | Clicked: ${clickedResult || 'None'} | Time: ${timestamp}`);

    // 2. Development Mode: Log to local file for offline auditing
    if (process.env.NODE_ENV === 'development') {
      const logFilePath = path.join(process.cwd(), 'search-analytics-log.json');
      let currentLogs = [];
      
      if (fs.existsSync(logFilePath)) {
        try {
          currentLogs = JSON.parse(fs.readFileSync(logFilePath, 'utf-8'));
        } catch (e) {
          // Reset file if corrupted
        }
      }
      
      currentLogs.push({
        query,
        timestamp,
        resultsCount,
        clickedResult: clickedResult || null
      });

      fs.writeFileSync(logFilePath, JSON.stringify(currentLogs.slice(-1000), null, 2), 'utf-8');
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('[ANALYTICS ERROR]', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
