import { posts } from './posts'
import { caseStudies } from './caseStudies'
import { ABOUT_PATH } from './paths'

/**
 * Canonical list of routes for sitemap generation and route inventory.
 * This includes the home route, the about page, all blog posts, and all case studies.
 */
export const routes = [
  '/',
  ABOUT_PATH,
  ...posts.map((post) => post.path),
  ...caseStudies.map((caseStudy) => caseStudy.path),
]

/**
 * Deduplicated list of routes for sitemap and related generators.
 */
export const canonicalRoutes = Array.from(new Set(routes))
