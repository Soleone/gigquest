import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PlayerState, Job, Task } from '@/types/game';
import { ALL_JOBS } from '@/data/jobs';

interface GameState {
  player: PlayerState;

  // Actions
  completeTask: (taskId: string, code: string) => void;
  setCurrentTask: (jobId: string, taskId: string) => void;
  getCurrentJob: () => Job | null;
  getCurrentTask: () => Task | null;
  getStarterCode: (task: Task) => string;
  resetProgress: () => void;
}

const initialPlayer: PlayerState = {
  id: 'player-1',
  username: 'Developer',
  completedTasks: [],
  currentJobId: 'job-001-bettys-bakery', // Start directly in Betty's job
  currentTaskId: 'task-001-store-sales',
  taskCode: {},
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      player: initialPlayer,
      
      completeTask: (taskId: string, code: string) => {
        set((state) => ({
          player: {
            ...state.player,
            completedTasks: [...state.player.completedTasks, taskId],
            taskCode: {
              ...state.player.taskCode,
              [taskId]: code,
            },
          }
        }));
      },
      
      setCurrentTask: (jobId: string, taskId: string) => {
        set((state) => ({
          player: {
            ...state.player,
            currentJobId: jobId,
            currentTaskId: taskId
          }
        }));
      },
      
      getCurrentJob: () => {
        const { player } = get();
        return ALL_JOBS.find(j => j.id === player.currentJobId) || null;
      },
      
      getCurrentTask: () => {
        const job = get().getCurrentJob();
        const { player } = get();
        if (!job) return null;
        return job.tasks.find(t => t.id === player.currentTaskId) || null;
      },

      getStarterCode: (task: Task) => {
        const { player } = get();
        const job = ALL_JOBS.find(j => j.id === task.jobId);
        if (!job) return task.starterCode;

        // Find the previous task in the job
        const prevTask = job.tasks.find(t => t.order === task.order - 1);
        let code = task.starterCode;

        if (prevTask && player.taskCode[prevTask.id]) {
          // Use the user's code from the previous task
          code = player.taskCode[prevTask.id];
        }

        // Ensure code ends with newline so cursor starts on fresh line
        if (!code.endsWith('\n')) {
          code += '\n';
        }

        return code;
      },

      resetProgress: () => {
        set({ player: initialPlayer });
      }
    }),
    {
      name: 'gigquest-storage',
      version: 2,
    }
  )
);
