import { describe, expect, it } from 'vitest'
import { scrollProgress } from './scrollProgress'

describe('scrollProgress', () => {
  it('is 0 at the top and 1 at the bottom', () => {
    expect(scrollProgress(0, 3000, 1000)).toBe(0)
    expect(scrollProgress(2000, 3000, 1000)).toBe(1)
  })

  it('measures against the distance the page can actually scroll', () => {
    expect(scrollProgress(500, 3000, 1000)).toBe(0.25)
  })

  it('stays within 0 and 1 during overscroll bounce', () => {
    expect(scrollProgress(-80, 3000, 1000)).toBe(0)
    expect(scrollProgress(2100, 3000, 1000)).toBe(1)
  })

  it('is 0 when the page is too short to scroll', () => {
    expect(scrollProgress(0, 800, 1000)).toBe(0)
    expect(scrollProgress(0, 1000, 1000)).toBe(0)
  })
})
