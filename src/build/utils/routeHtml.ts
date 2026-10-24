import { buildMetaTags, escapeHtml } from './meta'
import { DEFAULT_SEO_KEYWORDS } from '../../constants/seo'
import { PROFILE } from '../../constants/profile'
import { SOCIAL_CONFIG } from '../../constants/social'
import { ABOUT_PATH } from '../../constants/paths'
import { formatIsoDate } from '../../utils/formatIsoDate'

const META_START = '<!-- DEFAULT_META_START -->'
const META_END = '<!-- DEFAULT_META_END -->'
const EMPTY_ROOT = '<div id="root"></div>'

export interface RouteHtmlMeta {
  path: string
  title: string
  heading: string
  description: string
  lead: string
  outline: string[]
  type: 'profile' | 'article'
  datePublished?: string
  dateModified?: string
  schemas: ReadonlyArray<object>
}

export interface RouteHtmlContext {
  imageUrl: string
  url: string
}

// Escaping "<" keeps article copy from closing the script element early.
const renderJsonLd = (schemas: ReadonlyArray<object>): string =>
  schemas
    .map(
      (schema) =>
        `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`,
    )
    .join('\n    ')

const renderTime = (isoDate: string): string =>
  `<time datetime="${isoDate}">${formatIsoDate(isoDate)}</time>`

const renderByline = ({ datePublished, dateModified }: RouteHtmlMeta): string => {
  if (!datePublished) {
    return ''
  }
  const updated =
    dateModified && dateModified !== datePublished ? ` · Updated ${renderTime(dateModified)}` : ''
  return `<p>By <a href="${ABOUT_PATH}" rel="author">${escapeHtml(PROFILE.name)}</a> · ${renderTime(datePublished)}${updated}</p>`
}

// Bounded on purpose: crawlers need the signals, not a second copy of the article body.
const renderRootBody = (meta: RouteHtmlMeta): string => {
  const outline = meta.outline.length
    ? `<ul>${meta.outline.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`
    : ''
  return `<div id="root"><article><h1>${escapeHtml(meta.heading)}</h1>${renderByline(meta)}<p>${escapeHtml(meta.lead)}</p>${outline}</article></div>`
}

const replaceMetaBlock = (shell: string, tags: string): string => {
  const start = shell.indexOf(META_START)
  const end = shell.indexOf(META_END)
  if (start === -1 || end === -1 || end < start) {
    throw new Error('DEFAULT_META markers missing from index.html template')
  }
  return `${shell.slice(0, start + META_START.length)}\n${tags}\n    <!-- META_PLACEHOLDER -->\n    ${shell.slice(end)}`
}

/**
 * Builds the first HTML response for one route from the built shell.
 * Canonical and share tags come from buildMetaTags so crawlers see them before JavaScript runs.
 */
export const renderRouteHtml = (
  shell: string,
  meta: RouteHtmlMeta,
  { imageUrl, url }: RouteHtmlContext,
): string => {
  const tags = [
    buildMetaTags({
      title: meta.title,
      description: meta.description,
      keywords: DEFAULT_SEO_KEYWORDS,
      image: imageUrl,
      url,
      type: meta.type === 'article' ? 'article' : 'profile',
      siteName: SOCIAL_CONFIG.siteName,
      twitterCreator: PROFILE.twitterCreator,
    }),
    renderJsonLd(meta.schemas),
  ].join('\n    ')

  return replaceMetaBlock(shell, tags).replace(EMPTY_ROOT, renderRootBody(meta))
}
