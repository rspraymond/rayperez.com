import React from 'react'
import JsonBlogPost from '../../components/JsonBlogPost'
import { ArticleContent } from '../../types/articleContent'
import articleContent from '../../data/articles/WhyLaravel.json'

const WhyLaravel = (): React.ReactElement => {
  return (
    <JsonBlogPost
      title='Why I Choose Laravel'
      author='Raymond Perez'
      date='2024-07-04'
      content={articleContent as ArticleContent[]}
    />
  )
}

export default WhyLaravel
