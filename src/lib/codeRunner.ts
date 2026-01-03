import { ExecutionResult, Test, TestResult } from '@/types/game';

const JS_KEYWORDS = [
  'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default', 
  'delete', 'do', 'else', 'export', 'extends', 'finally', 'for', 'function', 
  'if', 'import', 'in', 'instanceof', 'new', 'return', 'super', 'switch', 
  'this', 'throw', 'try', 'typeof', 'var', 'void', 'while', 'with', 'yield',
  'let', 'static', 'enum', 'await', 'implements', 'package', 'protected', 
  'interface', 'private', 'public', 'true', 'false', 'null', 'undefined'
];

/**
 * Executes user code in a sandboxed environment
 * Captures console.log output and variable state
 */
export function executeCode(code: string): ExecutionResult {
  const logs: any[] = [];
  const variables: Record<string, any> = {};
  
  // Mock console to capture logs
  const mockConsole = {
    log: (...args: any[]) => {
      logs.push(args.length === 1 ? args[0] : args);
    }
  };
  
  try {
    const varNames = extractVariableNames(code);
    const declarations = extractDeclarations(code);
    
    // Create function scope to capture variables
    const wrappedCode = `
      ${code}
      
      // Capture all variables in current scope
      return {
        ${varNames.map(v => `"${v}": typeof ${v} !== 'undefined' ? ${v} : undefined`).join(',\n')}
      };
    `;
    
    // eslint-disable-next-line no-new-func
    const fn = new Function('console', wrappedCode);
    const result = fn(mockConsole) || {};
    
    // Filter out undefined variables
    Object.keys(result).forEach(key => {
      if (result[key] !== undefined) {
        variables[key] = result[key];
      }
    });
    
    return {
      success: true,
      logs,
      variables,
      declarations
    };
    
  } catch (error: any) {
    return {
      success: false,
      logs,
      variables,
      error: error.message
    };
  }
}

/**
 * Extract variable names from code
 */
function extractVariableNames(code: string): string[] {
  const matches = new Set<string>();
  
  // 1. Match declarations: const x, let y, var z
  const declRegex = /\b(?:const|let|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g;
  let match;
  while ((match = declRegex.exec(code)) !== null) {
    matches.add(match[1]);
  }
  
  // 2. Match assignments: x = 10, y += 5
  const assignRegex = /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?:\+|-|\*|\/)?=(?!=)/g;
  while ((match = assignRegex.exec(code)) !== null) {
    matches.add(match[1]);
  }

  // 3. Remove JS keywords
  const result = Array.from(matches).filter(name => !JS_KEYWORDS.includes(name));
  
  return result;
}

/**
 * Extract variable declarations (const/let/var)
 */
function extractDeclarations(code: string): Record<string, 'const' | 'let' | 'var'> {
  const declarations: Record<string, 'const' | 'let' | 'var'> = {};
  const regex = /\b(const|let|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g;
  
  let match;
  while ((match = regex.exec(code)) !== null) {
    declarations[match[2]] = match[1] as 'const' | 'let' | 'var';
  }
  
  return declarations;
}

/**
 * Run tests against execution result
 */
export function runTests(tests: Test[], result: ExecutionResult): TestResult[] {
  if (!result.success) {
    return tests.map(test => ({
      testId: test.id,
      passed: false,
      message: result.error || 'Code execution failed'
    }));
  }
  
  return tests.map(test => validateTest(test, result));
}

/**
 * Validate a single test
 */
function validateTest(test: Test, result: ExecutionResult): TestResult {
  try {
    switch (test.type) {
      case 'output':
        return validateOutputTest(test, result);
      
      case 'variable':
        return validateVariableTest(test, result);
      
      case 'custom':
        return validateCustomTest(test, result);
      
      default:
        return {
          testId: test.id,
          passed: false,
          message: 'Unknown test type'
        };
    }
  } catch (error: any) {
    return {
      testId: test.id,
      passed: false,
      message: error.message
    };
  }
}

function validateOutputTest(test: Test, result: ExecutionResult): TestResult {
  const lastLog = result.logs[result.logs.length - 1];
  const passed = lastLog === test.expectedOutput;
  
  return {
    testId: test.id,
    passed,
    message: passed 
      ? (test.passMessage || 'Test passed!') 
      : (test.failMessage || `Expected output: ${test.expectedOutput}, got: ${lastLog}`)
  };
}

function validateVariableTest(test: Test, result: ExecutionResult): TestResult {
  if (!test.expectedVariables) {
    return { testId: test.id, passed: false, message: 'No expected variables defined' };
  }
  
  const missingVars: string[] = [];
  const incorrectVars: string[] = [];
  
  Object.entries(test.expectedVariables).forEach(([varName, expectedValue]) => {
    if (!(varName in result.variables)) {
      missingVars.push(varName);
    } else if (result.variables[varName] !== expectedValue) {
      incorrectVars.push(`${varName} (expected ${expectedValue}, got ${result.variables[varName]})`);
    }
  });
  
  if (missingVars.length > 0) {
    return {
      testId: test.id,
      passed: false,
      message: test.failMessage || `Missing variables: ${missingVars.join(', ')}`
    };
  }
  
  if (incorrectVars.length > 0) {
    return {
      testId: test.id,
      passed: false,
      message: test.failMessage || `Incorrect values: ${incorrectVars.join(', ')}`
    };
  }
  
  return {
    testId: test.id,
    passed: true,
    message: test.passMessage || 'All variables correct!'
  };
}

function validateCustomTest(test: Test, result: ExecutionResult): TestResult {
  if (!test.validationCode) {
    return { testId: test.id, passed: false, message: 'No validation code provided' };
  }
  
  try {
    // We pass both variables AND the declarations map to the custom test function
    const fn = new Function(
      'variables',
      'declarations', 
      test.validationCode
    );
    
    const passed = fn(result.variables, result.declarations || {});
    
    return {
      testId: test.id,
      passed: Boolean(passed),
      message: passed 
        ? (test.passMessage || 'Test passed!') 
        : (test.failMessage || 'Test failed')
    };
  } catch (error: any) {
    return {
      testId: test.id,
      passed: false,
      message: `Validation error: ${error.message}`
    };
  }
}
