export const LANGUAGES = {
  EN: 'en',
  JP: 'jp',
  VT: 'vt',
  CHN: 'chn',
} as const;

export type Language = (typeof LANGUAGES)[keyof typeof LANGUAGES];

export const FONT_CLASS = {
  [LANGUAGES.EN]: 'font-mplus',
  [LANGUAGES.JP]: 'font-mplus',
  [LANGUAGES.VT]: 'font-mplus',
  [LANGUAGES.CHN]: 'font-noto',
} as const;
