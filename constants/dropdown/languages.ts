import { LANGUAGES } from '@/constants/languages';

export interface LanguageDropdownProps {
  code: (typeof LANGUAGES)[keyof typeof LANGUAGES];
  label: string;
  subLabel?: string;
}

export const LanguageDropdown: LanguageDropdownProps[] = [
  { code: 'en', label: 'English', subLabel: '영어' },
  { code: 'vt', label: 'tiếng Việt', subLabel: '베트남어' },
  { code: 'chn', label: '中文', subLabel: '중국어' },
  { code: 'jp', label: '日本語', subLabel: '일본어' },
];
