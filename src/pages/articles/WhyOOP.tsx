import React from 'react'
import JsonBlogPost from '../../components/JsonBlogPost'
import { ArticleContent } from '../../types/articleContent'
import articleContent from '../../data/articles/WhyOOP.json'

const WhyOOP = (): React.ReactElement => {
  return (
    <JsonBlogPost
      title='Why I Choose Object Oriented Programming'
      author='Raymond Perez'
      date='2024-07-04'
      content={articleContent as ArticleContent[]}
    />
  )
}

export default WhyOOP
