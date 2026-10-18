import { en, type UiKey, type UiStrings } from './en';

export const defaultLocale = 'en';

// Register additional languages here, e.g. `es` once src/i18n/es.ts exists.
const dictionaries: Record<string, UiStrings> = { en };

export type Locale = keyof typeof dictionaries;

/** Returns a translator for the given locale, falling back to English. */
export function useTranslations(locale: string = defaultLocale) {
  const dictionary = dictionaries[locale] ?? dictionaries[defaultLocale];
  return (key: UiKey): string => dictionary[key];
}

/** Prefixes a path with the locale segment when it is not the default locale. */
export function localizedPath(path: string, locale: string = defaultLocale): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return locale === defaultLocale ? clean : `/${locale}${clean}`;
}
