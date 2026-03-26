export interface ChunkMatcher {
  matcher: (id: string) => boolean
  name: string
}

/** Matches only the `react` and `react-dom` packages, not `react-router`, `@emotion/react`, etc. */
export const isReactCoreVendor = (id: string): boolean =>
  /[\\/]node_modules[\\/](?:react[\\/]|react-dom[\\/])/.test(id)

export const chunkMatchers: ChunkMatcher[] = [
  {
    matcher: (id) =>
      id.includes('node_modules/@mui/material/') ||
      id.includes('node_modules/@emotion/react/') ||
      id.includes('node_modules/@emotion/styled/'),
    name: 'mui-core',
  },
  {
    matcher: (id) => id.includes('node_modules/@mui/icons-material/'),
    name: 'mui-icons',
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
      id.includes('node_modules/react-query/') ||
      id.includes('node_modules/react-schemaorg/') ||
      id.includes('node_modules/schema-dts/'),
    name: 'data',
  },
  {
    matcher: (id) =>
      id.includes('node_modules/react-helmet-async/') ||
      id.includes('node_modules/react-helmet/'),
    name: 'ui-utils',
  },
  {
    matcher: isReactCoreVendor,
    name: 'react-vendor',
  },
]

export const manualChunkForId = (id: string): string | undefined => {
  for (const { matcher, name } of chunkMatchers) {
    if (matcher(id)) {
      return name
    }
  }
}
