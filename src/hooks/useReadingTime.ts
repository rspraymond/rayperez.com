import React, { useMemo } from 'react'
import { calculateReadingTime, formatReadingTime } from '../utils/readingTime'

export const useReadingTime = (children: React.ReactNode) => {
  const readingTimeDisplay = useMemo(() => {
    const extractTextFromChildren = (children: React.ReactNode): string => {
      let text = ''
      React.Children.forEach(children, (child) => {
        if (typeof child === 'string') {
          text += child
        } else if (React.isValidElement(child)) {
          text += extractTextFromChildren(child.props.children)
        }
      })
      return text
    }

    const textContent = extractTextFromChildren(children)
    const readingTime = calculateReadingTime(textContent)
    return formatReadingTime(readingTime)
  }, [children])

  return readingTimeDisplay
}
