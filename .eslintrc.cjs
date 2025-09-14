module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

    // TypeScript rules
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'error',

    // General code quality rules
    'no-var': 'error',
    complexity: ['warn', { max: 15 }],
    'max-lines-per-function': ['warn', { max: 300 }],
    'max-statements': ['warn', { max: 25 }],
    'max-params': ['warn', { max: 5 }],
    'max-nested-callbacks': ['warn', { max: 4 }],

    // React component rules - covers both class and functional components
    'max-classes-per-file': ['error', 1],
    'max-lines': ['warn', { max: 800, skipBlankLines: true, skipComments: true }],
  },
  overrides: [
    {
      files: ['**/*.test.ts', '**/*.test.tsx', '**/__tests__/**/*'],
      rules: {
        'max-lines-per-function': ['warn', { max: 200 }],
        'max-classes-per-file': 'off', // Allow multiple classes in test files
        'max-lines': ['warn', { max: 450, skipBlankLines: true, skipComments: true }], // Higher limit for test files
      },
    },
  ],
}
