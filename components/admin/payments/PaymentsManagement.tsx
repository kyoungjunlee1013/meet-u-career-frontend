"use client"
import { useEffect, useState } from "react"
import { DynamicPaymentsFilters, DynamicPaymentsTable, DynamicPaymentsPagination } from "@/utils/dynamic-imports"
import { fetchAdminPayments } from "@/utils/payment-api"
import { Page, PaymentBusinessDTO } from "@/utils/payment-types"
import { PaymentsFiltersValue } from "./PaymentsFilters"

const defaultFilters: PaymentsFiltersValue = {
  status: "",
  provider: "",
  method: "",
  search: "",
}

export default function PaymentsManagement() {
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(20)
  const [filters, setFilters] = useState<PaymentsFiltersValue>(defaultFilters)
  const [pageData, setPageData] = useState<Page<PaymentBusinessDTO> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    // TODO: 필터 파라미터를 fetchAdminPayments에 적용 (API가 지원할 경우)
    fetchAdminPayments(page, size)
      .then((data) => setPageData(data))
      .catch(() => setError("결제 내역을 불러오지 못했습니다."))
      .finally(() => setLoading(false))
  }, [page, size, filters])

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }
  const handlePageSizeChange = (newSize: number) => {
    setSize(newSize)
    setPage(0)
  }
  const handleFiltersChange = (newFilters: PaymentsFiltersValue) => {
    setFilters(newFilters)
    setPage(0)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">결제 로그</h1>

      <DynamicPaymentsFilters value={filters} onChange={handleFiltersChange} />

      <div className="bg-white rounded-lg shadow-sm mt-6">
        <DynamicPaymentsTable
          pageData={pageData}
          loading={loading}
          error={error}
        />
      </div>

      <div className="mt-6">
        <DynamicPaymentsPagination
          page={page}
          size={size}
          totalPages={pageData?.totalPages ?? 0}
          totalElements={pageData?.totalElements ?? 0}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>
    </div>
  )
}
