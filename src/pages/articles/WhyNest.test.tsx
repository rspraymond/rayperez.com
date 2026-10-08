import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter } from 'react-router-dom'
import { BookmarkProvider } from '../../contexts/BookmarkContext'
import WhyNest from './WhyNest'
import { NESTJS_META_DESCRIPTION } from '../../constants/seoCopy'

vi.mock('../../components/ArticleRenderer', () => ({
  default: () => <div>Article body</div>,
}))

vi.mock('../../components/TableOfContents', () => ({
  default: () => null,
}))

vi.mock('../../components/AuthorBio', () => ({
  default: () => null,
}))

describe('WhyNest page', () => {
  it('keeps the heading, document title, and NestJS meta description', async () => {
    render(
      <BookmarkProvider>
        <HelmetProvider>
          <MemoryRouter initialEntries={['/why-nestjs']}>
            <WhyNest />
          </MemoryRouter>
        </HelmetProvider>
      </BookmarkProvider>,
    )

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Why I Choose NestJS')
    await waitFor(() => {
      expect(document.title).toBe('Why I Choose NestJS - Raymond Perez - Software Engineer')
    })
    await waitFor(() => {
      expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
        'content',
        NESTJS_META_DESCRIPTION,
      )
    })
  })
})
