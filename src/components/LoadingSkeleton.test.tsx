import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import LoadingSkeleton from './LoadingSkeleton'

describe('LoadingSkeleton', () => {
  it('renders skeleton elements with default props', () => {
    render(<LoadingSkeleton />)
    const skeletons = document.querySelectorAll('.MuiSkeleton-root')
    expect(skeletons).toHaveLength(4) // One rectangular and three text skeletons
  })

  it('applies custom test id when provided', () => {
    const testId = 'custom-skeleton'
    render(<LoadingSkeleton testId={testId} />)
    expect(screen.getByTestId(testId)).toBeInTheDocument()
  })

  it('maintains consistent layout structure', () => {
    render(<LoadingSkeleton />)
    const container = screen.getByTestId('skeleton-container')

    // First skeleton should be rectangular
    const rectangularSkeleton = container.querySelector('.MuiSkeleton-rectangular')
    expect(rectangularSkeleton).toBeInTheDocument()

    // Remaining skeletons should be text type
    const textSkeletons = container.querySelectorAll('.MuiSkeleton-text')
    expect(textSkeletons).toHaveLength(3)
  })
})
