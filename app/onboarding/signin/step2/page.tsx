'use client';

import { useLanguageStore } from '@/stores/languageStore';
import subtitles from '../locales/subtitles.json';
import ProgressBar from '@/components/ProgressBar';
import TitleText from '@/components/TitleText';
import MotionFadeIn from '@/components/_animations/MotionFadeIn';
import Button from '@/components/buttons/_index';
import { useRouter } from 'next/navigation';
import { FONT_CLASS } from '@/constants/languages';
import TextFieldLong from '@/components/textfields/TextFieldLong';
import { useUserStore } from '@/stores/userStore';
import { ROUTES } from '@/constants/routes';

export default function SignInStep2Page() {
  const router = useRouter();
  const { currentLanguage } = useLanguageStore();
  const { title, subText, usernameTitle, usernameSubText } = subtitles.step2;
  const { username, setUsername } = useUserStore();

  const handleBtnClick = () => {
    if (username.length !== 0) {
      router.push(ROUTES.ONBOARDING.SIGNIN.getStep(3));
    }
  };

  return (
    <div className="flex flex-col h-full relative">
      <ProgressBar totalSteps={4} currentStep={2} className="mt-2" />
      <MotionFadeIn>
        <TitleText
          title={title}
          subText={subText}
          lang={currentLanguage.code}
          className="mt-10 mb-8"
        />
        <h3 className="text-secondary-300 text-h3-bold">{usernameTitle}</h3>
        <p
          className={`mb-4 text-gray-500 text-trans-cp2-regular ${FONT_CLASS[currentLanguage.code]}`}
        >
          {usernameSubText[currentLanguage.code]}
        </p>
        {/* 이름 입력 */}
        <TextFieldLong
          placeholder="이름을 입력해 주세요."
          lang={currentLanguage.code}
          maxLength={50}
          value={username}
          onChange={setUsername}
        />
      </MotionFadeIn>
      <div className="mt-auto pb-6">
        {/* 하단 버튼 */}
        <Button
          text={'다음'}
          iconPath="/icons/arrow-right.svg"
          onClick={handleBtnClick}
          disabled={username.length === 0}
        />
      </div>
    </div>
  );
}
