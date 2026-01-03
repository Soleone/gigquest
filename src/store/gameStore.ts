import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PlayerState, Job, Task } from '@/types/game';
import { ALL_JOBS } from '@/data/jobs';

interface GameState {
  player: PlayerState;
  
  // Actions
  completeTask: (taskId: string) => void;
  setCurrentTask: (jobId: string, taskId: string) => void;
  getCurrentJob: () => Job | null;
  getCurrentTask: () => Task | null;
  resetProgress: () => void;
}

const initialPlayer: PlayerState = {
  id: 'player-1',
  username: 'Developer',
  completedTasks: [],
  currentJobId: 'job-001-bettys-bakery', // Start directly in Betty's job
  currentTaskId: 'task-001-store-sales'
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      player: initialPlayer,
      
      completeTask: (taskId: string) => {
        set((state) => ({
          player: {
            ...state.player,
            completedTasks: [...state.player.completedTasks, taskId]
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
      
      resetProgress: () => {
        set({ player: initialPlayer });
      }
    }),
    {
      name: 'gigquest-storage',
      version: 1
    }
  )
);
