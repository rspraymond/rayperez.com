import React from 'react'
import JsonBlogPost from '../../components/JsonBlogPost'
import { ArticleContent } from '../../types/articleContent'
import articleContent from '../../data/articles/WhyOpinionated.json'

const WhyOpinionated = (): React.ReactElement => {
  return (
    <JsonBlogPost
      title='Why I Prefer Opinionated Frameworks'
      author='Raymond Perez'
      date='2024-11-19'
      content={articleContent as ArticleContent[]}
    />
  )
}

export default WhyOpinionated
