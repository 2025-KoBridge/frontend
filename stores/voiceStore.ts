import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface VoiceItem {
  voiceName: string;
  sampleText: string;
  displayName: string;
  description: string;
}

interface VoiceState {
  selectedVoice: VoiceItem | null;
  setSelectedVoice: (voice: VoiceItem | null) => void;
  voices: VoiceItem[];
}

export const useVoiceStore = create<VoiceState>()(
  persist(
    set => ({
      selectedVoice: null,
      setSelectedVoice: voice => set({ selectedVoice: voice }),
      voices: [
        {
          voiceName: 'ko-KR-Chirp3-HD-Fenrir',
          sampleText: '안녕 나는 코디야 같이 한국어 공부하자!',
          displayName: 'Fenrir',
          description: '다정하고 낮은 목소리',
        },
        {
          voiceName: 'ko-KR-Chirp3-HD-Umbriel',
          sampleText: '안녕 나는 코디야 같이 한국어 공부하자!',
          displayName: 'Umbriel',
          description: '밝고 낮은 목소리',
        },
        {
          voiceName: 'ko-KR-Chirp3-HD-Leda',
          sampleText: '안녕 나는 코디야 같이 한국어 공부하자!',
          displayName: 'Leda',
          description: '차분하고 높은 목소리',
        },
        {
          voiceName: 'ko-KR-Chirp3-HD-Kore',
          sampleText: '안녕 나는 코디야 같이 한국어 공부하자!',
          displayName: 'Kore',
          description: '명랑하고 높은 목소리',
        },
        {
          voiceName: 'ko-KR-Chirp3-HD-Autonoe',
          sampleText: '안녕 나는 코디야 같이 한국어 공부하자!',
          displayName: 'Autonoe',
          description: '성숙하고 높은 목소리',
        },
      ],
    }),
    {
      name: 'voice-storage', // localStorage 키
    },
  ),
);
