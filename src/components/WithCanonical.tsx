import { ComponentType } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { SITE_URL } from '../constants/social'

/**
 * Higher-order component (HOC) for adding a canonical link to a component.
 *
 * This HOC wraps a given React component and injects a `<link rel='canonical'>` element
 * into the document head using the `react-helmet` library. This is useful for SEO purposes,
 * indicating to web crawlers the preferred URL for the content being rendered by the component.
 *
 * @template P - The props type of the wrapped component.
 * @param {ComponentType<P>} Component - The React component to wrap.
 * @returns A React functional component that renders the wrapped component along with the canonical link.
 */
const withCanonical = <P extends object>(Component: ComponentType<P>) => {
  return (props: P) => {
    const location = useLocation()
    // Path only: hashbang migration and query strings must not become the canonical URL.
    const canonicalUrl = `${SITE_URL}${location.pathname}`

    return (
      <>
        <Helmet>
          <link rel='canonical' href={canonicalUrl} />
        </Helmet>
        <Component {...props} />
      </>
    )
  }
}

export default withCanonical
