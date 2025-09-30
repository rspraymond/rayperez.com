import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Projects from './Projects'

describe('Projects', () => {
  const mockProjects = [
    {
      title: 'Test Project 1',
      description: 'A test project description',
      technologies: ['React', 'TypeScript', 'Node.js'],
      liveUrl: 'https://test1.com',
      githubUrl: 'https://github.com/test1',
      featured: true,
    },
    {
      title: 'Test Project 2',
      description: 'Another test project description',
      technologies: ['Vue.js', 'JavaScript'],
      liveUrl: 'https://test2.com',
      featured: false,
    },
    {
      title: 'Test Project 3',
      description: 'Third test project without GitHub',
      technologies: ['Angular', 'CSS'],
      liveUrl: 'https://test3.com',
      featured: false,
    },
  ]

  it('renders the projects heading with code icon', () => {
    render(<Projects projects={mockProjects} />)

    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByTestId('CodeIcon')).toBeInTheDocument()
  })

  it('renders all project cards with correct information', () => {
    render(<Projects projects={mockProjects} />)

    mockProjects.forEach((project) => {
      expect(screen.getByText(project.title)).toBeInTheDocument()
      expect(screen.getByText(project.description)).toBeInTheDocument()
    })
  })

  it('renders technology chips for each project', () => {
    render(<Projects projects={mockProjects} />)

    mockProjects.forEach((project) => {
      project.technologies.forEach((tech) => {
        expect(screen.getByText(tech)).toBeInTheDocument()
      })
    })
  })

  it('shows featured badge for featured projects', () => {
    render(<Projects projects={mockProjects} />)

    expect(screen.getByText('Featured')).toBeInTheDocument()

    // Should only show one featured badge
    const featuredBadges = screen.getAllByText('Featured')
    expect(featuredBadges).toHaveLength(1)
  })

  it('renders live demo buttons with correct links and attributes', () => {
    render(<Projects projects={mockProjects} />)

    mockProjects.forEach((project) => {
      const liveButton = screen.getByText(`Visit ${project.title}`)
      expect(liveButton).toBeInTheDocument()
      expect(liveButton.closest('a')).toHaveAttribute('href', project.liveUrl)
      expect(liveButton.closest('a')).toHaveAttribute('target', '_blank')
      expect(liveButton.closest('a')).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  it('renders source code buttons only for projects with GitHub URLs', () => {
    render(<Projects projects={mockProjects} />)

    // Project 1 has GitHub URL
    expect(screen.getByText('Source Code')).toBeInTheDocument()

    // Should only have one source code button
    const sourceButtons = screen.getAllByText('Source Code')
    expect(sourceButtons).toHaveLength(1)
  })

  it('has proper accessibility attributes for buttons', () => {
    render(<Projects projects={mockProjects} />)

    mockProjects.forEach((project) => {
      const liveButton = screen.getByText(`Visit ${project.title}`)
      expect(liveButton.closest('a')).toHaveAttribute(
        'aria-label',
        `Visit ${project.title} - ${project.description} (opens in new window)`,
      )
    })

    // Check GitHub button accessibility
    const sourceButton = screen.getByText('Source Code')
    expect(sourceButton.closest('a')).toHaveAttribute(
      'aria-label',
      'View Test Project 1 source code on GitHub (opens in new window)',
    )
  })

  it('renders empty state gracefully', () => {
    render(<Projects projects={[]} />)

    expect(screen.getByText('Projects')).toBeInTheDocument()
    // Should not throw any errors when no projects are provided
  })

  it('applies hover effects to project cards', () => {
    render(<Projects projects={mockProjects} />)

    // Verify cards are rendered with correct titles
    expect(screen.getByText('Test Project 1')).toBeInTheDocument()
    expect(screen.getByText('Test Project 2')).toBeInTheDocument()
    expect(screen.getByText('Test Project 3')).toBeInTheDocument()

    // Verify project descriptions are present
    expect(screen.getByText('A test project description')).toBeInTheDocument()
    expect(screen.getByText('Another test project description')).toBeInTheDocument()
    expect(screen.getByText('Third test project without GitHub')).toBeInTheDocument()
  })

  it('renders technology chips with correct styling', () => {
    render(<Projects projects={mockProjects} />)

    // Check that technology chips are rendered
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Node.js')).toBeInTheDocument()
    expect(screen.getByText('Vue.js')).toBeInTheDocument()
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    expect(screen.getByText('Angular')).toBeInTheDocument()
    expect(screen.getByText('CSS')).toBeInTheDocument()
  })

  it('handles projects without featured property', () => {
    const projectsWithoutFeatured = [
      {
        title: 'No Featured Project',
        description: 'A project without featured property',
        technologies: ['React'],
        liveUrl: 'https://test.com',
      },
    ]

    render(<Projects projects={projectsWithoutFeatured} />)

    expect(screen.getByText('No Featured Project')).toBeInTheDocument()
    expect(screen.queryByText('Featured')).not.toBeInTheDocument()
  })

  it('handles projects without GitHub URLs', () => {
    const projectsWithoutGitHub = [
      {
        title: 'No GitHub Project',
        description: 'A project without GitHub',
        technologies: ['React'],
        liveUrl: 'https://test.com',
        featured: false,
      },
    ]

    render(<Projects projects={projectsWithoutGitHub} />)

    expect(screen.getByText('Visit No GitHub Project')).toBeInTheDocument()
    expect(screen.queryByText('Source Code')).not.toBeInTheDocument()
  })
})
