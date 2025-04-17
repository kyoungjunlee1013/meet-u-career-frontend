import { ApplicationMetricCards } from "./ApplicationMetricCards"
import { ApplicationTrendChart } from "./ApplicationTrendChart"
import { ApplicationByJobTypeChart } from "./ApplicationByJobTypeChart"
import { ApplicationConversionRates } from "./ApplicationConversionRates"
import { ApplicationByAgeChart } from "./ApplicationByAgeChart"
import { TopApplicationCompanies } from "./TopApplicationCompanies"
import { ApplicationTimeAnalysis } from "./ApplicationTimeAnalysis"

export default function ApplicationStatusDashboard() {
  return (
    <div className="space-y-6">
      <ApplicationMetricCards />

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">지원 추이</h2>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-xs rounded border border-gray-200 text-gray-600 hover:bg-gray-50">
              일간
            </button>
            <button className="px-3 py-1 text-xs rounded border border-gray-200 text-gray-600 hover:bg-gray-50">
              주간
            </button>
            <button className="px-3 py-1 text-xs rounded bg-blue-500 text-white">월간</button>
            <button className="px-3 py-1 text-xs rounded border border-gray-200 text-gray-600 hover:bg-gray-50">
              연간
            </button>
          </div>
        </div>
        <ApplicationTrendChart />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">직무별 지원 현황</h2>
            <button className="text-gray-500 text-xs">상세 보기</button>
          </div>
          <ApplicationByJobTypeChart />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">지원 전환율</h2>
            <button className="text-gray-500 text-xs">상세 보기</button>
          </div>
          <ApplicationConversionRates />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">지원자 연령분포</h2>
            <button className="text-gray-500 text-xs">상세 보기</button>
          </div>
          <ApplicationByAgeChart />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">지원자 많은 기업 TOP 5</h2>
            <button className="text-gray-500 text-xs">상세 보기</button>
          </div>
          <TopApplicationCompanies />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">지원 시간 시간</h2>
          <button className="text-gray-500 text-xs">상세 보기</button>
        </div>
        <ApplicationTimeAnalysis />
      </div>
    </div>
  )
}
