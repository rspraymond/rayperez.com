import { posts } from './posts'
import { caseStudies } from './caseStudies'

/**
 * Canonical list of routes for prerendering and sitemap generation.
 * This includes the home route, all blog posts, and all case studies.
 */
export const routes = [
  '/',
  ...posts.map((post) => post.path),
  ...caseStudies.map((caseStudy) => caseStudy.path),
]

/**
 * Deduplicated list of routes to ensure no redundant rendering during build.
 */
export const canonicalRoutes = Array.from(new Set(routes))
