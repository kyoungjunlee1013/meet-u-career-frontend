"use client"
import { useState } from "react"
import Link from "next/link"
import { PersonalHeader } from "@/components/personal/mypage/PersonalHeader"
import { PersonalSidebar } from "@/components/personal/mypage/PersonalSidebar"
import { CoverLetterContent } from "@/components/personal/mypage/cover-letter/CoverLetterContent"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export default function CoverLetterPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PersonalHeader toggleSidebar={toggleSidebar} />
      <PersonalSidebar isOpen={sidebarOpen} activeItem="자기소개서 관리" />
      <main className="pt-16 md:pl-64 transition-all duration-300">
        <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">자기소개서 관리</h1>
            <Link href="/personal/mypage/cover-letter/create">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <PlusCircle className="mr-2 h-4 w-4" />새 자기소개서 등록
              </Button>
            </Link>
          </div>
          <CoverLetterContent />
        </div>
      </main>
    </div>
  )
}
