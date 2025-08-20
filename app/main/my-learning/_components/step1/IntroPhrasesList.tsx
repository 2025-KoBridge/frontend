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
  initialBookmarks?: Record<number, boolean>;
}

export default function IntroPhrasesList({
  phrases,
  initialBookmarks = {},
}: IntroPhrasesListProps) {
  const { currentLanguage } = useLanguageStore();

  // 북마크 상태를 phrase.id 기준으로 관리
  const [bookmarks, setBookmarks] = useState(() => {
    const initState: Record<number, boolean> = {};
    phrases.forEach(phrase => {
      initState[phrase.id] = initialBookmarks[phrase.id] || false;
    });
    return initState;
  });

  const toggleBookmark = (id: number) => {
    setBookmarks(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl divide-y-4 divide-bg-solid overflow-hidden">
        {phrases.map(phrase => (
          <div key={phrase.id} className="flex flex-col px-4 py-3 bg-white">
            <div className="flex items-center gap-2">
              <h3 className="text-h3-bold text-black">{phrase.kor}</h3>
              <button
                onClick={() => toggleBookmark(phrase.id)}
                className="p-1"
                aria-label="bookmark toggle"
              >
                <Image
                  src={
                    bookmarks[phrase.id]
                      ? '/icons/bookmark-checked.svg'
                      : '/icons/bookmark-unchecked.svg'
                  }
                  alt="bookmark"
                  width={16}
                  height={16}
                  className="mb-1.5"
                />
              </button>
            </div>
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
        ))}
      </div>
    </div>
  );
}
