import { useState } from 'react';
import Image from 'next/image';
import { useLanguageStore } from '@/stores/languageStore';
import { FONT_CLASS } from '@/constants/languages';

interface Phrase {
  id: number;
  kor: string;
  [key: string]: any;
}

interface IntroPhrasesListProps {
  phrases: Phrase[];
}

export default function IntroPhrasesListStep2({
  phrases,
}: IntroPhrasesListProps) {
  const { currentLanguage } = useLanguageStore();

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl divide-y-4 divide-bg-solid overflow-hidden">
        {phrases.map(phrase => (
          <div
            key={phrase.id}
            className="flex flex-row px-4 py-3 items-start gap-2 bg-white"
          >
            <div>
              <Image
                src={'/icons/flag.svg'}
                alt={'flag icon'}
                width={16}
                height={16}
                className="pt-1.5"
              />
            </div>
            <div className="flex flex-col">
              <h3 className="text-h3-bold text-black">{phrase.kor}</h3>
              <span
                className={`text-trans-cp2-regular text-secondary-300 ${
                  FONT_CLASS[currentLanguage.code]
                }`}
              >
                {phrase?.[currentLanguage.code] || (
                  <span className="text-gray-500 italic">번역 없음</span>
                )}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
