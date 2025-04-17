export const UserGrowthChartSkeleton = () => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <div className="flex justify-between items-center mb-4">
      <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
      <div className="flex space-x-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
        ))}
      </div>
    </div>
    <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
  </div>
)

export const UserDistributionChartSkeleton = () => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <div className="flex justify-between items-center mb-4">
      <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
    </div>
    <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
  </div>
)

export const JobCategoryChartSkeleton = () => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <div className="flex justify-between items-center mb-4">
      <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
    </div>
    <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
  </div>
)

export const ApplicationTrendChartSkeleton = () => <div className="h-[300px] bg-gray-200 rounded animate-pulse"></div>

export const ApplicationByJobTypeChartSkeleton = () => (
  <div className="h-[300px] bg-gray-200 rounded animate-pulse"></div>
)

export const ApplicationConversionRatesSkeleton = () => (
  <div className="space-y-6">
    <div className="h-6 w-full bg-gray-200 rounded animate-pulse"></div>
    <div className="grid grid-cols-2 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-5 w-full bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-2 w-full bg-gray-200 rounded animate-pulse"></div>
        </div>
      ))}
    </div>
  </div>
)
