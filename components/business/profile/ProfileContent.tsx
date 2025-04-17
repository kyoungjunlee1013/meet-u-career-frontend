import { ProfileForm } from "./ProfileForm"

export const ProfileContent = () => {
  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">기업정보 수정</h1>
        <p className="text-sm text-gray-500 mt-1">회사 정보를 수정하여 구직자들에게 정확한 정보를 제공해 주세요.</p>
      </div>
      <ProfileForm />
    </div>
  )
}
