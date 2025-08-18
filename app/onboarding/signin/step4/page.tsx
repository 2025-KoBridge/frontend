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
import SchoolSelectDropdown from '@/components/dropdowns/SchoolSelect';
import { getOrdinalSuffix } from '@/utils/getOrdinalSuffix';
import { SchoolOption } from '@/constants/dropdown/schools';

export default function SignInStep3Page() {
  const router = useRouter();
  const { currentLanguage } = useLanguageStore();
  const {
    title,
    subText,
    schoolTitle,
    schoolSubText,
    gradeTitle,
    gradeSubText,
    gradeEndText,
  } = subtitles.step4;
  const { school, setSchool, grade, setGrade } = useUserStore();

  const handleBtnClick = () => {
    if (!grade || !school) return;
    router.push(ROUTES.ONBOARDING.VOICE.ROOT);
    // TODO: API 연동
    // mutate(
    //   { school, grade },
    //   {
    //     onSuccess: response => {
    //       // 서버 응답 성공 시 라우트 이동
    //       router.push(ROUTES.ONBOARDING.VOICE.ROOT);
    //     },
    //     onError: error => {
    //       console.error(error);
    //     },
    //   },
    // );
  };

  const setSchoolFromDropdown = (schoolOption: SchoolOption) => {
    if (schoolOption.value) setSchool(schoolOption.value);
  };

  return (
    <div className="flex flex-col h-full relative">
      <ProgressBar totalSteps={4} currentStep={4} className="mt-2" />
      <MotionFadeIn>
        <TitleText
          title={title}
          subText={subText}
          lang={currentLanguage.code}
          className="mt-10 mb-8"
        />
        {/* 학교 입력 */}
        <h3 className="text-secondary-300 text-h3-bold">{schoolTitle}</h3>
        <p
          className={`mb-4 text-gray-500 text-trans-cp2-regular ${FONT_CLASS[currentLanguage.code]}`}
        >
          {schoolSubText[currentLanguage.code]}
        </p>
        <SchoolSelectDropdown
          disabled={false}
          onChange={setSchoolFromDropdown}
        />
        {/* 학년 입력 */}
        {school && (
          <MotionFadeIn>
            <h3 className="text-secondary-300 text-h3-bold mt-8">
              {gradeTitle}
            </h3>
            <p
              className={`mb-4 text-gray-500 text-trans-cp2-regular ${FONT_CLASS[currentLanguage.code]}`}
            >
              {gradeSubText[currentLanguage.code]}
            </p>
            <div className="flex flex-row gap-4">
              <TextFieldShort
                value={grade}
                onChange={setGrade}
                inputMode="numeric"
                maxLength={100}
                endText={getOrdinalSuffix(grade)}
              />
              <div>
                <h3 className="text-h3-bold text-secondary-300">학년</h3>
                <p className="text-trans-cp2-regular text-gray-500">
                  {gradeEndText[currentLanguage.code]}
                </p>
              </div>
            </div>
          </MotionFadeIn>
        )}
      </MotionFadeIn>
      <div className="mt-auto pb-6">
        {/* 하단 버튼 */}
        <Button
          text={'다음'}
          iconPath="/icons/arrow-right.svg"
          onClick={handleBtnClick}
          disabled={grade.length === 0 || school.length === 0}
        />
      </div>
    </div>
  );
}
