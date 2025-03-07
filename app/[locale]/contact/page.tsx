'use client'

import { useTranslation } from '../i18n/client'
import { LocaleTypes } from '../i18n/settings'
import { useParams } from 'next/navigation'
import { ContactModal } from '@/components/formspree'
import { useContactModal } from '@/components/formspree/store'

export default function Contact() {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'contact')
  const contactModal = useContactModal()

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          {t('title')}
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          {t('description')}
        </p>
      </div>

      <div className="py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-6">{t('info.title')}</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{t('info.address.title')}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t('info.address.value')}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t('info.email.title')}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t('info.email.value')}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t('info.phone.title')}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t('info.phone.value')}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">{t('form.title')}</h2>
            <ContactModal />
          </div>
        </div>
      </div>
    </div>
  )
} 