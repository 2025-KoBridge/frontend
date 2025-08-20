'use client';

import { useState } from 'react';
import { useLanguageStore } from '@/stores/languageStore';
import LanguageSelectDropdown from '@/components/dropdowns/LanguageSelect';
import subtitles from '../locales/subtitles.json';
import ProgressBar from '@/components/ProgressBar';
import TitleText from '@/components/TitleText';
import MotionFadeIn from '@/components/_animations/MotionFadeIn';
import Button from '@/components/buttons/_index';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import BottomSheet from '../components/BottomSheet';
import { ROUTES } from '@/constants/routes';
import LanguageListDropdown from '@/components/dropdowns/LanguageList';

export default function SignInStep1Page() {
  const router = useRouter();
  const { currentLanguage, setLanguage } = useLanguageStore();
  const {
    title,
    subText,
    checkboxText,
    checkboxSubText,
    bottomSheetTitle,
    bottomSheetSubText,
  } = subtitles.step1;

  const [isChecked, setIsChecked] = useState(false);
  const toggleCheckbox = () => setIsChecked(prev => !prev);

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleBtnClick = () => {
    if (isChecked) {
      setIsSheetOpen(true);
    } else {
      router.push(ROUTES.ONBOARDING.SIGNIN.getStep(2)); // 다음 페이지 라우팅
    }
  };

  return (
    <div className="flex flex-col h-full relative">
      <ProgressBar totalSteps={4} currentStep={1} className="mt-2" />
      <MotionFadeIn>
        <TitleText
          title={title}
          subText={subText}
          lang={currentLanguage.code}
          className="mt-10 mb-8"
        />
        <LanguageSelectDropdown disabled={isChecked} onChange={setLanguage} />
      </MotionFadeIn>
      <div className="mt-auto pb-6">
        {/* 체크박스 */}
        <div
          className="flex justify-center items-center gap-2 mt-auto mb-18.5 "
          onClick={toggleCheckbox}
        >
          <Image
            src={
              isChecked
                ? '/icons/checkbox-checked.svg'
                : '/icons/checkbox-unchecked.svg'
            }
            alt={isChecked ? 'Checked' : 'Unchecked'}
            width={24}
            height={24}
          />
          <div className="flex flex-col ml-1">
            <span className="text-gray-300 text-bd2-regular">
              {checkboxText}
            </span>
            <span className=" text-gray-500 text-trans-cp2-regular">
              {checkboxSubText[currentLanguage.code]}
            </span>
          </div>
        </div>
        {/* 하단 버튼 */}
        <Button
          text={'다음'}
          iconPath="/icons/arrow-right.svg"
          onClick={handleBtnClick}
        />
      </div>
      {/* 바텀시트 */}
      <BottomSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        title={bottomSheetTitle}
        subText={bottomSheetSubText[currentLanguage.code]}
      >
        <LanguageListDropdown />
        <p className="mt-auto pt-72 text-bd2-regular text-black">
          그 전까지는 한글을 영어로 번역할게요.
        </p>
        <p className="mb-6 text-trans-cp2-regular text-gray-500">
          Until then, I&apos;ll translate Korean into English.
        </p>
        <Button
          text={'다음'}
          iconPath="/icons/arrow-right.svg"
          onClick={() => {
            router.push(ROUTES.ONBOARDING.SIGNIN.getStep(2));
          }}
        />
      </BottomSheet>
    </div>
  );
}
