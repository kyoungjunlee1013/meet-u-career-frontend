export const HashtagFilterModalSkeleton = () => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
      </div>
      <div className="space-y-4 mb-4">
        <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
        <div className="grid grid-cols-2 gap-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-8 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <div className="h-10 w-20 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-10 w-20 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  </div>
)

export const CreatePostModalSkeleton = () => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg w-full max-w-xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
      </div>
      <div className="space-y-4 mb-4">
        <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-40 bg-gray-200 rounded animate-pulse"></div>
        <div className="flex space-x-2">
          <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  </div>
)

export const ScheduleModalSkeleton = () => (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div className="bg-white rounded-lg w-full max-w-lg relative max-h-[90vh] p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
      </div>
      <div className="space-y-4 mb-6">
        <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
      </div>
      <div className="flex justify-end space-x-2">
        <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  </div>
)

export const CompanyDetailModalSkeleton = () => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
      <div className="sticky top-0 bg-white p-4 border-b border-gray-200">
        <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
      </div>
      <div className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 w-full bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 w-full bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 w-full bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 w-full bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
        <div className="h-40 bg-gray-200 rounded animate-pulse"></div>
        <div className="flex justify-end space-x-2">
          <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  </div>
)

export const TagModalSkeleton = () => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
      </div>
      <div className="space-y-4 mb-6">
        <div className="space-y-2">
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <div className="h-10 w-20 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-10 w-20 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  </div>
)

export const AdminModalSkeleton = () => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
      </div>
      <div className="space-y-4 mb-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
      <div className="flex justify-end space-x-2">
        <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  </div>
)

export const JobPreviewModalSkeleton = () => (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
      <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex justify-between items-center">
        <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
      </div>
      <div className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-5 w-1/2 bg-gray-200 rounded animate-pulse"></div>
          <div className="flex flex-wrap gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-8 w-24 bg-gray-200 rounded-full animate-pulse"></div>
            ))}
          </div>
          <div className="h-5 w-40 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
        <div className="pt-6 border-t border-gray-200 space-y-4">
          <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-5 w-full bg-gray-200 rounded animate-pulse"></div>
          <div className="h-12 w-full bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  </div>
)
