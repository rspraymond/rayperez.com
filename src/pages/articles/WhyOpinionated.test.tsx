import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter } from 'react-router-dom'
import { BookmarkProvider } from '../../contexts/BookmarkContext'
import WhyOpinionated from './WhyOpinionated'
import { OPINIONATED_DEFINITION_PARAGRAPH } from '../../constants/seoCopy'

vi.mock('../../components/TableOfContents', () => ({
  default: () => null,
}))

vi.mock('../../components/AuthorBio', () => ({
  default: () => null,
}))

describe('WhyOpinionated page', () => {
  it('keeps the heading, document title, and definition paragraph', async () => {
    render(
      <BookmarkProvider>
        <HelmetProvider>
          <MemoryRouter initialEntries={['/why-opinionated']}>
            <WhyOpinionated />
          </MemoryRouter>
        </HelmetProvider>
      </BookmarkProvider>,
    )

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Why I Prefer Opinionated Frameworks',
    )
    await waitFor(() => {
      expect(document.title).toBe(
        'Why I Prefer Opinionated Frameworks - Raymond Perez - Software Engineer',
      )
    })
    expect(screen.getByText(OPINIONATED_DEFINITION_PARAGRAPH)).toBeInTheDocument()
  })
})
