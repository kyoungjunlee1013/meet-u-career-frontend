import { InterviewList } from "./InterviewList"
import { Pagination } from "./Pagination"

export function InterviewStatusTab() {
  return (
    <div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-medium text-gray-900">면접 일정</h3>
          <div className="flex space-x-2">
            <select className="text-sm border border-gray-300 rounded-md px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>최신순</option>
              <option>오래된순</option>
              <option>회사명순</option>
            </select>
            <button className="text-sm bg-blue-50 text-blue-600 px-3 py-1.5 rounded-md hover:bg-blue-100 transition-colors">
              필터
            </button>
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          <InterviewList />
        </div>
        <div className="p-4 border-t border-gray-100 flex justify-center">
          <Pagination />
        </div>
      </div>
    </div>
  )
}
