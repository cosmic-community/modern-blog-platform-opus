// app/posts/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getPost, getPosts } from '@/lib/cosmic'
import PostContent from '@/components/PostContent'
import type { Metadata } from 'next'

export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }
  
  return {
    title: post.metadata?.seo_title || post.metadata?.title || post.title,
    description: post.metadata?.seo_description || post.metadata?.excerpt || '',
    openGraph: {
      title: post.metadata?.seo_title || post.metadata?.title || post.title,
      description: post.metadata?.seo_description || post.metadata?.excerpt || '',
      images: post.metadata?.featured_image ? [post.metadata.featured_image.imgix_url] : [],
    },
  }
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPost(slug)
  
  if (!post) {
    notFound()
  }
  
  return <PostContent post={post} />
}