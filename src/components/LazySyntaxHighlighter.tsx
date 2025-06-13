import React, { lazy, Suspense } from 'react'
import { Box, CircularProgress } from '@mui/material'

// Create a simple component that wraps the dynamic import
const SyntaxHighlighterWithTheme = lazy(() => import('./SyntaxHighlighterWithTheme'))

interface LazySyntaxHighlighterProps {
  language: string
  children: string
}

const LazySyntaxHighlighter: React.FC<LazySyntaxHighlighterProps> = (props) => {
  return (
    <Suspense
      fallback={
        <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1, my: 2 }}>
          <CircularProgress size={20} color='inherit' />
        </Box>
      }
    >
      <SyntaxHighlighterWithTheme {...props} />
    </Suspense>
  )
}

export default LazySyntaxHighlighter
