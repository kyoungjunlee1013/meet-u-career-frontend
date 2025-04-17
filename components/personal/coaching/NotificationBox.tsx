import { FileText } from "lucide-react"

export const NotificationBox = () => {
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-md p-4 mb-6 flex items-start">
      <div className="bg-blue-500 text-white rounded-full p-2 mr-3">
        <FileText className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-700">모든 기능을 이용하려면 로그인하세요</p>
        <p className="text-xs text-gray-500 mt-1">
          로그인하면 모든 항목을 관리하고 AI 코칭을 받을 수 있습니다. 지금 로그인하고 자기소개서 작성에 도움을 받으세요!
        </p>
      </div>
      <button className="bg-blue-500 text-white text-sm px-4 py-1.5 rounded-md hover:bg-blue-600">로그인</button>
    </div>
  )
}
