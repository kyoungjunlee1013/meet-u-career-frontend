import { Skeleton } from "@/components/ui/skeleton"

export default function EditResumeLoading() {
  return (
    <main className="min-h-screen bg-gray-50 pt-16 md:pl-64">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Skeleton className="h-8 w-48 mb-6" />

        {/* Basic info card skeleton */}
        <Skeleton className="h-64 w-full rounded-lg mb-6" />

        {/* Section editor skeletons */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-7/10 lg:w-7/10 space-y-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-48 w-full rounded-lg" />
            ))}
          </div>
          <div className="w-full md:w-3/10 lg:w-3/10">
            <Skeleton className="h-64 w-full rounded-lg sticky top-20" />
          </div>
        </div>
      </div>
    </main>
  )
}
