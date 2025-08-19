'use client';

import MotionFadeIn from '@/components/_animations/MotionFadeIn';
import ProgressBar from '@/components/ProgressBar';
import TitleText from '@/components/TitleText';
import { useLanguageStore } from '@/stores/languageStore';
import CharacterLevelText from '../../_components/CharacterLevelText';
import text from '../../_locales/text.json';
import Button from '@/components/buttons/_index';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { useLevelParam } from '@/hooks/useLevelParam';
import IntroPhrasesListStep2 from '../../_components/step2/IntroPhrasesListStep2';

export default function LevelIntro2Page() {
  const router = useRouter();
  const levelParam = useLevelParam();
  const { currentLanguage } = useLanguageStore();
  const { title, subText, characterText, characterSubText } = text.intro2;

  // TODO: API 연결
  const phrasesArray = Object.values(text.intro2).filter(
    value => value?.id !== undefined,
  );

  const handleBtnCLick = () => {
    router.push(ROUTES.MAIN.MY_LEARNING.getStep(levelParam, 'step2'));
  };

  return (
    <div className="flex flex-col h-full relative">
      <ProgressBar totalSteps={3} currentStep={2} className="mt-2 mb-12" />
      {/* 텍스트 */}
      <MotionFadeIn>
        <TitleText
          title={title}
          subText={subText}
          lang={currentLanguage.code}
        />
      </MotionFadeIn>
      <MotionFadeIn transition={{ duration: 1, delay: 1, ease: 'easeIn' }}>
        {/* 캐릭터 텍스트 */}
        <CharacterLevelText
          title={characterText}
          subtitle={characterSubText[currentLanguage.code]}
          className="mb-5"
        />
        {/* 문장 리스트 */}
        <IntroPhrasesListStep2 phrases={phrasesArray} />
      </MotionFadeIn>
      {/* 하단 버튼 */}
      <div className="mt-auto pb-6">
        <Button
          text={'시작하기'}
          iconPath="/icons/arrow-right.svg"
          onClick={handleBtnCLick}
        />
      </div>
    </div>
  );
}
