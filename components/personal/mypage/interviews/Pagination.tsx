export function Pagination() {
  return (
    <div className="flex items-center justify-center space-x-1">
      <button
        className="px-2 py-1 rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button className="px-3 py-1 rounded-md bg-blue-50 text-blue-600 font-medium">1</button>
      <button className="px-3 py-1 rounded-md text-gray-700 hover:bg-gray-100">2</button>
      <button className="px-3 py-1 rounded-md text-gray-700 hover:bg-gray-100">3</button>
      <button className="px-2 py-1 rounded-md text-gray-500 hover:bg-gray-100">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}
