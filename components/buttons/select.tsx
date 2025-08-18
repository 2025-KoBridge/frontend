import Image from 'next/image';
import { MouseEventHandler } from 'react';

interface ButtonProps {
  text: string;
  subText?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  selected?: boolean;
}

export default function SelectButton({
  text,
  subText,
  className,
  onClick,
  selected = false,
}: ButtonProps) {
  return (
    <div className="relative w-full">
      {/* 직사각형 그림자 */}
      <div
        className={`absolute inset-0 rounded-2xl transition-transform duration-150 translate-y-1 bg-primary`}
      />
      {/* 실제 버튼 */}
      <button
        onClick={onClick}
        className={`
          relative w-full flex flex-row items-center gap-3 px-4 py-3 rounded-2xl text-left
          transition-transform duration-150
          ${selected ? 'translate-y-1 border-2 border-primary bg-primary-900' : 'translate-y-0 bg-white'} 
          ${className ?? ''}
        `}
      >
        {/* 왼쪽 텍스트 영역 */}
        <div className="flex flex-row flex-1 items-center gap-1">
          <span className="text-bd2-regular">{text}</span>
          {subText && (
            <span className="text-trans-cp2-regular text-gray-500">
              {subText}
            </span>
          )}
        </div>
        {/* 오른쪽 아이콘 */}
        <Image
          src={
            selected
              ? '/icons/check-checked-small.svg'
              : '/icons/check-unchecked-small.svg'
          }
          alt={`${text} icon`}
          width={16}
          height={16}
          className={`transition-filter duration-150`}
          unoptimized
        />
      </button>
    </div>
  );
}
