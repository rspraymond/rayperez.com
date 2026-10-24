import { SOCIAL_CONFIG } from '../constants/social'
import { SHARE_IMAGE_URL } from '../constants/shareImage'
import type { ResolvedSocialMetaValues, SocialMetaProps } from '../types/socialMeta'

/**
 * Updates prerendered head tags in place for SPA navigation.
 * Helmet appends siblings; browsers and crawlers often honor the first description and og:* nodes.
 */

type HeadUpsertConfig = {
  selector: string
  create: () => HTMLElement
  init?: (element: HTMLElement) => void
  apply: (element: HTMLElement, value: string) => void
}

const pruneDuplicateHeadNodes = (matches: NodeListOf<HTMLElement>): void => {
  for (let index = 1; index < matches.length; index += 1) {
    matches[index].remove()
  }
}

const upsertHeadNode = (config: HeadUpsertConfig, value: string): void => {
  const matches = document.head.querySelectorAll<HTMLElement>(config.selector)
  const primary = matches[0] ?? config.create()

  if (!matches[0]) {
    config.init?.(primary)
    document.head.appendChild(primary)
  }

  config.apply(primary, value)
  // Drop later copies from Helmet or older routes so the updated first node is authoritative.
  pruneDuplicateHeadNodes(matches)
}

const upsertMetaBySelector = (
  selector: string,
  init: (meta: HTMLMetaElement) => void,
  content: string,
): void => {
  upsertHeadNode(
    {
      selector,
      create: () => document.createElement('meta'),
      init: (element) => init(element as HTMLMetaElement),
      apply: (element, nextContent) => element.setAttribute('content', nextContent),
    },
    content,
  )
}

const upsertNamedMeta = (name: string, content: string): void => {
  upsertMetaBySelector(
    `meta[name="${CSS.escape(name)}"]`,
    (meta) => {
      meta.setAttribute('name', name)
    },
    content,
  )
}

const upsertPropertyMeta = (property: string, content: string): void => {
  upsertMetaBySelector(
    `meta[property="${CSS.escape(property)}"]`,
    (meta) => {
      meta.setAttribute('property', property)
    },
    content,
  )
}

const upsertCanonicalLink = (href: string): void => {
  upsertHeadNode(
    {
      selector: 'link[rel="canonical"]',
      create: () => document.createElement('link'),
      init: (element) => element.setAttribute('rel', 'canonical'),
      apply: (element, nextHref) => element.setAttribute('href', nextHref),
    },
    href,
  )
}

const upsertDocumentTitle = (title: string): void => {
  document.title = title
  upsertHeadNode(
    {
      selector: 'title',
      create: () => document.createElement('title'),
      apply: (element, nextTitle) => {
        element.textContent = nextTitle
      },
    },
    title,
  )
}

export const resolveSocialMetaValues = (props: SocialMetaProps): ResolvedSocialMetaValues => ({
  title: props.title || SOCIAL_CONFIG.siteName,
  description: props.description || SOCIAL_CONFIG.defaultDescription,
  image: props.image || SHARE_IMAGE_URL,
  // Callers should pass the clean canonical url; location.href is a dev and test fallback only.
  url: props.url || (typeof window !== 'undefined' ? window.location.href : ''),
  type: props.type || 'website',
  twitterCreator: props.twitterCreator || SOCIAL_CONFIG.twitterCreator,
  siteName: props.siteName || SOCIAL_CONFIG.siteName,
  keywords: props.keywords || SOCIAL_CONFIG.keywords,
})

/**
 * Client writer for title, description, Open Graph, Twitter, and canonical link.
 * Page components pass strings; do not load article content here on navigation.
 */
export const applySocialMetaToDocumentHead = (values: ResolvedSocialMetaValues): void => {
  upsertDocumentTitle(values.title)
  upsertNamedMeta('keywords', values.keywords)
  upsertNamedMeta('description', values.description)

  const propertyMeta: Array<[string, string]> = [
    ['og:title', values.title],
    ['og:description', values.description],
    ['og:image', values.image],
    ['og:url', values.url],
    ['og:type', values.type],
    ['og:site_name', values.siteName],
    ['twitter:card', 'summary_large_image'],
    ['twitter:title', values.title],
    ['twitter:description', values.description],
    ['twitter:image', values.image],
    ['twitter:creator', values.twitterCreator],
  ]

  propertyMeta.forEach(([property, content]) => {
    upsertPropertyMeta(property, content)
  })

  upsertCanonicalLink(values.url)
}
