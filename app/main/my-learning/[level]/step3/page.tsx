'use client';

import MotionFadeIn from '@/components/_animations/MotionFadeIn';
import ProgressBar from '@/components/ProgressBar';
import TitleText from '@/components/TitleText';
import { useLanguageStore } from '@/stores/languageStore';
import text from '../../_locales/text.json';
import IntroPhrasesList from '../../_components/step1/IntroPhrasesList';
import Button from '@/components/buttons/_index';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { useLevelParam } from '@/hooks/useLevelParam';
import Image from 'next/image';
import BottomSheet from '../../_components/step3/BottomSheet';
import SelectButton from '@/components/buttons/select';
import { useState } from 'react';

export default function LevelStep3Page() {
  const router = useRouter();
  const levelParam = useLevelParam();
  const { currentLanguage } = useLanguageStore();
  const { title, subText } = text.step3;

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<number | null>(
    null,
  );

  // TODO: API 연결
  const phrasesArray = Object.values(text.intro).filter(
    // @ts-ignore
    value => value?.id !== undefined,
  );

  const handleBtnCLick = () => {
    setIsBottomSheetOpen(true); // BottomSheet 열기
  };

  // 난이도 옵션
  const difficulties = [
    {
      text: '쉬웠음',
      subText: 'easy',
    },
    {
      text: '보통',
      subText: 'normal',
    },
    {
      text: '어려웠음',
      subText: 'hard',
    },
  ];

  return (
    <div className="flex flex-col h-full relative">
      <ProgressBar totalSteps={3} currentStep={3} className="mt-2 mb-12" />
      {/* 텍스트 */}
      <MotionFadeIn>
        <TitleText
          title={title}
          subText={subText}
          lang={currentLanguage.code}
        />
      </MotionFadeIn>
      <MotionFadeIn transition={{ duration: 1, delay: 1, ease: 'easeIn' }}>
        {/* 문장 리스트 */}
        <div className="text-black text-bd1-bold mt-10">오늘의 표현</div>
        <div className="text-gray-500 text-trans-cp2-regular mb-4">
          Today&apos;s expression
        </div>
        {/* @ts-ignore */}
        <IntroPhrasesList phrases={phrasesArray} />

        {/* 단어 리스트 */}
        <div className="text-black text-bd1-bold mt-10">오늘의 단어</div>
        <div className="text-gray-500 text-trans-cp2-regular mb-3">
          Today&apos;s word
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            { ko: '숙제', en: 'Homework' },
            { ko: '수업', en: 'Class' },
            { ko: '1교시', en: 'First class' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-3">
              <div className="flex flex-row items-center gap-2 mb-1">
                <h3 className="text-black text-h3-bold">{item.ko}</h3>
                <Image
                  src={'/icons/bookmark-unchecked.svg'}
                  alt={'bookmark icon'}
                  width={16}
                  height={16}
                  className="pb-1"
                />
              </div>
              <div className="text-secondary-300 text-trans-cp2-regular">
                {item.en}
              </div>
            </div>
          ))}
        </div>

        {/* 하단 버튼 */}
        <Button
          text={'다음'}
          iconPath="/icons/arrow-right.svg"
          onClick={handleBtnCLick}
          className="mt-10 mb-5"
        />
      </MotionFadeIn>

      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        title={'오늘 공부한 내용 난이도가 어땠나요?'}
        subText={'What was the difficulty level of what you studied today?'}
      >
        <div className="flex flex-col gap-3">
          {difficulties.map((difficulty, idx) => (
            <SelectButton
              key={idx}
              text={difficulty.text}
              subText={difficulty.subText}
              selected={selectedDifficulty === idx}
              onClick={() => setSelectedDifficulty(idx)}
              className="border-primary border"
            />
          ))}
        </div>
        <Button
          text={'다음'}
          iconPath="/icons/arrow-right.svg"
          onClick={() => {
            router.push(ROUTES.MAIN.MY_LEARNING.getStep(levelParam, 'ending'));
          }}
          className="mt-8"
          disabled={selectedDifficulty === null}
        />
      </BottomSheet>
    </div>
  );
}
