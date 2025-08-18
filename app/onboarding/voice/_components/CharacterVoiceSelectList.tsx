'use client';

import { voiceData } from '@/constants/voiceData';
import SelectButton from '@/components/buttons/select';
import CharacterVoiceButton from '@/components/buttons/characterVoice';
import { useLanguageStore } from '@/stores/languageStore';
import { useVoiceStore } from '@/stores/voiceStore';
import { useState } from 'react';

export default function CharacterVoiceSelectList() {
  const { currentLanguage } = useLanguageStore();
  const { selectedVoice, setSelectedVoice } = useVoiceStore();
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const voices = Object.values(voiceData.selectVoice.characterVoice);

  const handlePlayVoice = (idx: number) => {
    if (playingIndex !== null) return; // 이미 재생 중이면 무시
    setPlayingIndex(idx); // 재생 중 표시

    const audio = new Audio(`/ttsTest.m4a`);
    audio.play();

    audio.addEventListener('ended', () => {
      setPlayingIndex(null); // 재생 종료 후 표시 해제
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {voices.map((voice, idx) => (
        <div
          key={idx}
          className="flex flex-row gap-3 items-center justify-between"
        >
          {/* 왼쪽: 선택 버튼 */}
          <SelectButton
            text={voice.text}
            subText={voice.subText[currentLanguage.code]}
            selected={selectedVoice === idx}
            onClick={() => setSelectedVoice(idx)}
          />
          {/* 오른쪽: 미리듣기 버튼 */}
          <CharacterVoiceButton
            onClick={() => handlePlayVoice(idx)}
            selected={playingIndex === idx}
          />
        </div>
      ))}
    </div>
  );
}
