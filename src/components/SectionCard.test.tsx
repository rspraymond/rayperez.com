import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SectionCard from './SectionCard'
import CodeIcon from '@mui/icons-material/Code'

describe('SectionCard', () => {
  it('renders with required props', () => {
    render(
      <SectionCard title='Test Section' icon={CodeIcon}>
        <div>Test content</div>
      </SectionCard>,
    )

    expect(screen.getByText('Test Section')).toBeInTheDocument()
    expect(screen.getByText('Test content')).toBeInTheDocument()
    expect(screen.getByTestId('CodeIcon')).toBeInTheDocument()
  })

  it('renders with optional headingId prop', () => {
    render(
      <SectionCard title='Test Section' icon={CodeIcon} headingId='test-heading'>
        <div>Test content</div>
      </SectionCard>,
    )

    const heading = screen.getByText('Test Section')
    expect(heading).toHaveAttribute('id', 'test-heading')
  })

  it('renders with custom margins', () => {
    const { container } = render(
      <SectionCard title='Test Section' icon={CodeIcon} marginTop={24} marginBottom={12}>
        <div>Test content</div>
      </SectionCard>,
    )

    const card = container.querySelector('.MuiCard-root')
    expect(card).toHaveStyle({ marginTop: '24px', marginBottom: '12px' })
  })

  it('uses default margins when not provided', () => {
    const { container } = render(
      <SectionCard title='Test Section' icon={CodeIcon}>
        <div>Test content</div>
      </SectionCard>,
    )

    const card = container.querySelector('.MuiCard-root')
    expect(card).toHaveStyle({ marginTop: '16px', marginBottom: '0px' })
  })

  it('renders icon with correct attributes', () => {
    render(
      <SectionCard title='Test Section' icon={CodeIcon}>
        <div>Test content</div>
      </SectionCard>,
    )

    const icon = screen.getByTestId('CodeIcon')
    expect(icon).toHaveAttribute('aria-hidden', 'true')
  })

  it('renders heading with correct typography variant and component', () => {
    render(
      <SectionCard title='Test Section' icon={CodeIcon}>
        <div>Test content</div>
      </SectionCard>,
    )

    const heading = screen.getByText('Test Section')
    expect(heading.tagName).toBe('H2')
  })

  it('renders heading as h3 when headingComponent is provided', () => {
    render(
      <SectionCard title='Test Section' icon={CodeIcon} headingComponent='h3'>
        <div>Test content</div>
      </SectionCard>,
    )

    const heading = screen.getByText('Test Section')
    expect(heading.tagName).toBe('H3')
  })
})
