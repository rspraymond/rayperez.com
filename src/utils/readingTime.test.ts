import { describe, it, expect } from 'vitest'
import { calculateReadingTime, formatReadingTime } from './readingTime'

describe('readingTime', () => {
  describe('calculateReadingTime', () => {
    it('should calculate reading time for short text', () => {
      const text = 'This is a short text with ten words exactly here.'
      const result = calculateReadingTime(text)
      expect(result).toBe(1) // Should round up to at least 1 minute
    })

    it('should calculate reading time for longer text', () => {
      // Create text with approximately 400 words (should be 2 minutes at 200 wpm)
      const text = 'word '.repeat(400)
      const result = calculateReadingTime(text)
      expect(result).toBe(2)
    })

    it('should handle empty text', () => {
      const result = calculateReadingTime('')
      expect(result).toBe(1) // Should return at least 1 minute
    })

    it('should handle text with extra whitespace', () => {
      const text = '  This   is   text   with   extra   whitespace  '
      const result = calculateReadingTime(text)
      expect(result).toBe(1)
    })
  })

  describe('formatReadingTime', () => {
    it('should format reading time correctly', () => {
      expect(formatReadingTime(1)).toBe('1 min read')
      expect(formatReadingTime(5)).toBe('5 min read')
      expect(formatReadingTime(10)).toBe('10 min read')
    })
  })
})
