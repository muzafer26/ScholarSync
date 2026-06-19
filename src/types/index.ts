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
  overview: string;
  whatItDoes: string;
  avgSalaryIndia: string;
  avgSalaryGlobal: string;
  demandTrend: 'rising' | 'stable' | 'declining';
  timeToJobReady: string;
  skillsRequired: string[];
  stages: RoadmapStage[];
  relatedCareers: string[];
  tags: string[];
  aliases?: string[];
  icon: string; // Lucide icon name
  roadmapShUrl?: string; // Link to roadmap.sh
  recommendedResourceIds: string[];
  recommendedJobs: CareerJob[];
  matchExplanation?: string;
  dailyReality?: string[];
  beginnersUnderestimate?: string[];
  avoidThisCareer?: string[];
  transitionPaths?: string[];
  sources?: string[];
}

export interface CareerJob {
  title: string;
  requiredSkills: string[];
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
  whyExists?: string;
  whyThisStep?: string;
  whyNow?: string;
  whyBeforeNext?: string;
  realWorldUsage?: string;
  sources?: string[];
  prerequisiteKnowledge?: string[];
  estimatedStudyTime?: string;
  expectedOutcome?: string;
  readyToMoveOn?: string[];
  commonMistakes?: string[];
  suggestedProjects?: string[];
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
  | 'Media'
  | 'Web Development'
  | 'Backend'
  | 'AI'
  | 'Machine Learning'
  | 'Cybersecurity'
  | 'Cloud'
  | 'DevOps'
  | 'UI UX'
  | 'Business'
  | 'Content Creation';

export interface ResourceVerification {
  lastReviewed: string;
  reviewedBy: string;
  isFree: boolean;
  isActive: boolean;
  notes?: string;
  linkChecked?: string; // date string (YYYY-MM-DD)
  humanReviewed?: string; // date string (YYYY-MM-DD)
  reviewDue?: string; // date string (YYYY-MM-DD)
}

// --- Resource ---
export interface Resource {
  id: string;
  title: string;
  url: string;
  source: ResourceSource;
  provider?: string;
  format: ResourceFormat;
  field: CareerField;
  topics: string[];
  level: SkillLevel;
  language: string;
  isFree: true;
  pricingType?: 'FREE' | 'AUDIT_ONLY' | 'OPEN_SOURCE' | 'OFFICIAL_DOCS';
  qualityScore: number; // 0-100
  qualityTier?: 'Elite' | 'Excellent' | 'Good' | 'Basic';
  votes: number;
  addedBy: 'ai' | 'community' | 'team';
  verified: boolean;
  verifiedStatus?: 'Verified' | 'Community Verified' | 'Unverified';
  lastVerifiedDate?: string;
  estimatedHours?: number;
  description: string;
  duration?: string;
  whyRecommended?: string;
  whyChosenOverAlternatives?: string[]; // bullet points comparing to other generic sources
  lastChecked?: string;
  status?: 'Active' | 'Inactive' | 'Verified' | 'Aging' | 'Deprecated' | 'Removed';
  healthScore?: number;
  confidenceScore?: number; // 0-100 scale of authoritative trust
  
  // NEW RESOURCE TRUST LAYER PROPERTIES
  resourceTypeBadge?: string; // e.g., 'Official Documentation', 'Interactive Practice', etc.
  limitations?: string; // known trade-offs or constraints
  alternativeResource?: {
    title: string;
    url: string;
    reason: string;
  };
  verification?: ResourceVerification;
}

export type ResourceSource = string;

export type ResourceFormat =
  | 'COURSE'
  | 'DOCUMENTATION'
  | 'PRACTICE'
  | 'PROJECT'
  | 'REFERENCE'
  | 'course'
  | 'video'
  | 'book'
  | 'interactive'
  | 'text'
  | 'documentation'
  | 'practice'
  | 'project'
  | 'reference';

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';

// --- Job ---
export interface Job {
  id: string;
  title: string;
  source: string;
  location: string;
  experience: string;
  requiredSkills: string[];
  lastUpdated: string;
}

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
