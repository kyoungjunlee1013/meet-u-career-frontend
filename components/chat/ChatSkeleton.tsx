import { Skeleton } from "@/components/ui/skeleton"

export function ChatSkeleton() {
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar Skeleton */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        {/* Search Bar Skeleton */}
        <div className="p-4 border-b border-gray-200">
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        {/* Chat List Skeleton */}
        <div className="flex-1 overflow-auto p-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-2 mb-2">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-1/2" />
              </div>
              <Skeleton className="h-3 w-10" />
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area Skeleton */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header Skeleton */}
        <div className="p-4 border-b border-gray-200 flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div>
            <Skeleton className="h-5 w-40 mb-1" />
            <Skeleton className="h-3 w-24" />
          </div>
          <div className="ml-auto">
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>

        {/* Chat Messages Skeleton */}
        <div className="flex-1 p-4 overflow-auto">
          {/* Received Message */}
          <div className="flex mb-4">
            <Skeleton className="h-8 w-8 rounded-full mr-2" />
            <div>
              <Skeleton className="h-20 w-64 rounded-lg" />
              <Skeleton className="h-3 w-16 mt-1" />
            </div>
          </div>

          {/* Sent Message */}
          <div className="flex justify-end mb-4">
            <div className="flex flex-col items-end">
              <Skeleton className="h-16 w-72 rounded-lg" />
              <Skeleton className="h-3 w-16 mt-1" />
            </div>
          </div>

          {/* Received Message */}
          <div className="flex mb-4">
            <Skeleton className="h-8 w-8 rounded-full mr-2" />
            <div>
              <Skeleton className="h-24 w-80 rounded-lg" />
              <Skeleton className="h-3 w-16 mt-1" />
            </div>
          </div>
        </div>

        {/* Chat Input Skeleton */}
        <div className="p-4 border-t border-gray-200">
          <Skeleton className="h-12 w-full rounded-full" />
        </div>
      </div>
    </div>
  )
}
