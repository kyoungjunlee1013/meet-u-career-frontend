import AdminHeader from "@/components/admin/layout/AdminHeader"
import JobsManagement from "@/components/admin/jobs/JobsManagement"

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <JobsManagement />
      </main>
    </div>
  )
}
