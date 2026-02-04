import React from 'react'
import { Box, CircularProgress } from '@mui/material'

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  width?: number | string
  height?: number | string
  priority?: boolean
  onLoadStateChange?: (isLoading: boolean) => void
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  onLoadStateChange,
  ...props
}) => {
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState(false)
  const imgRef = React.useRef<HTMLImageElement | null>(null)

  const notifyCompletion = React.useCallback(
    (value: boolean) => {
      setIsLoading(value)
      if (onLoadStateChange) {
        onLoadStateChange(value)
      }
    },
    [onLoadStateChange],
  )

  React.useEffect(() => {
    setIsLoading(true)
    setError(false)
    if (onLoadStateChange) {
      onLoadStateChange(true)
    }
  }, [src, onLoadStateChange])

  React.useEffect(() => {
    const node = imgRef.current
    if (!node) {
      return undefined
    }

    let isMounted = true
    let completionTimer: number | undefined

    const resolveCompletion = () => {
      if (!isMounted) return
      if (node.complete && node.naturalWidth > 0) {
        notifyCompletion(false)
        return true
      }

      return false
    }

    const scheduleCompletionCheck = () => {
      if (completionTimer) {
        window.clearTimeout(completionTimer)
      }
      completionTimer = window.setTimeout(() => {
        resolveCompletion()
      }, 50)
    }

    if (!resolveCompletion()) {
      scheduleCompletionCheck()
    }

    return () => {
      isMounted = false
      if (completionTimer) {
        window.clearTimeout(completionTimer)
      }
    }
  }, [notifyCompletion, src])

  return (
    <Box
      position='relative'
      display='inline-block'
      width={width}
      height={height}
      data-testid='lazy-image-container'
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding='async'
        onLoad={() => {
          notifyCompletion(false)
        }}
        onError={() => {
          setError(true)
          notifyCompletion(false)
        }}
        style={{
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.2s',
          objectFit: 'cover',
          width: '100%',
          height: '100%',
        }}
        {...props}
      />
      {isLoading && !error && (
        <Box
          position='absolute'
          top='50%'
          left='50%'
          sx={{
            transform: 'translate(-50%, -50%)',
          }}
        >
          <CircularProgress size={20} />
        </Box>
      )}
    </Box>
  )
}

export default LazyImage
