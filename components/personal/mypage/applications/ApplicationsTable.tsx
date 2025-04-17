import { Eye, Trash2 } from "lucide-react"
import { ApplicationStatusBadge } from "./ApplicationStatusBadge"

export const ApplicationsTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="text-xs text-gray-600 bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 font-medium">
              기업명/공고
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              지원일
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              마감일
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              지원상태
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              지원이력서
            </th>
            <th scope="col" className="px-6 py-3 font-medium text-center">
              관리
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b hover:bg-gray-50">
            <td className="px-6 py-4">
              <div className="font-medium text-gray-900">(주)사람인HR</div>
              <div className="text-gray-500">웹 프론트엔드 개발자</div>
            </td>
            <td className="px-6 py-4">2023-05-15</td>
            <td className="px-6 py-4">2023-05-30</td>
            <td className="px-6 py-4">
              <ApplicationStatusBadge status="서류통과" />
            </td>
            <td className="px-6 py-4">웹 개발자 이력서</td>
            <td className="px-6 py-4">
              <div className="flex justify-center space-x-2">
                <button
                  type="button"
                  className="p-1.5 text-gray-500 hover:text-gray-700 focus:outline-none"
                  aria-label="보기"
                >
                  <Eye className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  className="p-1.5 text-gray-500 hover:text-red-500 focus:outline-none"
                  aria-label="삭제"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </td>
          </tr>
          <tr className="bg-white border-b hover:bg-gray-50">
            <td className="px-6 py-4">
              <div className="font-medium text-gray-900">테크스타트(주)</div>
              <div className="text-gray-500">React 개발자</div>
            </td>
            <td className="px-6 py-4">2023-05-10</td>
            <td className="px-6 py-4">2023-05-25</td>
            <td className="px-6 py-4">
              <ApplicationStatusBadge status="완수완료" />
            </td>
            <td className="px-6 py-4">프론트엔드 개발자 이력서</td>
            <td className="px-6 py-4">
              <div className="flex justify-center space-x-2">
                <button
                  type="button"
                  className="p-1.5 text-gray-500 hover:text-gray-700 focus:outline-none"
                  aria-label="보기"
                >
                  <Eye className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  className="p-1.5 text-gray-500 hover:text-red-500 focus:outline-none"
                  aria-label="삭제"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </td>
          </tr>
          <tr className="bg-white border-b hover:bg-gray-50">
            <td className="px-6 py-4">
              <div className="font-medium text-gray-900">글로벌소프트(주)</div>
              <div className="text-gray-500">백엔드 개발자</div>
            </td>
            <td className="px-6 py-4">2023-04-20</td>
            <td className="px-6 py-4">2023-05-10</td>
            <td className="px-6 py-4">
              <ApplicationStatusBadge status="최종합격" />
            </td>
            <td className="px-6 py-4">백엔드 개발자 이력서</td>
            <td className="px-6 py-4">
              <div className="flex justify-center space-x-2">
                <button
                  type="button"
                  className="p-1.5 text-gray-500 hover:text-gray-700 focus:outline-none"
                  aria-label="보기"
                >
                  <Eye className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  className="p-1.5 text-gray-500 hover:text-red-500 focus:outline-none"
                  aria-label="삭제"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </td>
          </tr>
          <tr className="bg-white border-b hover:bg-gray-50">
            <td className="px-6 py-4">
              <div className="font-medium text-gray-900">디지털시스템(주)</div>
              <div className="text-gray-500">풀스택 개발자</div>
            </td>
            <td className="px-6 py-4">2023-04-15</td>
            <td className="px-6 py-4">2023-04-30</td>
            <td className="px-6 py-4">
              <ApplicationStatusBadge status="불합격" />
            </td>
            <td className="px-6 py-4">웹 개발자 이력서</td>
            <td className="px-6 py-4">
              <div className="flex justify-center space-x-2">
                <button
                  type="button"
                  className="p-1.5 text-gray-500 hover:text-gray-700 focus:outline-none"
                  aria-label="보기"
                >
                  <Eye className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  className="p-1.5 text-gray-500 hover:text-red-500 focus:outline-none"
                  aria-label="삭제"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </td>
          </tr>
          <tr className="bg-white border-b hover:bg-gray-50">
            <td className="px-6 py-4">
              <div className="font-medium text-gray-900">네트워크솔루션(주)</div>
              <div className="text-gray-500">Node.js 백엔드 개발자</div>
            </td>
            <td className="px-6 py-4">2023-04-10</td>
            <td className="px-6 py-4">2023-04-25</td>
            <td className="px-6 py-4">
              <ApplicationStatusBadge status="면접예정" />
            </td>
            <td className="px-6 py-4">백엔드 개발자 이력서</td>
            <td className="px-6 py-4">
              <div className="flex justify-center space-x-2">
                <button
                  type="button"
                  className="p-1.5 text-gray-500 hover:text-gray-700 focus:outline-none"
                  aria-label="보기"
                >
                  <Eye className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  className="p-1.5 text-gray-500 hover:text-red-500 focus:outline-none"
                  aria-label="삭제"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
