import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const HashRedirectHandler: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const path = (/#!(\/.*)$/.exec(window.location.hash) || [])[1]
    if (path) {
      navigate(path, { replace: true })
    }
  }, [navigate])

  return null
}

export default HashRedirectHandler
