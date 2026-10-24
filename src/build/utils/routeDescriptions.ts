import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { posts } from '../../constants/posts'
import { caseStudies } from '../../constants/caseStudies'
import { PROFILE } from '../../constants/profile'
import { PERSON_SCHEMA, buildBlogPostingSchema, buildProfilePageSchema } from '../../constants/schema'
import { ABOUT_PATH } from '../../constants/paths'
import { SITE_URL } from '../../constants/siteUrl'
import {
  ABOUT_DOCUMENT_TITLE,
  HOME_DOCUMENT_TITLE,
  HOME_META_DESCRIPTION,
} from '../../constants/seoCopy'
import { articleOutline, leadArticleText } from '../../utils/articleText'
import type { ArticleDocument } from '../../types/articleContent'
import type { RouteHtmlMeta } from './routeHtml'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')

const readDocument = (file: string): ArticleDocument =>
  JSON.parse(fs.readFileSync(path.join(projectRoot, file), 'utf8')) as ArticleDocument

interface DatedEntry {
  title: string
  path: string
  date: string
  updated?: string
}

const toArticleMeta = (
  { title, path: routePath, date, updated }: DatedEntry,
  doc: ArticleDocument,
  imageUrl: string,
): RouteHtmlMeta => {
  const lead = leadArticleText(doc)
  return {
    path: routePath,
    title: `${title} - ${PROFILE.name} - ${PROFILE.role}`,
    heading: title,
    // The description matches the lead in the body so snippets and page text agree.
    description: lead,
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
  const doc = readDocument('src/data/content/about.json')
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

/** Every canonical route's static HTML inputs; each content file is parsed once. */
export const buildRouteHtmlMetaList = (imageUrl: string): RouteHtmlMeta[] => [
  buildHomeMeta(imageUrl),
  buildAboutMeta(imageUrl),
  ...posts.map((post) => toArticleMeta(post, readDocument(post.contentFile), imageUrl)),
  ...caseStudies.map((study) =>
    toArticleMeta(study, readDocument(study.contentFile), imageUrl),
  ),
]
