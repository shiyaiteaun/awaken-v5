import { createTranslation } from '../i18n/server'
import { LocaleTypes } from '../i18n/settings'
import { genPageMetadata } from '../seo'
import { Metadata } from 'next'

type ServicesProps = {
  params: { locale: LocaleTypes }
}

export async function generateMetadata({ params: { locale } }: ServicesProps): Promise<Metadata> {
  const { t } = await createTranslation(locale, 'services')
  return genPageMetadata({
    title: t('title'),
    params: { locale: locale },
  })
}

export default async function Services({ params: { locale } }: ServicesProps) {
  const { t } = await createTranslation(locale, 'services')
  
  const services = [
    'school_partnership',
    'club_partnership',
    'workshops',
    'courses'
  ]

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          {t('title')}
        </h1>
      </div>

      <div className="py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div 
              key={service} 
              className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 mr-4 flex items-center justify-center bg-primary-100 dark:bg-primary-900 rounded-lg">
                  {/* Add icons here if needed */}
                </div>
                <h2 className="text-2xl font-bold">{t(`${service}.title`)}</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {t(`${service}.description`)}
              </p>
              <ul className="space-y-2">
                {t(`${service}.features`, { returnObjects: true }).map((feature: string, index: number) => (
                  <li key={index} className="flex items-center">
                    <span className="mr-2">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 