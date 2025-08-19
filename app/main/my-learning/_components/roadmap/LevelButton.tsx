import { MouseEventHandler, TouchEventHandler, useState } from 'react';
import LevelModal from './LevelModal';
import Toast from '@/components/Toast';

interface ButtonProps {
  text: string;
  subText?: string;
  status: 'current' | 'complete' | 'locked';
  levelNum: number;
  className?: string;
}

export default function LevelButton({
  text,
  subText,
  levelNum,
  status = 'locked',
  className,
}: ButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);

  const handleTouchStart: TouchEventHandler<HTMLButtonElement> = () =>
    setIsPressed(true);
  const handleTouchEnd: TouchEventHandler<HTMLButtonElement> = () =>
    setIsPressed(false);

  const handleClick: MouseEventHandler<HTMLButtonElement> = e => {
    setIsPressed(true);
    if (status === 'locked') {
      setIsToastOpen(true);
      setIsPressed(false);
      return;
    }
    // 1초 뒤에 모달 열기
    setTimeout(() => {
      setIsModalOpen(true);
      setIsPressed(false);
    }, 300);
  };

  const statusStyles = {
    current: {
      bg: 'bg-primary',
      shadowBg: 'bg-primary-dimensional',
      levelBg: 'bg-white',
      textColor: 'text-black',
      subTextColor: 'text-gray-300',
      levelTextColor: 'text-secondary-300',
    },
    complete: {
      bg: 'bg-white',
      shadowBg: 'bg-primary',
      levelBg: 'bg-primary-800',
      textColor: 'text-black',
      subTextColor: 'text-gray-500',
      levelTextColor: 'text-secondary-300',
    },
    locked: {
      bg: 'bg-bg-solid',
      shadowBg: 'bg-bg-solid',
      levelBg: 'bg-white',
      textColor: 'text-secondary-300',
      subTextColor: 'text-secondary-400',
      levelTextColor: 'text-secondary-300',
    },
  };

  const { bg, shadowBg, levelBg, textColor, subTextColor, levelTextColor } =
    statusStyles[status];

  return (
    <>
      <div className="relative max-w-[46svw]">
        {/* 그림자 도형 */}
        <div
          className={`absolute inset-0 rounded-full transition-transform duration-150 translate-y-1 ${shadowBg}`}
        />
        {/* 실제 버튼 */}
        <button
          onClick={handleClick}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className={`
            relative w-full flex flex-col items-center px-3 py-4 rounded-full text-center transition-transform duration-150
            ${isPressed ? 'translate-y-1' : 'translate-y-0'}
            ${bg}
            ${className ?? ''}
          `}
        >
          {/* 레벨 */}
          <div
            className={`text-trans-cp3-regular ${levelTextColor} ${levelBg} px-2 py-1 mb-3 rounded-xl`}
          >
            Lv. {levelNum}
          </div>
          {/* 텍스트 */}
          <span className={`text-bd2-bold ${textColor}`}>{text}</span>
          {subText && (
            <span className={`text-trans-cp2-regular ${subTextColor}`}>
              {subText}
            </span>
          )}
        </button>
      </div>
      {/* 모달 */}
      {isModalOpen && (
        <LevelModal
          levelNum={levelNum}
          title={text}
          showButton={status === 'current'}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {/* 토스트 */}
      <Toast
        message="지금은 학습할 수 없어요."
        isOpen={isToastOpen}
        onClose={() => setIsToastOpen(false)}
      />
    </>
  );
}
