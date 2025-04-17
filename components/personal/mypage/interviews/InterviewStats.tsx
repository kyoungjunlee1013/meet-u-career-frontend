export function InterviewStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">전체 면접</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">3</p>
          </div>
          <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
              <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M3 10H21" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">예정된 면접</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">1</p>
          </div>
          <div className="h-12 w-12 bg-green-50 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M16 12H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">완료된 면접</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">2</p>
          </div>
          <div className="h-12 w-12 bg-purple-50 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-purple-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5 13L9 17L19 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
