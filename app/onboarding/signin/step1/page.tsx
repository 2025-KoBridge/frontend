'use client';

import LanguageSelectDropdown from '@/components/Dropdown/LanguageSelect';
import subtitles from '../locales/subtitles.json';
import ProgressBar from '@/components/ProgressBar';
import TitleText from '@/components/TitleText';
import MotionFadeIn from '@/components/_animation/MotionFadeIn';

const SignInStep1Page = () => {
  const { title, subText } = subtitles.step1;
  return (
    <div className="flex flex-col">
      <ProgressBar totalSteps={4} currentStep={1} className="mt-2" />
      <MotionFadeIn>
        <TitleText
          title={title}
          subText={subText}
          lang="en"
          className="mt-10 mb-8"
        />
        <LanguageSelectDropdown />
      </MotionFadeIn>
    </div>
  );
};

export default SignInStep1Page;
