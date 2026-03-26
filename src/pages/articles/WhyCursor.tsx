import React from 'react'
import JsonBlogPost from '../../components/JsonBlogPost'
import { ArticleContent } from '../../types/articleContent'
import articleContent from '../../data/articles/WhyCursor.json'

const WhyCursor = (): React.ReactElement => {
  return (
    <JsonBlogPost
      title='Why I Choose Cursor'
      author='Raymond Perez'
      date='2026-03-25'
      content={articleContent as ArticleContent[]}
    />
  )
}

export default WhyCursor
