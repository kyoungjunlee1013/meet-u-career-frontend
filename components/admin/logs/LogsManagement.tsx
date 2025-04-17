import LogsFilter from "./LogsFilter"
import LogsTable from "./LogsTable"
import LogsPagination from "./LogsPagination"

export default function LogsManagement() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">시스템 로그</h1>
        <p className="text-gray-600">
          시스템 전체 로그를 조회하고 관리합니다. 날짜, 키워드, 로그 유형으로 필터링할 수 있습니다.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <LogsFilter />
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <LogsTable />
        <div className="p-4 border-t">
          <LogsPagination />
        </div>
      </div>
    </div>
  )
}
