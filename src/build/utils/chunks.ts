export interface ChunkMatcher {
  matcher: (id: string) => boolean
  name: string
}

/** Matches only the `react` and `react-dom` packages, not `react-router`, `@emotion/react`, etc. */
export const isReactCoreVendor = (id: string): boolean =>
  /[\\/]node_modules[\\/](?:react[\\/]|react-dom[\\/])/.test(id)

/**
 * React, React DOM, MUI core, Emotion, and shared @mui packages must share one chunk.
 * Splitting them produced a react-vendor ↔ mui-core import cycle and TDZ errors in production.
 */
export const isReactMuiVendorChunk = (id: string): boolean =>
  isReactCoreVendor(id) ||
  id.includes('node_modules/@mui/material/') ||
  id.includes('node_modules/@mui/icons-material/') ||
  id.includes('node_modules/@emotion/react/') ||
  id.includes('node_modules/@emotion/styled/') ||
  id.includes('node_modules/@mui/system/') ||
  id.includes('node_modules/@mui/utils/') ||
  id.includes('node_modules/@mui/styled-engine/') ||
  id.includes('node_modules/@mui/base/')

export const chunkMatchers: ChunkMatcher[] = [
  {
    matcher: isReactMuiVendorChunk,
    name: 'react-mui-vendor',
  },
  {
    matcher: (id) =>
      id.includes('node_modules/react-router-dom/') ||
      id.includes('node_modules/react-router/') ||
      id.includes('node_modules/history/'),
    name: 'react-router',
  },
  {
    matcher: (id) => id.includes('node_modules/react-syntax-highlighter/'),
    name: 'syntax-highlighter',
  },
  {
    matcher: (id) => id.includes('node_modules/marked/'),
    name: 'marked',
  },
  {
    matcher: (id) =>
      id.includes('node_modules/react-helmet-async/') ||
      id.includes('node_modules/react-helmet/'),
    name: 'ui-utils',
  },
]

export const manualChunkForId = (id: string): string | undefined => {
  for (const { matcher, name } of chunkMatchers) {
    if (matcher(id)) {
      return name
    }
  }
}
