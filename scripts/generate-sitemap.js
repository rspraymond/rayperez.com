import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const baseUrl = 'https://www.rayperez.com'
const today = new Date().toISOString().split('T')[0]

function extractRoutesFromApp() {
  const appPath = path.resolve(__dirname, '../src/App.tsx')
  const appContent = fs.readFileSync(appPath, 'utf8')

  // Extract route paths using regex
  const routePattern = /<Route\s+path=['"]([^'"]*)['"]/g
  const routes = []
  let match

  while ((match = routePattern.exec(appContent)) !== null) {
    const routePath = match[1]
    // Skip wildcard routes
    if (routePath !== '*') {
      routes.push(routePath)
    }
  }

  return routes
}

function extractDateFromArticle(routePath) {
  // Map route paths to article filenames
  const routeToFileMap = {
    '/why-mvc-pattern': 'WhyMVC.tsx',
    '/why-nestjs': 'WhyNest.tsx',
    '/why-graphql': 'WhyGraphQL.tsx',
    '/why-nodejs': 'WhyNodeJS.tsx',
    '/why-typescript': 'WhyTypescript.tsx',
    '/why-react': 'WhyReactJS.tsx',
    '/why-laravel': 'WhyLaravel.tsx',
    '/why-inertia': 'WhyInertia.tsx',
    '/why-oop': 'WhyOOP.tsx',
    '/why-web-development': 'WhyWebDev.tsx',
    '/why-opinionated': 'WhyOpinionated.tsx',
  }

  const fileName = routeToFileMap[routePath]
  if (!fileName) {
    return today // Default to today for non-article routes
  }

  try {
    const filePath = path.resolve(__dirname, `../src/pages/articles/${fileName}`)
    const fileContent = fs.readFileSync(filePath, 'utf8')

    // Extract date using regex
    const dateMatch = fileContent.match(/date=['"]([0-9]{4}-[0-9]{2}-[0-9]{2})['"]/)
    return dateMatch ? dateMatch[1] : today
  } catch (error) {
    console.warn(`Could not read date from ${fileName}, using today's date`)
    return today
  }
}

function generateSitemap() {
  const routes = extractRoutesFromApp()

  const urls = routes
    .map((route) => {
      const url = route === '/' ? baseUrl : `${baseUrl}${route}`
      const lastmod = route === '/' ? today : extractDateFromArticle(route)
      return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`
    })
    .join('\n')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`

  const outputPath = path.resolve(__dirname, '../public/sitemap.xml')
  fs.writeFileSync(outputPath, sitemap, 'utf8')
  console.log(`✅ Sitemap generated with ${routes.length} URLs at ${outputPath}`)
}

generateSitemap()
