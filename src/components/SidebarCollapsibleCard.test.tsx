import React from 'react'
import { describe, it, expect } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import ArticleIcon from '@mui/icons-material/Article'
import SidebarCollapsibleCard from './SidebarCollapsibleCard'

const renderWithTheme = (ui: React.ReactElement) => {
  const theme = createTheme()
  return {
    theme,
    ...render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>),
  }
}

describe('SidebarCollapsibleCard', () => {
  it('renders title, icon, and children', () => {
    renderWithTheme(
      <SidebarCollapsibleCard
        title='Recent Posts'
        icon={<ArticleIcon fontSize='small' />}
        expanded
        onToggle={() => {}}
        collapseLabel='collapse posts'
        expandLabel='expand posts'
      >
        <div>Content</div>
      </SidebarCollapsibleCard>,
    )

    expect(screen.getByText('Recent Posts')).toBeInTheDocument()
    expect(screen.getByTestId('ArticleIcon')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
    expect(screen.getByLabelText('collapse posts')).toBeInTheDocument()
  })

  it('uses high-contrast theme text color for the toggle icon', () => {
    const { theme } = renderWithTheme(
      <SidebarCollapsibleCard
        title='Recent Posts'
        icon={<ArticleIcon fontSize='small' />}
        expanded
        onToggle={() => {}}
        collapseLabel='collapse posts'
        expandLabel='expand posts'
      >
        <div>Content</div>
      </SidebarCollapsibleCard>,
    )

    const toggleButton = screen.getByLabelText('collapse posts')
    const computedStyle = window.getComputedStyle(toggleButton)

    expect(computedStyle.color).toBe(theme.palette.text.primary)
    expect(computedStyle.opacity).toBe('0.92')
  })

  it('toggles aria-labels when expanded state changes', () => {
    const Wrapper = () => {
      const [expanded, setExpanded] = React.useState(false)

      return (
        <SidebarCollapsibleCard
          title='Recent Posts'
          icon={<ArticleIcon fontSize='small' />}
          expanded={expanded}
          onToggle={() => setExpanded((prev) => !prev)}
          collapseLabel='collapse posts'
          expandLabel='expand posts'
        >
          <div>Content</div>
        </SidebarCollapsibleCard>
      )
    }

    renderWithTheme(<Wrapper />)

    const expandButton = screen.getByLabelText('expand posts')
    fireEvent.click(expandButton)

    expect(screen.getByLabelText('collapse posts')).toBeInTheDocument()
  })
})
