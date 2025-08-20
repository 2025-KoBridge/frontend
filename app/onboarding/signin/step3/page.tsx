'use client';

import { useLanguageStore } from '@/stores/languageStore';
import subtitles from '../locales/subtitles.json';
import ProgressBar from '@/components/ProgressBar';
import TitleText from '@/components/TitleText';
import MotionFadeIn from '@/components/_animations/MotionFadeIn';
import Button from '@/components/buttons/_index';
import { useRouter } from 'next/navigation';
import { FONT_CLASS } from '@/constants/languages';
import { useUserStore } from '@/stores/userStore';
import { ROUTES } from '@/constants/routes';
import TextFieldShort from '@/components/textfields/TextFieldShort';

export default function SignInStep3Page() {
  const router = useRouter();
  const { currentLanguage } = useLanguageStore();
  const { title, subText, ageTitle, ageSubText, ageEndText } = subtitles.step3;
  const { age, setAge } = useUserStore();

  const handleBtnClick = () => {
    if (age.length !== 0) {
      router.push(ROUTES.ONBOARDING.SIGNIN.getStep(4));
    }
  };

  return (
    <div className="flex flex-col h-full relative">
      <ProgressBar totalSteps={4} currentStep={3} className="mt-2" />
      <MotionFadeIn>
        <TitleText
          title={title}
          subText={subText}
          lang={currentLanguage.code}
          className="mt-10 mb-8"
        />
        <h3 className="text-secondary-300 text-h3-bold">{ageTitle}</h3>
        <p
          className={`mb-4 text-gray-500 text-trans-cp2-regular ${FONT_CLASS[currentLanguage.code]}`}
        >
          {ageSubText[currentLanguage.code]}
        </p>
        {/* 나이 입력 */}
        <div className="flex flex-row gap-4">
          <TextFieldShort
            value={age}
            onChange={setAge}
            placeholder="숫자만 입력해 주세요."
            inputMode="numeric"
            maxLength={100}
          />
          <div>
            <h3 className="text-h3-bold text-secondary-300">살</h3>
            <p className="text-trans-cp2-regular text-gray-500">
              {ageEndText[currentLanguage.code]}
            </p>
          </div>
        </div>
      </MotionFadeIn>
      <div className="mt-auto pb-6">
        {/* 하단 버튼 */}
        <Button
          text={'다음'}
          iconPath="/icons/arrow-right.svg"
          onClick={handleBtnClick}
          disabled={age.length === 0}
        />
      </div>
    </div>
  );
}
