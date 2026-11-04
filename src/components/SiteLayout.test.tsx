import { screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import SiteLayout from './SiteLayout'
import { render as renderWithProviders } from '../test-utils'

const renderLayout = () =>
  renderWithProviders(
    <MemoryRouter>
      <Routes>
        <Route path='/' element={<SiteLayout />}>
          <Route index element={<div data-testid='child'>child</div>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  )

describe('SiteLayout', () => {
  it('renders the menu, the page, and the footer in reading order', () => {
    renderLayout()

    const header = screen.getByRole('banner')
    const main = screen.getByRole('main')
    const footer = screen.getByRole('contentinfo')
    expect(header.compareDocumentPosition(main) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(main.compareDocumentPosition(footer) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(main).toContainElement(screen.getByTestId('child'))
  })

  it('has no side column', () => {
    renderLayout()

    expect(screen.queryByRole('complementary')).not.toBeInTheDocument()
    expect(screen.queryByText(/GitHub activity/i)).not.toBeInTheDocument()
  })

  it('renders main content with id main-content and tabIndex -1 for focus target', () => {
    renderLayout()

    const main = screen.getByRole('main')
    expect(main).toHaveAttribute('id', 'main-content')
    expect(main).toHaveAttribute('tabIndex', '-1')
  })
})
