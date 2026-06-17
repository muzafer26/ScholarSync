import type { Career, RoadmapStage } from '@/types';

// Predefined prerequisite rules (A must come before B)
const PREREQUISITES: Record<string, string[]> = {
  'React': ['JavaScript', 'HTML', 'CSS'],
  'Next.js': ['React', 'JavaScript'],
  'Node.js': ['JavaScript'],
  'Machine Learning': ['Python', 'Statistics'],
  'Deep Learning': ['Machine Learning', 'Python', 'Calculus'],
  'Docker': ['Linux'],
  'Kubernetes': ['Docker'],
  'Deployment': ['Git'],
  'CI/CD': ['Git', 'Testing'],
};

export interface RoadmapValidationResult {
  confidenceScore: number;
  warnings: string[];
  errors: string[];
  isPacedCorrectly: boolean;
}

export function validateRoadmap(career: Career): RoadmapValidationResult {
  let score = 100;
  const warnings: string[] = [];
  const errors: string[] = [];
  const stages = career.stages.sort((a, b) => a.order - b.order);
  
  const learnedSkills = new Set<string>();

  stages.forEach((stage, index) => {
    // 1. Missing Content Check
    if (!stage.description || stage.description.length < 10) {
      warnings.push(`Stage ${stage.order} ("${stage.title}") lacks a clear description.`);
      score -= 2;
    }
    if (!stage.skills || stage.skills.length === 0) {
      errors.push(`Stage ${stage.order} ("${stage.title}") has no skills defined.`);
      score -= 5;
    }

    // 2. Prerequisite Graph Check
    stage.skills.forEach(skill => {
      const requiredPrereqs = PREREQUISITES[skill];
      if (requiredPrereqs) {
        requiredPrereqs.forEach(prereq => {
          // If the prerequisite isn't learned yet, and it's not being learned in the current stage
          if (!learnedSkills.has(prereq) && !stage.skills.includes(prereq)) {
            errors.push(`"${skill}" appears before required prerequisite "${prereq}".`);
            score -= 15;
          }
        });
      }
      learnedSkills.add(skill);
    });

    // 3. Learn-Build-Apply verification (mock check for now: relies on milestones)
    if (!stage.milestones || stage.milestones.length === 0) {
      warnings.push(`Stage ${stage.order} lacks practical milestones (Learn-Build-Apply violation).`);
      score -= 5;
    }
  });

  // Normalize score
  score = Math.max(0, Math.min(100, score));

  return {
    confidenceScore: score,
    warnings,
    errors,
    isPacedCorrectly: errors.length === 0 && score > 85
  };
}
