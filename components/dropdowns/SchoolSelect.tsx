import { useState } from 'react';
import Image from 'next/image';
import { useUserStore } from '@/stores/userStore';
import { useLanguageStore } from '@/stores/languageStore';
import {
  DefaultSchoolOption,
  SchoolOptions,
  SchoolOption,
} from '@/constants/dropdown/schools';
import { FONT_CLASS } from '@/constants/languages';

export default function SchoolSelectDropdown({
  options = SchoolOptions,
  disabled = false,
  onChange,
}: {
  options?: SchoolOption[];
  disabled?: boolean;
  onChange?: (school: SchoolOption) => void;
}) {
  const { currentLanguage } = useLanguageStore();
  const { school, setSchool } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<SchoolOption>(
    options.find(opt => opt.value === school) || DefaultSchoolOption,
  );

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (schoolOption: SchoolOption) => {
    setSelectedSchool(schoolOption);
    setSchool(schoolOption.value);
    if (onChange) onChange(schoolOption);
    setIsOpen(false);
  };

  const getSubLabel = (school: SchoolOption) => {
    return school.subLabel?.[currentLanguage.code] ?? '';
  };

  return (
    <div className="relative w-full">
      <div className="absolute inset-0 bg-gray-900 rounded-2xl translate-y-0.5" />
      <button
        onClick={!disabled ? toggleDropdown : undefined}
        disabled={disabled}
        className={`relative z-11 w-full rounded-2xl px-4 py-3 flex justify-between items-center focus:outline-none transition-colors
          ${
            disabled
              ? 'bg-gray-900 text-gray-500 cursor-not-allowed'
              : `bg-white ${isOpen ? 'border-2 border-primary' : 'border border-gray-900'}`
          }`}
      >
        <span
          className={`text-trans-cp1-regular text-black gap-1 flex items-center ${FONT_CLASS[currentLanguage.code]}`}
        >
          {selectedSchool.label}
          {selectedSchool.subLabel && (
            <span className="text-cp1-regular text-gray-500 ml-1">
              {getSubLabel(selectedSchool)}
            </span>
          )}
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
      {isOpen && (
        <ul className="absolute z-10 w-full bg-white rounded-b-2xl shadow-sm max-h-60 overflow-auto -translate-y-3.5 pt-3">
          {options.map(school => (
            <li
              key={school.value || school.label}
              onClick={() => handleSelect(school)}
              className="px-4 py-3 cursor-pointer text-trans-cp1-regular hover:bg-gray-100"
            >
              {school.label}
              {school.subLabel && (
                <span
                  className={`text-gray-400 text-cp1-regular ml-1 ${FONT_CLASS[currentLanguage.code]}`}
                >
                  {getSubLabel(school)}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
