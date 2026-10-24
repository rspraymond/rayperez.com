export interface SitemapEntry {
  path: string
  date: string
  updated?: string
}

// lastmod follows the last substantive revision so crawlers do not recrawl pages for formatting changes.
const buildUrlElement = (baseUrl: string, { path, date, updated }: SitemapEntry): string => {
  const loc = path === '/' ? baseUrl : `${baseUrl}${path}`
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${updated ?? date}</lastmod>
  </url>`
}

export const buildSitemapXml = (baseUrl: string, entries: SitemapEntry[]): string =>
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map((entry) => buildUrlElement(baseUrl, entry)).join('\n')}
</urlset>`
