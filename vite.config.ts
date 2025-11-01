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
          // Split vendor chunks
          'react-vendor': ['react', 'react-dom'],
          'react-router': ['react-router-dom', 'history'],
          'mui-core': ['@mui/material', '@emotion/react', '@emotion/styled'],
          'mui-icons': ['@mui/icons-material'],
          markdown: ['marked', 'react-syntax-highlighter'],
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
    // Enable chunking
    chunkSizeWarningLimit: 600,
  },
})
