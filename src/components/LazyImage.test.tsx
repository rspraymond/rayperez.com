import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import LazyImage from './LazyImage'

describe('LazyImage', () => {
  const defaultProps = {
    src: '/test-image.jpg',
    alt: 'Test image',
    width: 200,
    height: 200,
  }

  it('renders with loading state initially', () => {
    render(<LazyImage {...defaultProps} />)

    expect(screen.getByRole('img')).toBeInTheDocument()
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('removes loading state after image loads', () => {
    render(<LazyImage {...defaultProps} />)

    const img = screen.getByRole('img')
    fireEvent.load(img)

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
  })

  it('uses eager loading for priority images', () => {
    render(<LazyImage {...defaultProps} priority />)

    expect(screen.getByRole('img')).toHaveAttribute('loading', 'eager')
  })

  it('uses lazy loading by default', () => {
    render(<LazyImage {...defaultProps} />)

    expect(screen.getByRole('img')).toHaveAttribute('loading', 'lazy')
  })

  it('passes through additional props to img element', () => {
    render(<LazyImage {...defaultProps} className='test-class' data-testid='test-id' />)

    const img = screen.getByRole('img')
    expect(img).toHaveClass('test-class')
    expect(img).toHaveAttribute('data-testid', 'test-id')
  })
})
