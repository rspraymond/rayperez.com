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

  React.useEffect(() => {
    if (onLoadStateChange) onLoadStateChange(isLoading)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  return (
    <Box
      position='relative'
      display='inline-block'
      width={width}
      height={height}
      data-testid='lazy-image-container'
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding='async'
        onLoad={() => {
          setIsLoading(false)
          if (onLoadStateChange) onLoadStateChange(false)
        }}
        onError={() => {
          setError(true)
          setIsLoading(false)
          if (onLoadStateChange) onLoadStateChange(false)
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
