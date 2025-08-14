import { getPosts } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import Hero from '@/components/Hero'

export const revalidate = 60

export default async function HomePage() {
  const posts = await getPosts()
  
  return (
    <div>
      <Hero />
      
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Posts</h2>
        
        {posts.length === 0 ? (
          <p className="text-gray-600 text-center py-12">No posts found. Check back soon!</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}