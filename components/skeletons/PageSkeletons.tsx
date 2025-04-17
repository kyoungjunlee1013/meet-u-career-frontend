export const FindIdResultSkeleton = () => (
  <div className="space-y-4">
    <div className="h-32 w-full bg-gray-200 rounded animate-pulse"></div>
    <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
    <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
  </div>
)

export const FindPasswordVerificationSkeleton = () => (
  <div className="space-y-4">
    <div className="h-24 w-full bg-gray-200 rounded animate-pulse"></div>
    <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
    <div className="flex gap-2">
      <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
      <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
    </div>
    <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
  </div>
)

export const FindPasswordResetSkeleton = () => (
  <div className="space-y-4">
    <div className="h-24 w-full bg-gray-200 rounded animate-pulse"></div>
    <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
    <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
    <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
    <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
  </div>
)

export const ApplicantDetailSkeleton = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
      <div className="flex space-x-2">
        <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {/* Basic Info Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="space-y-4">
            <div className="flex justify-between">
              <div className="h-7 w-40 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-7 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-6 w-full bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="grid grid-cols-3 border-b">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-12 px-4 flex items-center justify-center">
                <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-20 w-full bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Profile Photo Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="h-40 w-40 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Status Management Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="space-y-4">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
            <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Notes Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="space-y-4">
            <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-32 w-full bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export const JobPostingFormSkeleton = () => (
  <div className="space-y-6">
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4"></div>
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-4"></div>
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4"></div>
      <div className="space-y-4">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>

    <div className="flex justify-end space-x-4">
      <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
    </div>
  </div>
)

export const AdminProfileSkeleton = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="h-40 w-40 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-5 w-48 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="w-full md:w-3/4">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex p-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="px-4 py-2">
                  <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}

              <div className="flex justify-end space-x-2">
                <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)
