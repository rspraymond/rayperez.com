import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { posts } from '../src/constants/posts.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const baseUrl = 'https://www.rayperez.com'
const today = new Date().toISOString().split('T')[0]

function generateSitemap(): void {
  // Home route
  const homeUrl = `  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${today}</lastmod>
  </url>`

  // Post routes
  const postUrls = posts
    .map((post) => {
      const url = `${baseUrl}${post.path}`
      // Use the date from post (already in YYYY-MM-DD format)
      const lastmod = post.date
      return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`
    })
    .join('\n')

  const urls = [homeUrl, postUrls].filter(Boolean).join('\n')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`

  const outputPath = path.resolve(__dirname, '../dist/sitemap.xml')
  fs.writeFileSync(outputPath, sitemap, 'utf8')
  const totalUrls = 1 + posts.length // Home + posts
  console.log(`✅ Sitemap generated with ${totalUrls} URLs at ${outputPath}`)
}

generateSitemap()
