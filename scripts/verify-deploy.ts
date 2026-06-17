import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { careers } from '../src/lib/seed-careers';
import { resources } from '../src/lib/seed-resources';
import { additionalResources } from '../src/lib/seed-resources-extra';
import { CAREER_TAXONOMY } from '../src/lib/career-taxonomy';

function logSection(name: string) {
  console.log(`\n==================================================`);
  console.log(`🔍 CHECK: ${name}`);
  console.log(`==================================================`);
}

async function runVerification() {
  let failed = false;
  const errors: string[] = [];

  // Check 1: BUILD CHECK
  logSection("1. BUILD CHECK");
  try {
    console.log("Running next build...");
    execSync("npm run build", { stdio: "inherit", cwd: path.join(__dirname, "..") });
    console.log("✅ Build succeeded!");
  } catch (err) {
    console.error("❌ Build failed!");
    errors.push("Check 1: Next.js build failed.");
    failed = true;
  }

  // Check 2: BROKEN LINK CHECK
  logSection("2. BROKEN LINK CHECK");
  const allResources = [...resources, ...additionalResources];
  console.log(`Auditing ${allResources.length} resource links...`);
  
  const brokenLinks: { id: string; title: string; url: string; error: string }[] = [];
  
  // Check in small batches to avoid socket starvation
  const batchSize = 5;
  for (let i = 0; i < allResources.length; i += batchSize) {
    const batch = allResources.slice(i, i + batchSize);
    await Promise.all(batch.map(async (r) => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        let response = await fetch(r.url, {
          method: 'HEAD',
          headers: { 'User-Agent': 'ScholarSync-Verify-Bot/1.0' },
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (response.status === 405 || response.status === 403) {
          // Retry with GET
          const getController = new AbortController();
          const getTimeoutId = setTimeout(() => getController.abort(), 5000);
          response = await fetch(r.url, {
            method: 'GET',
            headers: { 'User-Agent': 'ScholarSync-Verify-Bot/1.0' },
            signal: getController.signal
          });
          clearTimeout(getTimeoutId);
        }
        
        if (response.status === 404 || response.status === 410 || response.status >= 500) {
          brokenLinks.push({ id: r.id, title: r.title, url: r.url, error: `HTTP Status ${response.status}` });
        }
      } catch (err: any) {
        brokenLinks.push({ id: r.id, title: r.title, url: r.url, error: err.message || 'Timeout/Network Error' });
      }
    }));
  }
  
  if (brokenLinks.length > 0) {
    console.log(`⚠️ Found ${brokenLinks.length} potentially broken links:`);
    brokenLinks.forEach(bl => {
      console.log(`  - [${bl.id}] ${bl.title}: ${bl.url} (${bl.error})`);
    });
  } else {
    console.log("✅ All links are healthy!");
  }

  // Check 3: BANNED CONTENT CHECK
  logSection("3. BANNED CONTENT CHECK");
  const bannedKeywords = ["JEE", "NEET", "UPSC", "NPTEL", "SWAYAM", "NALSAR", "CLAT", "Constitution of India"];
  const datasetFiles = [
    { name: "seed-careers.ts", path: path.join(__dirname, "..", "src", "lib", "seed-careers.ts") },
    { name: "seed-resources.ts", path: path.join(__dirname, "..", "src", "lib", "seed-resources.ts") },
    { name: "seed-resources-extra.ts", path: path.join(__dirname, "..", "src", "lib", "seed-resources-extra.ts") },
  ];
  
  let bannedFound = false;
  for (const f of datasetFiles) {
    if (fs.existsSync(f.path)) {
      const content = fs.readFileSync(f.path, "utf-8");
      const lines = content.split("\n");
      lines.forEach((line, idx) => {
        bannedKeywords.forEach(keyword => {
          const regex = new RegExp(`\\b${keyword}\\b`, "i");
          if (regex.test(line)) {
            console.error(`❌ Banned content "${keyword}" found in ${f.name} at line ${idx + 1}:`);
            console.error(`  > ${line.trim()}`);
            errors.push(`Banned content "${keyword}" found in ${f.name}:${idx + 1}`);
            bannedFound = true;
          }
        });
      });
    }
  }
  
  if (bannedFound) {
    failed = true;
  } else {
    console.log("✅ No banned content found!");
  }

  // Check 4: DUPLICATE ID CHECK
  logSection("4. DUPLICATE ID CHECK");
  const seenIds = new Set<string>();
  const seenSlugs = new Set<string>();
  let duplicateFound = false;
  
  careers.forEach(c => {
    if (seenIds.has(c.id)) {
      console.error(`❌ Duplicate ID found: "${c.id}" in Career: "${c.title}"`);
      errors.push(`Duplicate ID: ${c.id}`);
      duplicateFound = true;
    }
    seenIds.add(c.id);
    
    if (seenSlugs.has(c.slug)) {
      console.error(`❌ Duplicate Slug found: "${c.slug}" in Career: "${c.title}"`);
      errors.push(`Duplicate Slug: ${c.slug}`);
      duplicateFound = true;
    }
    seenSlugs.add(c.slug);
  });
  
  allResources.forEach(r => {
    if (seenIds.has(r.id)) {
      console.error(`❌ Duplicate ID found: "${r.id}" in Resource: "${r.title}"`);
      errors.push(`Duplicate ID: ${r.id}`);
      duplicateFound = true;
    }
    seenIds.add(r.id);
  });
  
  if (duplicateFound) {
    failed = true;
  } else {
    console.log("✅ No duplicate IDs or slugs found!");
  }

  // Check 5: SCHEMA CHECK
  logSection("5. SCHEMA CHECK");
  let schemaViolation = false;
  allResources.forEach(r => {
    const isUrlValid = r.url && (r.url.startsWith("http://") || r.url.startsWith("https://"));
    const isTitleValid = r.title && r.title.trim().length > 0;
    const isFreeValid = r.isFree === undefined || r.isFree === true;
    const isSourceValid = r.source && r.source.trim().length > 0;
    
    if (!isUrlValid || !isTitleValid || !isFreeValid || !isSourceValid) {
      console.error(`❌ Schema violation in Resource [${r.id}]:`);
      if (!isUrlValid) console.error(`  - Invalid URL: "${r.url}"`);
      if (!isTitleValid) console.error(`  - Empty title`);
      if (!isFreeValid) console.error(`  - isFree is false`);
      if (!isSourceValid) console.error(`  - Invalid source: "${r.source}"`);
      errors.push(`Schema violation in Resource ${r.id}`);
      schemaViolation = true;
    }
  });
  
  if (schemaViolation) {
    failed = true;
  } else {
    console.log("✅ All resources match the schema!");
  }

  // Check 6: CAREER COMPLETENESS CHECK
  logSection("6. CAREER COMPLETENESS CHECK");
  let completenessViolation = false;
  
  careers.forEach(c => {
    const hasEnoughStages = c.stages && c.stages.length >= 3;
    const stagesHaveSkills = c.stages && c.stages.every(s => s.skills && s.skills.length >= 1);
    
    // Career-resource relevance scoring matching runtime logic
    const careerTags = (c.tags || []).map(t => t.toLowerCase());
    const careerTitleWords = c.title.toLowerCase().split(/\s+/).filter(w => w.length > 3);
    const careerSkills = c.stages.flatMap(s => s.skills || []).map(s => s.toLowerCase());

    const scored = resources.map(r => {
      let score = 0;
      const titleLower = r.title.toLowerCase();
      const descLower = r.description.toLowerCase();
      const resourceTopics = (r.topics || []).map(t => t.toLowerCase());

      if (c.recommendedResourceIds?.includes(r.id)) {
        score += 1000;
      }
      const matchingSkills = resourceTopics.filter(topic => careerSkills.includes(topic));
      score += matchingSkills.length * 50;
      const matchingTags = resourceTopics.filter(topic => careerTags.includes(topic));
      score += matchingTags.length * 30;
      const matchingTitleWords = careerTitleWords.filter(word => titleLower.includes(word) || descLower.includes(word));
      score += matchingTitleWords.length * 40;

      // Penalties for generic resources on non-relevant careers
      const isGenericTopic = resourceTopics.includes('python') || resourceTopics.includes('git') || resourceTopics.includes('github') || titleLower.includes('cs50');
      const careerIsPythonRelated = careerTags.includes('python') || careerSkills.includes('python') || c.title.toLowerCase().includes('python') || c.title.toLowerCase().includes('data science') || c.title.toLowerCase().includes('ai') || c.title.toLowerCase().includes('data analyst');
      const careerIsGitRelated = careerTags.includes('git') || careerSkills.includes('git');

      if (isGenericTopic) {
        if (resourceTopics.includes('python') && !careerIsPythonRelated) {
          score -= 500;
        }
        if ((resourceTopics.includes('git') || resourceTopics.includes('github')) && !careerIsGitRelated) {
          score -= 100;
        }
      }
      return { resource: r, score };
    });

    const matchedResources = scored.filter(x => x.score > 0);
    const hasEnoughResources = matchedResources.length >= 4;
    
    if (!hasEnoughStages || !stagesHaveSkills || !hasEnoughResources) {
      console.error(`❌ Completeness violation in Career "${c.title}" (${c.slug}):`);
      if (!hasEnoughStages) console.error(`  - Has ${c.stages?.length || 0} stages (requires at least 3)`);
      if (!stagesHaveSkills) console.error(`  - Some stages are missing skills`);
      if (!hasEnoughResources) console.error(`  - Has only ${matchedResources.length} matched resources with positive scores (requires at least 4). Matched: ${matchedResources.map(x => `${x.resource.title} (${x.score})`).join(', ')}`);
      errors.push(`Completeness violation in Career ${c.slug}`);
      completenessViolation = true;
    }
  });
  
  if (completenessViolation) {
    failed = true;
  } else {
    console.log("✅ All careers are complete!");
  }

  // Check 7: ORPHANED ALIAS CHECK
  logSection("7. ORPHANED ALIAS CHECK");
  let orphanedAliasFound = false;
  
  for (const [coreCareer, aliases] of Object.entries(CAREER_TAXONOMY)) {
    const careerExists = careers.some(c => c.title.toLowerCase() === coreCareer.toLowerCase() || c.slug.toLowerCase() === coreCareer.toLowerCase().replace(/\s+/g, '-'));
    if (!careerExists) {
      console.error(`❌ Orphaned taxonomy key: "${coreCareer}" does not match any career slug/title. Affected aliases: ${aliases.join(', ')}`);
      errors.push(`Orphaned career taxonomy target: ${coreCareer}`);
      orphanedAliasFound = true;
    }
  }
  
  if (orphanedAliasFound) {
    failed = true;
  } else {
    console.log("✅ No orphaned aliases found!");
  }

  // Check 8: ENV VAR CHECK
  logSection("8. ENV VAR CHECK");
  
  let envExampleVars: string[] = [];
  const envExamplePath = path.join(__dirname, "..", ".env.example");
  if (fs.existsSync(envExamplePath)) {
    const envContent = fs.readFileSync(envExamplePath, "utf-8");
    envExampleVars = envContent.split("\n")
      .map(line => line.trim())
      .filter(line => line && !line.startsWith("#"))
      .map(line => line.split("=")[0].trim());
  }
  console.log("Documented env variables in .env.example:", envExampleVars);
  
  const referencedEnvVars = new Set<string>();
  const envVarsWithFallbacks = new Set<string>();
  const missingEnvVars: { file: string; line: number; name: string }[] = [];
  
  function scanEnvVars(dirPath: string) {
    const files = fs.readdirSync(dirPath);
    files.forEach(file => {
      const fullPath = path.join(dirPath, file);
      if (fs.statSync(fullPath).isDirectory()) {
        if (file !== "node_modules" && file !== ".next") {
          scanEnvVars(fullPath);
        }
      } else if (file.endsWith(".ts") || file.endsWith(".tsx")) {
        const content = fs.readFileSync(fullPath, "utf-8");
        const lines = content.split("\n");
        lines.forEach((line, idx) => {
          const match = line.match(/process\.env\.([A-Z0-9_]+)/g);
          if (match) {
            match.forEach(m => {
              const varName = m.replace("process.env.", "");
              if (varName === "NODE_ENV") return;
              referencedEnvVars.add(varName);
              
              const hasFallback = line.includes("||") || line.includes("??");
              if (hasFallback) {
                envVarsWithFallbacks.add(varName);
              }
              
              const isDocumented = envExampleVars.includes(varName);
              if (!isDocumented && !hasFallback) {
                missingEnvVars.push({ file: path.basename(fullPath), line: idx + 1, name: varName });
              }
            });
          }
        });
      }
    });
  }
  
  scanEnvVars(path.join(__dirname, "..", "src"));
  
  if (missingEnvVars.length > 0) {
    console.error("❌ Found environment variables without fallback/documentation:");
    missingEnvVars.forEach(mv => {
      console.error(`  - ${mv.name} in ${mv.file}:${mv.line}`);
      errors.push(`Undocumented env var without fallback: ${mv.name}`);
    });
    failed = true;
  } else {
    console.log("✅ All environment variables are documented or have fallbacks!");
  }

  // Check 9: SECRET LEAK CHECK
  logSection("9. SECRET LEAK CHECK");
  const leakedSecrets: { file: string; line: number; text: string }[] = [];
  
  function scanSecrets(dirPath: string) {
    const files = fs.readdirSync(dirPath);
    files.forEach(file => {
      const fullPath = path.join(dirPath, file);
      if (fs.statSync(fullPath).isDirectory()) {
        if (file !== "node_modules" && file !== ".next" && file !== ".git") {
          scanSecrets(fullPath);
        }
      } else if (file.endsWith(".ts") || file.endsWith(".tsx") || file.endsWith(".json") || file.endsWith(".js") || file.endsWith(".md")) {
        if (file === "verify-deploy.ts" || file === "verify-launch.ts" || file === "verify-launch.js") return;
        const content = fs.readFileSync(fullPath, "utf-8");
        const lines = content.split("\n");
        lines.forEach((line, idx) => {
          const matchAIza = line.match(/AIzaSy[A-Za-z0-9_-]{33}/);
          const matchSk = line.match(/sk-[A-Za-z0-9]{32,}/) || line.match(/sk_live_[A-Za-z0-9]{32,}/);
          if (matchAIza || matchSk) {
            leakedSecrets.push({ file: path.basename(fullPath), line: idx + 1, text: line.trim() });
          }
        });
      }
    });
  }
  
  scanSecrets(path.join(__dirname, ".."));
  
  if (leakedSecrets.length > 0) {
    console.error("❌ Leaked secret credentials found!");
    leakedSecrets.forEach(ls => {
      console.error(`  - ${ls.file}:${ls.line}: ${ls.text}`);
      errors.push(`Secret leak detected in ${ls.file}:${ls.line}`);
    });
    failed = true;
  } else {
    console.log("✅ No secrets leaked in committed source files!");
  }

  console.log(`\n==================================================`);
  console.log(`📊 FINAL REPORT`);
  console.log(`==================================================`);
  if (failed) {
    console.error("❌ VERIFICATION FAILED!");
    console.error(`Total Errors: ${errors.length}`);
    errors.forEach(e => console.error(`  - ${e}`));
    process.exit(1);
  } else {
    console.log("✅ ALL CHECKS PASSED SUCCESSFULLY!");
    process.exit(0);
  }
}

runVerification().catch(err => {
  console.error("Fatal error during verification run:", err);
  process.exit(1);
});
