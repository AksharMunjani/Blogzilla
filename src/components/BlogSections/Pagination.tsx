import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
  selectedCategory?: string
  searchQuery?: string
}

export const Pagination = ({
  currentPage,
  totalPages,
  selectedCategory,
  searchQuery,
}: PaginationProps) => {
  const getPageUrl = (page: number) => {
    const params = new URLSearchParams()
    params.set('page', page.toString())
    if (selectedCategory) params.set('category', selectedCategory)
    if (searchQuery) params.set('search', searchQuery)
    return `/blog?${params.toString()}`
  }

  return (
    <div className="flex justify-center gap-2 mt-8">
      {currentPage > 1 && (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="px-4 py-2 text-gray-300 bg-gray-800 rounded-lg shadow hover:bg-gray-700 transition-colors border border-gray-700"
        >
          Previous
        </Link>
      )}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
        <Link
          key={pageNum}
          href={getPageUrl(pageNum)}
          className={`px-4 py-2 rounded-lg border ${
            pageNum === currentPage
              ? 'bg-blue-600 text-white border-blue-500'
              : 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700'
          }`}
        >
          {pageNum}
        </Link>
      ))}
      {currentPage < totalPages && (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="px-4 py-2 text-gray-300 bg-gray-800 rounded-lg shadow hover:bg-gray-700 transition-colors border border-gray-700"
        >
          Next
        </Link>
      )}
    </div>
  )
}
