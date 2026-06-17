import { NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { resId, feedbackType, timestamp } = body;

    // Log to standard output for production tracking/monitoring
    console.log(`[RESOURCE FEEDBACK] Resource ID: "${resId}" | Status: ${feedbackType.toUpperCase()} | Time: ${timestamp}`);

    // Log to local file in development mode
    if (process.env.NODE_ENV === 'development') {
      const logFilePath = path.join(process.cwd(), 'resource-feedback-log.json');
      let currentLogs = [];
      
      if (fs.existsSync(logFilePath)) {
        try {
          currentLogs = JSON.parse(fs.readFileSync(logFilePath, 'utf-8'));
        } catch (e) {
          // ignore corrupted logs
        }
      }
      
      currentLogs.push({ resId, feedbackType, timestamp });
      fs.writeFileSync(logFilePath, JSON.stringify(currentLogs.slice(-1000), null, 2), 'utf-8');
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('[RESOURCE REPORT ERROR]', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
