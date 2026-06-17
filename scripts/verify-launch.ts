import { resources } from '../src/lib/seed-resources';
import { careers } from '../src/lib/seed-careers';
import { CAREER_TAXONOMY } from '../src/lib/career-taxonomy';
import * as fs from 'fs';
import * as path from 'path';

interface VerificationLog {
  timestamp: string;
  success: boolean;
  errors: string[];
  warnings: string[];
  metrics: {
    totalCareers: number;
    totalResources: number;
    totalAliasesMapped: number;
  };
}

async function verify() {
  console.log('--- ScholarSync Deployment Verification Engine ---');
  const errors: string[] = [];
  const warnings: string[] = [];

  // 1. Validate Resource Integrity
  console.log('Validating seed resources...');
  const seenResourceIds = new Set<string>();
  for (const r of resources) {
    if (seenResourceIds.has(r.id)) {
      errors.push(`Duplicate Resource ID detected: "${r.id}"`);
    }
    seenResourceIds.add(r.id);

    if (!r.title || r.title.trim().length === 0) {
      errors.push(`Resource "${r.id}" has empty title.`);
    }

    if (!r.url || (!r.url.startsWith('http://') && !r.url.startsWith('https://'))) {
      errors.push(`Resource "${r.id}" ("${r.title}") has invalid URL: "${r.url}"`);
    }

    if (!r.topics || r.topics.length === 0) {
      warnings.push(`Resource "${r.id}" ("${r.title}") has empty topics.`);
    }
  }

  // 2. Validate Careers and Roadmap Integrity
  console.log('Validating seed careers...');
  const seenSlugs = new Set<string>();
  const seenCareerIds = new Set<string>();
  
  for (const c of careers) {
    if (seenCareerIds.has(c.id)) {
      errors.push(`Duplicate Career ID detected: "${c.id}"`);
    }
    seenCareerIds.add(c.id);

    if (seenSlugs.has(c.slug)) {
      errors.push(`Duplicate Career Slug detected: "${c.slug}"`);
    }
    seenSlugs.add(c.slug);

    if (!c.stages || c.stages.length === 0) {
      errors.push(`Career "${c.title}" has no roadmap stages.`);
    } else {
      c.stages.forEach((stage, index) => {
        // Stage checks
        if (!stage.title || stage.title.trim().length === 0) {
          errors.push(`Career "${c.title}" Stage ${index + 1} has empty title.`);
        }
        if (!stage.skills || stage.skills.length === 0) {
          warnings.push(`Career "${c.title}" Stage "${stage.title}" has zero skills listed.`);
        }
        if (!stage.milestones || stage.milestones.length === 0) {
          errors.push(`Career "${c.title}" Stage "${stage.title}" missing milestones.`);
        }
      });
    }
  }

  // 3. Career Taxonomy Reference Check
  console.log('Validating career taxonomy mapping...');
  let totalAliases = 0;
  for (const [coreCareer, aliases] of Object.entries(CAREER_TAXONOMY)) {
    // Check if the coreCareer exists in careers list
    const careerExists = careers.some(c => c.title.toLowerCase() === coreCareer.toLowerCase() || c.slug.toLowerCase() === coreCareer.toLowerCase().replace(/\s+/g, '-'));
    if (!careerExists) {
      warnings.push(`Taxonomy specifies core career "${coreCareer}" which does not match any seed career slug/title.`);
    }
    totalAliases += aliases.length;
  }

  const success = errors.length === 0;
  
  const report: VerificationLog = {
    timestamp: new Date().toISOString(),
    success,
    errors,
    warnings,
    metrics: {
      totalCareers: careers.length,
      totalResources: resources.length,
      totalAliasesMapped: totalAliases
    }
  };

  const outputPath = path.join(__dirname, '../verify-results.json');
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2), 'utf-8');

  console.log('\n--- VERIFICATION COMPLETE ---');
  console.log(`Success: ${success ? 'YES' : 'NO'}`);
  console.log(`Errors: ${errors.length}`);
  console.log(`Warnings: ${warnings.length}`);
  console.log(`Metrics: Careers: ${careers.length} | Resources: ${resources.length} | Aliases: ${totalAliases}`);
  
  if (errors.length > 0) {
    console.error('\nErrors details:');
    errors.forEach(e => console.error(`[ERROR] ${e}`));
    process.exit(1);
  } else {
    console.log('\nAll core checks passed. Safe to trigger deployment pipeline.');
    process.exit(0);
  }
}

verify().catch((err) => {
  console.error('Fatal crash during verification execution:', err);
  process.exit(1);
});
