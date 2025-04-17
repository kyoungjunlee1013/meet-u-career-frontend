import AdminHeader from "@/components/admin/layout/AdminHeader"
import CompanyManagement from "@/components/admin/companies/CompanyManagement"

export default function CompaniesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <main className="container mx-auto px-4">
        <CompanyManagement />
      </main>
    </div>
  )
}
