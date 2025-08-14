// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getCategory, getPostsByCategory, getCategories } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import type { Metadata } from 'next'

export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategory(slug)
  
  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }
  
  return {
    title: `${category.metadata?.name || category.title} - Blog Categories`,
    description: category.metadata?.description || `Browse posts in ${category.metadata?.name || category.title}`,
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const category = await getCategory(slug)
  
  if (!category) {
    notFound()
  }
  
  const posts = await getPostsByCategory(category.id)
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 text-center">
        {category.metadata?.thumbnail_image && (
          <img
            src={`${category.metadata.thumbnail_image.imgix_url}?w=1200&h=400&fit=crop&auto=format,compress`}
            alt={category.metadata?.name || category.title}
            width={600}
            height={200}
            className="w-full max-w-4xl mx-auto h-48 md:h-64 object-cover rounded-lg mb-6"
          />
        )}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {category.metadata?.name || category.title}
        </h1>
        {category.metadata?.description && (
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {category.metadata.description}
          </p>
        )}
      </div>
      
      {posts.length === 0 ? (
        <p className="text-gray-600 text-center py-12">No posts found in this category.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}