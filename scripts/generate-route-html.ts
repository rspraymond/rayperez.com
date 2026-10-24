import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { renderRouteHtml } from '../src/build/utils/routeHtml.js'
import { buildRouteHtmlMetaList } from '../src/build/utils/routeDescriptions.js'
import { SITE_URL } from '../src/constants/siteUrl.js'

const scriptPath = fileURLToPath(import.meta.url)
const defaultDistDir = path.resolve(path.dirname(scriptPath), '../dist')

// The unhashed PROFILE.image path is not a real file, so crawlers and og:image need Vite's hashed copy.
const resolveProfileImageUrl = (distDir: string): string => {
  const assetsDir = path.join(distDir, 'assets')
  const match = fs
    .readdirSync(assetsDir)
    .find((file) => file.startsWith('raymond-perez-') && file.endsWith('.jpg'))
  if (!match) {
    throw new Error('Could not find raymond-perez-*.jpg in dist/assets')
  }
  return `${SITE_URL}/assets/${match}`
}

export function generateRouteHtml(distDir: string = defaultDistDir): void {
  const indexPath = path.join(distDir, 'index.html')
  if (!fs.existsSync(indexPath)) {
    throw new Error('dist/index.html is missing. Run vite build first.')
  }

  // Every route starts from the built shell so entry script and hashed asset URLs stay shared.
  const shell = fs.readFileSync(indexPath, 'utf8')
  const imageUrl = resolveProfileImageUrl(distDir)
  const routes = buildRouteHtmlMetaList(imageUrl)

  for (const route of routes) {
    const url = route.path === '/' ? SITE_URL : `${SITE_URL}${route.path}`
    const html = renderRouteHtml(shell, route, { imageUrl, url })
    // Extensionless keys match the canonical URLs served from S3.
    const outPath = route.path === '/' ? indexPath : path.join(distDir, route.path.slice(1))
    fs.mkdirSync(path.dirname(outPath), { recursive: true })
    fs.writeFileSync(outPath, html, 'utf8')
  }

  console.log(`✅ Route HTML generated for ${routes.length} paths in ${distDir}`)
}

// Tests import generateRouteHtml, so only the direct tsx run from the build hook should execute it.
if (process.argv[1] === scriptPath) {
  generateRouteHtml()
}
