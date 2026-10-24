// UTC keeps a calendar date from shifting a day in negative offset time zones.
const ISO_DATE_FORMAT = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
})

export const formatIsoDate = (isoDate: string): string => ISO_DATE_FORMAT.format(new Date(isoDate))
