import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import FeaturedLayout from '@/layouts/FeaturedLayout'
import HomeLayout from '@/layouts/HomeLayout'
import { LocaleTypes } from './i18n/settings'
import Link from 'next/link'

type HomeProps = {
  params: { locale: LocaleTypes }
}

export default async function Page({ params: { locale } }: HomeProps) {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  return (
    <>
      <div>
        This is a joint blog for <Link className='italic' href='https://planda.ca' target='_blank'>Planda.ca</Link>, <Link className='italic' href='https://celebratethismortal.com' target='_blank'>CelebrateThisMortal.com</Link>, and Christina's random coding thoughts.

      </div>
      {posts.filter((post) => post.language === locale).some((post) => post.featured) && (
        <FeaturedLayout posts={posts} params={{ locale }} />
      )}
      <HomeLayout hideFeatured posts={posts} params={{ locale: locale }} />
    </>
  )
}
