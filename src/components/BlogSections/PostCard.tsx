import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '@/lib/dateFormat'
import type { Post, Media } from '@/payload-types'

const isMedia = (value: unknown): value is Media => {
  return typeof value === 'object' && value !== null && 'url' in value
}

interface PostCardProps {
  post: Post
}

export const PostCard = ({ post }: PostCardProps) => {
  const postImage = post?.meta?.image && isMedia(post.meta.image) ? post.meta.image : null

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
      {postImage?.url && (
        <div className="relative h-48 w-full">
          <Image
            src={postImage.url}
            alt={post.title || ''}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-6">
        <Link href={`/blog/${post.id}`}>
          <h3 className="text-xl font-bold text-gray-200 mb-2 hover:text-blue-400 transition-colors">
            {post.title}
          </h3>
        </Link>
        <p className="text-gray-400 text-sm mb-4">
          {formatDate(post.createdAt)}
        </p>
        <p className="text-gray-300">{post.meta?.description}</p>
      </div>
    </div>
  )
}
