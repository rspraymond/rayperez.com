import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { posts } from '../../constants/posts.js'
import { caseStudies } from '../../constants/caseStudies.js'
import { PROFILE } from '../../constants/profile.js'
import {
  PERSON_SCHEMA,
  buildBlogPostingSchema,
  buildProfilePageSchema,
} from '../../constants/schema.js'
import { ABOUT_PATH } from '../../constants/paths.js'
import { SITE_URL } from '../../constants/siteUrl.js'
import { articleOutline, leadArticleText } from '../../utils/articleText.js'
import { ArticleDocument } from '../../types/articleContent.js'
import {
  ABOUT_DOCUMENT_TITLE,
  HOME_DOCUMENT_TITLE,
  HOME_META_DESCRIPTION,
  NESTJS_META_DESCRIPTION,
  OPINIONATED_META_DESCRIPTION,
} from '../../constants/seoCopy.js'
import type { RouteHtmlMeta } from './routeHtml.js'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')

export const documentTitleForArticle = (heading: string): string =>
  `${heading} - ${PROFILE.name} - ${PROFILE.role}`

const readArticleDocument = (contentFile: string): ArticleDocument => {
  const absolutePath = path.join(projectRoot, contentFile)
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Missing content file: ${contentFile}`)
  }
  return JSON.parse(fs.readFileSync(absolutePath, 'utf8')) as ArticleDocument
}

export const descriptionForContentFile = (contentFile: string, explicit?: string): string => {
  // Query-target articles pass locked copy in posts.ts instead of the introduction paragraph.
  if (explicit) {
    return explicit
  }
  return leadArticleText(readArticleDocument(contentFile))
}

interface DatedEntry {
  title: string
  path: string
  date: string
  updated?: string
  contentFile: string
  description?: string
}

const toArticleMeta = (
  { title, path: routePath, date, updated, contentFile, description }: DatedEntry,
  imageUrl: string,
): RouteHtmlMeta => {
  // Each content file is parsed once; the lead, outline, and fallback description share it.
  const doc = readArticleDocument(contentFile)
  const lead = leadArticleText(doc)
  return {
    path: routePath,
    title: documentTitleForArticle(title),
    heading: title,
    description: description ?? lead,
    lead,
    outline: articleOutline(doc),
    type: 'article',
    datePublished: date,
    dateModified: updated ?? date,
    schemas: [
      buildBlogPostingSchema({
        title,
        url: `${SITE_URL}${routePath}`,
        datePublished: date,
        dateModified: updated,
        image: imageUrl,
      }),
    ],
  }
}

const buildHomeMeta = (imageUrl: string): RouteHtmlMeta => ({
  path: '/',
  title: HOME_DOCUMENT_TITLE,
  heading: PROFILE.name,
  description: HOME_META_DESCRIPTION,
  lead: HOME_META_DESCRIPTION,
  outline: [],
  type: 'profile',
  schemas: [{ ...PERSON_SCHEMA, image: imageUrl, description: PROFILE.description }],
})

const buildAboutMeta = (imageUrl: string): RouteHtmlMeta => {
  const doc = readArticleDocument('src/data/content/about.json')
  const lead = leadArticleText(doc)
  return {
    path: ABOUT_PATH,
    title: ABOUT_DOCUMENT_TITLE,
    heading: `About ${PROFILE.name}`,
    description: lead,
    lead,
    outline: articleOutline(doc),
    type: 'profile',
    schemas: [buildProfilePageSchema(imageUrl)],
  }
}

/** Titles and descriptions for static HTML and RSS; keep aligned with JsonBlogPost page props. */
export const buildRouteHtmlMetaList = (imageUrl: string): RouteHtmlMeta[] => [
  buildHomeMeta(imageUrl),
  buildAboutMeta(imageUrl),
  ...posts.map((post) => toArticleMeta(post, imageUrl)),
  ...caseStudies.map((study) => toArticleMeta(study, imageUrl)),
]

export { NESTJS_META_DESCRIPTION, OPINIONATED_META_DESCRIPTION }
