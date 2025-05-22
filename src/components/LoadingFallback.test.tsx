import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import LoadingFallback from './LoadingFallback'

describe('LoadingFallback', () => {
  it('renders a loading spinner correctly', () => {
    // Arrange & Act
    render(<LoadingFallback />)

    // Assert
    const loadingSpinner = screen.getByRole('progressbar')
    expect(loadingSpinner).toBeInTheDocument()
  })
})
