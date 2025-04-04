import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface SyntaxHighlighterWithThemeProps {
  language: string
  children: string
}

const SyntaxHighlighterWithTheme: React.FC<SyntaxHighlighterWithThemeProps> = ({
  language,
  children,
}) => {
  return (
    <SyntaxHighlighter language={language} style={materialDark}>
      {children}
    </SyntaxHighlighter>
  )
}

export default SyntaxHighlighterWithTheme
