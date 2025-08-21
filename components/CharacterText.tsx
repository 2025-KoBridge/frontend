'use client';

import { FONT_CLASS } from '@/constants/languages';
import { useLanguageStore } from '@/stores/languageStore';
import { useVoiceStore } from '@/stores/voiceStore';
import { useTTS } from '@/hooks/useTTS';
import Image from 'next/image';

interface CharacterTextProps {
  title: string;
  subtitle: string;
  audio?: boolean;
  image?: string; // 이미지 URL
}

export default function CharacterText({
  title,
  subtitle,
  audio = false,
  image = '/character/default.webp', // 기본 이미지 URL
}: CharacterTextProps) {
  const { currentLanguage } = useLanguageStore();
  const { selectedVoice } = useVoiceStore();
  const { playTTS, playing } = useTTS();

  const handlePlay = async () => {
    if (!selectedVoice) return; // 선택된 목소리가 없으면 재생하지 않음
    await playTTS(title, selectedVoice.voiceName);
  };

  return (
    <div className="flex flex-col items-center p-4 w-full">
      {/* 텍스트 영역 */}
      <div className="text-center mb-4 px-6 py-4 bg-white rounded-2xl">
        <h2 className="text-secondary-300 text-bd1-bold flex items-center justify-center gap-1">
          {title}
          {audio && (
            <Image
              src="/icons/audio.svg"
              alt="audio icon"
              width={20}
              height={20}
              className="mb-1 cursor-pointer"
              onClick={handlePlay} // 클릭 시 재생
            />
          )}
        </h2>
        {/* 구분선 */}
        <div className="w-full border-b border-dashed border-gray-700 my-1"></div>
        <p
          className={`text-gray-500 text-trans-cp2-regular mt-1 ${FONT_CLASS[currentLanguage.code]}`}
        >
          {subtitle}
        </p>
      </div>
      {/* 캐릭터 이미지 */}
      {image && (
        <div className="w-29.5 h-29.5 rounded-full overflow-hidden">
          <Image src={image} alt="character" width={118} height={118} />
        </div>
      )}
    </div>
  );
}
