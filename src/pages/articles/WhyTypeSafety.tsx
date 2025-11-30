import React from 'react'
import JsonBlogPost from '../../components/JsonBlogPost'
import { ArticleContent } from '../../types/articleContent'
import articleContent from '../../data/articles/WhyTypeSafety.json'

const WhyTypeSafety = (): React.ReactElement => {
  return (
    <JsonBlogPost
      title='Why Type Safety Matters'
      author='Raymond Perez'
      date='2025-11-29'
      content={articleContent as ArticleContent[]}
    />
  )
}

export default WhyTypeSafety
