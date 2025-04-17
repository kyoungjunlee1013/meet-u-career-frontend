import { DynamicPaymentsFilters, DynamicPaymentsTable, DynamicPaymentsPagination } from "@/utils/dynamic-imports"

export default function PaymentsManagement() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">결제 로그</h1>

      <DynamicPaymentsFilters />

      <div className="bg-white rounded-lg shadow-sm mt-6">
        <DynamicPaymentsTable />
      </div>

      <div className="mt-6">
        <DynamicPaymentsPagination />
      </div>
    </div>
  )
}
