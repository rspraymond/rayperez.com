import React from 'react'
import JsonBlogPost from '../../components/JsonBlogPost'
import { ArticleContent } from '../../types/articleContent'
import articleContent from '../../data/articles/WhyWebDev.json'

const WhyWebDev = (): React.ReactElement => {
  return (
    <JsonBlogPost
      title='Why I Choose Web Development'
      author='Raymond Perez'
      date='2024-07-04'
      content={articleContent as ArticleContent[]}
    />
  )
}

export default WhyWebDev
