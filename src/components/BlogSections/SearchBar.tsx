interface SearchBarProps {
  defaultValue?: string
}

export const SearchBar = ({ defaultValue }: SearchBarProps) => {
  return (
    <form className="flex gap-2">
      <input
        type="text"
        name="search"
        defaultValue={defaultValue}
        placeholder="Search posts..."
        className="flex-1 px-4 py-2 bg-gray-700 text-gray-200 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
      />
      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Search
      </button>
    </form>
  )
}
