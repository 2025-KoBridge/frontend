'use client';

import { useState, KeyboardEvent } from 'react';
import Image from 'next/image';

type TextFieldChatProps = {
  placeholder?: string;
  onSubmit?: (text: string) => void;
};

export default function TextFieldChat({
  placeholder = '여기에 문장을 써 보자.',
  onSubmit,
}: TextFieldChatProps) {
  const [inputValue, setInputValue] = useState('');
  const [isActive, setIsActive] = useState(false);

  const handleSubmit = () => {
    if (!inputValue.trim()) return;
    onSubmit?.(inputValue.trim());
    setInputValue('');
    setIsActive(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const hasValue = inputValue.trim().length > 0;

  return (
    <div className="relative w-full">
      {/* 그림자 레이어 */}
      <div className="absolute inset-0 bg-gray-900 rounded-2xl translate-y-1 pointer-events-none" />
      {/* 실제 인풋 컨테이너 */}
      <div
        className={`flex items-center w-full px-3 py-2 rounded-2xl border bg-white transition relative
      ${isActive || hasValue ? 'border-primary border-2' : 'border-gray-900'}
    `}
      >
        <input
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
          onKeyDown={handleKeyDown}
          className="flex-1 outline-none text-black [text-size-adjust:100%]"
        />
        <button onClick={handleSubmit} disabled={!hasValue}>
          <Image
            src={
              hasValue
                ? '/icons/check-enabled.svg'
                : '/icons/check-disabled.svg'
            }
            alt="전송"
            width={32}
            height={32}
          />
        </button>
      </div>
    </div>
  );
}
