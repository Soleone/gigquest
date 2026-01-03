// ============================================
// CORE TYPES
// ============================================

export type ExpertiseSkill = 
  | 'const' 
  | 'let' 
  | 'number' 
  | 'string' 
  | 'addition' 
  | 'subtraction'
  | 'console.log'
  // ... more will be added later

export type TestType = 'output' | 'variable' | 'custom';

// ============================================
// GAME ENTITIES
// ============================================

export interface PlayerState {
  id: string;
  username: string;
  
  // Progression (simplified for Phase 1)
  completedTasks: string[]; // Task IDs
  currentJobId: string | null;
  currentTaskId: string | null;
  
  // Future: cash, reputation, expertise tracking
}

export interface Job {
  id: string;
  title: string;
  clientName: string;
  clientPersonality: 'warm' | 'enthusiastic' | 'pragmatic' | 'casual' | 'professional';
  
  // Story
  briefing: string; // What client says when you view the job
  description: string; // Short summary
  successMessage: string; // What client says on completion
  
  // Structure
  tasks: Task[];
  
  // Metadata
  difficulty: 1 | 2 | 3 | 4 | 5;
  estimatedTime: number; // minutes
}

export interface Task {
  id: string;
  jobId: string;
  order: number; // 1, 2, 3, 4
  
  story: string; // What the client says (narrative)
  guide: string; // What Chip the AI says (teaching)
  
  // Teaching
  teachesSkills: ExpertiseSkill[];
  
  // Code setup
  starterCode: string; // Initial code in editor
  
  // Validation
  tests: Test[];
}

export interface Test {
  id: string;
  name: string;
  description: string;
  type: TestType;
  
  // Type-specific validation
  expectedOutput?: any; // For console.log tests
  expectedVariables?: Record<string, any>; // For variable tests
  validationCode?: string; // For custom tests (eval in sandbox)
  
  // Feedback
  passMessage?: string;
  failMessage?: string;
}

// ============================================
// TEST RESULTS
// ============================================

export interface TestResult {
  testId: string;
  passed: boolean;
  message: string;
}

export interface ExecutionResult {
  success: boolean;
  logs: any[];
  variables: Record<string, any>;
  declarations?: Record<string, 'const' | 'let' | 'var'>;
  error?: string;
}
