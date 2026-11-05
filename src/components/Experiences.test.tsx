import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { HelmetProvider } from 'react-helmet-async'
import Experiences from './Experiences'

const fixture = [
  {
    title: 'Senior Software Engineer',
    company: 'C1',
    duration: 'Aug 2026 - Present',
    bullets: ['B1'],
  },
  {
    title: 'Senior Software Engineer',
    company: 'C2',
    duration: 'Feb 2021 - Sep 2021',
    bullets: ['B2'],
  },
  { title: 'Web Developer', company: 'C3', duration: 'Jan 2015 - Jun 2015', bullets: ['B3'] },
]

describe('Experiences', () => {
  afterEach(() => {
    document.head.innerHTML = ''
  })

  const renderWithHelmet = (ui: React.ReactElement) => render(<HelmetProvider>{ui}</HelmetProvider>)

  it('is a section named Experience', () => {
    renderWithHelmet(<Experiences experiences={fixture} />)

    expect(screen.getByRole('region', { name: 'Experience' })).toBeInTheDocument()
  })

  it('lists only the senior roles, one line each with company, title, and years', () => {
    renderWithHelmet(<Experiences experiences={fixture} />)

    const companies = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent)
    expect(companies).toEqual(['C1', 'C2'])
    expect(screen.getAllByText('Senior Software Engineer')).toHaveLength(2)
    expect(screen.getByText('2026 to present')).toBeInTheDocument()
    expect(screen.getByText('2021')).toBeInTheDocument()
    expect(screen.queryByText('B1')).not.toBeInTheDocument()
  })

  it('links to the resume for the full history', () => {
    renderWithHelmet(<Experiences experiences={fixture} />)

    const resume = screen.getByRole('link', {
      name: 'Full history in my resume (opens in new window)',
    })
    expect(resume).toHaveAttribute('href', expect.stringContaining('.pdf'))
    expect(resume).toHaveAttribute('target', '_blank')
  })

  it('handles empty experiences gracefully', () => {
    renderWithHelmet(<Experiences experiences={[]} />)

    expect(screen.getByText('No experiences to display.')).toBeInTheDocument()
  })

  it('renders one ld+json Occupation script per role shown', async () => {
    renderWithHelmet(<Experiences experiences={fixture} />)

    await waitFor(() => {
      const ldJsonScripts = document.querySelectorAll('script[type="application/ld+json"]')
      expect(ldJsonScripts.length).toBe(2)
      expect(ldJsonScripts[0].textContent).toContain('Occupation')
    })
  })
})
