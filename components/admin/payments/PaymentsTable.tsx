"use client"
import { useState } from "react"
import { Info } from "lucide-react"
import { PaymentDetailModal } from "./PaymentsDetailModal"
import {
  PaymentBusinessDTO,
  Page,
  statusLabelMap,
  methodLabelMap,
  providerLabelMap,
} from "@/utils/payment-types"

interface PaymentsTableProps {
  pageData: Page<PaymentBusinessDTO> | null
  loading: boolean
  error: string | null
}

export default function PaymentsTable({ pageData, loading, error }: PaymentsTableProps) {
  const [selectedPayment, setSelectedPayment] = useState<PaymentBusinessDTO | null>(null)

  if (loading) return <div className="py-8 text-center text-gray-400">로딩 중...</div>
  if (error) return <div className="py-8 text-center text-red-500">{error}</div>
  if (!pageData) return <div className="py-8 text-center text-gray-400">데이터 없음</div>

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">거래 ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">결제 일시</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">결제자</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">결제 금액</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">결제 방법</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상세</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pageData.content.map((payment) => (
              <tr key={payment.transactionId} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {payment.transactionId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.createdAt}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(payment as any).companyName ?? "-"}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.amount.toLocaleString()}원</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{methodLabelMap[payment.method]}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs rounded-full ${
                      payment.status === 1
                        ? "bg-green-100 text-green-800"
                        : payment.status === 0
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {statusLabelMap[payment.status] ?? payment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => setSelectedPayment(payment)}
                    className="text-blue-600 hover:text-blue-900"
                    aria-label="상세 정보 보기"
                  >
                    <Info size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedPayment && (
        <PaymentDetailModal payment={selectedPayment} onClose={() => setSelectedPayment(null)} />
      )}
    </>
  )
}
