// app/authors/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getAuthor, getPostsByAuthor, getAuthors } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import type { Metadata } from 'next'

export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const authors = await getAuthors()
  return authors.map((author) => ({
    slug: author.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const author = await getAuthor(slug)
  
  if (!author) {
    return {
      title: 'Author Not Found',
    }
  }
  
  return {
    title: `${author.metadata?.full_name || author.title} - Author Profile`,
    description: author.metadata?.bio || `Posts by ${author.metadata?.full_name || author.title}`,
  }
}

export default async function AuthorPage({ params }: PageProps) {
  const { slug } = await params
  const author = await getAuthor(slug)
  
  if (!author) {
    notFound()
  }
  
  const posts = await getPostsByAuthor(author.id)
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {author.metadata?.profile_photo && (
            <img
              src={`${author.metadata.profile_photo.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`}
              alt={author.metadata?.full_name || author.title}
              width={200}
              height={200}
              className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover"
            />
          )}
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {author.metadata?.full_name || author.title}
            </h1>
            {author.metadata?.bio && (
              <p className="text-lg text-gray-600 mb-6 max-w-2xl">
                {author.metadata.bio}
              </p>
            )}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {author.metadata?.email && (
                <a
                  href={`mailto:${author.metadata.email}`}
                  className="text-primary hover:text-primary-light transition-colors"
                >
                  Email
                </a>
              )}
              {author.metadata?.twitter && (
                <a
                  href={`https://twitter.com/${author.metadata.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-light transition-colors"
                >
                  Twitter
                </a>
              )}
              {author.metadata?.linkedin && (
                <a
                  href={author.metadata.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-light transition-colors"
                >
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Posts by {author.metadata?.full_name || author.title}
        </h2>
        
        {posts.length === 0 ? (
          <p className="text-gray-600 text-center py-12">No posts found by this author.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}