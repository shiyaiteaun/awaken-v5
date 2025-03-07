import { createTranslation } from '../i18n/server'
import { LocaleTypes } from '../i18n/settings'
import { genPageMetadata } from '../seo'
import { Metadata } from 'next'
import NewsContent from './NewsContent'

type NewsProps = {
  params: { locale: LocaleTypes }
}

export async function generateMetadata({ params: { locale } }: NewsProps): Promise<Metadata> {
  const { t } = await createTranslation(locale, 'news')
  return genPageMetadata({
    title: t('title'),
    params: { locale: locale },
  })
}

export default async function News({ params: { locale } }: NewsProps) {
  const { t } = await createTranslation(locale, 'news')
  
  const translations = {
    title: t('title'),
    all: t('all'),
    events: t('events'),
    workshops: t('workshops'),
    achievements: t('achievements'),
  }

  return <NewsContent translations={translations} />
} 