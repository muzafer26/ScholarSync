import type { Resource } from '@/types';

const fields = [
  'Web Development', 'Backend', 'AI', 'Machine Learning', 'Data Science', 
  'Cybersecurity', 'Cloud', 'DevOps', 'UI UX', 'Finance', 'Business', 
  'Marketing', 'Content Creation', 'Technology', 'Design'
] as const;

const sources = [
  'MIT OCW', 'Harvard Open Courses', 'Stanford Online', 'Class Central', 
  'OSSU', 'freeCodeCamp', 'Khan Academy', 'Coursera Audit', 'edX Audit', 
  'NPTEL', 'GitHub Repositories', 'Roadmap.sh', 'MDN'
] as const;

const levels: ('beginner' | 'intermediate' | 'advanced')[] = ['beginner', 'intermediate', 'advanced'];
const formats: ('course' | 'video' | 'book' | 'interactive' | 'text')[] = ['course', 'video', 'book', 'interactive', 'text'];

export const generatedResources: Resource[] = Array.from({ length: 500 }).map((_, i) => {
  const field = fields[i % fields.length];
  const source = sources[i % sources.length] as any;
  const level = levels[i % levels.length];
  const format = formats[i % formats.length];
  
  const titles = [
    `Introduction to ${field}`,
    `Advanced ${field} Concepts`,
    `Mastering ${field}`,
    `The Complete ${field} Guide`,
    `${field} for Beginners`,
    `Deep Dive into ${field}`,
    `Practical ${field} Bootcamp`
  ];
  const title = titles[i % titles.length];

  return {
    id: `gen-res-${i}`,
    title,
    description: `A comprehensive ${level} ${format} on ${field} provided by ${source}. Learn the core concepts, advanced techniques, and practical applications.`,
    url: `https://example.com/course/${field.toLowerCase().replace(/\s+/g, '-')}-${i}`,
    source,
    format,
    field: field as any,
    topics: [field, 'Skill Development'],
    level,
    language: 'en',
    isFree: true,
    qualityScore: 85, // Will be overridden by dynamic scoring engine
    votes: 500 + (i * 13 % 2000),
    addedBy: 'ai',
    verified: true,
    duration: `${(i % 10) + 1} weeks`
  };
});
