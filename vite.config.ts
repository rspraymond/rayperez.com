import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
