import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { ApplicationStatusChart } from "./ApplicationStatusChart"

export function RecentApplications() {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">최근 지원 현황</h2>
        <Link href="/personal/applications" className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
          전체보기 <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-md"></div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">(주)사람인HR</p>
                    <h3 className="text-base font-semibold text-gray-900 mt-0.5">프론트엔드 개발자</h3>
                    <p className="text-xs text-gray-500 mt-1">지원일: 2023-03-20</p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <p className="text-xs text-gray-500">
                      마감 날짜: <span className="text-blue-600 font-medium">2023-03-28</span>
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>
                      현재 진행 상태: <span className="text-blue-600 font-medium">1차 면접</span>
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                  </div>

                  <div className="flex justify-between mt-3">
                    <div className="text-center flex-1">
                      <div className="text-xs font-medium text-gray-500">서류 제출</div>
                    </div>
                    <div className="text-center flex-1">
                      <div className="text-xs font-medium text-gray-500">서류 통과</div>
                    </div>
                    <div className="text-center flex-1">
                      <div className="text-xs font-medium text-blue-600">1차 면접</div>
                    </div>
                    <div className="text-center flex-1">
                      <div className="text-xs font-medium text-gray-500">최종 합격</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-700 mb-4">총 지원현황</h3>
              <ApplicationStatusChart />
              <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                  <span className="text-xs text-gray-600">서류 통과</span>
                  <span className="ml-auto text-xs font-medium">3건</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                  <span className="text-xs text-gray-600">1차 면접</span>
                  <span className="ml-auto text-xs font-medium">2건</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                  <span className="text-xs text-gray-600">최종 면접</span>
                  <span className="ml-auto text-xs font-medium">1건</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                  <span className="text-xs text-gray-600">불합격</span>
                  <span className="ml-auto text-xs font-medium">4건</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
