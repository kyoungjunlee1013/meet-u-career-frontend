import PaymentsManagement from "@/components/admin/payments/PaymentsManagement"
import AdminHeader from "@/components/admin/layout/AdminHeader"

export default function PaymentsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <PaymentsManagement />
    </div>
  )
}
