import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import Home from './Home'
import { PROFILE } from '../constants/profile'
import { HOME_DOCUMENT_TITLE, HOME_META_DESCRIPTION } from '../constants/seoCopy'

interface HelmetScript {
  type: string
  innerHTML: string
}

// Renders JSON-LD inline so a test can read it on the first render, the way crawlers do once Helmet flushes.
vi.mock('react-helmet-async', () => ({
  Helmet: ({ script, children }: { script?: HelmetScript[]; children?: React.ReactNode }) => (
    <div>
      {script?.map((entry, index) => (
        <script key={index} type={entry.type}>
          {entry.innerHTML}
        </script>
      ))}
      {children}
    </div>
  ),
  HelmetProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

const renderHome = () =>
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  )

const jsonLdTypes = (): string[] =>
  Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(
    (script) => JSON.parse(script.textContent ?? '{}')['@type'],
  )

describe('Home', () => {
  it('shows Experience, then Projects', () => {
    renderHome()

    const sectionHeadings = screen
      .getAllByRole('heading', { level: 2 })
      .map((heading) => heading.textContent)
    expect(sectionHeadings).toEqual(['Experience', 'Projects'])
  })

  it('leaves the name and introduction to the route, so the page has no heading of its own', () => {
    renderHome()

    expect(screen.queryByRole('heading', { level: 1 })).not.toBeInTheDocument()
    expect(screen.queryByText(PROFILE.tagline)).not.toBeInTheDocument()
  })

  it('no longer shows skills, achievements, or education, which now live on About', () => {
    renderHome()

    for (const name of ['Skills', 'Achievements', 'Education']) {
      expect(screen.queryByRole('heading', { name })).not.toBeInTheDocument()
    }
  })

  it('describes the person and each role as structured data on the first render', () => {
    renderHome()

    const types = jsonLdTypes()
    expect(types).toContain('Person')
    expect(types).toContain('Occupation')
  })

  it('sets the home title and description for sharing', () => {
    renderHome()

    expect(document.title).toBe(HOME_DOCUMENT_TITLE)
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      'content',
      HOME_META_DESCRIPTION,
    )
  })
})
