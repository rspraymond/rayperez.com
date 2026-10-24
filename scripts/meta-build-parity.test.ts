import { describe, it, expect } from 'vitest'
import { buildMetaTags as buildMetaTagsTs } from '../src/build/utils/meta.ts'
import { buildMetaTags as buildMetaTagsJs } from '../src/build/utils/meta.js'
import { DEFAULT_SEO_KEYWORDS } from '../src/constants/seo.js'
import { SOCIAL_CONFIG } from '../src/constants/social.js'
import fs from 'fs'
import path from 'path'
import { buildRouteHtmlMetaList } from '../src/build/utils/routeDescriptions.ts'
import { canonicalRoutes } from '../src/constants/routes.js'
import { HOME_DOCUMENT_TITLE, HOME_META_DESCRIPTION } from '../src/constants/seoCopy.js'

const indexHtml = fs.readFileSync(path.resolve(import.meta.dirname, '../index.html'), 'utf8')

const sampleValues = {
  title: 'Why I Choose NestJS - Raymond Perez - Software Engineer',
  description: 'NestJS adds structure, dependency injection, and TypeScript to Node.js.',
  keywords: DEFAULT_SEO_KEYWORDS,
  image: 'https://www.rayperez.com/assets/raymond-perez-abc123.jpg',
  url: 'https://www.rayperez.com/why-nestjs',
  type: 'article',
  siteName: SOCIAL_CONFIG.siteName,
  twitterCreator: SOCIAL_CONFIG.twitterCreator,
}

describe('route HTML parity', () => {
  it('generates static HTML for exactly the canonical routes', () => {
    const generated = buildRouteHtmlMetaList('https://www.rayperez.com/assets/x.jpg').map(
      (route) => route.path,
    )

    expect([...generated].sort()).toEqual([...canonicalRoutes].sort())
  })

  it('keeps the home copy in step with the default head in index.html', () => {
    expect(indexHtml).toContain(HOME_DOCUMENT_TITLE)
    expect(indexHtml).toContain(HOME_META_DESCRIPTION)
  })
})

describe('meta build parity', () => {
  it('keeps meta.js aligned with meta.ts for buildMetaTags output', () => {
    expect(buildMetaTagsJs(sampleValues)).toBe(buildMetaTagsTs(sampleValues))
  })
})
