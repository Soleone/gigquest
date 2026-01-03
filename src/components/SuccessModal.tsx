'use client';

import { Task, Job } from '@/types/game';

interface Props {
  task: Task;
  job: Job;
  onNext: () => void;
  isLastTask: boolean;
}

export default function SuccessModal({ task, job, onNext, isLastTask }: Props) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold mb-2">Task Complete!</h2>
          <p className="text-gray-400">
            {isLastTask ? 'Job finished!' : `Task ${task.order}/${job.tasks.length} complete`}
          </p>
        </div>
        
        {isLastTask ? (
          <div className="bg-gray-900 rounded p-4 mb-6">
            <p className="text-gray-300 italic whitespace-pre-line">
              "{job.successMessage}"
            </p>
            <p className="text-gray-500 text-right mt-2">- {job.clientName}</p>
          </div>
        ) : (
          <div className="bg-gray-900 rounded p-4 mb-6">
            <p className="text-gray-300">Great work! Ready for the next task?</p>
          </div>
        )}
        
        <button
          onClick={onNext}
          autoFocus
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded transition-colors"
        >
          {isLastTask ? 'Finish Job' : 'Next Task'}
        </button>
      </div>
    </div>
  );
}
