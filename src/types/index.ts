// ============================================
// ScholarSync — Core Type Definitions
// ============================================

// --- User ---
export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  avatar?: string;
  stage: UserStage;
  interests: string[];
  careerGoal: string;
  weeklyHours: number;
  activeRoadmapId?: string;
  bookmarkedResources: string[];
  bookmarkedScholarships: string[];
  portfolioUrl?: string;
  onboardingComplete: boolean;
  createdAt: string;
  lastActive: string;
}

export type UserStage = 'school' | 'college' | 'working' | 'career-switch' | 'other';

// --- Career ---
export interface Career {
  id: string;
  title: string;
  slug: string;
  field: CareerField;
  subfield: string;
  description: string;
  shortDescription: string;
  avgSalaryIndia: string;
  avgSalaryGlobal: string;
  demandTrend: 'rising' | 'stable' | 'declining';
  stages: RoadmapStage[];
  relatedCareers: string[];
  tags: string[];
  icon: string; // Lucide icon name
  roadmapShUrl?: string; // Link to roadmap.sh
}

export interface RoadmapStage {
  id: string;
  title: string;
  description: string;
  duration: string;
  skills: string[];
  resources: string[]; // resource IDs
  milestones: string[];
  order: number;
}

export type CareerField =
  | 'Technology'
  | 'Finance'
  | 'Medicine'
  | 'Law'
  | 'Design'
  | 'Data Science'
  | 'Engineering'
  | 'Civil Services'
  | 'Entrepreneurship'
  | 'Humanities'
  | 'Science'
  | 'Marketing'
  | 'Education'
  | 'Media';

// --- Resource ---
export interface Resource {
  id: string;
  title: string;
  url: string;
  source: ResourceSource;
  format: ResourceFormat;
  field: CareerField;
  topics: string[];
  level: SkillLevel;
  language: string;
  isFree: true;
  qualityScore: number; // 0-100
  votes: number;
  addedBy: 'ai' | 'community' | 'team';
  verified: boolean;
  description: string;
  duration?: string;
}

export type ResourceSource =
  | 'YouTube'
  | 'GitHub'
  | 'MIT OCW'
  | 'Khan Academy'
  | 'Coursera'
  | 'edX'
  | 'freeCodeCamp'
  | 'NPTEL'
  | 'Udacity'
  | 'fast.ai'
  | 'Kaggle'
  | 'Google'
  | 'Stanford'
  | 'Harvard'
  | 'Yale'
  | 'Project Gutenberg'
  | 'Archive.org'
  | 'Zerodha Varsity'
  | 'NCERT'
  | 'PW'
  | 'Unacademy'
  | 'Other';

export type ResourceFormat = 'video' | 'text' | 'course' | 'book' | 'interactive';

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';

// --- Scholarship ---
export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  country: 'India' | 'Global' | string;
  type: ScholarshipType;
  amount: string;
  deadline: string;
  eligibility: string[];
  applyUrl: string;
  fields: string[];
  isActive: boolean;
  description: string;
}

export type ScholarshipType = 'merit' | 'need' | 'field-specific' | 'government';

// --- Roadmap Progress ---
export interface RoadmapProgress {
  userId: string;
  careerId: string;
  currentStage: number;
  completedResources: string[];
  startedAt: string;
  notes: string;
}

// --- Onboarding Quiz ---
export interface OnboardingAnswers {
  stage: UserStage;
  interests: string[];
  goal: string;
  weeklyHours: number;
  constraints: string[];
}

// --- Sage Chat ---
export interface SageMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface SageConversation {
  id: string;
  userId: string;
  messages: SageMessage[];
  createdAt: string;
  updatedAt: string;
}

// --- Community ---
export interface ForumPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  field: CareerField;
  tags: string[];
  upvotes: number;
  replies: number;
  createdAt: string;
}
