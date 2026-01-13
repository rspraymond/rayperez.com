import type { LazyExoticComponent } from 'react'
import type { ArticleDocument } from './articleContent'

export interface CaseStudyLink {
  url: string
  label: string
  ariaLabel: string
}

export interface CaseStudyMetadata {
  project: string
  role: string
  timeline: string
  techStack: string[]
  links: CaseStudyLink[]
}

export interface CaseStudyMeta {
  title: string
  date: string // ISO format
  path: string
  project: string
  role: string
  timeline: string
  Component: LazyExoticComponent<() => JSX.Element>
}

export interface CaseStudyContent {
  meta: CaseStudyMeta
  content: ArticleDocument
}
