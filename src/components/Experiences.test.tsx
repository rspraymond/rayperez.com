import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { HelmetProvider } from 'react-helmet-async'
import Experiences from './Experiences'

const fixture = [
  { title: 'T1', company: 'C1', duration: 'D1', bullets: ['B1'] },
  { title: 'T2', company: 'C2', duration: 'D2', bullets: ['B2'] },
]

describe('Experiences', () => {
  afterEach(() => {
    document.head.innerHTML = ''
  })

  const renderWithHelmet = (ui: React.ReactElement) => render(<HelmetProvider>{ui}</HelmetProvider>)

  it('renders the Career heading', () => {
    renderWithHelmet(<Experiences experiences={fixture} />)

    expect(screen.getByText('Career')).toBeInTheDocument()
  })

  it('renders one card per experience with company and duration', () => {
    renderWithHelmet(<Experiences experiences={fixture} />)

    expect(screen.getByText('C1 - D1')).toBeInTheDocument()
    expect(screen.getByText('C2 - D2')).toBeInTheDocument()
    const headings = screen.getAllByRole('heading', { level: 3 })
    expect(headings).toHaveLength(2)
  })

  it('renders bullets from props', () => {
    renderWithHelmet(<Experiences experiences={fixture} />)

    expect(screen.getByText('B1')).toBeInTheDocument()
    expect(screen.getByText('B2')).toBeInTheDocument()
  })

  it('handles empty experiences gracefully', () => {
    renderWithHelmet(<Experiences experiences={[]} />)

    expect(screen.getByText('No experiences to display.')).toBeInTheDocument()
  })

  it('renders one ld+json Occupation script per experience', async () => {
    renderWithHelmet(<Experiences experiences={fixture} />)

    await waitFor(() => {
      const ldJsonScripts = document.querySelectorAll('script[type="application/ld+json"]')
      expect(ldJsonScripts.length).toBe(2)
      expect(ldJsonScripts[0].textContent).toContain('Occupation')
      expect(ldJsonScripts[0].textContent).toContain('schema.org')
    })
  })
})
