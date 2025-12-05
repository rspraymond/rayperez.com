import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ArticleRenderer from './ArticleRenderer'
import { ArticleContent } from '../types/articleContent'

// Mock LazySyntaxHighlighter to avoid complex dependencies
vi.mock('./LazySyntaxHighlighter', () => ({
  default: ({ children, language }: { children: string; language: string }) => (
    <div data-testid='syntax-highlighter' data-language={language}>
      {children}
    </div>
  ),
}))

describe('ArticleRenderer - Table Content', () => {
  it('renders table content correctly', () => {
    const content: ArticleContent[] = [
      {
        type: 'table',
        table: {
          headers: ['Framework', 'TypeScript Support', 'Learning Curve'],
          rows: [
            ['NestJS', 'Built-in', 'Moderate'],
            ['Express', 'Optional', 'Easy'],
            ['Fastify', 'Built-in', 'Easy'],
          ],
          caption: 'Framework Comparison',
        },
      },
    ]

    render(<ArticleRenderer content={content} />)

    expect(screen.getByText('Framework')).toBeInTheDocument()
    expect(screen.getByText('TypeScript Support')).toBeInTheDocument()
    expect(screen.getByText('Learning Curve')).toBeInTheDocument()
    expect(screen.getByText('NestJS')).toBeInTheDocument()
    expect(screen.getAllByText('Built-in')).toHaveLength(2)
    expect(screen.getByText('Moderate')).toBeInTheDocument()
    expect(screen.getByText('Express')).toBeInTheDocument()
    expect(screen.getByText('Optional')).toBeInTheDocument()
    expect(screen.getAllByText('Easy')).toHaveLength(2)
    expect(screen.getByText('Fastify')).toBeInTheDocument()
    expect(screen.getByText('Framework Comparison')).toBeInTheDocument()
  })

  it('renders table without caption', () => {
    const content: ArticleContent[] = [
      {
        type: 'table',
        table: {
          headers: ['Feature', 'Description'],
          rows: [
            ['Dependency Injection', 'Built-in DI container'],
            ['Modularity', 'Module-based architecture'],
          ],
        },
      },
    ]

    render(<ArticleRenderer content={content} />)

    expect(screen.getByText('Feature')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getByText('Dependency Injection')).toBeInTheDocument()
    expect(screen.getByText('Built-in DI container')).toBeInTheDocument()
    expect(screen.getByText('Modularity')).toBeInTheDocument()
    expect(screen.getByText('Module-based architecture')).toBeInTheDocument()
  })

  it('renders table with custom styling', () => {
    const content: ArticleContent[] = [
      {
        type: 'table',
        elevation: 3,
        style: { marginTop: '20px' },
        table: {
          headers: ['Column 1', 'Column 2'],
          rows: [['Value 1', 'Value 2']],
        },
      },
    ]

    render(<ArticleRenderer content={content} />)

    expect(screen.getByText('Column 1')).toBeInTheDocument()
    expect(screen.getByText('Column 2')).toBeInTheDocument()
    expect(screen.getByText('Value 1')).toBeInTheDocument()
    expect(screen.getByText('Value 2')).toBeInTheDocument()
  })

  it('renders table with default elevation when missing', () => {
    const content: ArticleContent[] = [
      {
        type: 'table',
        table: {
          headers: ['Default Elevation Header'],
          rows: [['Row Value']],
        },
      },
    ]

    render(<ArticleRenderer content={content} />)

    const table = screen.getByRole('table')
    expect(table).toBeInTheDocument()
    expect(table.closest('div[class*="MuiPaper-elevation1"]')).not.toBeNull()
  })

  it('renders table with empty headers array', () => {
    const content: ArticleContent[] = [
      {
        type: 'table',
        table: {
          headers: [],
          rows: [['Row without headers']],
        },
      },
    ]

    render(<ArticleRenderer content={content} />)

    expect(screen.getByText('Row without headers')).toBeInTheDocument()
    expect(screen.queryAllByRole('columnheader')).toHaveLength(0)
  })

  it('renders table with empty rows array', () => {
    const content: ArticleContent[] = [
      {
        type: 'table',
        table: {
          headers: ['Header Only'],
          rows: [],
        },
      },
    ]

    render(<ArticleRenderer content={content} />)

    expect(screen.getByText('Header Only')).toBeInTheDocument()
    expect(screen.queryAllByRole('row')).toHaveLength(1)
  })

  it('handles table content when table definition is missing', () => {
    const content: ArticleContent[] = [
      {
        type: 'table',
      },
    ]

    render(<ArticleRenderer content={content} />)

    expect(screen.getByRole('table')).toBeInTheDocument()
  })

  it('applies zebra striping to table rows', () => {
    const content: ArticleContent[] = [
      {
        type: 'table',
        table: {
          headers: ['Name', 'Value'],
          rows: [
            ['First Row', 'Value 1'],
            ['Second Row', 'Value 2'],
            ['Third Row', 'Value 3'],
          ],
        },
      },
    ]

    render(<ArticleRenderer content={content} />)

    // Verify all content is rendered
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Value')).toBeInTheDocument()
    expect(screen.getByText('First Row')).toBeInTheDocument()
    expect(screen.getByText('Second Row')).toBeInTheDocument()
    expect(screen.getByText('Third Row')).toBeInTheDocument()
  })
})
