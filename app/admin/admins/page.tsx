import AdminHeader from "@/components/admin/layout/AdminHeader"
import AdminsManagement from "@/components/admin/admins/AdminsManagement"

export default function AdminsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <main className="container mx-auto px-4 py-8">
        <AdminsManagement />
      </main>
    </div>
  )
}
