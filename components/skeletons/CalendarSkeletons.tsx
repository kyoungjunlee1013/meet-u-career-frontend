export const CalendarSkeleton = () => (
  <div className="bg-white border rounded-md p-6">
    <div className="flex justify-between items-center mb-6">
      <div className="flex gap-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
      </div>
      <div className="h-9 w-28 bg-gray-200 rounded animate-pulse"></div>
    </div>
    <div className="grid grid-cols-7 gap-0 border-t border-l">
      {[...Array(7)].map((_, i) => (
        <div key={`header-${i}`} className="py-2 text-center border-r border-b bg-gray-100">
          <div className="h-5 w-8 mx-auto bg-gray-200 rounded animate-pulse"></div>
        </div>
      ))}
      {[...Array(42)].map((_, i) => (
        <div key={`cell-${i}`} className="min-h-[100px] p-2 border-r border-b relative">
          <div className="h-5 w-5 mb-2 bg-gray-200 rounded animate-pulse"></div>
          {i % 7 === 2 && (
            <>
              <div className="h-6 w-full mb-1 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 w-full mb-1 bg-gray-200 rounded animate-pulse"></div>
            </>
          )}
          {i % 11 === 0 && <div className="h-6 w-full mb-1 bg-gray-200 rounded animate-pulse"></div>}
        </div>
      ))}
    </div>
  </div>
)

export const ScheduleCalendarSkeleton = () => (
  <div className="bg-white rounded-lg shadow p-4 h-[600px]">
    <div className="flex justify-between items-center mb-4">
      <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
      <div className="flex space-x-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
        ))}
      </div>
    </div>
    <div className="h-[calc(100%-60px)] bg-gray-200 rounded animate-pulse"></div>
  </div>
)
