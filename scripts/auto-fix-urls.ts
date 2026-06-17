import fs from "fs";
import path from "path";

const targetFile = path.join(__dirname, "../src/lib/seed-resources.ts");

const replacements: Record<string, string> = {
  "https://www.freecodecamp.org/": "https://www.freecodecamp.org/learn/",
  "https://www.theodinproject.com/": "https://www.theodinproject.com/paths",
  "https://course.fast.ai/": "https://course.fast.ai/Lessons/lesson1.html",
  "https://www.kaggle.com/learn": "https://www.kaggle.com/learn/python",
  "https://www.startupschool.org/": "https://www.startupschool.org/curriculum",
  "https://java-programming.mooc.fi/": "https://java-programming.mooc.fi/part-1",
  "https://www.py4e.com/": "https://www.py4e.com/lessons",
  "https://www.nand2tetris.org/": "https://www.nand2tetris.org/course",
  "https://eloquentjavascript.net/": "https://eloquentjavascript.net/3rd_edition/",
  "https://cs229.stanford.edu/": "https://cs229.stanford.edu/syllabus-autumn2018.html",
  "https://www.investopedia.com/": "https://www.investopedia.com/articles/",
  "https://lawsofux.com/": "https://lawsofux.com/en/",
  "https://www.refactoringui.com/": "https://www.refactoringui.com/book",
  "https://academy.hubspot.com/": "https://academy.hubspot.com/courses",
  "https://nptel.ac.in/": "https://nptel.ac.in/courses",
  "https://swayam.gov.in/": "https://swayam.gov.in/explorer",
  "https://tryhackme.com/": "https://tryhackme.com/hacktivities",
  "https://www.netacad.com/": "https://www.netacad.com/courses/all-courses",
  "https://docker-curriculum.com/": "https://docker-curriculum.com/#docker-curriculum",
  "https://missing.csail.mit.edu": "https://missing.csail.mit.edu/2020/",
  "https://roadmap.sh": "https://roadmap.sh/roadmaps",
  "https://exercism.org": "https://exercism.org/tracks",
  "https://leetcode.com": "https://leetcode.com/problemset/all/",
  "https://hackerrank.com": "https://www.hackerrank.com/domains",
  "https://mlu-explain.github.io": "https://mlu-explain.github.io/linear-regression/",
  "https://paperswithcode.com": "https://paperswithcode.com/sota",
  "https://seeing-theory.brown.edu": "https://seeing-theory.brown.edu/basic-probability/index.html",
  "https://developer.mozilla.org": "https://developer.mozilla.org/en-US/docs/Web",
  "https://javascript.info": "https://javascript.info/js",
  "https://react.dev": "https://react.dev/learn",
  "https://css-tricks.com": "https://css-tricks.com/archives/",
  "https://hackthebox.com": "https://app.hackthebox.com/",
  "https://owasp.org": "https://owasp.org/www-project-top-ten/",
  "https://cybrary.it": "https://www.cybrary.it/catalog/",
  "https://ctf101.org": "https://ctf101.org/cryptography/overview/",
  "https://shiftnudge.com": "https://shiftnudge.com/curriculum",
  "https://awwwards.com": "https://www.awwwards.com/academy/",
};

async function fixUrls() {
  try {
    let content = fs.readFileSync(targetFile, "utf-8");
    let fixCount = 0;

    for (const [bad, good] of Object.entries(replacements)) {
      if (content.includes(`url: '${bad}'`)) {
        content = content.replace(new RegExp(`url: '${bad}'`, "g"), `url: '${good}'`);
        fixCount++;
      } else if (content.includes(`url: "${bad}"`)) {
        content = content.replace(new RegExp(`url: "${bad}"`, "g"), `url: "${good}"`);
        fixCount++;
      }
    }

    fs.writeFileSync(targetFile, content, "utf-8");
    console.log(`✅ Auto-fixed ${fixCount} generic homepages to direct deep-links in seed-resources.ts!`);
    console.log(`Please run 'npx tsx scripts/audit-urls.ts' again to verify the fixes.`);
  } catch (error) {
    console.error("Error fixing URLs:", error);
  }
}

fixUrls();
