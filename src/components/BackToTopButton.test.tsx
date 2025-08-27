import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import BackToTopButton from './BackToTopButton'

describe('BackToTopButton', () => {
  it('renders nothing when show is false', () => {
    const { container } = render(<BackToTopButton show={false} onClick={vi.fn()} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders the button when show is true', () => {
    render(<BackToTopButton show={true} onClick={vi.fn()} />)
    expect(screen.getByRole('button', { name: 'back to top' })).toBeInTheDocument()
  })

  it('calls onClick when button is clicked', () => {
    const mockOnClick = vi.fn()
    render(<BackToTopButton show={true} onClick={mockOnClick} />)

    const button = screen.getByRole('button', { name: 'back to top' })
    fireEvent.click(button)

    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('has correct accessibility attributes', () => {
    render(<BackToTopButton show={true} onClick={vi.fn()} />)

    const button = screen.getByRole('button', { name: 'back to top' })
    expect(button).toHaveAttribute('aria-label', 'back to top')
  })

  it('applies correct styling classes', () => {
    render(<BackToTopButton show={true} onClick={vi.fn()} />)

    const button = screen.getByRole('button', { name: 'back to top' })
    expect(button).toHaveClass('MuiFab-root')
    expect(button).toHaveClass('MuiFab-sizeSmall')
  })
})
