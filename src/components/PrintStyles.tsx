import React, { useEffect } from 'react'

const PrintStyles: React.FC = () => {
  useEffect(() => {
    let linkElement: HTMLLinkElement | null = null

    const loadPrintStyles = () => {
      if (!linkElement) {
        linkElement = document.createElement('link')
        linkElement.rel = 'stylesheet'
        linkElement.media = 'print'
        linkElement.href = '/print-styles.css'
        document.head.appendChild(linkElement)
      }
    }

    window.addEventListener('beforeprint', loadPrintStyles)

    return () => {
      window.removeEventListener('beforeprint', loadPrintStyles)
      if (linkElement?.parentNode) {
        linkElement.parentNode.removeChild(linkElement)
      }
    }
  }, [])

  return null
}

export default PrintStyles
