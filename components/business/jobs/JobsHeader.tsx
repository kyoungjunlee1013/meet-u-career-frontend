"use client"

import { Plus } from "lucide-react"
import Link from "next/link"

export const JobsHeader = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">채용공고 관리</h1>
      <Link href="/business/jobs/register">
        <button className="bg-[#3366ff] hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-colors">
          <Plus className="h-5 w-5" />
          <span>새 공고 작성</span>
        </button>
      </Link>
    </div>
  )
}
