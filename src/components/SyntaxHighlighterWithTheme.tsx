import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialDark, materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useTheme } from '../contexts/useTheme'

interface SyntaxHighlighterWithThemeProps {
  language: string
  children: string
}

const SyntaxHighlighterWithTheme: React.FC<SyntaxHighlighterWithThemeProps> = ({
  language,
  children,
}) => {
  const { computedTheme } = useTheme()
  const syntaxTheme = computedTheme === 'light' ? materialLight : materialDark

  return (
    <SyntaxHighlighter language={language} style={syntaxTheme}>
      {children}
    </SyntaxHighlighter>
  )
}

export default SyntaxHighlighterWithTheme
