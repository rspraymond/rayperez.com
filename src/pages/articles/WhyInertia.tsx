import React from 'react'
import JsonBlogPost from '../../components/JsonBlogPost'
import { ArticleContent } from '../../types/articleContent'
import articleContent from '../../data/articles/WhyInertia.json'

const WhyInertia = (): React.ReactElement => {
  return (
    <JsonBlogPost
      title='Why I Choose Inertia.js'
      author='Raymond Perez'
      date='2025-05-08'
      content={articleContent as ArticleContent[]}
    />
  )
}

export default WhyInertia
