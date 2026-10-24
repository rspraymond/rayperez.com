import fs from 'fs'
import os from 'os'
import path from 'path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { generateRouteHtml } from './generate-route-html'
import { canonicalRoutes } from '../src/constants/routes'

const SHELL = `<!doctype html>
<html lang="en">
  <head>
    <!-- DEFAULT_META_START -->
    <title>Default</title>
    <!-- META_PLACEHOLDER -->
    <!-- DEFAULT_META_END -->
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`

describe('generateRouteHtml', () => {
  let distDir: string

  beforeEach(() => {
    distDir = fs.mkdtempSync(path.join(os.tmpdir(), 'route-html-'))
    fs.mkdirSync(path.join(distDir, 'assets'))
    fs.writeFileSync(path.join(distDir, 'assets', 'raymond-perez-abc123.jpg'), '')
    fs.writeFileSync(path.join(distDir, 'index.html'), SHELL)
    generateRouteHtml(distDir)
  })

  afterEach(() => {
    fs.rmSync(distDir, { recursive: true, force: true })
  })

  const read = (key: string): string => fs.readFileSync(path.join(distDir, key), 'utf8')

  it('writes an extensionless file for every canonical route except the root', () => {
    canonicalRoutes
      .filter((route) => route !== '/')
      .forEach((route) => {
        expect(fs.existsSync(path.join(distDir, route.slice(1)))).toBe(true)
      })
  })

  it('gives an article one h1, a byline, dates, and BlogPosting JSON-LD', () => {
    const html = read('why-typescript')

    expect(html.match(/<h1>/g)).toHaveLength(1)
    expect(html).toContain('<h1>Why I Choose TypeScript</h1>')
    expect(html).toContain('rel="author"')
    expect(html).toContain('<time datetime="2024-07-04">')

    const ld = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)![1])
    expect(ld['@type']).toBe('BlogPosting')
    expect(ld.dateModified).toBe('2024-07-04')
    expect(ld.image).toBe('https://www.rayperez.com/assets/raymond-perez-abc123.jpg')
  })

  it('points each page at its own canonical URL', () => {
    expect(read('why-typescript')).toContain(
      '<link rel="canonical" href="https://www.rayperez.com/why-typescript" />',
    )
    expect(read('case-studies/prejump')).toContain(
      '<link rel="canonical" href="https://www.rayperez.com/case-studies/prejump" />',
    )
  })

  it('describes the about page as a ProfilePage for the person', () => {
    const html = read('about')

    expect(html).toContain('<h1>About Raymond Perez</h1>')
    expect(html).toContain('"@type":"ProfilePage"')
    expect(html).not.toContain('rel="author"')
  })

  it('rewrites the root document with person schema and a body', () => {
    const html = read('index.html')

    expect(html).toContain('<h1>Raymond Perez</h1>')
    expect(html).toContain('"@type":"Person"')
  })
})
