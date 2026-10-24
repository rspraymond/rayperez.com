import React from 'react'
import JsonBlogPost from '../../components/JsonBlogPost'
import { ArticleContent } from '../../types/articleContent'
import articleContent from '../../data/articles/WhyMVC.json'

const WhyMVC = (): React.ReactElement => {
  return (
    <JsonBlogPost
      title='Why I Use MVC Pattern'
      author='Raymond Perez'
      date='2025-05-25'
      content={articleContent as ArticleContent[]}
    />
  )
}

export default WhyMVC
