'use client';

import { useState, useEffect, useRef, useMemo } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number; // ms per character
  onSpeakingChange?: (isSpeaking: boolean) => void;
  onComplete?: () => void;
  enabled?: boolean; // if false, waits to start
  className?: string;
}

interface TextSegment {
  type: 'plain' | 'bold' | 'italic' | 'code';
  content: string;
  displayContent: string; // content without markdown markers
}

function parseText(text: string): TextSegment[] {
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g;
  const parts = text.split(pattern);

  return parts.filter(Boolean).map(part => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return { type: 'bold' as const, content: part, displayContent: part.slice(2, -2) };
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return { type: 'code' as const, content: part, displayContent: part.slice(1, -1) };
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return { type: 'italic' as const, content: part, displayContent: part.slice(1, -1) };
    }
    return { type: 'plain' as const, content: part, displayContent: part };
  });
}

export default function TypewriterText({
  text,
  speed = 30,
  onSpeakingChange,
  onComplete,
  enabled = true,
  className
}: TypewriterTextProps) {
  const [displayedLength, setDisplayedLength] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [mouthOpen, setMouthOpen] = useState(false);
  const mouthToggleRef = useRef<NodeJS.Timeout | null>(null);

  const segments = useMemo(() => parseText(text), [text]);
  const totalLength = useMemo(
    () => segments.reduce((sum, seg) => sum + seg.displayContent.length, 0),
    [segments]
  );

  useEffect(() => {
    // Reset when text changes
    setDisplayedLength(0);
    setIsComplete(false);
    setMouthOpen(false);
  }, [text]);

  // Mouth animation - toggle every ~100ms while typing
  useEffect(() => {
    if (isComplete || !enabled) {
      if (mouthToggleRef.current) {
        clearInterval(mouthToggleRef.current);
      }
      return;
    }

    // Toggle mouth open/closed rapidly while speaking
    mouthToggleRef.current = setInterval(() => {
      setMouthOpen(prev => !prev);
    }, 100);

    return () => {
      if (mouthToggleRef.current) {
        clearInterval(mouthToggleRef.current);
      }
    };
  }, [isComplete, enabled]);

  // Notify parent of speaking state changes
  useEffect(() => {
    if (isComplete) {
      onSpeakingChange?.(false);
    } else {
      onSpeakingChange?.(mouthOpen);
    }
  }, [mouthOpen, isComplete, onSpeakingChange]);

  // Text reveal animation
  useEffect(() => {
    if (!enabled) return;

    if (displayedLength >= totalLength) {
      if (!isComplete) {
        setIsComplete(true);
        onComplete?.();
      }
      return;
    }

    const timer = setTimeout(() => {
      setDisplayedLength(prev => prev + 1);
    }, speed);

    return () => clearTimeout(timer);
  }, [displayedLength, totalLength, speed, enabled, isComplete, onComplete]);

  const handleClick = () => {
    if (!isComplete && enabled) {
      // Skip to end on click
      setDisplayedLength(totalLength);
      setIsComplete(true);
      onSpeakingChange?.(false);
      onComplete?.();
    }
  };

  // Render segments with proper formatting, only showing revealed characters
  const renderSegments = () => {
    let charCount = 0;

    return segments.map((segment, index) => {
      const segmentStart = charCount;
      charCount += segment.displayContent.length;

      if (segmentStart >= displayedLength) {
        return null; // Haven't reached this segment yet
      }

      const visibleChars = Math.min(
        segment.displayContent.length,
        displayedLength - segmentStart
      );
      const visibleText = segment.displayContent.slice(0, visibleChars);

      switch (segment.type) {
        case 'bold':
          return <strong key={index} className="font-semibold">{visibleText}</strong>;
        case 'italic':
          return <em key={index} className="italic">{visibleText}</em>;
        case 'code':
          return (
            <code
              key={index}
              className="bg-cyan-900/50 text-cyan-200 px-1 rounded font-mono text-xs border border-cyan-700/30"
            >
              {visibleText}
            </code>
          );
        default:
          return <span key={index}>{visibleText}</span>;
      }
    });
  };

  return (
    <span className={className} onClick={handleClick} style={{ cursor: isComplete ? 'default' : 'pointer' }}>
      {renderSegments()}
      {!isComplete && <span className="animate-pulse">▌</span>}
    </span>
  );
}
