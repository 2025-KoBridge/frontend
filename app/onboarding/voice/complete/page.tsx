'use client';

import TitleText from '@/components/TitleText';
import text from '../_locales/text.json';
import { useLanguageStore } from '@/stores/languageStore';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import Button from '@/components/buttons/_index';
import MotionFadeIn from '@/components/_animations/MotionFadeIn';
import CharacterText from '@/components/CharacterText';

export default function VoiceCompletionPage() {
  const router = useRouter();
  const { subText } = text.complete;
  const { username } = useUserStore(); // TODO: 사용자 이름 가져오기 (일단 로컬 스토리지에서 가져옴)
  const { currentLanguage } = useLanguageStore();

  const handleBtnClick = () => {
    router.push(ROUTES.MAIN.ROOT);
  };

  return (
    <>
      <MotionFadeIn>
        <TitleText
          title={
            <>
              <span className="text-secondary-300">코디</span>와 함께
              <br />
              한국어 공부를 시작해 봐요!
            </>
          }
          subText={subText}
          lang={currentLanguage.code}
          className="mt-26 mb-8"
        />
        <CharacterText
          title={`반가워, ${username}!`}
          subtitle={'Nice to meet you!'}
          audio
        />
      </MotionFadeIn>
      {/* 하단 버튼 */}
      <div className="mt-auto pb-6">
        <Button
          text={'KoBridge 시작하기'}
          iconPath="/icons/arrow-right.svg"
          onClick={handleBtnClick}
        />
      </div>
    </>
  );
}
