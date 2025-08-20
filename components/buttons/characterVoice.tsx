import Image from 'next/image';
import { MouseEventHandler } from 'react';

interface ButtonProps {
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  selected?: boolean;
}

export default function CharacterVoiceButton({
  className,
  onClick,
  selected = false,
}: ButtonProps) {
  return (
    <div className="relative">
      {/* 직사각형 그림자 */}
      <div
        className={`absolute inset-0 w-12 h-12 rounded-full transition-transform duration-150 translate-y-1 bg-gray-900`}
      />
      {/* 실제 버튼 */}
      <button
        onClick={onClick}
        className={`
          relative w-12 h-12 flex flex-row items-center justify-center rounded-full transition-transform duration-150
          ${selected ? 'translate-y-1  bg-gray-900' : 'translate-y-0 bg-white'} 
          ${className ?? ''}
        `}
      >
        <Image
          src={'/icons/audio.svg'}
          alt={`character voice icon`}
          width={24}
          height={24}
          className={`transition-filter duration-150`}
          unoptimized
        />
      </button>
    </div>
  );
}
