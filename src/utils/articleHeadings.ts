export interface ArticleSection {
  id: string
  text: string
}

/** Headings that label page furniture rather than a section, so neither the table of contents nor search lists them. */
export const UNLISTED_HEADINGS: readonly string[] = ['Key Takeaways', 'Frequently Asked Questions']

export const scrollToHeading = (id: string): void => {
  const element = document.getElementById(id)
  if (!element) return
  element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  // Reflect the hash in the URL without triggering the browser's own jump.
  if ('replaceState' in window.history) window.history.replaceState(null, '', `#${id}`)
  else window.location.hash = id
}

/**
 * The sections the table of contents lists for the current article, read from the page.
 * Only headings that already carry an id count, because the table of contents assigns them and
 * this must never invent an id the table of contents would not.
 */
export const readArticleSections = (): ArticleSection[] =>
  Array.from(document.querySelectorAll<HTMLElement>('article h3[id], article h5[id]'))
    .map((heading) => ({ id: heading.id, text: heading.textContent?.trim() ?? '' }))
    .filter(({ text }) => text !== '' && !UNLISTED_HEADINGS.includes(text))
