export const ProfileHeader = () => {
  return (
    <div className="flex items-center">
      <div className="w-32 h-32 rounded-full bg-purple-500 text-white flex items-center justify-center text-3xl font-medium mr-6 flex-shrink-0">
        <span>연화</span>
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-2">조연화</h1>
        <p className="text-gray-600 mb-2">없음 • 자바 개발자</p>
        <p className="text-gray-600 text-sm">팔로워 1 • 팔로잉 1</p>
      </div>
    </div>
  )
}
