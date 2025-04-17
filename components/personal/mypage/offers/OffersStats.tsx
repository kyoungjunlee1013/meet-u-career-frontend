import type React from "react"
import { FileText, Clock, Award } from "lucide-react"

export function OffersStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <StatCard icon={<FileText />} count={3} label="총 제안" />
      <StatCard icon={<Clock />} count={1} label="검토중" />
      <StatCard icon={<Award />} count={1} label="수락함" />
    </div>
  )
}

function StatCard({ icon, count, label }: { icon: React.ReactNode; count: number; label: string }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 flex items-start">
      <div className="bg-blue-50 p-3 rounded-full mr-4 flex items-center justify-center">
        <div className="text-blue-500 w-5 h-5">{icon}</div>
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{count}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  )
}
