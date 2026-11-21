import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import ReadingProgress from './ReadingProgress'
import { AllTheProviders } from '../test-utils/TestProviders'

const setPage = ({ scrollY, scrollHeight }: { scrollY: number; scrollHeight: number }) => {
  Object.defineProperty(window, 'scrollY', { value: scrollY, configurable: true })
  Object.defineProperty(document.documentElement, 'scrollHeight', {
    value: scrollHeight,
    configurable: true,
  })
}

const renderProgress = () =>
  render(
    <AllTheProviders>
      <ReadingProgress />
    </AllTheProviders>,
  )

const bar = () => screen.getByTestId('reading-progress')

beforeEach(() => {
  // Runs each frame callback at once so a scroll updates the bar within the test.
  vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
    callback(0)
    return 1
  })
  Object.defineProperty(window, 'innerHeight', { value: 1000, configurable: true })
})

afterEach(() => {
  vi.restoreAllMocks()
  setPage({ scrollY: 0, scrollHeight: 0 })
})

describe('ReadingProgress', () => {
  it('starts empty at the top of the article', () => {
    setPage({ scrollY: 0, scrollHeight: 3000 })
    renderProgress()

    expect(bar().style.transform).toBe('scaleX(0)')
  })

  it('reflects a position the page already had when it mounted', () => {
    setPage({ scrollY: 2000, scrollHeight: 3000 })
    renderProgress()

    expect(bar().style.transform).toBe('scaleX(1)')
  })

  it('fills as the reader scrolls', () => {
    setPage({ scrollY: 0, scrollHeight: 3000 })
    renderProgress()

    setPage({ scrollY: 1000, scrollHeight: 3000 })
    fireEvent.scroll(window)

    expect(bar().style.transform).toBe('scaleX(0.5)')
  })

  it('recalculates when the window is resized', () => {
    setPage({ scrollY: 1000, scrollHeight: 3000 })
    renderProgress()

    Object.defineProperty(window, 'innerHeight', { value: 2000, configurable: true })
    fireEvent(window, new Event('resize'))

    expect(bar().style.transform).toBe('scaleX(1)')
  })

  it('is hidden from screen readers', () => {
    renderProgress()

    expect(bar()).toHaveAttribute('aria-hidden', 'true')
  })

  it('stops listening once the article is gone', () => {
    const removeListener = vi.spyOn(window, 'removeEventListener')
    const { unmount } = renderProgress()

    unmount()

    expect(removeListener).toHaveBeenCalledWith('scroll', expect.any(Function))
    expect(removeListener).toHaveBeenCalledWith('resize', expect.any(Function))
  })
})
