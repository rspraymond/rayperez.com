import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import React from 'react'
import { calculateReadingTime, formatReadingTime, extractTextFromChildren } from './readingTime'

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

  describe('extractTextFromChildren', () => {
    beforeEach(() => {
      // Set up React in global scope
      globalThis.React = React as unknown as typeof globalThis.React
    })

    afterEach(() => {
      // Clean up
      delete (globalThis as unknown as { React?: unknown }).React
    })

    it('should extract text from string children', () => {
      const result = extractTextFromChildren('Simple text')
      expect(result).toBe('Simple text')
    })

    it('should extract text from array of strings', () => {
      const result = extractTextFromChildren(['Text 1', 'Text 2', 'Text 3'])
      expect(result).toBe('Text 1Text 2Text 3')
    })

    it('should extract text from nested arrays', () => {
      const result = extractTextFromChildren(['Text 1', ['Text 2', 'Text 3'], 'Text 4'])
      expect(result).toBe('Text 1Text 2Text 3Text 4')
    })

    it('should extract text from React element children', () => {
      const element = React.createElement('div', { children: 'Element text' })
      const result = extractTextFromChildren(element)
      expect(result).toBe('Element text')
    })

    it('should extract text from nested React elements', () => {
      const innerElement = React.createElement('span', { children: 'Inner text' })
      const outerElement = React.createElement('div', { children: innerElement })
      const result = extractTextFromChildren(outerElement)
      expect(result).toBe('Inner text')
    })

    it('should extract text from mixed array of strings and elements', () => {
      const element = React.createElement('span', { children: 'Element text' })
      const result = extractTextFromChildren(['String text', element, 'More text'])
      expect(result).toBe('String textElement textMore text')
    })

    it('should return empty string for non-string, non-array, non-element input', () => {
      const result = extractTextFromChildren(null)
      expect(result).toBe('')
    })

    it('should handle empty array', () => {
      const result = extractTextFromChildren([])
      expect(result).toBe('')
    })

    it('should handle empty string', () => {
      const result = extractTextFromChildren('')
      expect(result).toBe('')
    })

    it('should handle React element without children', () => {
      const element = React.createElement('div')
      const result = extractTextFromChildren(element)
      expect(result).toBe('')
    })

    it('should handle React element with undefined children', () => {
      const element = React.createElement('div', { children: undefined })
      const result = extractTextFromChildren(element)
      expect(result).toBe('')
    })
  })
})
