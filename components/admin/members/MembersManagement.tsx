import MembersStats from "./MembersStats"
import MembersSearch from "./MembersSearch"
import MembersTable from "./MembersTable"

export default function MembersManagement() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">회원 관리</h1>
        <p className="text-gray-600 mt-1">개인회원과 기업회원 계정을 관리하고 상태를 변경할 수 있습니다.</p>
      </div>

      <MembersStats />

      <div className="bg-white rounded-lg shadow mt-6">
        <div className="p-4">
          <MembersSearch />
        </div>

        <MembersTable />
      </div>
    </div>
  )
}
