import * as fs from 'fs';
import * as path from 'path';
import { Agent } from 'https';

const seedFilePath = path.join(__dirname, '../src/lib/seed-resources.ts');
const outputFilePath = path.join(__dirname, '../audit-results.json');

interface AuditResult {
  id: string;
  title: string;
  url: string;
  status: 'Active' | 'Inactive';
  statusCode: number | null;
  error?: string;
  lastChecked: string;
  healthScore: number;
}

// Extract URLs and titles from seed-resources.ts
function parseResources(): { id: string; title: string; url: string }[] {
  const content = fs.readFileSync(seedFilePath, 'utf-8');
  // Simple regex matching resource blocks
  const resourceRegex = /\{[^}]*id:\s*'([^']+)'[^}]*title:\s*'([^']+)'[^}]*url:\s*'([^']+)'/g;
  const resources: { id: string; title: string; url: string }[] = [];
  let match;

  while ((match = resourceRegex.exec(content)) !== null) {
    resources.push({
      id: match[1],
      title: match[2],
      url: match[3]
    });
  }

  return resources;
}

async function checkLink(title: string, url: string): Promise<{ statusCode: number | null; error?: string }> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

  try {
    const res = await fetch(url, {
      method: 'HEAD',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    return { statusCode: res.status };
  } catch (err: any) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      return { statusCode: null, error: 'Timeout' };
    }
    return { statusCode: null, error: err.message || 'Connection Error' };
  }
}

async function run() {
  console.log('Initializing ScholarSync Link Health Audit...');
  const resources = parseResources();
  console.log(`Parsed ${resources.length} resources to verify.`);
  
  const results: AuditResult[] = [];
  
  for (const r of resources) {
    console.log(`Checking [${r.id}]: ${r.title} (${r.url})...`);
    const check = await checkLink(r.title, r.url);
    
    const isActive = check.statusCode ? (check.statusCode >= 200 && check.statusCode < 400) : false;
    const healthScore = isActive ? 100 : (check.error === 'Timeout' ? 50 : 0);

    results.push({
      id: r.id,
      title: r.title,
      url: r.url,
      status: isActive ? 'Active' : 'Inactive',
      statusCode: check.statusCode,
      error: check.error,
      lastChecked: new Date().toISOString(),
      healthScore
    });

    // Gentle delay to avoid rate-limiting
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  fs.writeFileSync(outputFilePath, JSON.stringify(results, null, 2), 'utf-8');
  console.log(`Audit complete. Results saved to: ${outputFilePath}`);
}

run().catch(console.error);
