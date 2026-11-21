/** 0 at the top of the page, 1 at the bottom, and 0 when the page is too short to scroll. */
export const scrollProgress = (
  scrollTop: number,
  scrollHeight: number,
  viewportHeight: number,
): number => {
  const scrollable = scrollHeight - viewportHeight
  if (scrollable <= 0) return 0
  return Math.min(Math.max(scrollTop / scrollable, 0), 1)
}
