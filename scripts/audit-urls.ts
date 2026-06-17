import fs from 'fs';
import path from 'path';

// This script should be run using: npx ts-node scripts/audit-urls.ts

// Simulated import of resources since we are running a standalone script
// In a real execution, you would import { resources } from '../src/lib/seed-resources';
const seedFiles = [
  '../src/lib/seed-resources.ts',
  '../src/lib/seed-resources-extra.ts'
];

interface AuditResult {
  id: string;
  title: string;
  url: string;
  isValid: boolean | 'CHECK_MANUALLY';
  statusCode: number | string;
  isDirect: boolean;
  qualityScore: number;
}

function calculateUrlQualityScore(url: string): number {
  const lowercaseUrl = url.toLowerCase();
  
  // 1. Is it a generic homepage?
  // e.g. https://www.codecademy.com/ or https://exercism.org
  const urlObj = new URL(url);
  const path = urlObj.pathname.replace(/\/$/, ''); // Remove trailing slash
  
  if (path === '' || path === '/') {
    return 20; // Massive penalty for generic homepages
  }
  
  // 2. Is it a direct course/curriculum page?
  if (lowercaseUrl.includes('/course') || 
      lowercaseUrl.includes('/learn') || 
      lowercaseUrl.includes('/tutorial') || 
      lowercaseUrl.includes('/curriculum') ||
      lowercaseUrl.includes('/tracks/')) {
    return 100;
  }
  
  // 3. Is it documentation?
  if (lowercaseUrl.includes('/docs') || 
      lowercaseUrl.includes('/documentation') ||
      urlObj.hostname.includes('docs.')) {
    return 95;
  }
  
  // 4. Is it a github repo?
  if (urlObj.hostname === 'github.com') {
    // A repo should have an owner and repo name: github.com/owner/repo
    const parts = path.split('/').filter(Boolean);
    if (parts.length >= 2) return 95;
    return 20; // Just github.com/owner or github.com
  }
  
  // Default score for valid inner pages
  return 80;
}

async function checkUrl(urlStr: string): Promise<{ valid: boolean | 'CHECK_MANUALLY', status: number | string }> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout
    
    // First try a HEAD request
    let response = await fetch(urlStr, { 
      method: 'HEAD',
      headers: { 'User-Agent': 'ScholarSync-Audit-Bot/1.0' },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    // Some servers block HEAD requests, fallback to GET
    if (response.status === 405 || response.status === 403) {
      const getController = new AbortController();
      const getTimeout = setTimeout(() => getController.abort(), 8000);
      
      response = await fetch(urlStr, {
        method: 'GET',
        headers: { 'User-Agent': 'ScholarSync-Audit-Bot/1.0' },
        signal: getController.signal
      });
      
      clearTimeout(getTimeout);
    }
    
    if (response.ok) {
      return { valid: true, status: response.status };
    } else if (response.status === 404 || response.status === 410) {
      return { valid: false, status: response.status };
    } else if (response.status >= 300 && response.status < 400) {
      return { valid: 'CHECK_MANUALLY', status: `Redirect ${response.status}` };
    } else {
      return { valid: 'CHECK_MANUALLY', status: response.status };
    }
    
  } catch (error: any) {
    if (error.name === 'AbortError') {
      return { valid: 'CHECK_MANUALLY', status: 'Timeout' };
    }
    return { valid: false, status: error.code || 'Network Error' };
  }
}

// Very basic regex extractor to pull URLs from the TypeScript files without compiling them
function extractResources(filePath: string) {
  const content = fs.readFileSync(path.join(__dirname, filePath), 'utf-8');
  const resources: {id: string, title: string, url: string}[] = [];
  
  // Match object literals that look like resources
  const regex = /id:\s*['"]([^'"]+)['"][\s\S]*?title:\s*['"]([^'"]+)['"][\s\S]*?url:\s*['"]([^'"]+)['"]/g;
  let match;
  
  while ((match = regex.exec(content)) !== null) {
    resources.push({
      id: match[1],
      title: match[2],
      url: match[3]
    });
  }
  
  return resources;
}

async function runAudit() {
  console.log('🚀 Starting ScholarSync 100% Resource URL Audit...\n');
  
  const allResources = [
    ...extractResources(seedFiles[0]),
    ...extractResources(seedFiles[1])
  ];
  
  console.log(`Found ${allResources.length} resources to audit.\n`);
  
  const results: AuditResult[] = [];
  
  // Process in small batches to avoid network exhaustion
  const batchSize = 10;
  for (let i = 0; i < allResources.length; i += batchSize) {
    const batch = allResources.slice(i, i + batchSize);
    
    const batchPromises = batch.map(async (res) => {
      const urlCheck = await checkUrl(res.url);
      const qualityScore = calculateUrlQualityScore(res.url);
      
      return {
        id: res.id,
        title: res.title,
        url: res.url,
        isValid: urlCheck.valid,
        statusCode: urlCheck.status,
        isDirect: qualityScore >= 80,
        qualityScore
      };
    });
    
    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);
    
    process.stdout.write(`Progress: ${Math.min(i + batchSize, allResources.length)} / ${allResources.length}\r`);
  }
  
  console.log('\n\n📊 Audit Complete!\n');
  
  // Print Table
  console.table(
    results.map(r => ({
      Title: r.title.substring(0, 30) + (r.title.length > 30 ? '...' : ''),
      'URL Valid': r.isValid === true ? '✅ PASS' : r.isValid === false ? '❌ FAIL' : '⚠️ WARN',
      Status: r.statusCode,
      'Direct URL': r.isDirect ? '✅' : '❌ Homepage',
      Quality: r.qualityScore
    }))
  );
  
  // Summary
  const brokenLinks = results.filter(r => r.isValid === false);
  const warnings = results.filter(r => r.isValid === 'CHECK_MANUALLY');
  const homepages = results.filter(r => !r.isDirect);
  
  console.log('\n--- 🚨 ACTION REQUIRED ---');
  console.log(`Broken Links (404/Error): ${brokenLinks.length}`);
  console.log(`Generic Homepages (Quality 20): ${homepages.length}`);
  console.log(`Warnings (Redirects/Timeouts): ${warnings.length}`);
  
  // Write full report to JSON
  fs.writeFileSync(
    path.join(__dirname, 'audit-results.json'), 
    JSON.stringify(results, null, 2)
  );
  console.log('\nFull detailed JSON report saved to scripts/audit-results.json');
}

runAudit().catch(console.error);
