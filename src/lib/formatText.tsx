import React from 'react';

interface FormatTextProps {
  text: string;
  className?: string;
}

/**
 * Renders text with inline formatting:
 * - **bold** -> <strong>
 * - *italic* -> <em>
 * - `code` -> <code>
 */
export function FormatText({ text, className }: FormatTextProps) {
  // Combined regex to match all formatting patterns
  // Order matters: bold (**) before italic (*) to avoid conflicts
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g;
  const parts = text.split(pattern);

  let key = 0;
  const elements = parts.map(part => {
    if (!part) return null;

    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={key++} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }

    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={key++}
          className="bg-cyan-900/50 text-cyan-200 px-1 rounded font-mono text-xs border border-cyan-700/30"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return (
        <em key={key++} className="italic">
          {part.slice(1, -1)}
        </em>
      );
    }

    return <span key={key++}>{part}</span>;
  });

  return <span className={className}>{elements}</span>;
}
