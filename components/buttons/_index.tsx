import Image from 'next/image';
import { useState, TouchEventHandler, MouseEventHandler } from 'react';

interface ButtonProps {
  text: string;
  iconPath?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  btnColor?: string;
}

export default function Button({
  text,
  iconPath,
  className,
  onClick,
  disabled = false,
  btnColor = 'bg-primary',
}: ButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  // 모바일 터치 이벤트
  const handleTouchStart: TouchEventHandler<HTMLButtonElement> = () =>
    setIsPressed(true);
  const handleTouchEnd: TouchEventHandler<HTMLButtonElement> = () =>
    setIsPressed(false);

  return (
    <div className={`relative w-full ${className}`}>
      {/* 직사각형 그림자 */}
      <div
        className={`absolute inset-0 rounded-2xl transition-transform duration-150 translate-y-1
        ${disabled ? 'bg-gray-700' : 'bg-primary-dimensional '}`}
      />
      {/* 실제 버튼 */}
      <button
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={`
          relative w-full flex flex-row items-center justify-center gap-1 py-3 rounded-2xl text-bd2-bold transition-transform duration-150
          ${!disabled && isPressed ? 'translate-y-1' : 'translate-y-0'}
          ${disabled ? 'bg-gray-900 text-gray-500 cursor-not-allowed' : `${btnColor} text-black`}
          ${className ? className : ''}
        `}
      >
        {text}
        {iconPath && (
          <Image
            src={iconPath}
            alt={`${text} icon`}
            width={24}
            height={24}
            className={`pb-0.5 transition-filter duration-150 ${disabled ? 'filter grayscale opacity-50' : 'filter-none'}`}
            unoptimized
          />
        )}
      </button>
    </div>
  );
}
