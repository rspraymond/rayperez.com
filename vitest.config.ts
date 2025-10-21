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

    // Parallelization settings (validated approach)
    fileParallelism: true, // Explicitly enable file-level parallelism
    maxConcurrency: 5, // Conservative: max 5 test files running concurrently
    pool: 'threads', // Use worker threads for isolation
    poolOptions: {
      threads: {
        singleThread: false, // Ensure parallel execution
        useAtomics: true, // Better thread communication performance
      },
    },

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
