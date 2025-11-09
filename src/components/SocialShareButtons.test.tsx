import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import SocialShareButtons from './SocialShareButtons'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'

type ClipboardMock = {
  writeText: ReturnType<typeof vi.fn>
}

const mockOpen = vi.fn()
const originalLocation = window.location
const originalWindow = window
const originalWindowOpen = window.open
const originalClipboard = navigator.clipboard

const setLocationHref = (href: string) => {
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: { href } as unknown as Location,
  })
}

const restoreLocation = () => {
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: originalLocation,
  })
}

const setClipboard = (clipboard: ClipboardMock | undefined) => {
  if (clipboard) {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: clipboard as unknown as Clipboard,
    })
  } else {
    delete (navigator as unknown as Record<string, unknown>).clipboard
  }
}

const restoreClipboard = () => {
  if (originalClipboard) {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: originalClipboard,
    })
  } else {
    delete (navigator as unknown as Record<string, unknown>).clipboard
  }
}

beforeAll(() => {
  setLocationHref('https://example.com/post')
  window.open = mockOpen
})

afterAll(() => {
  if (typeof window !== 'undefined') {
    restoreLocation()
    window.open = originalWindowOpen ?? undefined
  }
  restoreClipboard()
})

beforeEach(() => {
  mockOpen.mockClear()
  setLocationHref('https://example.com/post')
  restoreClipboard()
})

afterEach(() => {
  vi.useRealTimers()
})

describe('SocialShareButtons share links', () => {
  it('renders all share buttons with correct aria-labels', () => {
    render(<SocialShareButtons title='Test Post' />)
    expect(screen.getByLabelText('Copy link')).toBeInTheDocument()
    expect(screen.getByLabelText('Share on Twitter')).toBeInTheDocument()
    expect(screen.getByLabelText('Share on LinkedIn')).toBeInTheDocument()
    expect(screen.getByLabelText('Share on Facebook')).toBeInTheDocument()
  })

  it('clicking the Twitter button opens the correct share URL', () => {
    render(<SocialShareButtons title='Test Post' />)
    fireEvent.click(screen.getByLabelText('Share on Twitter'))

    expect(mockOpen).toHaveBeenCalledWith(
      expect.stringContaining('https://twitter.com/intent/tweet'),
      '_blank',
      'noopener,noreferrer',
    )
  })

  it('clicking the LinkedIn button opens the correct share URL', () => {
    render(<SocialShareButtons title='Test Post' />)
    fireEvent.click(screen.getByLabelText('Share on LinkedIn'))

    expect(mockOpen).toHaveBeenCalledWith(
      'https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fexample.com%2Fpost',
      '_blank',
      'noopener,noreferrer',
    )
  })

  it('clicking the Facebook button opens the correct share URL', () => {
    render(<SocialShareButtons title='Test Post' />)
    fireEvent.click(screen.getByLabelText('Share on Facebook'))

    expect(mockOpen).toHaveBeenCalledWith(
      'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fexample.com%2Fpost',
      '_blank',
      'noopener,noreferrer',
    )
  })

  it('encodes special characters in share parameters', () => {
    setLocationHref('https://example.com/blog/react hooks & tips')
    render(<SocialShareButtons title='Hello & Welcome!' />)

    fireEvent.click(screen.getByLabelText('Share on Twitter'))

    const shareUrl = mockOpen.mock.calls[0]?.[0] ?? ''
    expect(shareUrl).toContain('Hello%20%26%20Welcome!')
    expect(shareUrl).toContain('https%3A%2F%2Fexample.com%2Fblog%2Freact%20hooks%20%26%20tips')
  })
})

describe('SocialShareButtons clipboard interactions', () => {
  it('copies the current URL to clipboard when copy link is clicked', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    setClipboard({ writeText })

    render(<SocialShareButtons title='Test Post' />)
    fireEvent.click(screen.getByLabelText('Copy link'))

    expect(writeText).toHaveBeenCalledWith('https://example.com/post')
    expect(await screen.findByText('Link copied')).toBeInTheDocument()
  })

  it('does not attempt to copy when the clipboard API is unavailable', async () => {
    setClipboard(undefined)

    render(<SocialShareButtons title='Test Post' />)
    fireEvent.click(screen.getByLabelText('Copy link'))

    await waitFor(() => {
      expect(screen.queryByText('Link copied')).not.toBeInTheDocument()
    })
  })

  it('does not copy when the current URL is empty', () => {
    setLocationHref('')
    const writeText = vi.fn().mockResolvedValue(undefined)
    setClipboard({ writeText })

    render(<SocialShareButtons title='Empty URL Test' />)
    fireEvent.click(screen.getByLabelText('Copy link'))

    expect(writeText).not.toHaveBeenCalled()
    expect(screen.queryByText('Link copied')).not.toBeInTheDocument()
  })
})

describe('SocialShareButtons snackbar behavior', () => {
  it('closes the snackbar when Escape is pressed', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    setClipboard({ writeText })

    render(<SocialShareButtons title='Snackbar Close' />)
    fireEvent.click(screen.getByLabelText('Copy link'))

    const snackbar = await screen.findByRole('alert')
    fireEvent.keyDown(snackbar, { key: 'Escape', code: 'Escape' })

    await waitFor(() => {
      expect(screen.queryByText('Link copied')).not.toBeInTheDocument()
    })
  })

  it('anchors the snackbar to the bottom center of the viewport', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    setClipboard({ writeText })

    render(<SocialShareButtons title='Anchor Origin' />)
    fireEvent.click(screen.getByLabelText('Copy link'))

    const message = await screen.findByText('Link copied')
    const snackbarRoot = message.closest('.MuiSnackbar-root')

    expect(snackbarRoot?.className ?? '').toContain('MuiSnackbar-anchorOriginBottomCenter')
  })
})

describe('SocialShareButtons tooltip interactions', () => {
  it('reveals tooltip text when hovering over each share button', async () => {
    render(<SocialShareButtons title='Tooltip Test' />)

    const tooltipExpectations = [
      { label: 'Copy link', tooltip: 'Copy link' },
      { label: 'Share on Twitter', tooltip: 'Share on Twitter' },
      { label: 'Share on LinkedIn', tooltip: 'Share on LinkedIn' },
      { label: 'Share on Facebook', tooltip: 'Share on Facebook' },
    ]

    for (const { label, tooltip } of tooltipExpectations) {
      const button = screen.getByLabelText(label)
      fireEvent.mouseOver(button)
      await waitFor(() => {
        expect(screen.getByRole('tooltip', { name: tooltip })).toBeInTheDocument()
      })
      fireEvent.mouseLeave(button)
      await waitFor(() => {
        expect(screen.queryByRole('tooltip', { name: tooltip })).not.toBeInTheDocument()
      })
    }
  })
})

describe('SocialShareButtons environment resilience', () => {
  it('renders without error when window is undefined (SSR fallback)', () => {
    const currentWindow = globalThis.window

    delete (globalThis as unknown as Record<string, unknown>).window

    try {
      expect(() => {
        renderToString(<SocialShareButtons title='SSR Safety' />)
      }).not.toThrow()
    } finally {
      globalThis.window = currentWindow || originalWindow
    }
  })
})
