"use client"

import { Building, MapPin, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Props {
  companyId: number
  companyName: string
  industry: string
  address: string
  foundedDate: string
  employeeScale: string
}

export const CompanyProfile = ({
  companyId,
  companyName,
  industry,
  address,
  foundedDate,
  employeeScale,
}: Props) => {
  return (
    <div className="bg-white rounded-md shadow-sm p-6 mb-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
            <Image
              src="/placeholder.svg?height=64&width=64"
              alt="Company logo"
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-lg font-medium">{companyName}</h1>
            <div className="flex items-center mt-2 text-sm text-gray-600">
              <div className="flex items-center mr-4">
                <Building className="h-4 w-4 mr-1 text-blue-500" />
                <span>{industry}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1 text-blue-500" />
                <span>{address}</span>
              </div>
            </div>
            <div className="flex items-center mt-1 text-sm text-gray-600">
              <div className="flex items-center mr-4">
                <Users className="h-4 w-4 mr-1 text-blue-500" />
                <span>{employeeScale}</span>
              </div>
              <div className="flex items-center">
                <span className="text-blue-500 mr-1">•</span>
                <span>{foundedDate}</span>
              </div>
            </div>
          </div>
        </div>

        <Link
          href={`/business/profile/edit?companyId=${encodeURIComponent(companyId)}`}
          className="flex items-center text-sm text-gray-600 border border-gray-300 rounded-md px-3 py-1.5 hover:bg-gray-50"
        >
          <span className="mr-1">기업정보 수정</span>
        </Link>
      </div>
    </div>
  )
}
