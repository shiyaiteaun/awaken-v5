import { Metadata } from 'next'
import ListLayout from '@/layouts/ListLayout'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/[locale]/seo'
import { createTranslation } from '../i18n/server'
import { LocaleTypes } from '../i18n/settings'

type BlogPageProps = {
  params: { locale: LocaleTypes }
}

export async function generateMetadata({ params: { locale } }: BlogPageProps): Promise<Metadata> {
  const { t } = await createTranslation(locale, 'blog')
  return genPageMetadata({
    title: t('title'),
    params: { locale: locale },
  })
}

export default async function BlogPage({ params: { locale } }: BlogPageProps) {
  const { t } = await createTranslation(locale, 'blog')
  
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          {t('title')}
        </h1>
      </div>

      <div className="py-12">
        <div className="text-center">
          <div className="mb-8">
            <svg 
              className="mx-auto h-24 w-24 text-gray-400 dark:text-gray-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-4">{t('comingSoon')}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            {t('description')}
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="bg-primary-50 dark:bg-primary-900/50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">{t('whatToExpect')}</h3>
              <ul className="text-left space-y-2">
                {t('features', { returnObjects: true }).map((feature: string, index: number) => (
                  <li key={index} className="flex items-center">
                    <span className="mr-2">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
