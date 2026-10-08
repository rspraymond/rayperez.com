import { describe, it, expect } from 'vitest'
import { buildMetaTags as buildMetaTagsTs } from '../src/build/utils/meta.ts'
import { buildMetaTags as buildMetaTagsJs } from '../src/build/utils/meta.js'
import { DEFAULT_SEO_KEYWORDS } from '../src/constants/seo.js'
import { SOCIAL_CONFIG } from '../src/constants/social.js'

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

describe('meta build parity', () => {
  it('keeps meta.js aligned with meta.ts for buildMetaTags output', () => {
    expect(buildMetaTagsJs(sampleValues)).toBe(buildMetaTagsTs(sampleValues))
  })
})
