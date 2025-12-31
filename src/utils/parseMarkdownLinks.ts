export interface TextSegment {
  type: 'text' | 'link'
  content: string
  href?: string
}

export const parseMarkdownLinks = (text: string): TextSegment[] => {
  const segments: TextSegment[] = []
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = linkPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({
        type: 'text',
        content: text.slice(lastIndex, match.index),
      })
    }

    segments.push({
      type: 'link',
      content: match[1],
      href: match[2],
    })

    lastIndex = linkPattern.lastIndex
  }

  if (lastIndex < text.length) {
    segments.push({
      type: 'text',
      content: text.slice(lastIndex),
    })
  }

  if (segments.length === 0) {
    segments.push({
      type: 'text',
      content: text,
    })
  }

  return segments
}
