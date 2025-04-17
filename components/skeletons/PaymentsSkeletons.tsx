export const PaymentsTableSkeleton = () => {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-full divide-y divide-gray-200">
        <div className="bg-gray-50 py-3">
          <div className="grid grid-cols-9 gap-4 px-6">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="h-5 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
        <div className="bg-white divide-y divide-gray-200">
          {[...Array(5)].map((_, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-9 gap-4 px-6 py-4">
              {[...Array(9)].map((_, colIndex) => (
                <div
                  key={colIndex}
                  className={`h-5 bg-gray-200 rounded animate-pulse ${colIndex === 3 ? "w-16" : "w-full"}`}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const PaymentsFiltersSkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-10 bg-gray-200 rounded animate-pulse"></div>
        ))}
      </div>
      <div className="flex items-center">
        <div className="flex-grow mr-2">
          <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="h-10 w-20 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  )
}

export const PaymentsPaginationSkeleton = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between">
      <div className="h-5 w-48 bg-gray-200 rounded animate-pulse mb-4 sm:mb-0"></div>
      <div className="flex items-center">
        <div className="flex space-x-1 mr-4">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="h-10 w-10 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
        <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  )
}
