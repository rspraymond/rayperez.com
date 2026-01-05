import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { execSync } from 'child_process'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'post-build-generate-rss',
      closeBundle() {
        execSync('npx tsx scripts/generate-rss-feed.ts', { stdio: 'inherit' })
      },
    },
    {
      name: 'post-build-generate-sitemap',
      closeBundle() {
        execSync('npx tsx scripts/generate-sitemap.ts', { stdio: 'inherit' })
      },
    },
    {
      name: 'post-build-generate-resume-manifest',
      closeBundle() {
        execSync('npx tsx scripts/generate-resume-manifest.ts', { stdio: 'inherit' })
      },
    },
  ],
  server: {
    warmup: {
      // Preload the entry points
      clientFiles: ['./src/main.tsx'],
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Critical - must load initially
          'react-vendor': ['react', 'react-dom'],

          // Can be deferred
          'react-router': ['react-router-dom', 'history'],
          'mui-core': [
            '@mui/material',
            '@mui/material/styles',
            '@emotion/react',
            '@emotion/styled',
          ],

          // Lazy load - only when needed
          'mui-icons': ['@mui/icons-material'],

          // On-demand
          'syntax-highlighter': ['react-syntax-highlighter'],
          marked: ['marked'],
          data: ['react-query', 'react-schemaorg', 'schema-dts'],
          'ui-utils': ['react-helmet'],
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
