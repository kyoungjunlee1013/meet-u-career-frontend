import AdminHeader from "@/components/admin/layout/AdminHeader"
import CommunityManagement from "@/components/admin/community/CommunityManagement"

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <CommunityManagement />
    </div>
  )
}
