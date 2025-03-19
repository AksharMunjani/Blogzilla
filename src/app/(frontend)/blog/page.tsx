import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { SearchBar } from '../../../components/BlogSections/SearchBar'
import { CategoryFilter } from '../../../components/BlogSections/CategoryFilter'
import { PostCard } from '../../../components/BlogSections/PostCard'
import { Pagination } from '../../../components/BlogSections/Pagination'
import type { Post } from '@/payload-types'

interface SearchParams {
  page?: string
  category?: string
  search?: string
}

interface Props {
  searchParams: Promise<SearchParams>
}

const POSTS_PER_PAGE = 6

const BlogPage = async ({ searchParams }: Props) => {
  const params = await searchParams
  const currentPage = Number(params.page) || 1
  const selectedCategory = params.category
  const searchQuery = params.search || ''
  const payload = await getPayload({ config: configPromise })

  const postsQuery = {
    collection: 'posts' as const,
    depth: 2,
    where: {
      _status: {
        equals: 'published',
      },
      ...(selectedCategory && {
        categories: {
          equals: selectedCategory,
        },
      }),
      ...(searchQuery && {
        title: {
          like: searchQuery,
        },
      }),
    },
    limit: POSTS_PER_PAGE,
    page: currentPage,
  }

  const [posts, categories] = await Promise.all([
    payload.find(postsQuery),
    payload.find({
      collection: 'categories' as const,
      depth: 1,
    }),
  ])

  const totalPages = Math.ceil(posts.totalDocs / POSTS_PER_PAGE)

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-101px)] bg-gray-900 p-6">
      <div className="w-full max-w-6xl mb-8">
        <h2 className="text-2xl font-bold text-gray-200 mb-4">Categories</h2>
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 space-y-4">
          <SearchBar defaultValue={searchQuery} />
          <CategoryFilter
            categories={categories.docs}
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
          />
        </div>
      </div>

      {posts.docs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
          {posts.docs.map((post) => (
            <PostCard key={post.id} post={post as Post} />
          ))}
        </div>
      ) : (
        <div className="text-gray-400 text-center py-12">No posts found</div>
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
        />
      )}
    </div>
  )
}

export default BlogPage
