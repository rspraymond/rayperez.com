import React from 'react'
import { Helmet } from 'react-helmet'
import { SOCIAL_CONFIG, ContentType } from '../constants/social'

export interface MetaTag {
  property: string
  content: string
}

export interface SocialMetaProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: ContentType
  twitterCreator?: string
  siteName?: string
}

const SocialMeta: React.FC<SocialMetaProps> = ({
  title,
  description,
  image,
  url,
  type = 'website',
  twitterCreator,
  siteName,
}) => {
  const getFallbackValues = (): Required<SocialMetaProps> => ({
    title: title || SOCIAL_CONFIG.siteName,
    description: description || SOCIAL_CONFIG.defaultDescription,
    image: image || SOCIAL_CONFIG.defaultImage,
    url: url || window.location.href,
    type: type || 'website',
    twitterCreator: twitterCreator || SOCIAL_CONFIG.twitterCreator,
    siteName: siteName || SOCIAL_CONFIG.siteName,
  })

  const generateMetaTags = (): MetaTag[] => {
    const values = getFallbackValues()

    return [
      // Open Graph tags
      { property: 'og:title', content: values.title },
      { property: 'og:description', content: values.description },
      { property: 'og:image', content: values.image },
      { property: 'og:url', content: values.url },
      { property: 'og:type', content: values.type },
      { property: 'og:site_name', content: values.siteName },

      // Twitter Card tags
      { property: 'twitter:card', content: 'summary_large_image' },
      { property: 'twitter:title', content: values.title },
      { property: 'twitter:description', content: values.description },
      { property: 'twitter:image', content: values.image },
      { property: 'twitter:creator', content: values.twitterCreator },
    ]
  }

  const metaTags = generateMetaTags()

  return (
    <Helmet>
      {metaTags.map((tag, index) => (
        <meta key={index} property={tag.property} content={tag.content} />
      ))}
    </Helmet>
  )
}

export default SocialMeta
