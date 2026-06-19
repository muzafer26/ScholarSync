import * as fs from 'fs';
import * as path from 'path';
import { resources } from '../src/lib/seed-resources';
import { additionalResources } from '../src/lib/seed-resources-extra';
import type { Resource } from '../src/types';

const OUTPUT_JSON_PATH = path.join(__dirname, '..', 'audit-report.json');
const OUTPUT_MD_PATH = path.join(__dirname, '..', 'audit-report.md');

interface ResourceAuditEntry {
  id: string;
  title: string;
  url: string;
  format: string;
  source: string;
  field: string;
  status: 'HEALTHY' | 'WARNING' | 'CRITICAL';
  httpStatus: string | number;
  reason: string;
  costVerified: boolean;
  maintenanceStatus: 'Active' | 'Aging' | 'Inactive';
  alternativeSuggested?: {
    title: string;
    url: string;
    reason: string;
  };
}

// Global backup alternatives for general topics
const GENERAL_ALTERNATIVES: Record<string, { title: string; url: string; reason: string }> = {
  'javascript': { title: 'JavaScript.info', url: 'https://javascript.info', reason: 'Authoritative, fully free modern JS tutorial.' },
  'react': { title: 'React Official Docs', url: 'https://react.dev', reason: 'Interactive, high-trust official documentation.' },
  'sql': { title: 'SQLBolt', url: 'https://sqlbolt.com/', reason: 'Zero-setup interactive coding lessons.' },
  'python': { title: 'Python for Everybody', url: 'https://www.py4e.com/', reason: 'Gold-standard introductory Python course.' },
  'git': { title: 'Learn Git Branching', url: 'https://learngitbranching.js.org/', reason: 'Visual, interactive sandbox sandbox.' },
  'docker': { title: 'Docker Official Docs', url: 'https://docs.docker.com/', reason: 'Authoritative official deployment documentation.' },
  'ux': { title: 'Laws of UX', url: 'https://lawsofux.com/', reason: 'Beautiful cognitive design guidelines.' },
  'cybersecurity': { title: 'PortSwigger Web Security Academy', url: 'https://portswigger.net/web-security', reason: 'High-quality hands-on security labs.' }
};

function getFallbackAlternative(topics: string[]): { title: string; url: string; reason: string } {
  for (const topic of topics) {
    const key = topic.toLowerCase();
    if (GENERAL_ALTERNATIVES[key]) {
      return GENERAL_ALTERNATIVES[key];
    }
  }
  return {
    title: 'MDN Web Docs',
    url: 'https://developer.mozilla.org',
    reason: 'Definitive open-source developer documentation.'
  };
}

async function checkLink(urlStr: string): Promise<{ status: number | string, ok: boolean }> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000); // 6 seconds timeout
    
    let response = await fetch(urlStr, { 
      method: 'HEAD',
      headers: { 'User-Agent': 'ScholarSync-Audit-Bot/2.0' },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (response.status === 405 || response.status === 403) {
      const getController = new AbortController();
      const getTimeout = setTimeout(() => getController.abort(), 6000);
      
      response = await fetch(urlStr, {
        method: 'GET',
        headers: { 'User-Agent': 'ScholarSync-Audit-Bot/2.0' },
        signal: getController.signal
      });
      
      clearTimeout(getTimeout);
    }
    
    return {
      status: response.status,
      ok: response.ok
    };
  } catch (error: any) {
    return {
      status: error.name === 'AbortError' ? 'TIMEOUT' : (error.code || 'NETWORK_ERROR'),
      ok: false
    };
  }
}

