import Link from 'next/link'
import { Post } from '@/types'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const featuredImage = post.metadata?.featured_image
  const category = post.metadata?.category
  const author = post.metadata?.author
  const publishDate = post.metadata?.publish_date
  
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {featuredImage && (
        <Link href={`/posts/${post.slug}`}>
          <img
            src={`${featuredImage.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
            alt={post.metadata?.title || post.title}
            width={400}
            height={200}
            className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
          />
        </Link>
      )}
      
      <div className="p-6">
        {category && (
          <Link
            href={`/categories/${category.slug}`}
            className="inline-block text-sm font-medium text-primary hover:text-primary-light transition-colors mb-2"
          >
            {category.metadata?.name || category.title}
          </Link>
        )}
        
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          <Link href={`/posts/${post.slug}`} className="hover:text-primary transition-colors">
            {post.metadata?.title || post.title}
          </Link>
        </h2>
        
        {post.metadata?.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-2">
            {post.metadata.excerpt}
          </p>
        )}
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          {author && (
            <Link
              href={`/authors/${author.slug}`}
              className="hover:text-primary transition-colors"
            >
              {author.metadata?.full_name || author.title}
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
      </div>
    </article>
  )
}