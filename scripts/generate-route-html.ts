import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { buildMetaTags } from '../src/build/utils/meta.js'
import { assertExtensionlessRoutesMatchMetaPaths } from '../src/build/utils/extensionlessRouteKeys.js'
import { buildRouteHtmlMetaList } from '../src/build/utils/routeDescriptions.js'
import { SITE_URL } from '../src/constants/siteUrl.js'
import { DEFAULT_SEO_KEYWORDS } from '../src/constants/seo.js'
import { SOCIAL_CONFIG } from '../src/constants/social.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const distDir = path.resolve(__dirname, '../dist')
const baseUrl = SITE_URL

const META_START = '<!-- DEFAULT_META_START -->'
const META_END = '<!-- DEFAULT_META_END -->'

// Crawlers and og:image need the hashed JPEG Vite emitted, not PROFILE.image (that key 301s to the SPA).
const resolveProfileImageUrl = (): string => {
  const assetsDir = path.join(distDir, 'assets')
  if (!fs.existsSync(assetsDir)) {
    throw new Error('dist/assets is missing. Run vite build before generate-route-html.')
  }
  const match = fs
    .readdirSync(assetsDir)
    .find((file) => file.startsWith('raymond-perez-') && file.endsWith('.jpg'))
  if (!match) {
    throw new Error('Could not find raymond-perez-*.jpg in dist/assets')
  }
  return `${baseUrl}/assets/${match}`
}

const escapeHtmlText = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// React createRoot replaces #root on load; this paragraph is only for the first HTML response.
const injectRootParagraph = (html: string, paragraph: string): string => {
  const escaped = escapeHtmlText(paragraph)
  return html.replace('<div id="root"></div>', `<div id="root"><p>${escaped}</p></div>`)
}

const replaceMetaBlock = (html: string, metaTags: string): string => {
  const start = html.indexOf(META_START)
  const end = html.indexOf(META_END)
  if (start === -1 || end === -1 || end < start) {
    throw new Error('DEFAULT_META markers missing from index.html template')
  }
  const before = html.slice(0, start + META_START.length)
  const after = html.slice(end)
  return `${before}\n${metaTags}\n    <!-- META_PLACEHOLDER -->\n    ${after}`
}

export function generateRouteHtml(): void {
  const indexPath = path.join(distDir, 'index.html')
  if (!fs.existsSync(indexPath)) {
    throw new Error('dist/index.html is missing. Run vite build first.')
  }

  // Reuse the built index shell so every route shares the same entry script and hashed asset URLs.
  const shell = fs.readFileSync(indexPath, 'utf8')
  const imageUrl = resolveProfileImageUrl()
  const routes = buildRouteHtmlMetaList()
  assertExtensionlessRoutesMatchMetaPaths(routes.map((route) => route.path))

  for (const route of routes) {
    const pageUrl = route.path === '/' ? baseUrl : `${baseUrl}${route.path}`
    const metaTags = buildMetaTags({
      title: route.title,
      description: route.description,
      keywords: DEFAULT_SEO_KEYWORDS,
      image: imageUrl,
      url: pageUrl,
      type: route.type,
      siteName: SOCIAL_CONFIG.siteName,
      twitterCreator: SOCIAL_CONFIG.twitterCreator,
    })

    let html = replaceMetaBlock(shell, metaTags)
    html = injectRootParagraph(html, route.leadParagraph)

    if (route.path === '/') {
      fs.writeFileSync(indexPath, html, 'utf8')
      continue
    }

    // Extensionless object keys match canonical URLs on S3 static website hosting.
    const key = route.path.replace(/^\//, '')
    const outPath = path.join(distDir, key)
    const parent = path.dirname(outPath)
    if (!fs.existsSync(parent)) {
      fs.mkdirSync(parent, { recursive: true })
    }
    fs.writeFileSync(outPath, html, 'utf8')
  }

  console.log(`✅ Route HTML generated for ${routes.length} paths in ${distDir}`)
}

generateRouteHtml()
