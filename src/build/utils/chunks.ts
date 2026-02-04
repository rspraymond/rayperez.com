export interface ChunkMatcher {
  matcher: (id: string) => boolean
  name: string
}

export const chunkMatchers: ChunkMatcher[] = [
  {
    matcher: (id) => id.includes('react') || id.includes('react-dom'),
    name: 'react-vendor',
  },
  {
    matcher: (id) =>
      id.includes('react-router-dom') ||
      id.includes('history') ||
      id.includes('react-router'),
    name: 'react-router',
  },
  {
    matcher: (id) =>
      id.includes('@mui/material') ||
      id.includes('@emotion/react') ||
      id.includes('@emotion/styled'),
    name: 'mui-core',
  },
  {
    matcher: (id) => id.includes('@mui/icons-material'),
    name: 'mui-icons',
  },
  {
    matcher: (id) => id.includes('react-syntax-highlighter'),
    name: 'syntax-highlighter',
  },
  {
    matcher: (id) => id.includes('marked'),
    name: 'marked',
  },
  {
    matcher: (id) =>
      id.includes('react-query') ||
      id.includes('react-schemaorg') ||
      id.includes('schema-dts'),
    name: 'data',
  },
  {
    matcher: (id) => id.includes('react-helmet'),
    name: 'ui-utils',
  },
]

export const manualChunkForId = (id: string) => {
  for (const { matcher, name } of chunkMatchers) {
    if (matcher(id)) {
      return name
    }
  }
}
