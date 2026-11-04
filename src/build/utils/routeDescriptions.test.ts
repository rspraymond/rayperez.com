import { describe, it, expect } from 'vitest'
import { buildRouteHtmlMetaList } from './routeDescriptions'
import { renderRouteHtml } from './routeHtml'
import { PROFILE } from '../../constants/profile'
import { ABOUT_PATH, ABOUT_PROFILE_SECTIONS, HOME_SECTIONS } from '../../constants/paths'

const SHELL = `<!doctype html><html><head><!-- DEFAULT_META_START --><title>x</title><!-- DEFAULT_META_END --></head><body><div id="root"></div></body></html>`
const IMAGE_URL = 'https://www.rayperez.com/assets/raymond-perez.jpg'

const crawlerRootFor = (routePath: string): Element => {
  const meta = buildRouteHtmlMetaList(IMAGE_URL).find((entry) => entry.path === routePath)
  if (!meta) throw new Error(`No route meta for ${routePath}`)
  const html = renderRouteHtml(SHELL, meta, { imageUrl: IMAGE_URL, url: `https://www.rayperez.com${routePath}` })
  const root = new DOMParser().parseFromString(html, 'text/html').querySelector('#root')
  if (!root) throw new Error('Missing #root')
  return root
}

describe('crawlable route HTML', () => {
  it('leads the home page with the same sentence visitors see under the name', () => {
    const root = crawlerRootFor('/')

    expect(root.querySelector('h1')?.textContent).toBe(PROFILE.name)
    expect(root.querySelector('p')?.textContent).toBe(PROFILE.tagline)
  })

  it('lists the profile sections that moved to About in its outline', () => {
    const outline = Array.from(crawlerRootFor(ABOUT_PATH).querySelectorAll('li')).map(
      (item) => item.textContent,
    )

    expect(outline).toEqual(expect.arrayContaining(Object.values(ABOUT_PROFILE_SECTIONS)))
  })

  it('outlines the home page with its sections in page order', () => {
    const outline = Array.from(crawlerRootFor('/').querySelectorAll('li')).map(
      (item) => item.textContent,
    )

    expect(outline).toEqual(['Experience', 'Projects', 'Writing'])
    expect(outline).toEqual(Object.values(HOME_SECTIONS).map((section) => section.title))
  })
})
