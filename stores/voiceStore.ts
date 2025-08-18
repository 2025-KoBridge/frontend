import { create } from 'zustand';

interface VoiceState {
  selectedVoice: number | null; // 선택된 목소리 인덱스
  setSelectedVoice: (idx: number | null) => void;
}

export const useVoiceStore = create<VoiceState>(set => ({
  selectedVoice: null,
  setSelectedVoice: idx => set({ selectedVoice: idx }),
}));
