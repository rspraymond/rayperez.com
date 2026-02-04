import React from 'react'
import { Helmet } from 'react-helmet-async'
import { SOCIAL_CONFIG, ContentType } from '../constants/social'

export interface MetaTag {
  name?: string
  property?: string
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
  keywords?: string
}

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
  const getFallbackValues = (): Required<SocialMetaProps> => ({
    title: title || SOCIAL_CONFIG.siteName,
    description: description || SOCIAL_CONFIG.defaultDescription,
    image: image || SOCIAL_CONFIG.defaultImage,
    url: url || (typeof window !== 'undefined' ? window.location.href : ''),
    type: type || 'website',
    twitterCreator: twitterCreator || SOCIAL_CONFIG.twitterCreator,
    siteName: siteName || SOCIAL_CONFIG.siteName,
    keywords: keywords || SOCIAL_CONFIG.keywords,
  })

  const generateMetaTags = (): MetaTag[] => {
    const values = getFallbackValues()

    return [
      { name: 'keywords', content: values.keywords },
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
  const values = getFallbackValues()
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

  return (
    <>
      <Helmet>
        {metaTags.map((tag, index) => (
          <meta
            key={index}
            {...(tag.property ? { property: tag.property } : {})}
            {...(tag.name ? { name: tag.name } : {})}
            content={tag.content}
          />
        ))}
      </Helmet>
      <script
        type='application/json'
        data-ssg-meta
        dangerouslySetInnerHTML={{ __html: metaPayload }}
      />
    </>
  )
}

export default SocialMeta
