import Image from 'next/image';
import { useLanguageStore } from '@/stores/languageStore';
import { useState } from 'react';
import {
  RATING_THRESHOLDS,
  SPELLING_RATING_THRESHOLDS,
} from '@/constants/rating';
import { similarity } from '@/utils/similarity';

interface WordPercentage {
  text: string;
  percentage: number;
}

interface PhrasePracticeTextProps {
  phrase: string;
  romanization: string;
  translation: string;
  className?: string;
  inputText: string;
  showEvaluation: boolean;
  evaluationType?: 'mic' | 'keyboard';
}

export default function PhrasePracticeText({
  phrase,
  romanization,
  translation,
  className,
  inputText,
  showEvaluation,
  evaluationType,
}: PhrasePracticeTextProps) {
  const { currentLanguage } = useLanguageStore();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const typedWords = inputText.trim() === '' ? [] : inputText.trim().split(' ');
  const words = phrase.split(' ');

  const wordPercentages: WordPercentage[] = words.map((w, idx) => ({
    text: w,
    percentage: typedWords[idx] ? similarity(w, typedWords[idx]) : 0,
  }));

  const avg =
    wordPercentages.reduce((sum, w) => sum + w.percentage, 0) /
    wordPercentages.length;

  const thresholds =
    evaluationType === 'mic' ? RATING_THRESHOLDS : SPELLING_RATING_THRESHOLDS;

  const matched = thresholds.find(t => avg >= t.min)!;

  const evaluationResult = {
    rating: typedWords.length > 0 ? matched.rating : 0,
    feedback: typedWords.length > 0 ? matched.feedback : '',
    feedbackEn: typedWords.length > 0 ? matched.feedbackEn : '',
  };

  const getHighlightColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-primary-dimensional';
    if (percentage >= 20) return 'bg-primary';
    return 'bg-primary-900';
  };

  const renderHighlightedPhrase = () =>
    words.map((word, idx) => {
      const percentage = wordPercentages[idx].percentage;
      const highlightClass =
        typedWords.length > 0 && showEvaluation
          ? getHighlightColor(percentage)
          : 'bg-transparent';

      return (
        <div key={idx} className="relative inline-block">
          <span className="relative z-10">{word}</span>
          <span
            className={`absolute bottom-7 left-0 h-[14px] w-full ${highlightClass} z-0 rounded-sm`}
          />
          {typedWords.length > 0 && showEvaluation && (
            <div className="text-cp2-regular text-secondary-300 text-center">
              {percentage}%
            </div>
          )}
        </div>
      );
    });

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="px-4 py-4.5 rounded-3xl bg-bg-solid">
        <p className="text-trans-cp1-regular text-secondary-400">
          {romanization}
        </p>
        <div className="flex flex-row gap-2 items-center">
          <h2 className="text-h2-bold text-black flex flex-row gap-2">
            {renderHighlightedPhrase()}
          </h2>
          <Image
            src={'/icons/audio-blue.svg'}
            alt={'listen'}
            width={16}
            height={16}
            className={
              typedWords.length > 0 && showEvaluation ? 'pb-5.5' : 'pb-1.5'
            }
          />
          <button
            onClick={() => setIsBookmarked(prev => !prev)}
            className="focus:outline-none"
          >
            <Image
              src={
                isBookmarked
                  ? '/icons/bookmark-checked.svg'
                  : '/icons/bookmark-unchecked.svg'
              }
              alt={'bookmark'}
              width={16}
              height={16}
              className={
                typedWords.length > 0 && showEvaluation ? 'pb-5.5' : 'pb-1.5'
              }
            />
          </button>
        </div>
        {typedWords.length > 0 && showEvaluation && (
          <div className="mt-10">
            <h3 className="text-h3-bold text-secondary-300">
              {evaluationResult.feedback}
            </h3>
            <p className="text-trans-cp2-regular text-gray-500">
              {evaluationResult.feedbackEn}
            </p>
            <div className="flex gap-1.5 mt-2">
              {Array.from({ length: 5 }, (_, i) => (
                <Image
                  key={i}
                  src={
                    i < evaluationResult.rating
                      ? '/icons/star-filled.svg'
                      : '/icons/star-unfilled.svg'
                  }
                  alt="star"
                  width={44}
                  height={44}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <p className="text-bd1-regular text-secondary-300 text-center mt-3">
        {translation}
      </p>
    </div>
  );
}
