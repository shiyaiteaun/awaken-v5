import { createTranslation } from '../i18n/server'
import { LocaleTypes } from '../i18n/settings'
import { genPageMetadata } from '../seo'
import { Metadata } from 'next'
import Image from 'next/image'

type ProductsProps = {
  params: { locale: LocaleTypes }
}

export async function generateMetadata({ params: { locale } }: ProductsProps): Promise<Metadata> {
  const { t } = await createTranslation(locale, 'products')
  return genPageMetadata({
    title: t('title'),
    params: { locale: locale },
  })
}

export default async function Products({ params: { locale } }: ProductsProps) {
  const { t } = await createTranslation(locale, 'products')
  
  const products = [
    'padma_petals',
    'video_tutorials',
    'guide_book',
    'awaken_merch',
    'padma_merch'
  ]

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          {t('title')}
        </h1>
      </div>

      <div className="py-12">
        <div className="grid gap-8">
          {products.map((product) => (
            <div key={product} className="flex flex-col md:flex-row gap-6 items-start">
              {/* Image placeholder - replace src with actual product images */}
              <div className="w-full md:w-1/3 aspect-video relative bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                <Image
                  src={`/static/images/products/${product}.jpg`}
                  alt={t(`${product}.title`)}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-full md:w-2/3">
                <h2 className="text-2xl font-bold mb-4">{t(`${product}.title`)}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t(`${product}.description`)}
                </p>
                {/* Add more product details or buttons as needed */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 