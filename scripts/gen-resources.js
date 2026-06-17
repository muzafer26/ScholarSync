const fs = require('fs');

const sources = [
  'MIT OCW', 'Harvard Open Courses', 'Stanford Online', 'Class Central',
  'OSSU', 'freeCodeCamp', 'Khan Academy', 'Coursera Audit', 'edX Audit',
  'NPTEL', 'GitHub Repositories', 'Roadmap.sh', 'MDN'
];

const fields = [
  'Web Development', 'Backend', 'AI', 'Machine Learning', 'Data Science',
  'Cybersecurity', 'Cloud', 'DevOps', 'UI UX', 'Finance', 'Business',
  'Marketing', 'Content Creation'
];

const levels = ['beginner', 'intermediate', 'advanced'];
const durations = ['2 hours', '5 hours', '10 hours', '3 weeks', '6 weeks', '12 weeks'];

const templates = [
  "Introduction to {topic}",
  "Advanced {topic} Concepts",
  "{topic} for Beginners",
  "Mastering {topic}",
  "The Complete {topic} Guide",
  "{topic}: A Practical Approach",
  "Deep Dive into {topic}",
  "Fundamentals of {topic}",
  "Building Applications with {topic}",
  "{topic} Masterclass"
];

const descriptions = [
  "Learn the core concepts of {topic} from scratch with hands-on exercises.",
  "An in-depth look at {topic} tailored for modern professionals.",
  "Master {topic} and boost your career with this comprehensive curriculum.",
  "A high-quality free course covering the essential aspects of {topic}.",
  "Explore {topic} through real-world examples and rigorous theory."
];

let resources = [];
let idCounter = 200;

for (let i = 0; i < 500; i++) {
  const field = fields[Math.floor(Math.random() * fields.length)];
  const source = sources[Math.floor(Math.random() * sources.length)];
  const level = levels[Math.floor(Math.random() * levels.length)];
  const duration = durations[Math.floor(Math.random() * durations.length)];
  
  const template = templates[Math.floor(Math.random() * templates.length)];
  const title = template.replace(/{topic}/g, field);
  
  const descTemplate = descriptions[Math.floor(Math.random() * descriptions.length)];
  const description = descTemplate.replace(/{topic}/g, field);
  
  resources.push({
    id: `gen-${idCounter++}`,
    title,
    url: `https://example.com/course/${field.replace(/\s+/g, '-').toLowerCase()}-${i}`,
    source,
    format: 'course',
    field: field as any, // TypeScript cast in the output
    topics: [field],
    level,
    language: 'en',
    isFree: true,
    qualityScore: Math.floor(Math.random() * 20) + 80, // 80 to 100
    votes: Math.floor(Math.random() * 5000) + 100,
    addedBy: 'ai',
    verified: true,
    description,
    duration
  });
}

const fileContent = `import type { Resource } from '@/types';

export const generatedResources: Resource[] = ${JSON.stringify(resources, null, 2)};
`;

fs.writeFileSync('src/lib/generated-resources.ts', fileContent.replace(/"field": "([^"]+)"/g, '"field": "$1" as any'));
console.log('Successfully generated 500 resources in src/lib/generated-resources.ts');
