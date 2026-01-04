'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import TypewriterText from './TypewriterText';

interface CharacterDialogueProps {
  name: string;
  text: string;
  portraitBase: string; // e.g., '/characters/betty-happy' (without .png)
  width?: number;
  height?: number;
  speed?: number;
  enabled?: boolean;
  onComplete?: () => void;
  labelColor?: string;
  borderColor?: string;
  bgColor?: string;
  textColor?: string;
  italic?: boolean;
}

export default function CharacterDialogue({
  name,
  text,
  portraitBase,
  width = 176,
  height = 192,
  speed = 50,
  enabled = true,
  onComplete,
  labelColor = 'text-amber-500',
  borderColor = 'border-amber-500',
  bgColor = 'bg-gray-900/50',
  textColor = 'text-gray-200',
  italic = false,
}: CharacterDialogueProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeakingChange = useCallback((speaking: boolean) => {
    setIsSpeaking(speaking);
  }, []);

  return (
    <div className={`${bgColor} p-4 rounded-lg border-l-4 ${borderColor} flex gap-4`}>
      <div className="flex-shrink-0">
        <Image
          key={isSpeaking ? 'speaking' : 'idle'}
          src={isSpeaking ? `${portraitBase}-speaking.png` : `${portraitBase}.png`}
          alt={name}
          width={width}
          height={height}
          className="rounded-lg"
          unoptimized
        />
      </div>
      <p className={`whitespace-pre-line ${textColor} leading-relaxed ${italic ? 'italic' : ''} flex-1`}>
        <TypewriterText
          text={text.trim()}
          speed={speed}
          onSpeakingChange={handleSpeakingChange}
          onComplete={onComplete}
          enabled={enabled}
        />
      </p>
    </div>
  );
}
