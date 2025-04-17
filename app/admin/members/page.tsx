import MembersManagement from "@/components/admin/members/MembersManagement"
import AdminHeader from "@/components/admin/layout/AdminHeader"

export default function MembersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <MembersManagement />
    </div>
  )
}
