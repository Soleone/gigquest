'use client';

import { Task } from '@/types/game';
import { useState } from 'react';

interface Props {
  task: Task;
}

export default function DebugTaskInfo({ task }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const isDev = process.env.NODE_ENV === 'development';

  if (!isDev) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold py-1 px-3 rounded shadow-lg border border-purple-500"
      >
        {isOpen ? 'Hide Debug' : 'Debug Task'}
      </button>

      {isOpen && (
        <div className="absolute bottom-10 left-0 w-96 max-h-[80vh] overflow-y-auto bg-gray-900 border border-purple-500 rounded-lg shadow-xl p-4 text-xs font-mono">
          <h3 className="text-purple-400 font-bold mb-2">Task Debug Info</h3>
          
          <div className="space-y-4">
            <div>
              <div className="text-gray-500 mb-1">ID:</div>
              <div className="text-gray-300">{task.id}</div>
            </div>

            <div>
              <div className="text-gray-500 mb-1">Win Conditions (Goals):</div>
              <div className="space-y-2">
                {task.tests.map((test, i) => (
                  <div key={test.id} className="bg-gray-800 p-2 rounded border border-gray-700">
                    <div className="text-purple-300 font-bold">{i + 1}. {test.name}</div>
                    <div className="text-gray-400 mt-1">{test.description}</div>
                    <div className="mt-2 text-green-400">
                      Type: {test.type}
                    </div>
                    {test.type === 'output' && (
                      <div className="mt-1 text-yellow-300">
                        Expected Output: {JSON.stringify(test.expectedOutput)}
                      </div>
                    )}
                    {test.type === 'variable' && (
                      <div className="mt-1 text-yellow-300">
                        Expected Variables: 
                        <pre className="mt-1">{JSON.stringify(test.expectedVariables, null, 2)}</pre>
                      </div>
                    )}
                    {test.type === 'custom' && (
                      <div className="mt-1 text-yellow-300">
                        Validation Code:
                        <pre className="mt-1 whitespace-pre-wrap">{test.validationCode}</pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-gray-500 mb-1">Starter Code:</div>
              <pre className="bg-gray-800 p-2 rounded text-gray-300 whitespace-pre-wrap">
                {task.starterCode}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
