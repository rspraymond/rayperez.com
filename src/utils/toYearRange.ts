/** "Aug 2018 - Jan 2021" reads as "2018 to 2021", and a role that starts and ends in one year shows that year once. */
export const toYearRange = (duration: string): string => {
  const [start, finish] = duration.match(/\d{4}/g) ?? []
  if (!start) return duration
  const end = /present/i.test(duration) ? 'present' : (finish ?? start)
  return end === start ? start : `${start} to ${end}`
}
