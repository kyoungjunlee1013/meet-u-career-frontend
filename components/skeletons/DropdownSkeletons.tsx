export const NotificationDropdownSkeleton = () => (
  <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-50 border">
    <div className="p-4 border-b border-gray-100">
      <div className="flex justify-between items-center">
        <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
      </div>
    </div>
    <div className="max-h-[320px] overflow-y-auto">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="p-4 border-b border-gray-100">
          <div className="flex items-start">
            <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse mr-3"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="p-3 text-center border-t border-gray-100">
      <div className="h-5 w-32 mx-auto bg-gray-200 rounded animate-pulse"></div>
    </div>
  </div>
)

export const ChatDropdownSkeleton = () => (
  <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-50 border">
    <div className="p-4 border-b border-gray-100">
      <div className="flex justify-between items-center">
        <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
      </div>
    </div>
    <div className="max-h-[320px] overflow-y-auto">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="p-4 border-b border-gray-100">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-gray-200 rounded-full animate-pulse mr-3"></div>
            <div className="flex-1 space-y-2">
              <div className="flex justify-between">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="p-3 text-center border-t border-gray-100">
      <div className="h-5 w-32 mx-auto bg-gray-200 rounded animate-pulse"></div>
    </div>
  </div>
)

export const ProfileDropdownSkeleton = () => (
  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-50 border">
    <div className="py-3 px-4 border-b border-gray-100">
      <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
    </div>
    <div className="py-2">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="px-4 py-2">
          <div className="h-5 w-full bg-gray-200 rounded animate-pulse"></div>
        </div>
      ))}
    </div>
    <div className="py-2 border-t border-gray-100">
      <div className="px-4 py-2">
        <div className="h-5 w-full bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  </div>
)

export const FilterDropdownSkeleton = () => (
  <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-5">
    <div className="flex justify-between items-center mb-4">
      <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
    </div>
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="grid grid-cols-2 gap-2">
            {[...Array(4)].map((_, j) => (
              <div key={j} className="h-8 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      ))}
    </div>
    <div className="flex justify-end mt-6 space-x-2">
      <div className="h-9 w-20 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-9 w-20 bg-gray-200 rounded animate-pulse"></div>
    </div>
  </div>
)
