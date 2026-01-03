'use client';

import { Job } from '@/types/game';
import { FormatText } from '@/lib/formatText';

interface Props {
  job: Job;
  onStart: () => void;
}

export default function JobBriefing({ job, onStart }: Props) {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        {/* Client info */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{job.title}</h1>
          <p className="text-gray-400">Client: {job.clientName}</p>
          <p className="text-gray-400">
            Difficulty: {'⭐'.repeat(job.difficulty)} | 
            Est. Time: {job.estimatedTime} min
          </p>
        </div>
        
        {/* Briefing */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6 whitespace-pre-line">
          <p className="text-lg leading-relaxed">
            <FormatText text={job.briefing} />
          </p>
        </div>
        
        {/* Task list */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Tasks ({job.tasks.length}):</h2>
          <ol className="space-y-2">
            {job.tasks.map((task, i) => (
              <li key={task.id} className="flex items-center gap-2">
                <span className="text-gray-400">{i + 1}.</span>
                <span>{task.story.split('\n')[0].slice(0, 60)}...</span>
              </li>
            ))}
          </ol>
        </div>
        
        <button
          onClick={onStart}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-colors"
        >
          Start Job
        </button>
      </div>
    </div>
  );
}
