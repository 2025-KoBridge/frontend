'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Role } from './ChatMessageList';

export default function ChatBubble({
  role,
  text,
  translation,
  showAudio,
  showTranslate,
}: {
  role: Role;
  text: string;
  translation?: string;
  showAudio?: boolean;
  showTranslate?: boolean;
}) {
  const [showTranslation, setShowTranslation] = useState(false);

  return (
    <div className={`flex items-end gap-2`}>
      <Image
        src="/character/default.webp"
        alt="character profile"
        width={55}
        height={55}
        className="rounded-full"
      />

      <div
        className={`
          max-w-[75%] rounded-t-2xl px-6 py-4 text-black text-bd2-regular 
          bg-gray-100 rounded-br-2xl
        `}
      >
        {/* 원문 대신 번역 표시 */}
        <span>{showTranslation && translation ? translation : text}</span>

        {(showAudio || showTranslate) && (
          <div className="pt-1 flex items-center gap-2">
            {showAudio && (
              <Image
                src="/icons/audio-gray.svg"
                alt="listen"
                width={16}
                height={16}
              />
            )}
            {showTranslate && translation && (
              <button onClick={() => setShowTranslation(prev => !prev)}>
                <Image
                  src="/icons/translate-gray.svg"
                  alt="translate"
                  width={16}
                  height={16}
                />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
