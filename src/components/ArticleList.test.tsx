import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import ArticleList, { ArticleComplexList } from './ArticleList'

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
})

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
}

describe('ArticleList', () => {
  it('renders list items correctly', () => {
    const items = ['Item 1', 'Item 2', 'Item 3']
    renderWithTheme(<ArticleList items={items} />)

    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
    expect(screen.getByText('Item 3')).toBeInTheDocument()
  })

  it('renders with list role', () => {
    const items = ['Item 1', 'Item 2']
    renderWithTheme(<ArticleList items={items} />)

    const list = screen.getByRole('list')
    expect(list).toBeInTheDocument()
  })

  it('renders list items with listitem role', () => {
    const items = ['Item 1', 'Item 2']
    renderWithTheme(<ArticleList items={items} />)

    const listItems = screen.getAllByRole('listitem')
    expect(listItems).toHaveLength(2)
  })

  it('renders standard variant by default', () => {
    const items = ['Item 1']
    const { container } = renderWithTheme(<ArticleList items={items} />)

    expect(container.querySelector('[class*="MuiPaper"]')).not.toBeInTheDocument()
  })

  it('renders emphasized variant with Paper wrapper', () => {
    const items = ['Item 1']
    const { container } = renderWithTheme(<ArticleList items={items} variant='emphasized' />)

    expect(container.querySelector('[class*="MuiPaper"]')).toBeInTheDocument()
  })

  it('handles empty items array', () => {
    renderWithTheme(<ArticleList items={[]} />)

    const list = screen.getByRole('list')
    expect(list).toBeInTheDocument()
  })

  it('applies dense prop correctly', () => {
    const items = ['Item 1']
    const { container } = renderWithTheme(<ArticleList items={items} dense />)

    const list = container.querySelector('[class*="MuiList-dense"]')
    expect(list).toBeInTheDocument()
  })
})

describe('ArticleComplexList', () => {
  it('renders complex list items with primary text', () => {
    const items = [{ primary: 'Primary 1' }, { primary: 'Primary 2' }]
    renderWithTheme(<ArticleComplexList items={items} />)

    expect(screen.getByText('Primary 1')).toBeInTheDocument()
    expect(screen.getByText('Primary 2')).toBeInTheDocument()
  })

  it('renders complex list items with primary and secondary text', () => {
    const items = [
      {
        primary: 'Primary Text',
        secondary: 'Secondary Text',
      },
    ]
    renderWithTheme(<ArticleComplexList items={items} />)

    expect(screen.getByText('Primary Text')).toBeInTheDocument()
    expect(screen.getByText('Secondary Text')).toBeInTheDocument()
  })

  it('renders complex list items with links', () => {
    const items = [
      {
        primary: 'Item with Link',
        link: {
          href: 'https://example.com',
          title: 'Visit Example',
          target: '_blank' as const,
        },
      },
    ]
    renderWithTheme(<ArticleComplexList items={items} />)

    const link = screen.getByText('Visit Example')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://example.com')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('renders with list role', () => {
    const items = [{ primary: 'Item 1' }]
    renderWithTheme(<ArticleComplexList items={items} />)

    const list = screen.getByRole('list')
    expect(list).toBeInTheDocument()
  })

  it('renders emphasized variant with Paper wrapper', () => {
    const items = [{ primary: 'Item 1' }]
    const { container } = renderWithTheme(<ArticleComplexList items={items} variant='emphasized' />)

    expect(container.querySelector('[class*="MuiPaper"]')).toBeInTheDocument()
  })

  it('handles empty items array', () => {
    renderWithTheme(<ArticleComplexList items={[]} />)

    const list = screen.getByRole('list')
    expect(list).toBeInTheDocument()
  })
})
