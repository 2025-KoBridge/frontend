import { create } from 'zustand';
import {
  LanguageDropdown,
  LanguageDropdownProps,
} from '@/constants/dropdown/languages';

interface LanguageState {
  currentLanguage: LanguageDropdownProps;
  setLanguage: (lang: LanguageDropdownProps) => void;
}

export const useLanguageStore = create<LanguageState>(set => ({
  currentLanguage: LanguageDropdown[0],
  setLanguage: (lang: LanguageDropdownProps) => set({ currentLanguage: lang }),
}));
