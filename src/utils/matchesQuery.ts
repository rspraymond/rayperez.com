// Splits accented letters into letter plus mark, then drops the marks, so "resume" also finds "Résumé".
export const foldText = (text: string): string =>
  text.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()

/** The folded words of a query. A blank query has none, so it matches everything. */
export const queryWords = (query: string): string[] => foldText(query).split(/\s+/).filter(Boolean)

/** True when every word appears somewhere in text that was already folded. */
export const includesAllWords = (foldedText: string, words: readonly string[]): boolean =>
  words.every((word) => foldedText.includes(word))

/**
 * True when every word of the query appears somewhere in the text, in any order.
 * Word order is ignored so "cursor why" still finds "Why I Choose Cursor".
 */
export const matchesQuery = (text: string, query: string): boolean =>
  includesAllWords(foldText(text), queryWords(query))
