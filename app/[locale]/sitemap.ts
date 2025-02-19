import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import { fallbackLng } from './i18n/locales'
import { locales } from './i18n/settings'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl

  const blogRoutesByLocale = locales.map((locale) => {
    return allBlogs
      .filter((p) => p.language === locale)
      .map((post) => ({
        url: `${siteUrl}/${locale}/${post.path}`,
        lastModified: post.lastmod || post.date,
      }))
  })

  // // blog route for english
  // const firstBlogRoutes = allBlogs
  //   .filter((p) => p.language === fallbackLng)
  //   .map((post) => ({
  //     url: `${siteUrl}/${fallbackLng}/${post.path}`,
  //     lastModified: post.lastmod || post.date,
  //   }))

  // const BlogRoutes = [...firstBlogRoutes, ...secondBlogRoutes].map((route) => ({
  //   ...route,
  // }))
  const BlogRoutes = [...blogRoutesByLocale.flat()].map((route) => ({
    ...route,
  }))

  // all routes for all locales
  const routes = locales.flatMap((locale) => {
    return ['', 'blog', 'projects', 'tags', 'about'].map((route) => ({
      url: `${siteUrl}/${locale}/${route}`,
      lastModified: new Date().toISOString().split('T')[0],
    }))
  })

  const SitemapRoutes: MetadataRoute.Sitemap = [...routes, ...BlogRoutes].map((route) => ({
    ...route,
  }))

  return SitemapRoutes
}
