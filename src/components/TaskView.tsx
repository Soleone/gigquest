'use client';

import { Job, Task, ExpertiseSkill } from '@/types/game';
import { useState, useEffect, useRef, useMemo } from 'react';
import { useGameStore } from '@/store/gameStore';
import CodeEditor from './CodeEditor';
import TestRunner, { TestRunnerHandle } from './TestRunner';
import SuccessModal from './SuccessModal';
import DebugTaskInfo from './DebugTaskInfo';
import { FormatText } from '@/lib/formatText';

interface Props {
  job: Job;
  task: Task;
}

export default function TaskView({ job, task }: Props) {
  const { completeTask, setCurrentTask, player, getStarterCode } = useGameStore();
  const starterCode = getStarterCode(task);
  const [code, setCode] = useState(starterCode);
  const [showSuccess, setShowSuccess] = useState(false);
  const testRunnerRef = useRef<TestRunnerHandle>(null);

  // Reset code when task changes
  useEffect(() => {
    setCode(getStarterCode(task));
  }, [task.id, getStarterCode]);

  const handleSuccess = () => {
    completeTask(task.id, code);
    setShowSuccess(true);
  };
  
  const handleNext = () => {
    const currentIndex = job.tasks.findIndex(t => t.id === task.id);
    const nextTask = job.tasks[currentIndex + 1];
    
    if (nextTask) {
      setCurrentTask(job.id, nextTask.id);
      setShowSuccess(false);
    } else {
      setShowSuccess(false);
    }
  };
  
  const completedCount = player.completedTasks.filter(
    id => job.tasks.some(t => t.id === id)
  ).length;

  const learnedSkills = useMemo(() => {
    const skills = new Set<ExpertiseSkill>();
    job.tasks.forEach(t => {
      if (player.completedTasks.includes(t.id)) {
        t.teachesSkills.forEach(s => skills.add(s));
      }
    });
    task.teachesSkills.forEach(s => skills.add(s));
    return Array.from(skills);
  }, [job.tasks, player.completedTasks, task.teachesSkills]);

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">{job.clientName}'s {job.title}</h1>
            <p className="text-sm text-gray-400">
              Task {task.order}/{job.tasks.length}: {task.story.split('\n')[0].slice(0, 50)}...
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">Progress</div>
            <div className="text-lg font-bold">{completedCount}/{job.tasks.length}</div>
          </div>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="flex-1 flex overflow-hidden">
        <div className="w-1/3 flex flex-col border-r border-gray-700 bg-gray-800">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Client Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider text-gray-500 font-bold">Client</span>
                <span className="text-sm font-bold text-amber-500">{job.clientName}</span>
              </div>
              <div className="bg-gray-900/50 p-4 rounded-lg border-l-4 border-amber-500">
                <p className="whitespace-pre-line text-gray-200 leading-relaxed italic">
                  <FormatText text={task.story.trim()} />
                </p>
              </div>
            </div>

            {/* Guide Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider text-gray-500 font-bold">Guide</span>
                <span className="text-sm font-bold text-cyan-400">Chip 🤖</span>
              </div>
              <div className="bg-cyan-950/30 p-4 rounded-lg border border-cyan-900/50">
                <div className="text-cyan-100 leading-relaxed whitespace-pre-line text-sm">
                  <FormatText text={task.guide} />
                </div>
              </div>
            </div>

            {/* Goals info */}
            <div>
              <h3 className="text-sm font-bold text-gray-400 mb-2">
                {task.tests.length === 1 ? 'Goal' : 'Goals'}
              </h3>
              <ul className="space-y-2">
                {task.tests.map(test => (
                  <li key={test.id} className="flex items-start gap-2 text-sm text-gray-300 bg-gray-900 p-2 rounded">
                    <span className="text-green-500 mt-0.5">◎</span>
                    <span>{test.name}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
        
        {/* Right: Code editor + output */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1">
            <CodeEditor
              value={code}
              onChange={setCode}
              onRun={() => testRunnerRef.current?.run()}
              learnedSkills={learnedSkills}
              taskId={task.id}
            />
          </div>
          
          <div className="h-48 bg-gray-950 border-t border-gray-700">
            <TestRunner 
              ref={testRunnerRef}
              code={code} 
              tests={task.tests}
              onSuccess={handleSuccess}
            />
          </div>
        </div>
      </div>
      
      {showSuccess && (
        <SuccessModal
          task={task}
          onNext={handleNext}
          isLastTask={task.order === job.tasks.length}
          job={job}
        />
      )}
      <DebugTaskInfo task={task} />
    </div>
  );
}