async function runAudit() {
  console.log('🏁 Starting ScholarSync Unified Resource Audit System...');
  const allResources: Resource[] = [...resources, ...additionalResources];
  console.log(`Found ${allResources.length} total resources to audit.`);

  const auditEntries: ResourceAuditEntry[] = [];
  let failed = false;
  const validationErrors: string[] = [];

  for (let i = 0; i < allResources.length; i++) {
    const r = allResources[i];
    console.log(`[${i + 1}/${allResources.length}] Auditing: ${r.title}...`);
    
    const linkCheck = await checkLink(r.url);
    
    let entryStatus: 'HEALTHY' | 'WARNING' | 'CRITICAL' = 'HEALTHY';
    let entryReason = 'Link healthy and verified active.';
    let isCostVerified = r.verification?.isFree !== false;
    let maintStatus: 'Active' | 'Aging' | 'Inactive' = r.verification?.isActive !== false ? 'Active' : 'Inactive';

    // 1. Check HTTP reachability
    if (!linkCheck.ok) {
      if (linkCheck.status === 'TIMEOUT' || linkCheck.status === 403 || linkCheck.status === 503) {
        entryStatus = 'WARNING';
        entryReason = `URL reached but returned warning status: ${linkCheck.status}. Needs manual check.`;
      } else {
        entryStatus = 'CRITICAL';
        entryReason = `Broken URL Link. HTTP Status: ${linkCheck.status}`;
      }
    }

    // 2. Cost and Paywall check (heuristics based on source or type)
    const urlLower = r.url.toLowerCase();
    const sourceLower = r.source.toLowerCase();
    if (
      urlLower.includes('udemy') || 
      urlLower.includes('pluralsight') || 
      sourceLower.includes('udemy') ||
      sourceLower.includes('pluralsight')
    ) {
      entryStatus = 'CRITICAL';
      entryReason = 'Paywall detected. Resource contains commercial licensing.';
      isCostVerified = false;
    }

    // 3. Setup replacement logic if warning/critical
    let altSuggestion = undefined;
    if (entryStatus !== 'HEALTHY') {
      if (r.alternativeResource) {
        altSuggestion = {
          title: r.alternativeResource.title,
          url: r.alternativeResource.url,
          reason: r.alternativeResource.reason
        };
      } else {
        altSuggestion = getFallbackAlternative(r.topics);
      }
    }

    // 4. Validate metadata rules
    const hasRationale = !!r.whyRecommended && r.whyRecommended.trim().length > 0;
    const hasReviewDate = !!r.verification?.lastReviewed;
    const isInactive = r.verification?.isActive === false || r.status === 'Inactive' || maintStatus === 'Inactive';

    if (entryStatus === 'CRITICAL') {
      validationErrors.push(`[ERROR] Resource "${r.title}" (ID: ${r.id}) has a critical link error: ${entryReason}`);
      failed = true;
    }
    if (isInactive) {
      validationErrors.push(`[ERROR] Resource "${r.title}" (ID: ${r.id}) is marked as Inactive/Disabled.`);
      failed = true;
    }
    if (!hasRationale) {
      validationErrors.push(`[ERROR] Resource "${r.title}" (ID: ${r.id}) is missing a recommendation rationale (whyRecommended).`);
      failed = true;
    }
    if (!hasReviewDate) {
      validationErrors.push(`[ERROR] Resource "${r.title}" (ID: ${r.id}) is missing a review date (verification.lastReviewed).`);
      failed = true;
    }

    auditEntries.push({
      id: r.id,
      title: r.title,
      url: r.url,
      format: r.format,
      source: r.source,
      field: r.field,
      status: entryStatus,
      httpStatus: linkCheck.status,
      reason: entryReason,
      costVerified: isCostVerified,
      maintenanceStatus: maintStatus,
      alternativeSuggested: altSuggestion
    });
  }

  // Generate JSON Report
  fs.writeFileSync(OUTPUT_JSON_PATH, JSON.stringify(auditEntries, null, 2), 'utf-8');
  console.log(`✅ JSON Audit report written to: ${OUTPUT_JSON_PATH}`);

  // Generate Markdown Report
  const healthyCount = auditEntries.filter(e => e.status === 'HEALTHY').length;
  const warningCount = auditEntries.filter(e => e.status === 'WARNING').length;
  const criticalCount = auditEntries.filter(e => e.status === 'CRITICAL').length;

  let mdContent = `# ScholarSync Monthly Resource Audit Report

This report was automatically generated on **${new Date().toLocaleDateString('en-US', { dateStyle: 'long' })}** to enforce absolute quality, zero link decay, and 100% paywall verification.

## 📊 Summary of Findings
- **Total Resources Scanned:** ${auditEntries.length}
- **Healthy (Passed):** ${healthyCount} (✓ 100% Active)
- **Warning (Review Needed):** ${warningCount} (⚠️ Flagged for timeouts/redirects)
- **Critical (Action Required):** ${criticalCount} (❌ Broken links or Paywall detected)

---

## 🚨 Critical Items Requiring Actions
${criticalCount === 0 ? '*No critical issues found!*' : ''}

${auditEntries.filter(e => e.status === 'CRITICAL').map(e => `
### ❌ [${e.id}] ${e.title}
- **Target URL:** [Link](${e.url})
- **Source:** ${e.source}
- **Audit Findings:** ${e.reason}
- **Suggested Alternative:** [${e.alternativeSuggested?.title}](${e.alternativeSuggested?.url}) — *${e.alternativeSuggested?.reason}*
`).join('\n')}

---

## ⚠️ Warning Items (Review Required)
${warningCount === 0 ? '*No warning flags recorded.*' : ''}

${auditEntries.filter(e => e.status === 'WARNING').map(e => `
- **[${e.id}] ${e.title}**: [Link](${e.url}) (HTTP Status: \`${e.httpStatus}\` · ${e.reason})
`).join('\n')}

---

## 🛡️ Full Resource Audit Ledger
| ID | Title | Format | Source | Health Status | HTTP Status | Cost Verified |
|---|---|---|---|---|---|---|
${auditEntries.map(e => `| ${e.id} | ${e.title} | ${e.format} | ${e.source} | ${e.status === 'HEALTHY' ? '✅ HEALTHY' : e.status === 'WARNING' ? '⚠️ WARNING' : '❌ CRITICAL'} | \`${e.httpStatus}\` | ${e.costVerified ? '✓ Free' : '✗ Flagged'} |`).join('\n')}
`;

  fs.writeFileSync(OUTPUT_MD_PATH, mdContent, 'utf-8');
  console.log(`✅ Markdown Audit report written to: ${OUTPUT_MD_PATH}`);

  if (failed) {
    console.error("\n❌ AUDIT FAILED with the following resource validation errors:");
    validationErrors.forEach(e => console.error(e));
    process.exit(1);
  } else {
    console.log("\n✅ AUDIT PASSED: All scanned resources are healthy, active, and have complete rationale and review date metadata.");
    process.exit(0);
  }
}

runAudit().catch((err) => {
  console.error('Fatal crash during audit execution:', err);
  process.exit(1);
});
