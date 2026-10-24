import React, { useLayoutEffect, useMemo } from 'react'
import {
  applySocialMetaToDocumentHead,
  resolveSocialMetaValues,
} from '../utils/socialMetaDocumentHead'
import type { SocialMetaProps } from '../types/socialMeta'

export type { SocialMetaProps } from '../types/socialMeta'

const SocialMeta: React.FC<SocialMetaProps> = ({
  title,
  description,
  image,
  url,
  type = 'website',
  twitterCreator,
  siteName,
  keywords,
}) => {
  const values = useMemo(
    () =>
      resolveSocialMetaValues({
        title,
        description,
        image,
        url,
        type,
        twitterCreator,
        siteName,
        keywords,
      }),
    [title, description, image, url, type, twitterCreator, siteName, keywords],
  )

  const metaPayload = JSON.stringify({
    title: values.title,
    description: values.description,
    image: values.image,
    url: values.url,
    type: values.type,
    keywords: values.keywords,
    twitterCreator: values.twitterCreator,
    siteName: values.siteName,
  })

  // Before paint so tab title and first meta tags match the route during client transitions.
  useLayoutEffect(() => {
    applySocialMetaToDocumentHead(values)
  }, [values])

  return (
    // Route HTML generation reads this script; head tags are updated directly at runtime.
    <script
      type='application/json'
      data-ssg-meta
      dangerouslySetInnerHTML={{ __html: metaPayload }}
    />
  )
}

export default SocialMeta
