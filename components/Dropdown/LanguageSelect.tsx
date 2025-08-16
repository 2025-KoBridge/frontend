import { useState } from 'react';
import Image from 'next/image';
import {
  LanguageDropdown,
  LanguageDropdownProps,
} from '@/constants/dropdown/languages';
import { useLanguageStore } from '@/store/languageStore';

export default function LanguageSelectDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentLanguage, setLanguage } = useLanguageStore();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (lang: LanguageDropdownProps) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      {/* 겹치는 회색 직사각형 배경 */}
      <div className="absolute inset-0 bg-gray-900 rounded-2xl translate-y-0.5" />
      {/* 드랍다운 버튼 */}
      <button
        onClick={toggleDropdown}
        className={`relative z-11 w-full rounded-2xl px-4 py-3 flex justify-between items-center focus:outline-none bg-white transition-colors
          ${isOpen ? 'border-2 border-primary' : 'border border-gray-900'}`}
      >
        <span className="text-trans-cp1-regular text-black gap-1 flex items-center">
          {currentLanguage.label}
          <span className="text-cp1-regular text-gray-500">
            {currentLanguage.subLabel}
          </span>
        </span>
        <Image
          src={isOpen ? '/icons/chevron-up.svg' : '/icons/chevron-down.svg'}
          alt="chevron icon"
          width={24}
          height={24}
        />
      </button>
      {/* 드롭다운 옵션 */}
      {isOpen && (
        <ul className="absolute z-10 w-full bg-white rounded-b-2xl shadow-lg max-h-60 overflow-auto -translate-y-3.5 pt-3">
          {LanguageDropdown.map(lang => (
            <li
              key={lang.code}
              onClick={() => handleSelect(lang)}
              className="px-5 py-3 cursor-pointer text-trans-cp1-regular hover:bg-gray-100"
            >
              {lang.label}{' '}
              <span className="text-gray-400 text-cp1-regular">
                {lang.subLabel}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
