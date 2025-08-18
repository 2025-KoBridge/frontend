import ISO6391 from 'iso-639-1';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { languageKoreanNames } from '@/constants/languageKoreanNames';

interface LanguageListProps {
  disabled?: boolean;
  onSelect?: (code: string) => void;
}

function LanguageListItems({
  isOpen,
  onSelect,
}: {
  isOpen: boolean;
  onSelect: (code: string) => void;
}) {
  const codes = ISO6391.getAllCodes();
  return (
    <ul
      className={`absolute z-10 w-full bg-white rounded-b-2xl shadow-sm overflow-auto pt-3 scrollbar-thin scrollbar-thumb-gray-300 transition-all duration-300 ${
        isOpen
          ? 'max-h-[288px] min-h-[288px] opacity-100'
          : 'max-h-0 min-h-0 opacity-0'
      }`}
      style={{ top: 'calc(100% - 14px)' }}
      onWheel={e => e.stopPropagation()}
    >
      {codes.map(code => (
        <li
          key={code}
          className="px-4 py-3 cursor-pointer text-trans-cp1-regular text-black hover:bg-gray-100 flex items-center"
          onClick={() => onSelect(code)}
        >
          {ISO6391.getName(code)}
          <span className="text-gray-400 text-cp1-regular ml-1">
            {languageKoreanNames[code] || code}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function LanguageListDropdown({
  disabled = false,
  onSelect,
}: LanguageListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState<string>(
    ISO6391.getAllCodes()[0],
  );

  const handleSelect = (code: string) => {
    setSelectedCode(code);
    setIsOpen(false);
    onSelect?.(code);
  };

  // 드롭다운이 열려있을 때 배경 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="relative w-full">
      {/* 겹치는 회색 직사각형 배경 */}
      <div className="absolute inset-0 bg-gray-900 rounded-2xl translate-y-0.5" />
      <button
        disabled={disabled}
        onClick={handleToggle}
        className={`relative z-11 w-full rounded-2xl px-4 py-3 flex justify-between items-center focus:outline-none transition-colors ${
          disabled
            ? 'bg-gray-900 text-gray-500 cursor-not-allowed'
            : 'bg-white border-2 border-primary'
        }`}
      >
        <span className="text-trans-cp1-regular text-black gap-1 flex items-center">
          {ISO6391.getName(selectedCode)}
          <span className="text-cp1-regular text-gray-500 ml-1">
            {languageKoreanNames[selectedCode] || selectedCode}
          </span>
        </span>
        {!disabled && (
          <Image
            src={isOpen ? '/icons/chevron-up.svg' : '/icons/chevron-down.svg'}
            alt="chevron icon"
            width={24}
            height={24}
          />
        )}
      </button>
      {/* 언어 리스트 (최대 8개 높이, 스크롤 가능) */}
      <LanguageListItems isOpen={isOpen} onSelect={handleSelect} />
    </div>
  );
}
