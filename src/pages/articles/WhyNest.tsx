import React from 'react'
import JsonBlogPost from '../../components/JsonBlogPost'
import { ArticleContent } from '../../types/articleContent'
import articleContent from '../../data/articles/WhyNest.json'
import { NESTJS_META_DESCRIPTION } from '../../constants/seoCopy'

const WhyNest = (): React.ReactElement => {
  return (
    <JsonBlogPost
      title='Why I Choose NestJS'
      author='Raymond Perez'
      date='2024-07-04'
      content={articleContent as ArticleContent[]}
      description={NESTJS_META_DESCRIPTION}
    />
  )
}

export default WhyNest
