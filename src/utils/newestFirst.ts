interface Dated {
  date: string
  path: string
}

// Several posts share a date, so the path breaks ties and keeps the order stable between builds.
export const newestFirst = (a: Dated, b: Dated): number =>
  b.date.localeCompare(a.date) || a.path.localeCompare(b.path)
