import { defineRouting } from 'next-intl/routing';

export type Locale = 'en' | 'kr';
export const locales = ['kr'] as const;
export const defaultLocale: Locale = 'kr';

export const routing = defineRouting({
  locales,
  defaultLocale,
  localeDetection: false,
  localePrefix: 'as-needed',
});
