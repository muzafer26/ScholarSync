// ============================================
// ScholarSync — Constants & Configuration
// ============================================

import type { CareerField } from '@/types';

export const APP_NAME = 'ScholarSync';
export const APP_TAGLINE = 'Discover your path. Access world-class resources. For free.';
export const APP_DESCRIPTION =
  'A free, AI-powered learning and career discovery platform. Discover career paths, access curated free resources, get AI guidance, and connect with a community — all without paywalls.';

export const CAREER_FIELDS: { value: CareerField; label: string; icon: string }[] = [
  { value: 'Technology', label: 'Technology', icon: 'Monitor' },
  { value: 'Data Science', label: 'Data Science', icon: 'BarChart3' },
  { value: 'Finance', label: 'Finance', icon: 'TrendingUp' },
  { value: 'Design', label: 'Design', icon: 'Palette' },
  { value: 'Medicine', label: 'Medicine', icon: 'Heart' },
  { value: 'Law', label: 'Law', icon: 'Scale' },
  { value: 'Engineering', label: 'Engineering', icon: 'Wrench' },
  { value: 'Civil Services', label: 'Civil Services', icon: 'Landmark' },
  { value: 'Entrepreneurship', label: 'Entrepreneurship', icon: 'Rocket' },
  { value: 'Humanities', label: 'Humanities', icon: 'BookOpen' },
  { value: 'Science', label: 'Science', icon: 'Atom' },
  { value: 'Marketing', label: 'Marketing', icon: 'Megaphone' },
  { value: 'Education', label: 'Education', icon: 'GraduationCap' },
  { value: 'Media', label: 'Media', icon: 'Monitor' },
];

export const SKILL_LEVELS = [
  { value: 'beginner', label: 'Beginner', color: 'emerald' },
  { value: 'intermediate', label: 'Intermediate', color: 'amber' },
  { value: 'advanced', label: 'Advanced', color: 'rose' },
] as const;

export const USER_STAGES = [
  { value: 'school', label: 'In School (Class 9–12)', emoji: '🎒' },
  { value: 'college', label: 'In College / University', emoji: '🎓' },
  { value: 'working', label: 'Working Professional', emoji: '💼' },
  { value: 'career-switch', label: 'Switching Careers', emoji: '🔄' },
  { value: 'other', label: 'Self-learner / Other', emoji: '🌱' },
] as const;

export const INTEREST_OPTIONS = [
  'Programming & Software',
  'Data & Analytics',
  'Artificial Intelligence',
  'Design & UX',
  'Business & Finance',
  'Medicine & Healthcare',
  'Law & Policy',
  'Science & Research',
  'Engineering',
  'Arts & Humanities',
  'Government & Civil Services',
  'Entrepreneurship',
  'Marketing & Growth',
  'Education & Teaching',
] as const;

export const GOAL_OPTIONS = [
  'Find my first career path',
  'Prepare for competitive exams (JEE/NEET/UPSC)',
  'Learn new skills for my current job',
  'Switch to a different career',
  'Find scholarships & opportunities',
  'Build a portfolio & get hired',
  'Explore and learn for fun',
] as const;

export const WEEKLY_HOURS_OPTIONS = [
  { value: 2, label: '1–3 hours' },
  { value: 5, label: '3–7 hours' },
  { value: 10, label: '7–14 hours' },
  { value: 20, label: '14–20 hours' },
  { value: 30, label: '20+ hours (full-time learner)' },
] as const;

export const CONSTRAINT_OPTIONS = [
  'Limited internet access',
  'Only free resources',
  'Need content in Hindi',
  'Need mobile-friendly content',
  'Limited time',
  'No prior experience',
  'Need mentorship',
] as const;

export const RESOURCE_FORMATS = [
  { value: 'video', label: 'Video', icon: 'Play' },
  { value: 'text', label: 'Article / Text', icon: 'FileText' },
  { value: 'course', label: 'Course', icon: 'GraduationCap' },
  { value: 'book', label: 'Book', icon: 'BookOpen' },
  { value: 'interactive', label: 'Interactive', icon: 'MousePointer' },
] as const;
