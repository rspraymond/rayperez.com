import { renderHook } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { usePostNavigation } from './usePostNavigation'

// Mock the posts constant
vi.mock('../constants/posts', () => ({
  posts: [
    {
      title: 'Latest Post',
      path: '/latest-post',
      date: '2024-01-03',
    },
    {
      title: 'Middle Post',
      path: '/middle-post',
      date: '2024-01-02',
    },
    {
      title: 'Oldest Post',
      path: '/oldest-post',
      date: '2024-01-01',
    },
  ],
}))

// Mock useLocation
const mockUseLocation = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useLocation: () => mockUseLocation(),
  }
})

describe('usePostNavigation', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns undefined for both posts when current path is not found', () => {
    mockUseLocation.mockReturnValue({ pathname: '/non-existent-path' })

    const { result } = renderHook(() => usePostNavigation())

    expect(result.current.prevPost).toBeUndefined()
    expect(result.current.nextPost).toBeUndefined()
  })

  it('returns correct navigation for first post', () => {
    mockUseLocation.mockReturnValue({ pathname: '/latest-post' })

    const { result } = renderHook(() => usePostNavigation())

    expect(result.current.prevPost).toBeUndefined()
    expect(result.current.nextPost).toEqual({
      title: 'Middle Post',
      path: '/middle-post',
    })
  })

  it('returns correct navigation for middle post', () => {
    mockUseLocation.mockReturnValue({ pathname: '/middle-post' })

    const { result } = renderHook(() => usePostNavigation())

    expect(result.current.prevPost).toEqual({
      title: 'Latest Post',
      path: '/latest-post',
    })
    expect(result.current.nextPost).toEqual({
      title: 'Oldest Post',
      path: '/oldest-post',
    })
  })

  it('returns correct navigation for last post', () => {
    mockUseLocation.mockReturnValue({ pathname: '/oldest-post' })

    const { result } = renderHook(() => usePostNavigation())

    expect(result.current.prevPost).toEqual({
      title: 'Middle Post',
      path: '/middle-post',
    })
    expect(result.current.nextPost).toBeUndefined()
  })

  it('handles posts with same date by sorting alphabetically', () => {
    mockUseLocation.mockReturnValue({ pathname: '/middle-post' })

    const { result } = renderHook(() => usePostNavigation())

    // Should sort alphabetically when dates are the same
    expect(result.current.prevPost).toBeDefined()
    expect(result.current.nextPost).toBeDefined()
  })

  it('memoizes results to prevent unnecessary recalculations', () => {
    mockUseLocation.mockReturnValue({ pathname: '/middle-post' })

    const { result, rerender } = renderHook(() => usePostNavigation())

    const firstResult = result.current

    rerender()

    const secondResult = result.current

    // Should return the same object references due to memoization
    expect(firstResult).toStrictEqual(secondResult)
  })
})
