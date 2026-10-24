import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { posts } from '../src/constants/posts.js'
import { caseStudies } from '../src/constants/caseStudies.js'
import { ABOUT_PATH } from '../src/constants/paths.js'
import { SITE_URL } from '../src/constants/siteUrl.js'
import { buildSitemapXml, SitemapEntry } from '../src/build/utils/sitemap.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const today = new Date().toISOString().split('T')[0]

function generateSitemap(): void {
  const entries: SitemapEntry[] = [
    { path: '/', date: today },
    { path: ABOUT_PATH, date: today },
    ...posts,
    ...caseStudies,
  ]

  const outputPath = path.resolve(__dirname, '../dist/sitemap.xml')
  fs.writeFileSync(outputPath, buildSitemapXml(SITE_URL, entries), 'utf8')
  console.log(`✅ Sitemap generated with ${entries.length} URLs at ${outputPath}`)
}

generateSitemap()
