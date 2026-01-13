import { lazy } from 'react'
import { CaseStudyMeta } from '../types/caseStudy'

export const caseStudies: CaseStudyMeta[] = [
  {
    title: 'Prejump.com: Rocket League Training Pack Platform',
    date: '2025-01-01',
    path: '/case-studies/prejump',
    project: 'Prejump.com',
    role: 'Software Engineer & Co-Creator',
    timeline: 'Ongoing',
    Component: lazy(() => import('../pages/case-studies/Prejump')),
  },
]
