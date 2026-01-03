'use client';

import Editor, { OnMount } from '@monaco-editor/react';
import { ExpertiseSkill } from '@/types/game';
import { useEffect, useRef } from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  onRun?: () => void;
  learnedSkills?: ExpertiseSkill[];
}

const SKILL_TO_KEYWORDS: Record<ExpertiseSkill, string[]> = {
  'const': ['const'],
  'let': ['let'],
  'number': [],
  'string': [],
  'addition': [],
  'subtraction': [],
  'console.log': ['console', 'log'],
};

export default function CodeEditor({ value, onChange, onRun, learnedSkills = [] }: Props) {
  const monacoRef = useRef<any>(null);
  const completionProviderRef = useRef<any>(null);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    monacoRef.current = monaco;

    // Configure JS defaults to be very minimal
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      noLib: true, // Disable standard library completions (window, document, etc.)
      allowNonTsExtensions: true,
    });

    // Add keyboard command for running tests
    if (onRun) {
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
        onRun();
      });
    }

    // Register completion provider
    registerCompletionProvider(monaco, learnedSkills);
  };

  const registerCompletionProvider = (monaco: any, skills: ExpertiseSkill[]) => {
    // Dispose previous provider if it exists
    if (completionProviderRef.current) {
      completionProviderRef.current.dispose();
    }

    const keywords = Array.from(new Set(
      skills.flatMap(skill => SKILL_TO_KEYWORDS[skill] || [])
    ));

    completionProviderRef.current = monaco.languages.registerCompletionItemProvider('javascript', {
      provideCompletionItems: (model: any, position: any) => {
        const suggestions = keywords.map(kw => ({
          label: kw,
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: kw,
          range: {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: model.getWordUntilPosition(position).startColumn,
            endColumn: position.column,
          },
        }));

        return { suggestions };
      },
    });
  };

  // Re-register provider when learnedSkills changes
  useEffect(() => {
    if (monacoRef.current) {
      registerCompletionProvider(monacoRef.current, learnedSkills);
    }
  }, [learnedSkills]);

  return (
    <Editor
      height="100%"
      defaultLanguage="javascript"
      theme="vs-dark"
      value={value}
      onChange={(v) => onChange(v || '')}
      onMount={handleEditorDidMount}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: 'on',
        roundedSelection: false,
        scrollBeyondLastLine: false,
        automaticLayout: true,
        wordBasedSuggestions: 'currentDocument', // Only suggest words already in the file
        suggest: {
          showKeywords: false,
        },
        snippetSuggestions: 'none',
        quickSuggestions: {
          other: true,
          comments: false,
          strings: false,
        },
      }}
    />
  );
}
