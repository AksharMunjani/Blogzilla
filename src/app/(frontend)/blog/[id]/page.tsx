import { getPayload } from 'payload'
import React from 'react'
import configPromise from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '@/lib/dateFormat'
import { notFound } from 'next/navigation'
import type { Post, Media } from '@/payload-types'
import RichText from '@/components/RichText'

const isMedia = (value: unknown): value is Media => {
  return typeof value === 'object' && value !== null && 'url' in value
}

async function SingleBlogPost({ params }: any) {
  const payload = await getPayload({ config: configPromise })

  try {
    const post = await payload.findByID({
      collection: 'posts',
      id: params.id,
    })

    if (!post) {
      return notFound()
    }

    const typedPost = post as Post
    const postImage =
      typedPost?.meta?.image && isMedia(typedPost.meta.image) ? typedPost.meta.image : null

    return (
      <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-700">
          {postImage?.url && (
            <div className="relative h-96 w-full">
              <Image
                src={postImage.url}
                fill
                className="object-cover"
                alt={typedPost.title || ''}
                priority
              />
            </div>
          )}
          <div className="p-8">
            <Link
              href="/blog"
              className="text-blue-400 hover:text-blue-300 hover:underline mb-6 inline-block"
            >
              ← Back to Blog
            </Link>
            <h1 className="text-4xl font-bold text-gray-100 mt-4">{typedPost.title}</h1>
            <div className="mt-4 text-gray-400">
              {typedPost.publishedAt && (
                <time dateTime={typedPost.publishedAt}>{formatDate(typedPost.publishedAt)}</time>
              )}
            </div>
            <div className="mt-8 prose prose-lg prose-invert max-w-none">
              <RichText content={post.content as Record<string, any>} enableGutter={false} />
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return notFound()
  }
}

export default SingleBlogPost
