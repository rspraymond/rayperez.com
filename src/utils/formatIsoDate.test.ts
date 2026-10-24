import { describe, it, expect } from 'vitest'
import { formatIsoDate } from './formatIsoDate'

describe('formatIsoDate', () => {
  it('formats a calendar date without shifting it across time zones', () => {
    expect(formatIsoDate('2024-07-04')).toBe('Jul 4, 2024')
    expect(formatIsoDate('2026-01-01')).toBe('Jan 1, 2026')
  })
})
