import { User, Building2 } from "lucide-react"

export default function MembersStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white rounded-lg shadow p-4 flex items-center">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
          <User className="text-blue-500" size={20} />
        </div>
        <div>
          <div className="text-3xl font-bold text-gray-800">3</div>
          <div className="text-sm text-gray-500">개인회원</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4 flex items-center">
        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
          <Building2 className="text-indigo-500" size={20} />
        </div>
        <div>
          <div className="text-3xl font-bold text-gray-800">3</div>
          <div className="text-sm text-gray-500">기업회원</div>
        </div>
      </div>
    </div>
  )
}
