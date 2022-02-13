export const SUPPORTED_LOCALES = [
  'en-US',
  'zh-CN',
  'zh-TW',
] as const
export type SupportedLocale = typeof SUPPORTED_LOCALES[number]

export const DEFAULT_LOCALE: SupportedLocale = 'en-US'

export const LOCALE_LABEL: { [locale in SupportedLocale]: string } = {
  'en-US': 'English',
  'zh-CN': '中文 ( 简体 )',
  'zh-TW': '中文 ( 繁体 )',
}
