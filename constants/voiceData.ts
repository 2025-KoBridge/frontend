import { Language } from './languages';

export type LangKey = Language;

interface VoiceOption {
  text: string;
  subText: Record<LangKey, string>;
}

interface VoiceData {
  selectVoice: {
    characterVoice: Record<string, VoiceOption>;
  };
}

export const voiceData: VoiceData = {
  selectVoice: {
    characterVoice: {
      voice1: {
        text: 'Kody의 목소리',
        subText: {
          vt: 'Giọng nói của Kody',
          en: "Kody's voice",
          jp: 'コディの声',
          chn: 'Kody的声音',
        },
      },
      voice2: {
        text: 'Kody의 목소리22',
        subText: {
          vt: 'Giọng nói của Kody',
          en: "Kody's voice",
          jp: 'コディの声',
          chn: 'Kody的声音',
        },
      },
      voice3: {
        text: '33Kody의 목소리',
        subText: {
          vt: 'Giọng nói của Kody',
          en: "Kody's voice",
          jp: 'コディの声',
          chn: 'Kody的声音',
        },
      },
      voice4: {
        text: '444Kody의 목소리',
        subText: {
          vt: 'Giọng nói của Kody',
          en: "Kody's voice",
          jp: 'コディの声',
          chn: 'Kody的声音',
        },
      },
      voice5: {
        text: '555Kody의 목소리',
        subText: {
          vt: 'Giọng nói của Kody',
          en: "Kody's voice",
          jp: 'コディの声',
          chn: 'Kody的声音',
        },
      },
    },
  },
};
