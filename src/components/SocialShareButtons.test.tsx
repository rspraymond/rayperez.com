import { render, screen, fireEvent } from '@testing-library/react'
import SocialShareButtons from './SocialShareButtons'
import { describe, it, beforeAll, afterAll, beforeEach, vi, expect } from 'vitest'

describe('SocialShareButtons', () => {
  const mockOpen = vi.fn()
  let originalHref: string
  beforeAll(() => {
    originalHref = window.location.href
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { href: 'https://example.com/post' },
    })
    window.open = mockOpen
  })
  afterAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { href: originalHref },
    })
    window.open = undefined
  })
  beforeEach(() => {
    mockOpen.mockClear()
  })

  it('renders all three share buttons with correct aria-labels', () => {
    render(<SocialShareButtons title='Test Post' />)
    expect(screen.getByLabelText('Share on Twitter')).toBeInTheDocument()
    expect(screen.getByLabelText('Share on LinkedIn')).toBeInTheDocument()
    expect(screen.getByLabelText('Share on Facebook')).toBeInTheDocument()
  })

  it('clicking a button opens the correct share URL', () => {
    render(<SocialShareButtons title='Test Post' />)
    fireEvent.click(screen.getByLabelText('Share on Twitter'))
    expect(mockOpen).toHaveBeenCalledWith(
      expect.stringContaining('https://twitter.com/intent/tweet'),
      '_blank',
      'noopener,noreferrer',
    )
  })

  it('share URLs include the correct title and URL', () => {
    render(<SocialShareButtons title='Test Post' />)
    fireEvent.click(screen.getByLabelText('Share on Twitter'))
    const url = mockOpen.mock.calls[0][0]
    expect(url).toContain(encodeURIComponent('Test Post'))
    expect(url).toContain(encodeURIComponent('https://example.com/post'))
  })
})
