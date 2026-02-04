import react from '@vitejs/plugin-react'
import { execSync } from 'child_process'
import { buildMetaTags } from './src/build/utils/meta'
import type { MetaTagValues } from './src/build/utils/meta'
import { manualChunkForId } from './src/build/utils/chunks'
import { DEFAULT_META_TAGS } from './src/build/constants/meta'
import type { UserConfig } from 'vite'

// https://vitejs.dev/config/
const defineConfig = (config: UserConfig) => config

export default defineConfig({
  plugins: [react()],
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    onPageRendered(_path, html) {
      const metaScriptRegex = /<script[^>]*data-ssg-meta[^>]*>([\s\S]*?)<\/script>/
      const defaultMetaStart = '<!-- DEFAULT_META_START -->'
      const defaultMetaEnd = '<!-- DEFAULT_META_END -->'
      const match = html.match(metaScriptRegex)
      let metaTags = DEFAULT_META_TAGS
      let updatedHtml = html

      if (match && match[1]) {
        try {
          const values = JSON.parse(match[1]) as MetaTagValues
          metaTags = buildMetaTags(values)
        } catch (error) {
          // ignore invalid JSON
        }
        updatedHtml = updatedHtml.replace(match[0], '')
      }

      const blockStart = updatedHtml.indexOf(defaultMetaStart)
      const blockEnd = updatedHtml.indexOf(defaultMetaEnd, blockStart + defaultMetaStart.length)

      if (blockStart !== -1 && blockEnd !== -1 && blockEnd > blockStart) {
        const beforeBlock = updatedHtml.slice(0, blockStart)
        const afterBlock = updatedHtml.slice(blockEnd + defaultMetaEnd.length)

        return `${beforeBlock}${metaTags}${afterBlock}`
      }

      if (updatedHtml.includes('<!-- META_PLACEHOLDER -->')) {
        return updatedHtml.replace('<!-- META_PLACEHOLDER -->', metaTags)
      }

      return updatedHtml
    },
    onFinished() {
      // Run post-build generators
      execSync('npx tsx scripts/generate-rss-feed.ts', { stdio: 'inherit' })
      execSync('npx tsx scripts/generate-sitemap.ts', { stdio: 'inherit' })
      execSync('npx tsx scripts/generate-resume-manifest.ts', { stdio: 'inherit' })
    },
  },
  server: {
    warmup: {
      // Preload the entry points
      clientFiles: ['./src/main.tsx'],
    },
  },
  ssr: {
    noExternal: [
      '@mui/material',
      '@mui/icons-material',
      '@emotion/react',
      '@emotion/styled',
      '@mui/utils',
      '@mui/system',
      '@mui/base',
      '@mui/styled-engine',
      'react-helmet-async',
      'react-router-dom',
      'react-dom',
      'vite-react-ssg',
      'react-syntax-highlighter',
    ],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (process.env.VITE_SSG) {
            return undefined
          }

          if (!id.includes('node_modules')) {
            return undefined
          }

          return manualChunkForId(id)
        },
      },
    },
    // Enable minification and tree-shaking
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Optimize chunk sizes
    chunkSizeWarningLimit: 500,
  },
})
