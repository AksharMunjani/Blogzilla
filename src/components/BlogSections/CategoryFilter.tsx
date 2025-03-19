import Link from 'next/link'

interface Category {
  id: string
  title: string
}

interface CategoryFilterProps {
  categories: Category[]
  selectedCategory?: string
  searchQuery?: string
}

export const CategoryFilter = ({ categories, selectedCategory, searchQuery }: CategoryFilterProps) => {
  return (
    <ul className="flex flex-wrap gap-x-3 gap-y-6">
      <li>
        <Link
          href={`/blog${searchQuery ? `?search=${searchQuery}` : ''}`}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            !selectedCategory
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          All
        </Link>
      </li>
      {categories.map((category) => (
        <li key={category.id}>
          <Link
            href={`/blog?category=${category.id}${searchQuery ? `&search=${searchQuery}` : ''}`}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {category.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}
