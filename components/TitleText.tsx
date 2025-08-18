import { FONT_CLASS, Language } from '@/constants/languages';
import { ReactNode } from 'react';

interface TitleTextProps {
  title: ReactNode; // JSX도 허용되도록
  subText: Record<Language, string>;
  lang: Language;
  className?: string;
}

export default function TitleText({
  title,
  subText,
  lang,
  className,
}: TitleTextProps) {
  return (
    <div
      className={`gap-y-2 flex flex-col ${className}`}
      style={{ whiteSpace: 'pre-line' }}
    >
      <h1 className={`text-h1-bold text-black`}>{title}</h1>
      <p className={`text-trans-cp1-regular text-gray-500 ${FONT_CLASS[lang]}`}>
        {subText[lang]}
      </p>
    </div>
  );
}
