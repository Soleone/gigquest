'use client';

import { useState, useEffect, useRef } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number; // ms per character
  onSpeakingChange?: (isSpeaking: boolean) => void;
  className?: string;
}

export default function TypewriterText({
  text,
  speed = 30,
  onSpeakingChange,
  className
}: TypewriterTextProps) {
  const [displayedLength, setDisplayedLength] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [mouthOpen, setMouthOpen] = useState(false);
  const mouthToggleRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Reset when text changes
    setDisplayedLength(0);
    setIsComplete(false);
    setMouthOpen(false);
  }, [text]);

  // Mouth animation - toggle every ~100ms while typing
  useEffect(() => {
    if (isComplete) {
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
  }, [isComplete]);

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
    if (displayedLength >= text.length) {
      setIsComplete(true);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayedLength(prev => prev + 1);
    }, speed);

    return () => clearTimeout(timer);
  }, [displayedLength, text.length, speed]);

  const handleClick = () => {
    if (!isComplete) {
      // Skip to end on click
      setDisplayedLength(text.length);
      setIsComplete(true);
      onSpeakingChange?.(false);
    }
  };

  return (
    <span className={className} onClick={handleClick} style={{ cursor: isComplete ? 'default' : 'pointer' }}>
      {text.slice(0, displayedLength)}
      {!isComplete && <span className="animate-pulse">▌</span>}
    </span>
  );
}
