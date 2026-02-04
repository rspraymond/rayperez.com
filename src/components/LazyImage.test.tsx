import '@testing-library/jest-dom/vitest'
import React, { type ComponentProps } from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import LazyImage from './LazyImage'

type LazyImageProps = ComponentProps<typeof LazyImage>

const defaultProps: LazyImageProps = {
  src: '/test-image.jpg',
  alt: 'Test image',
}

const renderLazyImage = (props: Partial<LazyImageProps> = {}) =>
  render(React.createElement(LazyImage, { ...defaultProps, ...props }))

const fireImageLoad = (img: HTMLImageElement) => {
  act(() => {
    fireEvent.load(img)
  })
}

const fireImageError = (img: HTMLImageElement) => {
  act(() => {
    fireEvent.error(img)
  })
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('LazyImage rendering & initial state', () => {
  it('renders image with correct required attributes', () => {
    renderLazyImage()

    const img = screen.getByRole('img') as HTMLImageElement
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', defaultProps.src)
    expect(img).toHaveAttribute('alt', defaultProps.alt)
  })

  it('renders container with correct testid', () => {
    renderLazyImage()

    expect(screen.getByTestId('lazy-image-container')).toBeInTheDocument()
  })

  it('shows loading spinner initially', () => {
    renderLazyImage()

    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('image has decoding="async" attribute', () => {
    renderLazyImage()

    expect(screen.getByRole('img')).toHaveAttribute('decoding', 'async')
  })

  it('container has correct dimensions when provided as numbers', () => {
    const width = 200
    const height = 300

    renderLazyImage({ width, height })

    expect(screen.getByTestId('lazy-image-container')).toHaveStyle({
      width: `${width}px`,
      height: `${height}px`,
    })
  })

  it('container has correct dimensions when provided as strings', () => {
    const width = '100px'
    const height = '50%'

    renderLazyImage({ width, height })

    expect(screen.getByTestId('lazy-image-container')).toHaveStyle({ width, height })
  })

  it('image element receives width and height attributes', () => {
    const width = 200
    const height = 300

    renderLazyImage({ width, height })

    const img = screen.getByRole('img') as HTMLImageElement
    expect(img).toHaveAttribute('width', String(width))
    expect(img).toHaveAttribute('height', String(height))
  })

  it('works without width and height props', () => {
    renderLazyImage()

    const img = screen.getByRole('img') as HTMLImageElement
    expect(img).not.toHaveAttribute('width')
    expect(img).not.toHaveAttribute('height')
  })
})

describe('LazyImage loading attribute', () => {
  it('uses lazy loading by default', () => {
    renderLazyImage()

    expect(screen.getByRole('img')).toHaveAttribute('loading', 'lazy')
  })

  it('uses eager loading when priority is true', () => {
    renderLazyImage({ priority: true })

    expect(screen.getByRole('img')).toHaveAttribute('loading', 'eager')
  })

  it('uses lazy loading when priority is false', () => {
    renderLazyImage({ priority: false })

    expect(screen.getByRole('img')).toHaveAttribute('loading', 'lazy')
  })
})

describe('LazyImage loading states', () => {
  it('shows loading spinner when isLoading is true and error is false', () => {
    renderLazyImage()

    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('hides loading spinner after successful load', () => {
    renderLazyImage()
    const img = screen.getByRole('img') as HTMLImageElement

    fireImageLoad(img)

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
  })

  it('image opacity is 0 when loading', () => {
    renderLazyImage()

    expect(screen.getByRole('img') as HTMLImageElement).toHaveStyle({ opacity: '0' })
  })

  it('image opacity transitions to 1 after load', () => {
    renderLazyImage()
    const img = screen.getByRole('img') as HTMLImageElement

    fireImageLoad(img)

    expect(img).toHaveStyle({ opacity: '1' })
  })

  it('image has correct style properties', () => {
    renderLazyImage()

    expect(screen.getByRole('img') as HTMLImageElement).toHaveStyle({
      transition: 'opacity 0.2s',
      objectFit: 'cover',
      width: '100%',
      height: '100%',
    })
  })
})

describe('LazyImage error handling', () => {
  it('hides loading spinner on error', () => {
    renderLazyImage()
    const img = screen.getByRole('img') as HTMLImageElement

    fireImageError(img)

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
  })

  it('image opacity becomes 1 on error (isLoading becomes false)', () => {
    renderLazyImage()
    const img = screen.getByRole('img') as HTMLImageElement

    fireImageError(img)

    expect(img).toHaveStyle({ opacity: '1' })
  })

  it('does not show spinner when error occurs', () => {
    renderLazyImage()
    const img = screen.getByRole('img') as HTMLImageElement

    fireImageError(img)

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
  })
})

describe('LazyImage onLoadStateChange callback', () => {
  it('calls onLoadStateChange with true on mount when loading', () => {
    const onLoadStateChange = vi.fn()

    renderLazyImage({ onLoadStateChange })

    expect(onLoadStateChange).toHaveBeenCalledWith(true)
    expect(onLoadStateChange).toHaveBeenCalledTimes(1)
  })

  it('calls onLoadStateChange with false on successful load', () => {
    const onLoadStateChange = vi.fn()
    renderLazyImage({ onLoadStateChange })
    const img = screen.getByRole('img') as HTMLImageElement
    vi.clearAllMocks()

    fireImageLoad(img)

    expect(onLoadStateChange).toHaveBeenCalledWith(false)
    expect(onLoadStateChange).toHaveBeenCalledTimes(1)
  })

  it('calls onLoadStateChange with false on error', () => {
    const onLoadStateChange = vi.fn()
    renderLazyImage({ onLoadStateChange })
    const img = screen.getByRole('img') as HTMLImageElement
    vi.clearAllMocks()

    fireImageError(img)

    expect(onLoadStateChange).toHaveBeenCalledWith(false)
    expect(onLoadStateChange).toHaveBeenCalledTimes(1)
  })

  it('does not error when callback is not provided', () => {
    expect(() => renderLazyImage()).not.toThrow()
  })

  it('does not throw when load event fires without callback', () => {
    renderLazyImage()
    const img = screen.getByRole('img') as HTMLImageElement

    expect(() => fireImageLoad(img)).not.toThrow()
  })

  it('does not throw when error event fires without callback', () => {
    renderLazyImage()
    const img = screen.getByRole('img') as HTMLImageElement

    expect(() => fireImageError(img)).not.toThrow()
  })
})

describe('LazyImage props passthrough', () => {
  it('passes through className to img element', () => {
    const className = 'test-class'

    renderLazyImage({ className })

    expect(screen.getByRole('img') as HTMLImageElement).toHaveClass(className)
  })

  it('passes through data-testid to img element', () => {
    const testId = 'custom-test-id'

    renderLazyImage({ ['data-testid']: testId } as Partial<LazyImageProps>)

    expect(screen.getByTestId(testId)).toBeInTheDocument()
  })

  it('passes through multiple additional props to img element', () => {
    const className = 'test-class'
    const id = 'test-id'
    const title = 'Test title'

    renderLazyImage({ className, id, title })

    const img = screen.getByRole('img') as HTMLImageElement
    expect(img).toHaveClass(className)
    expect(img).toHaveAttribute('id', id)
    expect(img).toHaveAttribute('title', title)
  })
})

describe('LazyImage edge cases', () => {
  it('handles multiple load events idempotently', () => {
    const onLoadStateChange = vi.fn()
    renderLazyImage({ onLoadStateChange })
    const img = screen.getByRole('img') as HTMLImageElement
    vi.clearAllMocks()

    fireImageLoad(img)
    fireImageLoad(img)
    fireImageLoad(img)

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
    expect(img).toHaveStyle({ opacity: '1' })
  })

  it('handles multiple error events idempotently', () => {
    const onLoadStateChange = vi.fn()
    renderLazyImage({ onLoadStateChange })
    const img = screen.getByRole('img') as HTMLImageElement
    vi.clearAllMocks()

    fireImageError(img)
    fireImageError(img)
    fireImageError(img)

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
    expect(img).toHaveStyle({ opacity: '1' })
  })

  it('handles error after load event', () => {
    renderLazyImage()
    const img = screen.getByRole('img') as HTMLImageElement

    fireImageLoad(img)
    expect(img).toHaveStyle({ opacity: '1' })

    fireImageError(img)

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
    expect(img).toHaveStyle({ opacity: '1' })
  })

  it('handles load after error event', () => {
    renderLazyImage()
    const img = screen.getByRole('img') as HTMLImageElement

    fireImageError(img)
    expect(img).toHaveStyle({ opacity: '1' })

    fireImageLoad(img)

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
    expect(img).toHaveStyle({ opacity: '1' })
  })

  it('handles string dimensions with units', () => {
    const width = '100px'
    const height = '200px'

    renderLazyImage({ width, height })

    const container = screen.getByTestId('lazy-image-container')
    const img = screen.getByRole('img') as HTMLImageElement
    expect(container).toHaveStyle({ width, height })
    expect(img).toHaveAttribute('width', width)
    expect(img).toHaveAttribute('height', height)
  })

  it('handles string dimensions with percentages', () => {
    const width = '50%'
    const height = '75%'

    renderLazyImage({ width, height })

    expect(screen.getByTestId('lazy-image-container')).toHaveStyle({ width, height })
  })

  it('handles mixed number and string dimensions', () => {
    const width = 200
    const height = '50%'

    renderLazyImage({ width, height })

    expect(screen.getByTestId('lazy-image-container')).toHaveStyle({ width: `${width}px`, height })
  })
})
