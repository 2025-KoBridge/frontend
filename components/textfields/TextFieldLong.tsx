import { FONT_CLASS, Language } from '@/constants/languages';
import { ChangeEvent, HTMLAttributes, useState } from 'react';

interface TextFieldProps {
  placeholder?: string;
  lang?: Language;
  maxLength?: number;
  value: string;
  onChange: (value: string) => void;
  inputMode?: HTMLAttributes<HTMLInputElement>['inputMode'];
}

export default function TextFieldLong({
  placeholder,
  lang = 'en',
  maxLength,
  value,
  onChange,
  inputMode,
}: TextFieldProps) {
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
    <div className="relative w-full">
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
    </div>
  );
}
