import { lazy } from 'react'
import { NESTJS_META_DESCRIPTION, OPINIONATED_META_DESCRIPTION } from './seoCopy'

export interface PostMeta {
  title: string
  date: string // ISO format
  path: string
  contentFile: string
  description?: string
  Component: React.LazyExoticComponent<() => JSX.Element>
}

export const posts: PostMeta[] = [
  {
    title: 'Why I Choose Cursor',
    date: '2026-03-25',
    path: '/why-cursor',
    contentFile: 'src/data/articles/WhyCursor.json',
    Component: lazy(() => import('../pages/articles/WhyCursor')),
  },
  {
    title: 'Why Type Safety Matters',
    date: '2025-11-29',
    path: '/why-type-safety',
    contentFile: 'src/data/articles/WhyTypeSafety.json',
    Component: lazy(() => import('../pages/articles/WhyTypeSafety')),
  },
  {
    title: 'Why I Use MVC Pattern',
    date: '2024-10-05',
    path: '/why-mvc-pattern',
    contentFile: 'src/data/articles/WhyMVC.json',
    Component: lazy(() => import('../pages/articles/WhyMVC')),
  },
  {
    title: 'Why I Choose Inertia.js',
    date: '2025-05-08',
    path: '/why-inertia',
    contentFile: 'src/data/articles/WhyInertia.json',
    Component: lazy(() => import('../pages/articles/WhyInertia')),
  },
  {
    title: 'Why I Choose Object Oriented Programming',
    date: '2024-07-04',
    path: '/why-oop',
    contentFile: 'src/data/articles/WhyOOP.json',
    Component: lazy(() => import('../pages/articles/WhyOOP')),
  },
  {
    title: 'Why I Choose Web Development',
    date: '2024-07-04',
    path: '/why-web-development',
    contentFile: 'src/data/articles/WhyWebDev.json',
    Component: lazy(() => import('../pages/articles/WhyWebDev')),
  },
  {
    title: 'Why I Choose TypeScript',
    date: '2024-07-04',
    path: '/why-typescript',
    contentFile: 'src/data/articles/WhyTypescript.json',
    Component: lazy(() => import('../pages/articles/WhyTypescript')),
  },
  {
    title: 'Why I Prefer Opinionated Frameworks',
    date: '2024-07-04',
    path: '/why-opinionated',
    contentFile: 'src/data/articles/WhyOpinionated.json',
    description: OPINIONATED_META_DESCRIPTION,
    Component: lazy(() => import('../pages/articles/WhyOpinionated')),
  },
  {
    title: 'Why I Choose GraphQL',
    date: '2024-07-04',
    path: '/why-graphql',
    contentFile: 'src/data/articles/WhyGraphQL.json',
    Component: lazy(() => import('../pages/articles/WhyGraphQL')),
  },
  {
    title: 'Why I Choose Node.js',
    date: '2024-07-04',
    path: '/why-nodejs',
    contentFile: 'src/data/articles/WhyNodeJS.json',
    Component: lazy(() => import('../pages/articles/WhyNodeJS')),
  },
  {
    title: 'Why I Choose NestJS',
    date: '2024-07-04',
    path: '/why-nestjs',
    contentFile: 'src/data/articles/WhyNest.json',
    description: NESTJS_META_DESCRIPTION,
    Component: lazy(() => import('../pages/articles/WhyNest')),
  },
  {
    title: 'Why I Choose Laravel',
    date: '2024-07-04',
    path: '/why-laravel',
    contentFile: 'src/data/articles/WhyLaravel.json',
    Component: lazy(() => import('../pages/articles/WhyLaravel')),
  },
  {
    title: 'Why I Choose React',
    date: '2024-07-04',
    path: '/why-react',
    contentFile: 'src/data/articles/WhyReactJS.json',
    Component: lazy(() => import('../pages/articles/WhyReactJS')),
  },
]
