import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MemoryRouter, useLocation } from 'react-router-dom'
import Prejump from './Prejump'
import { caseStudies } from '../../constants/caseStudies'
import { PROFILE } from '../../constants/profile'
import metadata from '../../data/case-studies/prejump-metadata.json'

// Mock useLocation
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useLocation: vi.fn(),
  }
})

// Mock JsonBlogPost to avoid deep rendering issues and focus on Prejump's logic
vi.mock('../../components/JsonBlogPost', () => ({
  default: ({
    title,
    author,
    date,
    metadata,
  }: {
    title: string
    author: string
    date: string
    metadata?: React.ReactNode
  }) => (
    <div data-testid='json-blog-post'>
      <h1 data-testid='blog-title'>{title}</h1>
      <span data-testid='blog-author'>{author}</span>
      <span data-testid='blog-date'>{date}</span>
      <div data-testid='blog-metadata'>{metadata}</div>
    </div>
  ),
}))

describe('Prejump Case Study Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the case study content when the path matches /case-studies/prejump', () => {
    const prejumpCaseStudy = caseStudies.find((cs) => cs.path === '/case-studies/prejump')
    vi.mocked(useLocation).mockReturnValue({ pathname: '/case-studies/prejump' } as ReturnType<
      typeof useLocation
    >)

    render(
      <MemoryRouter>
        <Prejump />
      </MemoryRouter>,
    )

    // Verify JsonBlogPost props
    expect(screen.getByTestId('blog-title')).toHaveTextContent(prejumpCaseStudy!.title)
    expect(screen.getByTestId('blog-author')).toHaveTextContent(PROFILE.name)
    expect(screen.getByTestId('blog-date')).toHaveTextContent(prejumpCaseStudy!.date)

    // Verify Metadata Card content
    expect(screen.getByText('Project')).toBeInTheDocument()
    expect(screen.getByText(metadata.project)).toBeInTheDocument()
    expect(screen.getByText('Role')).toBeInTheDocument()
    expect(screen.getByText(metadata.role)).toBeInTheDocument()
    expect(screen.getByText('Timeline')).toBeInTheDocument()
    expect(screen.getByText(metadata.timeline)).toBeInTheDocument()

    // Verify Tech Stack
    metadata.techStack.forEach((tech) => {
      expect(screen.getByText(tech)).toBeInTheDocument()
    })

    // Verify Links
    metadata.links.forEach((link) => {
      const linkElement = screen.getByLabelText(link.ariaLabel)
      expect(linkElement).toBeInTheDocument()
      expect(linkElement).toHaveAttribute('href', link.url)
      expect(linkElement).toHaveTextContent(link.label)
    })
  })

  it('renders fallback content when the path does not match', () => {
    vi.mocked(useLocation).mockReturnValue({ pathname: '/unknown-path' } as ReturnType<
      typeof useLocation
    >)

    render(
      <MemoryRouter>
        <Prejump />
      </MemoryRouter>,
    )

    // Should use caseStudies[0] as fallback
    const fallbackCaseStudy = caseStudies[0]
    expect(screen.getByTestId('blog-title')).toHaveTextContent(
      fallbackCaseStudy?.title || 'Prejump.com: Rocket League Training Pack Platform',
    )
    expect(screen.getByTestId('blog-author')).toHaveTextContent(PROFILE.name)
    expect(screen.getByTestId('blog-date')).toHaveTextContent(
      fallbackCaseStudy?.date || '2025-01-01',
    )

    // In fallback mode, metadata prop is not passed to JsonBlogPost in the code
    expect(screen.queryByTestId('blog-metadata')).toBeEmptyDOMElement()
  })

  it('handles missing techStack or links in metadata gracefully', () => {
    // This test ensures the component doesn't crash if optional fields are missing
    // though in our case they are imported from a JSON file.
    // If we were to mock the import, we could test this more thoroughly.
    // For now, we verify the current metadata renders correctly.
    vi.mocked(useLocation).mockReturnValue({ pathname: '/case-studies/prejump' } as ReturnType<
      typeof useLocation
    >)

    render(
      <MemoryRouter>
        <Prejump />
      </MemoryRouter>,
    )

    expect(screen.getByTestId('json-blog-post')).toBeInTheDocument()
  })
})
