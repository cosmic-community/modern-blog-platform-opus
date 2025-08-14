import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Post } from '@/types'

interface PostContentProps {
  post: Post
}

export default function PostContent({ post }: PostContentProps) {
  const featuredImage = post.metadata?.featured_image
  const category = post.metadata?.category
  const author = post.metadata?.author
  const publishDate = post.metadata?.publish_date
  const content = post.metadata?.content || post.content || ''
  
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {featuredImage && (
        <img
          src={`${featuredImage.imgix_url}?w=1600&h=800&fit=crop&auto=format,compress`}
          alt={post.metadata?.title || post.title}
          width={800}
          height={400}
          className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
        />
      )}
      
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
          {category && (
            <Link
              href={`/categories/${category.slug}`}
              className="text-primary hover:text-primary-light transition-colors font-medium"
            >
              {category.metadata?.name || category.title}
            </Link>
          )}
          {publishDate && (
            <time dateTime={publishDate}>
              {new Date(publishDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          )}
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          {post.metadata?.title || post.title}
        </h1>
        
        {author && (
          <div className="flex items-center gap-4">
            {author.metadata?.profile_photo && (
              <img
                src={`${author.metadata.profile_photo.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                alt={author.metadata?.full_name || author.title}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover"
              />
            )}
            <div>
              <p className="font-medium text-gray-900">
                <Link
                  href={`/authors/${author.slug}`}
                  className="hover:text-primary transition-colors"
                >
                  {author.metadata?.full_name || author.title}
                </Link>
              </p>
              {author.metadata?.bio && (
                <p className="text-sm text-gray-600 line-clamp-1">
                  {author.metadata.bio}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
      
      <div className="prose-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </div>
    </article>
  )
}