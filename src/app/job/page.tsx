'use client';

import { useGameStore } from '@/store/gameStore';
import { useState, useEffect } from 'react';
import JobBriefing from '@/components/JobBriefing';
import TaskView from '@/components/TaskView';

export default function JobPage() {
  const { getCurrentJob, getCurrentTask, player, resetProgress } = useGameStore();
  const [showBriefing, setShowBriefing] = useState(true);
  
  // Hydration fix for Zustand persist
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return <div className="min-h-screen bg-gray-900 text-white p-8">Loading...</div>;
  }

  const job = getCurrentJob();
  const task = getCurrentTask();
  
  if (!job) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">No job found</h1>
        <button 
          onClick={() => {
            resetProgress();
            window.location.reload();
          }}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Reset Progress
        </button>
      </div>
    );
  }
  
  // Show briefing before first task
  if (showBriefing && player.completedTasks.length === 0) {
    return (
      <JobBriefing 
        job={job} 
        onStart={() => setShowBriefing(false)} 
      />
    );
  }
  
  if (!task) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">No task found</h1>
        <p className="mb-6 text-gray-400">Your save data might be from an older version of the game.</p>
        <button 
          onClick={() => {
            resetProgress();
            window.location.reload();
          }}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Reset Progress & Restart
        </button>
      </div>
    );
  }
  
  return <TaskView job={job} task={task} />;
}