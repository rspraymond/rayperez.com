import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import SkipLink from './SkipLink'
import { AllTheProviders } from '../test-utils/TestProviders'

const renderWithMain = () =>
  render(
    <AllTheProviders>
      <SkipLink />
      <nav>
        <a href='/menu'>Menu link</a>
      </nav>
      <main id='main-content' tabIndex={-1}>
        Page
      </main>
    </AllTheProviders>,
  )

describe('SkipLink', () => {
  it('is the first stop when tabbing into the page', async () => {
    renderWithMain()

    await userEvent.setup().tab()

    expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveFocus()
  })

  it('moves focus to the main content without scrolling or changing the URL', () => {
    renderWithMain()
    const main = screen.getByRole('main')
    const focus = vi.spyOn(main, 'focus')
    const urlBefore = window.location.href

    const notPrevented = fireEvent.click(screen.getByRole('link', { name: 'Skip to content' }))

    expect(notPrevented).toBe(false)
    expect(main).toHaveFocus()
    expect(focus).toHaveBeenCalledWith({ preventScroll: true })
    expect(window.location.href).toBe(urlBefore)
  })

  it('still points at the main content when scripts are off', () => {
    renderWithMain()

    expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveAttribute(
      'href',
      '#main-content',
    )
  })
})
