import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * Rejects hash-derived targets that browsers treat as external
 * (protocol-relative `//` and backslash open-redirect shapes).
 */
const isSafeAppPath = (path: string): boolean =>
  path.startsWith('/') && !path.startsWith('//') && !path.includes('\\')

/**
 * Migrates legacy `#!/path` bookmarks into real history paths.
 * Only same-app paths are forwarded so untrusted hashes cannot leave the origin.
 */
const HashRedirectHandler: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (typeof window === 'undefined') return
    const path = (/#!(\/.*)$/.exec(window.location.hash) || [])[1]
    if (path && isSafeAppPath(path)) {
      navigate(path, { replace: true })
    }
  }, [navigate])

  return null
}

export default HashRedirectHandler
