import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { MemoryRouter, Routes, Route, Link } from 'react-router-dom'
import ScrollAndFocusReset from './ScrollAndFocusReset'

describe('ScrollAndFocusReset', () => {
  const scrollToMock = vi.fn()
  const focusMock = vi.fn()
  let originalScrollTo: (x: number, y: number) => void

  beforeEach(() => {
    vi.clearAllMocks()
    originalScrollTo = window.scrollTo
    Object.defineProperty(window, 'scrollTo', { value: scrollToMock, writable: true })
    vi.spyOn(HTMLElement.prototype, 'focus').mockImplementation(focusMock)
  })

  afterEach(() => {
    Object.defineProperty(window, 'scrollTo', { value: originalScrollTo, writable: true })
    vi.restoreAllMocks()
  })

  it('does not scroll or focus on first mount', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <ScrollAndFocusReset />
        <Routes>
          <Route path='/' element={<div id='main-content'>Home</div>} />
        </Routes>
      </MemoryRouter>,
    )

    expect(scrollToMock).not.toHaveBeenCalled()
    expect(focusMock).not.toHaveBeenCalled()
  })

  it('scrolls to top and focuses main-content on pathname change', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter initialEntries={['/']}>
        <ScrollAndFocusReset />
        <Routes>
          <Route path='/' element={<Link to='/other'>Go to other</Link>} />
          <Route path='/other' element={<div id='main-content'>Other page</div>} />
        </Routes>
      </MemoryRouter>,
    )

    await user.click(screen.getByText('Go to other'))

    await waitFor(() => {
      expect(scrollToMock).toHaveBeenCalledWith(0, 0)
    })
    await waitFor(() => {
      expect(focusMock).toHaveBeenCalled()
    })
  })
})
