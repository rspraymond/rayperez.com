import React from 'react'
import { Helmet } from 'react-helmet'
import { useLocation } from 'react-router-dom'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation()
  const canonicalUrl = `${window.location.origin}${location.pathname}`

  return (
    <>
      <Helmet>
        <link rel='canonical' href={canonicalUrl} />
      </Helmet>
      {children}
    </>
  )
}

export default Layout
