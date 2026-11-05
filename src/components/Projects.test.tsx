import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import Projects from './Projects'
import type { Project } from '../types/contentData'

const project = (overrides: Partial<Project>): Project => ({
  title: 'Prejump',
  description: 'A training platform.',
  technologies: ['React'],
  liveUrl: 'https://prejump.com',
  featured: false,
  ...overrides,
})

const renderProjects = (projects: Project[]) =>
  render(
    <MemoryRouter>
      <Projects projects={projects} />
    </MemoryRouter>,
  )

describe('Projects', () => {
  it('titles each project and shows its description', () => {
    renderProjects([project({}), project({ title: 'Clips Finder', liveUrl: 'https://clips.test' })])

    const titles = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent)
    expect(titles).toEqual(['Prejump', 'Clips Finder'])
    expect(screen.getAllByText('A training platform.')).toHaveLength(2)
  })

  it('opens each live site in a new window under a name unique to the project', () => {
    renderProjects([project({}), project({ title: 'Clips Finder', liveUrl: 'https://clips.test' })])

    const visit = screen.getByRole('link', {
      name: 'Visit site: Clips Finder (opens in new window)',
    })
    expect(visit).toHaveAttribute('href', 'https://clips.test')
    expect(visit).toHaveAttribute('target', '_blank')
    expect(visit).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('links the case study in the same tab only when there is one', () => {
    renderProjects([
      project({ caseStudyUrl: '/case-studies/prejump' }),
      project({ title: 'Clips Finder' }),
    ])

    const caseStudies = screen.getAllByRole('link', { name: /Read the case study/ })
    expect(caseStudies).toHaveLength(1)
    expect(caseStudies[0]).toHaveAttribute('href', '/case-studies/prejump')
    expect(caseStudies[0]).not.toHaveAttribute('target')
  })

  it('links the source code only when it is public', () => {
    renderProjects([
      project({ githubUrl: 'https://github.com/example/prejump' }),
      project({ title: 'Clips Finder' }),
    ])

    const sources = screen.getAllByRole('link', { name: /Source code/ })
    expect(sources).toHaveLength(1)
    expect(sources[0]).toHaveAttribute('href', 'https://github.com/example/prejump')
  })
})
