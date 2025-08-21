'use client';

import { useVoiceStore } from '@/stores/voiceStore';
import SelectButton from '@/components/buttons/select';
import CharacterVoiceButton from '@/components/buttons/characterVoice';
import { useState } from 'react';
import { useTTS } from '@/hooks/useTTS';

export default function CharacterVoiceSelectList() {
  const { voices, selectedVoice, setSelectedVoice } = useVoiceStore();
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const { playTTS, playing } = useTTS();

  const handlePlayVoice = async (idx: number) => {
    if (playing) return; // 훅에서 재생 중 체크
    setPlayingIndex(idx);

    const voice = voices[idx];

    await playTTS(voice.sampleText, voice.voiceName);

    // 재생 종료 시, 선택은 유지하고 playing 표시만 초기화
    setPlayingIndex(null);
  };

  return (
    <div className="flex flex-col gap-4">
      {voices.map((voice, idx) => (
        <div
          key={voice.voiceName}
          className="flex flex-row gap-3 items-center justify-between"
        >
          <SelectButton
            text={voice.displayName}
            subText={voice.description}
            selected={selectedVoice?.voiceName === voice.voiceName}
            onClick={() => setSelectedVoice(voice)}
          />
          <CharacterVoiceButton
            onClick={() => handlePlayVoice(idx)}
            selected={playingIndex === idx}
          />
        </div>
      ))}
    </div>
  );
}
