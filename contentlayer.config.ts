import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import { LocaleTypes } from './app/[locale]/i18n/settings'

export const Page = defineDocumentType(() => ({
  name: 'Page',
  filePathPattern: `pages/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    lastmod: { type: 'date' },
    draft: { type: 'boolean' },
    summary: { type: 'string' },
    images: { type: 'list', of: { type: 'string' } },
    authors: { type: 'list', of: { type: 'string' } },
    layout: { type: 'string' },
    language: { type: 'enum', options: ['en', 'fr', 'my'], required: true },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ''),
    },
    path: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath,
    },
  },
}))

export default makeSource({
  contentDirPath: 'data',
  documentTypes: [Page],
  mdx: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})