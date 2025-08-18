import { useState, ChangeEvent, HTMLAttributes } from 'react';
import { FONT_CLASS, Language } from '@/constants/languages';

interface TextFieldShortProps {
  placeholder?: string;
  lang?: Language;
  maxLength?: number;
  value: string;
  onChange: (value: string) => void;
  endText?: string;
  inputMode?: HTMLAttributes<HTMLInputElement>['inputMode'];
}

export default function TextFieldShort({
  placeholder,
  lang = 'en',
  maxLength,
  value,
  onChange,
  endText = '',
  inputMode,
}: TextFieldShortProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (maxLength && newValue.length > maxLength) {
      alert(`최대 ${maxLength}글자까지 입력 가능합니다.`);
      return;
    }
    onChange(newValue);
  };

  return (
    <div className="relative w-1/2 flex items-center">
      <div className="absolute inset-0 bg-gray-900 rounded-2xl translate-y-0.5 pointer-events-none" />
      <input
        type="text"
        inputMode={inputMode}
        placeholder={placeholder || ''}
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`
          relative w-full px-4 py-2 border rounded-2xl bg-white focus:outline-none transition text-bd1-regular text-black [text-size-adjust:100%]
          ${FONT_CLASS[lang]}
          ${isFocused ? 'border-primary border-2' : 'border-gray-900 border'}
        `}
      />
      {endText && (
        <span className="absolute right-4 text-gray-500 text-trans-cp2-regular pointer-events-none">
          {endText}
        </span>
      )}
    </div>
  );
}
