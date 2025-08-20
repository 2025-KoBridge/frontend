import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  LanguageDropdown,
  LanguageDropdownProps,
} from '@/constants/dropdown/languages';

interface LanguageState {
  currentLanguage: LanguageDropdownProps;
  setLanguage: (lang: LanguageDropdownProps) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    set => ({
      currentLanguage: LanguageDropdown[0],
      setLanguage: (lang: LanguageDropdownProps) =>
        set({ currentLanguage: lang }),
    }),
    {
      name: 'language-store', // localStorage key
    },
  ),
);
