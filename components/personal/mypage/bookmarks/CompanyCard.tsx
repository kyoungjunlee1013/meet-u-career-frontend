"use client"

import { MapPin, Users, Calendar, Trash2, Eye } from "lucide-react"

interface Company {
  id: string
  name: string
  industry: string
  size: string
  location: string
  employees: string
  founded: string
}

interface CompanyCardProps {
  company: Company
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 relative">
      <div className="absolute top-4 right-4">
        <button className="text-gray-400 hover:text-red-500 transition-colors">
          <Trash2 className="h-5 w-5" />
        </button>
      </div>

      <div className="p-6">
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-900">{company.name}</h3>
          <p className="text-gray-600 text-sm mt-1">
            {company.industry} | {company.size}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 mb-4">
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{company.location}</span>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <Users className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{company.employees}</span>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>설립: {company.founded}</span>
          </div>
        </div>

        <button className="w-full flex items-center justify-center py-2.5 text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors">
          <Eye className="h-4 w-4 mr-2" />
          기업 정보 보기
        </button>
      </div>
    </div>
  )
}
