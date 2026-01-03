import { Job, Task, Test, ExpertiseSkill } from '@/types/game';
import { JobContent } from '@/types/content';
import jobDefinitions from './jobs.json';
import bettysBakeryContent from '@/content/jobs/bettys-bakery.yaml';

// Task definition from JSON (tests, skills, code)
interface TaskDefinition {
  id: string;
  jobId: string;
  order: number;
  teachesSkills: ExpertiseSkill[];
  starterCode: string;
  tests: Test[];
}

interface JobDefinition {
  id: string;
  tasks: TaskDefinition[];
}

// Map of job IDs to their YAML content
const contentMap: Record<string, JobContent> = {
  'job-001-bettys-bakery': bettysBakeryContent as JobContent,
};

function mergeJobData(definition: JobDefinition): Job {
  const content = contentMap[definition.id];

  if (!content) {
    throw new Error(`Missing content for job: ${definition.id}`);
  }

  return {
    id: content.id,
    title: content.title,
    clientName: content.clientName,
    clientPersonality: content.clientPersonality,
    briefing: content.briefing,
    description: content.description,
    successMessage: content.successMessage,
    difficulty: content.difficulty,
    estimatedTime: content.estimatedTime,
    tasks: definition.tasks.map((taskDef): Task => {
      const taskContent = content.tasks[taskDef.id];

      if (!taskContent) {
        throw new Error(`Missing content for task: ${taskDef.id}`);
      }

      return {
        id: taskDef.id,
        jobId: taskDef.jobId,
        order: taskDef.order,
        story: taskContent.story,
        guide: taskContent.guide,
        teachesSkills: taskDef.teachesSkills,
        starterCode: taskDef.starterCode,
        tests: taskDef.tests,
      };
    }),
  };
}

export const ALL_JOBS: Job[] = (jobDefinitions as JobDefinition[]).map(mergeJobData);
export const BETTYS_BAKERY = ALL_JOBS[0];
