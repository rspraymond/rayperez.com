import React from 'react'
import BlogPost from './BlogPost'
import ArticleRenderer from './ArticleRenderer'
import { ArticleDocument } from '../types/articleContent'
import { flattenArticleText } from '../utils/articleText'

interface JsonBlogPostProps {
  title: string
  author: string
  date: string
  content: ArticleDocument
}

const JsonBlogPost: React.FC<JsonBlogPostProps> = ({ title, author, date, content }) => {
  const [readingText, setReadingText] = React.useState<string | undefined>(undefined)

  React.useEffect(() => {
    const id = setTimeout(() => {
      setReadingText(flattenArticleText(content))
    }, 0)
    return () => clearTimeout(id)
  }, [content])

  return (
    <BlogPost title={title} author={author} date={date} readingText={readingText}>
      <ArticleRenderer content={content} />
    </BlogPost>
  )
}

export default JsonBlogPost
