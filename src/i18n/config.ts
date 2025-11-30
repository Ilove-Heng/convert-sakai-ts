export const SUPPORTED_LANGUAGES = ['en', 'kh'] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export interface LanguageMetadata {
  name: string;
  nativeName: string;
  flag: string;
  dateFormat: string;
}

export const LANGUAGE_METADATA: Record<SupportedLanguage, LanguageMetadata> = {
  en: {
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    dateFormat: 'MM/DD/YYYY'
  },
  kh: {
    name: 'Khmer',
    nativeName: 'ខ្មែរ',
    flag: '🇰🇭',
    dateFormat: 'DD/MM/YYYY'
  }
};
