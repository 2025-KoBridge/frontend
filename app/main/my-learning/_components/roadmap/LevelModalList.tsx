import Image from 'next/image';
import { MouseEventHandler } from 'react';

interface ButtonProps {
  levelGoalText: string;
  levelGoalSubText?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  completeGoal?: boolean;
}

export default function LevelModalList({
  levelGoalText,
  levelGoalSubText,
  className,
  onClick,
  completeGoal = false,
}: ButtonProps) {
  return (
    <div className="relative w-full">
      <button
        onClick={onClick}
        className={`
          relative w-full flex flex-row items-center gap-2 px-4 py-2 rounded-2xl text-left bg-bg-solid
          ${className ?? ''}
        `}
      >
        {/* 체크 아이콘 */}
        <Image
          src={
            completeGoal
              ? '/icons/checkbox-checked.svg'
              : '/icons/checkbox-unchecked.svg'
          }
          alt={`${levelGoalText} icon`}
          width={24}
          height={24}
          className={`transition-filter duration-150`}
          unoptimized
        />
        {/* 텍스트 영역 */}
        <div className="flex flex-col">
          <span className="text-bd1-bold text-black">{levelGoalText}</span>
          {levelGoalSubText && (
            <span className="text-trans-cp2-regular text-secondary-300">
              {levelGoalSubText}
            </span>
          )}
        </div>
      </button>
    </div>
  );
}
