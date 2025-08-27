import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useScrollToTop } from './useScrollToTop'

describe('useScrollToTop', () => {
  let mockAddEventListener: ReturnType<typeof vi.fn>
  let mockRemoveEventListener: ReturnType<typeof vi.fn>
  let mockScrollTo: ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockAddEventListener = vi.fn()
    mockRemoveEventListener = vi.fn()
    mockScrollTo = vi.fn()

    Object.defineProperty(window, 'addEventListener', {
      value: mockAddEventListener,
      writable: true,
    })

    Object.defineProperty(window, 'removeEventListener', {
      value: mockRemoveEventListener,
      writable: true,
    })

    Object.defineProperty(window, 'scrollTo', {
      value: mockScrollTo,
      writable: true,
    })

    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('initializes with showBackToTop as false', () => {
    const { result } = renderHook(() => useScrollToTop())

    expect(result.current.showBackToTop).toBe(false)
    expect(typeof result.current.scrollToTop).toBe('function')
  })

  it('adds scroll event listener on mount', () => {
    renderHook(() => useScrollToTop())

    expect(mockAddEventListener).toHaveBeenCalledWith('scroll', expect.any(Function))
  })

  it('removes scroll event listener on unmount', () => {
    const { unmount } = renderHook(() => useScrollToTop())

    unmount()

    expect(mockRemoveEventListener).toHaveBeenCalledWith('scroll', expect.any(Function))
  })

  it('sets showBackToTop to true when scrolled past 300px', () => {
    const { result } = renderHook(() => useScrollToTop())

    // Simulate scroll event
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 400 })
      const scrollHandler = mockAddEventListener.mock.calls[0][1]
      scrollHandler()
    })

    expect(result.current.showBackToTop).toBe(true)
  })

  it('sets showBackToTop to false when scrolled below 300px', () => {
    const { result } = renderHook(() => useScrollToTop())

    // First scroll past threshold
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 400 })
      const scrollHandler = mockAddEventListener.mock.calls[0][1]
      scrollHandler()
    })

    expect(result.current.showBackToTop).toBe(true)

    // Then scroll back below threshold
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 200 })
      const scrollHandler = mockAddEventListener.mock.calls[0][1]
      scrollHandler()
    })

    expect(result.current.showBackToTop).toBe(false)
  })

  it('calls window.scrollTo with correct parameters when scrollToTop is called', () => {
    const { result } = renderHook(() => useScrollToTop())

    act(() => {
      result.current.scrollToTop()
    })

    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    })
  })

  it('maintains scroll handler reference between renders', () => {
    const { rerender } = renderHook(() => useScrollToTop())

    rerender()

    // Should not add another listener
    expect(mockAddEventListener).toHaveBeenCalledTimes(1)
  })
})
