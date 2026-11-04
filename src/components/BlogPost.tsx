import React, { Suspense, lazy } from 'react'
import { helmetJsonLdProp } from 'react-schemaorg'
import { BlogPosting } from 'schema-dts'
import { Box, Link, Stack, Typography } from '@mui/material'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import LoadingSkeleton from './LoadingSkeleton'
import withCanonical from './WithCanonical'
import { PROFILE } from '../constants/profile'
import { ABOUT_PATH } from '../constants/paths'
import RouterLinkRef from '../utils/RouterLink'
import { buildBlogPostingSchema } from '../constants/schema'
import { SITE_URL } from '../constants/siteUrl'
import { formatIsoDate } from '../utils/formatIsoDate'
import { useScrollToTop } from '../hooks/useScrollToTop'
import { usePostNavigation } from '../hooks/usePostNavigation'
import { useReadingTime } from '../hooks/useReadingTime'
import SocialShareButtons from './SocialShareButtons'
import SocialMeta from './SocialMeta'
import PostNavigation from './PostNavigation'
import BackToTopButton from './BackToTopButton'
import BlogBreadcrumbs from './BlogBreadcrumbs'
import { PAGE_SX, PAGE_STACK_SPACING } from '../styles/sectionStyles'

const AuthorBio = lazy(() => import('./AuthorBio'))
const TableOfContents = lazy(() => import('./TableOfContents'))

interface BlogPostProps {
  title: string
  author: string
  date: string
  updated?: string
  children: React.ReactNode
  readingText?: string
  metaDescription?: string
  metadata?: React.ReactNode
}

const BlogPost: React.FC<BlogPostProps> = ({
  title,
  author,
  date,
  updated,
  children,
  readingText,
  metaDescription,
  metadata,
}) => {
  const { showBackToTop, scrollToTop } = useScrollToTop()
  const location = useLocation()

  const currentPath = location.pathname
  // Equal dates mean the article was never revised, so showing an update would be misleading.
  const hasUpdate = updated !== undefined && updated !== date

  const readingTimeDisplay = useReadingTime(readingText ?? children)
  const { prevPost, nextPost } = usePostNavigation()
  const documentTitle = `${title} - ${PROFILE.name} - ${PROFILE.role}`
  const pageUrl = `${SITE_URL}${currentPath}`

  return (
    <React.Fragment>
      <Helmet
        script={[
          helmetJsonLdProp<BlogPosting>(
            buildBlogPostingSchema({
              title,
              url: `${SITE_URL}${currentPath}`,
              datePublished: date,
              dateModified: updated,
            }),
          ),
        ]}
      >
        <title>{documentTitle}</title>
      </Helmet>
      {/* Reading time is computed later; do not tie description to it or the head would change twice. */}
      <SocialMeta
        title={documentTitle}
        description={metaDescription}
        type='article'
        url={pageUrl}
      />
      <Box component='article' sx={PAGE_SX}>
        <Stack spacing={PAGE_STACK_SPACING}>
          <BlogBreadcrumbs title={title} />
          <Typography variant='h2' component='h1'>
            {title}
          </Typography>
          <SocialShareButtons title={title} />
          <Stack spacing={0.5}>
            <Typography variant='body2' color='text.secondary'>
              By{' '}
              <Link component={RouterLinkRef} to={ABOUT_PATH} rel='author'>
                {author}
              </Link>
              {' · '}
              <time data-testid='published-date' dateTime={date}>
                {formatIsoDate(date)}
              </time>
              {hasUpdate && (
                <React.Fragment>
                  {' · Updated '}
                  <time data-testid='updated-date' dateTime={updated}>
                    {formatIsoDate(updated)}
                  </time>
                </React.Fragment>
              )}
            </Typography>
            {readingTimeDisplay ? (
              <Typography variant='body2' color='text.secondary'>
                {readingTimeDisplay}
              </Typography>
            ) : (
              <LoadingSkeleton testId='reading-time' />
            )}
          </Stack>
          {metadata && <Box sx={{ mb: 2 }}>{metadata}</Box>}
          <Suspense fallback={<LoadingSkeleton testId='table-of-contents' />}>
            <TableOfContents />
          </Suspense>
          <Box component='section'>{children}</Box>
          <Suspense fallback={<LoadingSkeleton testId='author-bio' />}>
            <AuthorBio />
          </Suspense>
          <PostNavigation prevPost={prevPost} nextPost={nextPost} />
        </Stack>
      </Box>
      <BackToTopButton show={showBackToTop} onClick={scrollToTop} />
    </React.Fragment>
  )
}

const BlogPostWithCanonical = withCanonical(BlogPost)

export default BlogPostWithCanonical
