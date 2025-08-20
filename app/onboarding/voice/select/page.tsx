'use client';

import TitleText from '@/components/TitleText';
import text from '../_locales/text.json';
import { useLanguageStore } from '@/stores/languageStore';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import Button from '@/components/buttons/_index';
import MotionFadeIn from '@/components/_animations/MotionFadeIn';
import Image from 'next/image';
import CharacterVoiceSelectList from '../_components/CharacterVoiceSelectList';
import { useVoiceStore } from '@/stores/voiceStore';

export default function VoiceSelectPage() {
  const router = useRouter();
  const { subText } = text.selectVoice;
  const { selectedVoice } = useVoiceStore();
  const { currentLanguage } = useLanguageStore();

  const handleBtnClick = () => {
    router.push(ROUTES.ONBOARDING.VOICE.COMPLETE);
  };

  return (
    <>
      <MotionFadeIn>
        <TitleText
          title={
            <>
              <span className="text-secondary-300">코디</span>
              의 목소리를 선택해 주세요.
              <br />
              목소리는 언제든 변경할 수 있어요.
            </>
          }
          subText={subText}
          lang={currentLanguage.code}
          className="mt-10 mb-5"
        />
        {/* 캐릭터 프로필 */}
        <div className="flex flex-row items-center mb-6">
          <Image
            src={'/character/default.webp'}
            alt={'character'}
            width={55}
            height={55}
            className="rounded-full mr-2"
          />
          <div className="flex flex-col gap-0.5">
            <p className="text-bd1-bold text-secondary-300">코디</p>
            <p className="text-trans-cp2-regular text-gray-500">Kody</p>
          </div>
        </div>
        {/* 음성 선택 */}
        <div
          className="overflow-y-auto pb-6 scrollbar-hide"
          style={{ maxHeight: 'calc(100vh - 536px)' }}
        >
          <CharacterVoiceSelectList />
        </div>
      </MotionFadeIn>
      {/* 하단 버튼 */}
      <div className="mt-auto pb-4">
        <Button
          text={'다음'}
          iconPath="/icons/arrow-right.svg"
          onClick={handleBtnClick}
          disabled={selectedVoice === null}
        />
      </div>
    </>
  );
}
