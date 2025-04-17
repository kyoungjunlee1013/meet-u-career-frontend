export const ApplicationsTabs = () => {
  return (
    <div className="border-b border-gray-200">
      <nav className="flex -mb-px space-x-8">
        <a
          href="#"
          className="border-b-2 border-blue-500 py-4 px-1 text-sm font-medium text-blue-600 whitespace-nowrap"
          aria-current="page"
        >
          전체 <span className="ml-1 text-blue-600">5</span>
        </a>
        <a
          href="#"
          className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap"
        >
          지원완료 <span className="ml-1 text-gray-500">1</span>
        </a>
        <a
          href="#"
          className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap"
        >
          서류통과 <span className="ml-1 text-gray-500">1</span>
        </a>
        <a
          href="#"
          className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap"
        >
          최종합격 <span className="ml-1 text-gray-500">1</span>
        </a>
        <a
          href="#"
          className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap"
        >
          불합격 <span className="ml-1 text-gray-500">1</span>
        </a>
      </nav>
    </div>
  )
}
