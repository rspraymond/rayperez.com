import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { posts } from '../src/constants/posts.js'
import { PROFILE } from '../src/constants/profile.js'
import { SOCIAL_CONFIG } from '../src/constants/social.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const baseUrl = 'https://www.rayperez.com'

function toRfc822Date(isoDate: string): string {
  const date = new Date(isoDate)
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  const dayName = days[date.getUTCDay()]
  const day = date.getUTCDate().toString().padStart(2, '0')
  const month = months[date.getUTCMonth()]
  const year = date.getUTCFullYear()
  const hours = date.getUTCHours().toString().padStart(2, '0')
  const minutes = date.getUTCMinutes().toString().padStart(2, '0')
  const seconds = date.getUTCSeconds().toString().padStart(2, '0')

  return `${dayName}, ${day} ${month} ${year} ${hours}:${minutes}:${seconds} GMT`
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function generateRssFeed(): void {
  const sortedPosts = [...posts].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  const lastBuildDate = toRfc822Date(new Date().toISOString())

  const channelTitle = escapeXml(SOCIAL_CONFIG.siteName)
  const channelDescription = escapeXml(SOCIAL_CONFIG.defaultDescription)
  const channelLink = baseUrl

  const items = sortedPosts
    .map((post) => {
      const title = escapeXml(post.title)
      const link = `${baseUrl}${post.path}`
      const pubDate = toRfc822Date(post.date)
      const guid = link
      const description = escapeXml(`${post.title} by ${PROFILE.name}`)

      return `    <item>
      <title>${title}</title>
      <link>${link}</link>
      <pubDate>${pubDate}</pubDate>
      <guid>${guid}</guid>
      <description>${description}</description>
    </item>`
    })
    .join('\n')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${channelTitle}</title>
    <description>${channelDescription}</description>
    <link>${channelLink}</link>
    <language>en-US</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <generator>rayperez-site</generator>
${items}
  </channel>
</rss>`

  const outputPath = path.resolve(__dirname, '../dist/feed.xml')
  fs.writeFileSync(outputPath, rss, 'utf8')
  console.log(`✅ RSS feed generated with ${sortedPosts.length} posts at ${outputPath}`)
}

generateRssFeed()
