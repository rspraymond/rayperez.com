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
