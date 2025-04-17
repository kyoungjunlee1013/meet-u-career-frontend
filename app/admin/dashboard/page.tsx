"use client"

import { useState } from "react"
import AdminHeader from "@/components/admin/layout/AdminHeader"
import UserDashboard from "@/components/admin/dashboard/UserDashboard"
import JobPostingDashboard from "@/components/admin/dashboard/JobPostingDashboard"
import ApplicationStatusDashboard from "@/components/admin/dashboard/ApplicationStatusDashboard"
import { Tabs } from "@/components/admin/dashboard/Tabs"

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("user")

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <main className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">대시보드</h1>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm">보고서 생성</button>
        </div>

        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === "user" && <UserDashboard />}
        {activeTab === "jobPosting" && <JobPostingDashboard />}
        {activeTab === "applicationStatus" && <ApplicationStatusDashboard />}

        <footer className="mt-10 text-center text-sm text-gray-500">© 2025 Saramin. All rights reserved.</footer>
      </main>
    </div>
  )
}
