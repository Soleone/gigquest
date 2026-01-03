// Content types for YAML story/guide files
// These are separate from task definitions (tests, skills, code)

export interface TaskContent {
  story: string;
  guide: string;
}

export interface JobContent {
  id: string;
  title: string;
  clientName: string;
  clientPersonality: 'warm' | 'enthusiastic' | 'pragmatic' | 'casual' | 'professional';
  difficulty: 1 | 2 | 3 | 4 | 5;
  estimatedTime: number;
  description: string;
  briefing: string;
  successMessage: string;
  tasks: Record<string, TaskContent>;
}
