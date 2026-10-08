import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { posts } from '../../constants/posts.js'
import { caseStudies } from '../../constants/caseStudies.js'
import { PROFILE } from '../../constants/profile.js'
import { leadArticleText } from '../../utils/articleText.js'
import { ArticleDocument } from '../../types/articleContent.js'
import {
  HOME_DOCUMENT_TITLE,
  HOME_META_DESCRIPTION,
  NESTJS_META_DESCRIPTION,
  OPINIONATED_META_DESCRIPTION,
} from '../../constants/seoCopy.js'

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

export interface RouteHtmlMeta {
  path: string
  title: string
  description: string
  leadParagraph: string
  type: 'profile' | 'article'
}

/** Titles and descriptions for static HTML and RSS; keep aligned with JsonBlogPost page props. */
export const buildRouteHtmlMetaList = (): RouteHtmlMeta[] => {
  const routes: RouteHtmlMeta[] = [
    {
      path: '/',
      title: HOME_DOCUMENT_TITLE,
      description: HOME_META_DESCRIPTION,
      leadParagraph: HOME_META_DESCRIPTION,
      type: 'profile',
    },
  ]

  for (const post of posts) {
    const doc = readArticleDocument(post.contentFile)
    const lead = leadArticleText(doc)
    const description = descriptionForContentFile(post.contentFile, post.description)
    routes.push({
      path: post.path,
      title: documentTitleForArticle(post.title),
      description,
      leadParagraph: lead,
      type: 'article',
    })
  }

  for (const caseStudy of caseStudies) {
    const description = descriptionForContentFile(caseStudy.contentFile)
    const lead = leadArticleText(readArticleDocument(caseStudy.contentFile))
    routes.push({
      path: caseStudy.path,
      title: documentTitleForArticle(caseStudy.title),
      description,
      leadParagraph: lead,
      type: 'article',
    })
  }

  return routes
}

export { NESTJS_META_DESCRIPTION, OPINIONATED_META_DESCRIPTION }
