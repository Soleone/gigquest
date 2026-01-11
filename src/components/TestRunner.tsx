'use client';

import { Test, TestResult } from '@/types/game';
import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { executeCode, runTests } from '@/lib/codeRunner';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export interface TestRunnerHandle {
  run: () => void;
}

interface Props {
  code: string;
  tests: Test[];
  onSuccess: () => void;
}

const TestRunner = forwardRef<TestRunnerHandle, Props>(({ code, tests, onSuccess }, ref) => {
  const [results, setResults] = useState<TestResult[]>([]);
  const [output, setOutput] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  // Reset state when task changes (tests prop changes)
  useEffect(() => {
    setResults([]);
    setOutput([]);
    setError(null);
  }, [tests]);
  
  const handleRun = () => {
    setIsRunning(true);
    setError(null);
    
    // Execute code
    const execution = executeCode(code);
    
    // Update output
    setOutput(execution.logs.map(log => 
      typeof log === 'object' ? JSON.stringify(log) : String(log)
    ));
    
    if (!execution.success) {
      setError(execution.error || 'Unknown error');
      setResults([]);
      setIsRunning(false);
      return;
    }
    
    // Run tests
    const testResults = runTests(tests, execution);
    setResults(testResults);
    
    // Check if all passed
    const allPassed = testResults.every(r => r.passed);
    if (allPassed) {
      setTimeout(() => onSuccess(), 500);
    }
    
    setIsRunning(false);
  };

  useImperativeHandle(ref, () => ({
    run: handleRun
  }));
  
  return (
    <div className="h-full flex flex-col">
      {/* Controls */}
      <div className="p-3 bg-gray-900 border-b border-gray-700 flex items-center gap-3">
        <Button
          onClick={handleRun}
          disabled={isRunning}
          className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white"
        >
          {isRunning ? 'Running...' : 'Finish'}
        </Button>
        
        {results.length > 0 && (
          <div className="flex items-center gap-2">
            {results.every(r => r.passed) ? (
              <span className="text-green-400 font-bold">✓ All tests passed!</span>
            ) : (
              <span className="text-yellow-400">
                {results.filter(r => r.passed).length}/{results.length} passed
              </span>
            )}
          </div>
        )}
      </div>
      
      {/* Output area */}
      <div className="flex-1 overflow-y-auto p-3 font-mono text-sm">
        {/* Console output */}
        {output.length > 0 && (
          <div className="mb-4">
            <div className="text-gray-500 text-xs mb-1">Console Output:</div>
            {output.map((line, i) => (
              <div key={i} className="text-gray-300">&gt; {line}</div>
            ))}
          </div>
        )}
        
        {/* Error */}
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {/* Goal status */}
        {results.length > 0 && (
          <div>
            <div className="text-gray-500 text-xs mb-2">Goal Status:</div>
            <div className="space-y-2">
              {results.map((result) => (
                <div
                  key={result.testId}
                  className={`p-2 rounded ${
                    result.passed 
                      ? 'bg-green-900/20 border border-green-500' 
                      : 'bg-red-900/20 border border-red-500'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className={result.passed ? 'text-green-400' : 'text-red-400'}>
                      {result.passed ? '✓' : '✗'}
                    </span>
                    <span className="font-bold">
                      {tests.find(t => t.id === result.testId)?.name}
                    </span>
                  </div>
                  <div className={result.passed ? 'text-green-300' : 'text-red-300'}> {result.message} </div> </div> ))} </div> </div> )} </div> </div> ); });

export default TestRunner;
