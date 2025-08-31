const WORDS_PER_MINUTE = 200

export const calculateReadingTime = (text: string): number => {
  const trimmedText = text.trim()
  if (!trimmedText) return 1

  const words = trimmedText.split(/\s+/).length
  const minutes = Math.ceil(words / WORDS_PER_MINUTE)
  return Math.max(minutes, 1)
}

export const formatReadingTime = (minutes: number): string => {
  return `${minutes} min read`
}

export const extractTextFromChildren = (children: unknown): string => {
  let text = ''
  // support both React nodes and strings
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ReactAny: any = (globalThis as unknown as { React?: any }).React ?? undefined
  const isValidElement = ReactAny?.isValidElement
  if (typeof children === 'string') return children
  if (Array.isArray(children)) {
    for (const child of children) text += extractTextFromChildren(child)
    return text
  }
  if (isValidElement && isValidElement(children)) {
    const propsChildren = (children as { props?: { children?: unknown } }).props?.children
    return extractTextFromChildren(propsChildren)
  }
  return text
}
