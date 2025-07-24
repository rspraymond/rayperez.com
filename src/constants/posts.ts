import { lazy } from 'react'

export interface PostMeta {
  title: string
  date: string // ISO format
  path: string
  Component: React.LazyExoticComponent<() => JSX.Element>
}

export const posts: PostMeta[] = [
  {
    title: 'Why I Use MVC Pattern',
    date: '2024-10-05',
    path: '/why-mvc-pattern',
    Component: lazy(() => import('../pages/articles/WhyMVC')),
  },
  {
    title: 'Why I Choose Inertia.js',
    date: '2025-05-08',
    path: '/why-inertia',
    Component: lazy(() => import('../pages/articles/WhyInertia')),
  },
  {
    title: 'Why I Choose Object Orientied Programming',
    date: '2024-07-04',
    path: '/why-oop',
    Component: lazy(() => import('../pages/articles/WhyOOP')),
  },
  {
    title: 'Why I Choose Web Development',
    date: '2024-07-04',
    path: '/why-web-development',
    Component: lazy(() => import('../pages/articles/WhyWebDev')),
  },
  {
    title: 'Why I Choose TypeScript',
    date: '2024-07-04',
    path: '/why-typescript',
    Component: lazy(() => import('../pages/articles/WhyTypescript')),
  },
  {
    title: 'Why I Prefer Opinionated Frameworks',
    date: '2024-07-04',
    path: '/why-opinionated',
    Component: lazy(() => import('../pages/articles/WhyOpinionated')),
  },
  {
    title: 'Why I Choose GraphQL',
    date: '2024-07-04',
    path: '/why-graphql',
    Component: lazy(() => import('../pages/articles/WhyGraphQL')),
  },
  {
    title: 'Why I Choose Node.js',
    date: '2024-07-04',
    path: '/why-nodejs',
    Component: lazy(() => import('../pages/articles/WhyNodeJS')),
  },
  {
    title: 'Why I Choose NestJS',
    date: '2024-07-04',
    path: '/why-nestjs',
    Component: lazy(() => import('../pages/articles/WhyNest')),
  },
  {
    title: 'Why I Choose Laravel',
    date: '2024-07-04',
    path: '/why-laravel',
    Component: lazy(() => import('../pages/articles/WhyLaravel')),
  },
  {
    title: 'Why I Choose React',
    date: '2024-07-04',
    path: '/why-react',
    Component: lazy(() => import('../pages/articles/WhyReactJS')),
  },
]
