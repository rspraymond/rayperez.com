import React from 'react'
import JsonBlogPost from '../../components/JsonBlogPost'
import { ArticleContent } from '../../types/articleContent'
import articleContent from '../../data/articles/WhyOpinionated.json'
import { OPINIONATED_META_DESCRIPTION } from '../../constants/seoCopy'

const WhyOpinionated = (): React.ReactElement => {
  return (
    <JsonBlogPost
      title='Why I Prefer Opinionated Frameworks'
      author='Raymond Perez'
      date='2024-07-04'
      content={articleContent as ArticleContent[]}
      description={OPINIONATED_META_DESCRIPTION}
    />
  )
}

export default WhyOpinionated
