import { AlertTriangle } from "lucide-react"

export const AccountDeleteTab = () => {
  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-4">회원 탈퇴</h2>

      <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">회원 탈퇴 전 주의사항</h3>
            <p className="text-sm text-red-700 mt-1">
              회원 탈퇴 시 모든 개인 정보와 이력서, 지원 내역 등이 삭제되며 복구할 수 없습니다.
            </p>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-6">탈퇴하기 전에 알아두세요:</p>

      <ul className="list-disc pl-5 space-y-2 mb-8 text-sm text-gray-600">
        <li>모든 개인 정보가 영구적으로 삭제됩니다.</li>
        <li>작성한 이력서와 지원 내역이 모두 삭제됩니다.</li>
        <li>기업과의 메시지 내역이 모두 삭제됩니다.</li>
        <li>탈퇴 후 30일간 동일한 이메일로 재가입이 제한됩니다.</li>
      </ul>

      <div className="flex justify-end">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          회원 탈퇴
        </button>
      </div>
    </div>
  )
}
