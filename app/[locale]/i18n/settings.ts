import type { InitOptions } from 'i18next'

export const fallbackLng = 'en'
export const locales = ['en', 'my'] as const
export type LocaleTypes = (typeof locales)[number]
export const defaultNS = 'common'

export function getOptions(lng = fallbackLng, ns = defaultNS): InitOptions {
  return {
    supportedLngs: locales,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  }
}
