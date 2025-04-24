  import AdminHeader from "@/components/admin/layout/AdminHeader"
  import LogsManagement from "@/components/admin/logs/LogsManagement"

  export default function LogsPage() {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <main className="container mx-auto px-4 py-8">
          <LogsManagement />
        </main>
      </div>
    )
  }
