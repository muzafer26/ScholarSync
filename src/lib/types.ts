
export type Provider =
  | "Coursera"
  | "Google"
  | "Microsoft"
  | "IBM"
  | "edX"
  | "Harvard"
  | "MIT"
  | "YouTube"
  | "Class Central"
  | "Udemy"
  | "freeCodeCamp"
  | "Skillshare"
  | "Stanford"
  | "Stanford University"
  | "Yale"
  | "The Linux Foundation"
  | "University of Michigan"
  | "CalArts"
  | "MoMA"
  | "Princeton University"
  | "DataCamp"
  | "University of Oxford"
  | "Meta"
  | "Amazon"
  | "Amazon Web Services"
  | "OpenAI"
  | "Kaggle"
  | "The Data Incubator"
  | "University of California, San Diego"
  | "Macquarie University"
  | "University of Edinburgh"
  | "University of Chicago"
  | "Udacity"
  | "LinkedIn Learning"
  | "Codecademy"
  | "FutureLearn"
  | "Khan Academy"
  | "Pluralsight"
  | "A Cloud Guru"
  | "DeepLearning.AI"
  | "Johns Hopkins University"
  | "Duke University"
  | "University of Pennsylvania"
  | "University of Illinois"
  | "Google Cloud"
  | "Cybersecurity and Infrastructure Security Agency"
  | "Atlassian"
  | "Michigan State University"
  | "University of California, Santa Cruz"
  | "The Pragmatic Programmer"
  | "Scrum.org"
  | "Fannie and John Hertz Foundation"
  | "Thiel Foundation"
  | "Adobe"
  | "Holloway"
  | "Y Combinator"
  | "First Round"
  | "Paul Graham"
  | "Stratechery"
  | "Reforge"
  | "Lenny's Newsletter"
  | "Resume Worded"
  | "Teamblind"
  | "Levels.fyi"
  | "The Pragmatic Engineer"
  | "Andreessen Horowitz"
  | "Dan Luu"
  | "Donne Martin"
  | "Yangshun Tay";


export type Category =
  | "Computer Science"
  | "Data Science"
  | "Business"
  | "Humanities"
  | "Art & Design"
  | "Health"
  | "Engineering"
  | "Social Sciences"
  | "Personal Development"
  | "Mathematics"
  | "Career Guide"
  | "Startup"
  | "Industry Insights"
  | "Growth & Product";

export type SkillLevel = "Beginner" | "Intermediate" | "Advanced";

export type OpportunityType =
  | "Internship"
  | "Fellowship"
  | "Scholarship"
  | "Contest";

export interface Course {
  id: string;
  type: "course";
  title: string;
  provider: Provider | string;
  description: string;
  url: string;
  category: Category;
  skillLevel: SkillLevel;
  duration: string; // e.g., "1-2 hours", "4 weeks"
}

export interface Opportunity {
  id: string;
  type: "opportunity";
  title: string;
  provider: string; // Can be a company name
  description: string;
  url: string;
  opportunityType: OpportunityType;
  location: string; // e.g., "Remote", "New York, NY"
}

export interface Guide {
  id: string;
  type: "guide";
  title: string;
  provider: string;
  description: string;
  url: string;
  category: Category;
}

export type Resource = Course | Opportunity | Guide;
