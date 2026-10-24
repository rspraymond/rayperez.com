import { describe, it, expect } from 'vitest'
import { buildSitemapXml } from './sitemap'

const BASE = 'https://www.rayperez.com'

describe('buildSitemapXml', () => {
  it('uses the updated date as lastmod when an entry has one', () => {
    const xml = buildSitemapXml(BASE, [{ path: '/why-nestjs', date: '2024-07-04', updated: '2026-01-10' }])

    expect(xml).toContain('<loc>https://www.rayperez.com/why-nestjs</loc>')
    expect(xml).toContain('<lastmod>2026-01-10</lastmod>')
    expect(xml).not.toContain('2024-07-04')
  })

  it('falls back to the published date when an entry was never updated', () => {
    const xml = buildSitemapXml(BASE, [{ path: '/why-oop', date: '2024-07-04' }])

    expect(xml).toContain('<lastmod>2024-07-04</lastmod>')
  })

  it('lists the site root without a trailing path', () => {
    const xml = buildSitemapXml(BASE, [{ path: '/', date: '2026-10-24' }])

    expect(xml).toContain('<loc>https://www.rayperez.com</loc>')
  })
})
