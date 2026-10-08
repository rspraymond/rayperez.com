import { describe, it, expect } from 'vitest'
import { buildMetaTags } from '../src/build/utils/meta.ts'
import { DEFAULT_SEO_KEYWORDS } from '../src/constants/seo.js'
import { SOCIAL_CONFIG } from '../src/constants/social.js'
import { NESTJS_META_DESCRIPTION } from '../src/constants/seoCopy.js'

describe('route HTML shell meta', () => {
  it('builds one canonical set for an article route', () => {
    const intro =
      'NestJS is a Node.js framework built with TypeScript for server side applications.'
    const image = 'https://www.rayperez.com/assets/raymond-perez-abc123.jpg'
    const meta = buildMetaTags({
      title: 'Why I Choose NestJS - Raymond Perez - Software Engineer',
      description: NESTJS_META_DESCRIPTION,
      keywords: DEFAULT_SEO_KEYWORDS,
      image,
      url: 'https://www.rayperez.com/why-nestjs',
      type: 'article',
      siteName: SOCIAL_CONFIG.siteName,
      twitterCreator: SOCIAL_CONFIG.twitterCreator,
    })

    const html = `<!doctype html><html><head>${meta}</head><body><div id="root"><p>${intro}</p></div></body></html>`

    expect(html.match(/<title>/g)?.length).toBe(1)
    expect(html.match(/property="og:title"/g)?.length).toBe(1)
    expect(html).toContain(`rel="canonical" href="https://www.rayperez.com/why-nestjs"`)
    expect(html).toContain('property="og:url" content="https://www.rayperez.com/why-nestjs"')
    expect(html).toContain(intro)
    expect(html).not.toContain('<table')
    expect(html).not.toContain('const ')
  })
})
