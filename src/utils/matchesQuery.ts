// Splits accented letters into letter plus mark, then drops the marks, so "resume" also finds "Résumé".
const fold = (text: string): string => text.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()

/**
 * True when every word of the query appears somewhere in the text, in any order.
 * Word order is ignored so "cursor why" still finds "Why I Choose Cursor".
 */
export const matchesQuery = (text: string, query: string): boolean => {
  const haystack = fold(text)
  return fold(query)
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word))
}
