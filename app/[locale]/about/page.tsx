import { createTranslation } from '../i18n/server'
import { LocaleTypes } from '../i18n/settings'
import { genPageMetadata } from '../seo'
import { Metadata } from 'next'

type AboutProps = {
  params: { locale: LocaleTypes }
}

export async function generateMetadata({ params: { locale } }: AboutProps): Promise<Metadata> {
  const { t } = await createTranslation(locale, 'about')
  return genPageMetadata({
    title: t('title'),
    params: { locale: locale },
  })
}

export default async function About({ params: { locale } }: AboutProps) {
  const { t } = await createTranslation(locale, 'about')
  
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          {t('title')}
        </h1>
      </div>

      <div className="py-12">
        {/* Mission Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{t('mission.title')}</h2>
          <p className="text-gray-600 dark:text-gray-300">{t('mission.content')}</p>
        </section>

        {/* Vision Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{t('vision.title')}</h2>
          <p className="text-gray-600 dark:text-gray-300">{t('vision.content')}</p>
        </section>

        {/* Team Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">{t('team.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {['founder', 'training', 'tech', 'marketing', 'research', 'finance'].map((member) => (
              <div key={member} className="p-4 border rounded-lg dark:border-gray-700">
                <h3 className="font-semibold mb-2">{t(`team.members.${member}.name`)}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t(`team.members.${member}.role`)}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
} 