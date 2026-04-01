import react from '@vitejs/plugin-react'
import { execSync } from 'child_process'
import { manualChunkForId } from './src/build/utils/chunks'
import type { Plugin, UserConfig } from 'vite'

function postBuildGenerators(): Plugin {
  return {
    name: 'post-build-generators',
    apply: 'build',
    closeBundle() {
      execSync('npx tsx scripts/generate-rss-feed.ts', { stdio: 'inherit' })
      execSync('npx tsx scripts/generate-sitemap.ts', { stdio: 'inherit' })
      execSync('npx tsx scripts/generate-resume-manifest.ts', { stdio: 'inherit' })
    },
  }
}

// https://vitejs.dev/config/
const defineConfig = (config: UserConfig) => config

export default defineConfig({
  plugins: [react(), postBuildGenerators()],
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
