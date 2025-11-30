//i18
import { createI18n } from 'vue-i18n';
import { messages } from '@/utils/locales/messages';

export const i18n = createI18n({
  locale: import.meta.env.VITE_DEFAULT_LOCALE,
  fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
  legacy: false,
  messages: messages,
  silentTranslationWarn: true,
  silentFallbackWarn: true
});
