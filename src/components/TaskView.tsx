'use client';

import { Job, Task, ExpertiseSkill } from '@/types/game';
import { useState, useEffect, useRef, useMemo } from 'react';
import { useGameStore } from '@/store/gameStore';
import CodeEditor from './CodeEditor';
import TestRunner, { TestRunnerHandle } from './TestRunner';
import SuccessModal from './SuccessModal';
import DebugTaskInfo from './DebugTaskInfo';

interface Props {
  job: Job;
  task: Task;
}

export default function TaskView({ job, task }: Props) {
  const [code, setCode] = useState(task.starterCode);
  const [showSuccess, setShowSuccess] = useState(false);
  const { completeTask, setCurrentTask, player } = useGameStore();
  const testRunnerRef = useRef<TestRunnerHandle>(null);

  // Reset code when task changes
  useEffect(() => {
    setCode(task.starterCode);
  }, [task.id, task.starterCode]);
  
  const handleSuccess = () => {
    completeTask(task.id);
    setShowSuccess(true);
  };
  
  const handleNext = () => {
    const currentIndex = job.tasks.findIndex(t => t.id === task.id);
    const nextTask = job.tasks[currentIndex + 1];
    
    if (nextTask) {
      setCurrentTask(job.id, nextTask.id);
      // Code reset handled by useEffect
      setShowSuccess(false);
    } else {
      // Job complete - show final success
      setShowSuccess(false);
      // TODO: Show job completion screen or redirect
    }
  };
  
  const completedCount = player.completedTasks.filter(
    id => job.tasks.some(t => t.id === id)
  ).length;

  // Calculate learned skills for autocomplete whitelist
  const learnedSkills = useMemo(() => {
    const skills = new Set<ExpertiseSkill>();
    
    // Skills from completed tasks
    job.tasks.forEach(t => {
      if (player.completedTasks.includes(t.id)) {
        t.teachesSkills.forEach(s => skills.add(s));
      }
    });

    // Skills from the current task
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
              Task {task.order}/{job.tasks.length}: {task.instruction.split('\n')[0].slice(0, 50)}
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
        {/* Left: Instruction panel */}
        <div className="w-1/3 bg-gray-800 p-6 overflow-y-auto border-r border-gray-700">
          <h2 className="text-lg font-bold mb-4">Instructions</h2>
          <div className="prose prose-invert">
            <p className="whitespace-pre-line text-gray-300 leading-relaxed">
              {task.instruction}
            </p>
          </div>
          
          {/* Goals info */}
          <div className="mt-6">
            <h3 className="text-sm font-bold text-gray-400 mb-2">
              {task.tests.length === 1 ? 'Goal' : 'Goals'}
            </h3>
            <ul className="space-y-1">
              {task.tests.map(test => (
                <li key={test.id} className="text-sm text-gray-500">
                  • {test.name}
                </li>
              ))}
            </ul>
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
