import React from 'react'
import { renderHook } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useReadingTime } from './useReadingTime'

// Mock the utility functions
vi.mock('../utils/readingTime', () => ({
  calculateReadingTime: vi.fn(),
  formatReadingTime: vi.fn(),
}))

import { calculateReadingTime, formatReadingTime } from '../utils/readingTime'

describe('useReadingTime', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calculates reading time for string children', () => {
    const mockCalculateReadingTime = vi.mocked(calculateReadingTime)
    const mockFormatReadingTime = vi.mocked(formatReadingTime)

    mockCalculateReadingTime.mockReturnValue(5)
    mockFormatReadingTime.mockReturnValue('5 min read')

    const { result } = renderHook(() => useReadingTime('This is a test string'))

    expect(mockCalculateReadingTime).toHaveBeenCalledWith('This is a test string')
    expect(mockFormatReadingTime).toHaveBeenCalledWith(5)
    expect(result.current).toBe('5 min read')
  })

  it('calculates reading time for React element children', () => {
    const mockCalculateReadingTime = vi.mocked(calculateReadingTime)
    const mockFormatReadingTime = vi.mocked(formatReadingTime)

    mockCalculateReadingTime.mockReturnValue(3)
    mockFormatReadingTime.mockReturnValue('3 min read')

    const reactElement = React.createElement('div', null, 'This is a test div')
    const { result } = renderHook(() => useReadingTime(reactElement))

    expect(mockCalculateReadingTime).toHaveBeenCalledWith('This is a test div')
    expect(mockFormatReadingTime).toHaveBeenCalledWith(3)
    expect(result.current).toBe('3 min read')
  })

  it('calculates reading time for nested React elements', () => {
    const mockCalculateReadingTime = vi.mocked(calculateReadingTime)
    const mockFormatReadingTime = vi.mocked(formatReadingTime)

    mockCalculateReadingTime.mockReturnValue(8)
    mockFormatReadingTime.mockReturnValue('8 min read')

    const nestedElement = React.createElement('div', null, [
      React.createElement('p', { key: '1' }, 'First paragraph'),
      React.createElement('p', { key: '2' }, 'Second paragraph'),
      React.createElement('span', { key: '3' }, 'Some text'),
    ])

    const { result } = renderHook(() => useReadingTime(nestedElement))

    expect(mockCalculateReadingTime).toHaveBeenCalledWith(
      'First paragraphSecond paragraphSome text',
    )
    expect(mockFormatReadingTime).toHaveBeenCalledWith(8)
    expect(result.current).toBe('8 min read')
  })

  it('calculates reading time for mixed children types', () => {
    const mockCalculateReadingTime = vi.mocked(calculateReadingTime)
    const mockFormatReadingTime = vi.mocked(formatReadingTime)

    mockCalculateReadingTime.mockReturnValue(6)
    mockFormatReadingTime.mockReturnValue('6 min read')

    const mixedChildren = [
      'Start text',
      React.createElement('p', { key: '1' }, 'Middle paragraph'),
      'End text',
    ]

    const { result } = renderHook(() => useReadingTime(mixedChildren))

    expect(mockCalculateReadingTime).toHaveBeenCalledWith('Start textMiddle paragraphEnd text')
    expect(mockFormatReadingTime).toHaveBeenCalledWith(6)
    expect(result.current).toBe('6 min read')
  })

  it('handles empty children gracefully', () => {
    const mockCalculateReadingTime = vi.mocked(calculateReadingTime)
    const mockFormatReadingTime = vi.mocked(formatReadingTime)

    mockCalculateReadingTime.mockReturnValue(0)
    mockFormatReadingTime.mockReturnValue('0 min read')

    const { result } = renderHook(() => useReadingTime(''))

    expect(mockCalculateReadingTime).toHaveBeenCalledWith('')
    expect(mockFormatReadingTime).toHaveBeenCalledWith(0)
    expect(result.current).toBe('0 min read')
  })

  it('handles null and undefined children gracefully', () => {
    const mockCalculateReadingTime = vi.mocked(calculateReadingTime)
    const mockFormatReadingTime = vi.mocked(formatReadingTime)

    mockCalculateReadingTime.mockReturnValue(0)
    mockFormatReadingTime.mockReturnValue('0 min read')

    const { result: resultNull } = renderHook(() => useReadingTime(null))
    const { result: resultUndefined } = renderHook(() => useReadingTime(undefined))

    expect(mockCalculateReadingTime).toHaveBeenCalledWith('')
    expect(mockFormatReadingTime).toHaveBeenCalledWith(0)
    expect(resultNull.current).toBe('0 min read')
    expect(resultUndefined.current).toBe('0 min read')
  })

  it('memoizes results to prevent unnecessary recalculations', () => {
    const mockCalculateReadingTime = vi.mocked(calculateReadingTime)
    const mockFormatReadingTime = vi.mocked(formatReadingTime)

    mockCalculateReadingTime.mockReturnValue(4)
    mockFormatReadingTime.mockReturnValue('4 min read')

    const { result, rerender } = renderHook(() => useReadingTime('Test content'))

    const firstResult = result.current

    rerender()

    const secondResult = result.current

    // Should return the same value due to memoization
    expect(firstResult).toBe(secondResult)

    // Should only call the functions once due to memoization
    expect(mockCalculateReadingTime).toHaveBeenCalledTimes(1)
    expect(mockFormatReadingTime).toHaveBeenCalledTimes(1)
  })
})
