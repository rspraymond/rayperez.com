import React from 'react'
import JsonBlogPost from '../../components/JsonBlogPost'
import { ArticleContent } from '../../types/articleContent'
import articleContent from '../../data/articles/WhyReactJS.json'

const WhyReactJS = (): React.ReactElement => {
  return (
    <JsonBlogPost
      title='Why I Choose React'
      author='Raymond Perez'
      date='2024-07-04'
      content={articleContent as ArticleContent[]}
    />
  )
}

export default WhyReactJS
