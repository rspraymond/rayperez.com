import { describe, it, expect } from 'vitest'
import { renderRouteHtml, RouteHtmlMeta } from './routeHtml'

const SHELL = `<!doctype html>
<html lang="en">
  <head>
    <!-- DEFAULT_META_START -->
    <title>Default title</title>
    <!-- META_PLACEHOLDER -->
    <!-- DEFAULT_META_END -->
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`

const article: RouteHtmlMeta = {
  path: '/why-typescript',
  title: 'Why I Choose TypeScript - Raymond Perez - Software Engineer',
  heading: 'Why I Choose TypeScript',
  description: 'Static typing catches mistakes early.',
  lead: 'Static typing catches mistakes early.',
  outline: ['Key Takeaways', 'Introduction'],
  type: 'article',
  datePublished: '2024-07-04',
  dateModified: '2026-01-10',
  schemas: [{ '@type': 'BlogPosting', headline: 'Why I Choose TypeScript' }],
}

const render = (meta: RouteHtmlMeta): string =>
  renderRouteHtml(SHELL, meta, {
    imageUrl: 'https://www.rayperez.com/assets/raymond-perez-abc.jpg',
    url: `https://www.rayperez.com${meta.path}`,
  })

describe('renderRouteHtml', () => {
  it('replaces the default title and sets the canonical page URL', () => {
    const html = render(article)

    expect(html).toContain('<title>Why I Choose TypeScript - Raymond Perez - Software Engineer</title>')
    expect(html).not.toContain('Default title')
    expect(html).toContain('content="https://www.rayperez.com/why-typescript"')
  })

  it('renders one h1, a byline linking to the about page, and both dates', () => {
    const html = render(article)

    expect(html.match(/<h1>/g)).toHaveLength(1)
    expect(html).toContain('<h1>Why I Choose TypeScript</h1>')
    expect(html).toContain('<a href="/about" rel="author">Raymond Perez</a>')
    expect(html).toContain('<time datetime="2024-07-04">Jul 4, 2024</time>')
    expect(html).toContain('<time datetime="2026-01-10">Jan 10, 2026</time>')
  })

  it('omits the updated date when it equals the published date', () => {
    const html = render({ ...article, dateModified: '2024-07-04' })

    expect(html).not.toContain('Updated')
  })

  it('renders the lead paragraph and heading outline', () => {
    const html = render(article)

    expect(html).toContain('<p>Static typing catches mistakes early.</p>')
    expect(html).toContain('<li>Key Takeaways</li>')
    expect(html).toContain('<li>Introduction</li>')
  })

  it('embeds each schema as parseable JSON-LD', () => {
    const html = render(article)
    const match = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)

    expect(match).not.toBeNull()
    expect(JSON.parse(match?.[1] ?? '{}')).toEqual(article.schemas[0])
  })

  it('escapes markup in copy so content cannot break out of the page', () => {
    const html = render({ ...article, heading: 'A <script>x</script> title' })

    expect(html).not.toContain('<script>x</script>')
    expect(html).toContain('A &lt;script&gt;x&lt;/script&gt; title')
  })

  it('renders a profile page without a byline or dates', () => {
    const html = render({
      ...article,
      path: '/about',
      heading: 'About Raymond Perez',
      type: 'profile',
      datePublished: undefined,
      dateModified: undefined,
    })

    expect(html).toContain('<h1>About Raymond Perez</h1>')
    expect(html).not.toContain('rel="author"')
    expect(html).not.toContain('<time')
  })
})
