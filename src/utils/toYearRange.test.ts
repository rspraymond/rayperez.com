import { describe, expect, it } from 'vitest'
import { toYearRange } from './toYearRange'

describe('toYearRange', () => {
  it.each([
    ['Aug 2018 - Jan 2021', '2018 to 2021'],
    ['Aug 2026 - Present', '2026 to present'],
    ['Feb 2026 - Jul 2026', '2026'],
    ['Ongoing', 'Ongoing'],
  ])('reads %s as %s', (duration, expected) => {
    expect(toYearRange(duration)).toBe(expected)
  })
})
