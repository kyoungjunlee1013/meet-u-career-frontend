import { ThumbsUp, Share2, Bell, FileText, Building2 } from "lucide-react"

export function ActionButtons() {
  return (
    <div className="bg-white rounded-md p-4 mb-6">
      <div className="flex flex-wrap gap-4 justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center">
            <ThumbsUp className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-sm">
            <div className="font-medium">기업리뷰가 많은</div>
            <div className="font-medium">BEST 기업입니다</div>
          </div>
        </div>

        <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
          <div className="w-6 h-6 bg-gray-50 rounded-full flex items-center justify-center">
            <Share2 className="w-4 h-4" />
          </div>
          <span>친구에게 공유 가능</span>
        </button>

        <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
          <div className="w-6 h-6 bg-gray-50 rounded-full flex items-center justify-center">
            <Bell className="w-4 h-4" />
          </div>
          <span>알림받기</span>
        </button>

        <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
          <div className="w-6 h-6 bg-gray-50 rounded-full flex items-center justify-center">
            <FileText className="w-4 h-4" />
          </div>
          <span>리뷰쓰고 기프티콘 받기</span>
        </button>

        <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
          <div className="w-6 h-6 bg-gray-50 rounded-full flex items-center justify-center">
            <Building2 className="w-4 h-4" />
          </div>
          <span>현재 근무 사원수 40만명</span>
        </button>

        <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
          <div className="w-6 h-6 bg-gray-50 rounded-full flex items-center justify-center">
            <span className="text-xs">📝</span>
          </div>
          <span>원티드 채용 확인</span>
        </button>
      </div>
    </div>
  )
}
