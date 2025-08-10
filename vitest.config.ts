import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    include: ['**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/**',
        'coverage/**',
        'public/**',
        'scripts/**',
        'vite.config.ts',
        'vitest.config.ts',
        '.commitlintrc.cjs',
        'src/setupTests.ts',
        'src/pages/articles/**',
        '**/*.d.ts',
        'src/main.tsx',
        '.eslintrc.cjs',
      ],
      thresholds: {
        statements: 70,
        branches: 70,
        functions: 70,
        lines: 70,
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
