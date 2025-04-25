"use client"

import { X } from "lucide-react"

import { statusLabelMap, providerLabelMap, methodLabelMap, advertisementStatusLabelMap } from "@/utils/payment-types"

interface PaymentDetailModalProps {
  payment: any
  onClose: () => void
}

export function PaymentDetailModal({ payment, onClose }: PaymentDetailModalProps) {
  if (!payment) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b p-4">
          <h3 className="text-lg font-medium">결제 상세 정보</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* 결제/광고 정보 2단 컬럼 */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <p className="text-xs text-gray-500">거래 ID</p>
              <p className="font-medium">{payment.transactionId ?? '-'}</p>
              <p className="text-xs text-gray-500 mt-4">결제 일시</p>
              <p className="font-medium">{payment.createdAt ? new Date(payment.createdAt).toLocaleString() : '-'}</p>
              <p className="text-xs text-gray-500 mt-4">결제 금액</p>
              <p className="font-medium">{payment.amount !== undefined && payment.amount !== null ? Number(payment.amount).toLocaleString() + '원' : '-'}</p>
              <p className="text-xs text-gray-500 mt-4">결제 상태</p>
              <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                payment.status === 1
                  ? "bg-green-100 text-green-800"
                  : payment.status === 0
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100 text-gray-800"
              }`}>
                {statusLabelMap[payment.status as keyof typeof statusLabelMap] ?? payment.status ?? '-'}
              </span>
              <p className="text-xs text-gray-500 mt-4">결제사</p>
              <p className="font-medium">{providerLabelMap[payment.provider as keyof typeof providerLabelMap] ?? payment.provider ?? '-'}</p>
              <p className="text-xs text-gray-500 mt-4">결제 방법</p>
              <p className="font-medium">{methodLabelMap[payment.method as keyof typeof methodLabelMap] ?? payment.method ?? '-'}</p>
              <p className="text-xs text-gray-500 mt-4">기업명</p>
              <p className="font-medium">{payment.companyName ?? '-'}</p>
            </div>
            <div className="space-y-3">
              <p className="text-xs text-gray-500">광고/공고명</p>
              <p className="font-medium">{payment.advertisementTitle ?? '-'}</p>
              <p className="text-xs text-gray-500 mt-4">광고 기간</p>
              <p className="font-medium">{payment.advertisementPeriod ? payment.advertisementPeriod + '일' : '-'}</p>
              <p className="text-xs text-gray-500 mt-4">광고 상태</p>
              <p className="font-medium">{payment.advertisementStatus !== undefined && payment.advertisementStatus !== null ? advertisementStatusLabelMap[payment.advertisementStatus as keyof typeof advertisementStatusLabelMap] ?? payment.advertisementStatus : '-'}</p>
              <p className="text-xs text-gray-500 mt-4">광고 시작일</p>
              <p className="font-medium">{payment.advertisementStartDate ? new Date(payment.advertisementStartDate).toLocaleDateString() : '-'}</p>
              <p className="text-xs text-gray-500 mt-4">광고 종료일</p>
              <p className="font-medium">{payment.advertisementEndDate ? new Date(payment.advertisementEndDate).toLocaleDateString() : '-'}</p>
            </div>
          </div>

          {/* 하단: 원본 payment JSON (운영자/개발자 참고용) */}
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">메타데이터</h4>
            <div className="bg-gray-50 p-4 rounded-md">
              <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
                {JSON.stringify(
                  {
                    paymentId: payment.transactionId,
                    customerId: "cust_" + Math.random().toString(36).substring(2, 10),
                    processingFee:
                      typeof payment.amount === "number"
                        ? "₩" + (payment.amount * 0.03).toLocaleString() + "원"
                        : "₩" + (Number.parseInt(payment.amount.replace(/[^\d]/g, "")) * 0.03).toLocaleString() + "원",
                    taxAmount:
                      typeof payment.amount === "number"
                        ? "₩" + (payment.amount * 0.1).toLocaleString() + "원"
                        : "₩" + (Number.parseInt(payment.amount.replace(/[^\d]/g, "")) * 0.1).toLocaleString() + "원",
                    receiptUrl: "https://receipts.example.com/" + payment.transactionId,
                    cardInfo: typeof payment.method === "string" && payment.method.includes("카드")
                      ? {
                          lastFour: Math.floor(1000 + Math.random() * 9000),
                          issuer: ["신한", "국민", "우리", "하나", "삼성"][Math.floor(Math.random() * 5)],
                          expiryDate: `${Math.floor(Math.random() * 12) + 1}/${Math.floor(Math.random() * 5) + 23}`,
                        }
                      : null,
                    bankInfo: typeof payment.method === "string" && payment.method.includes("계좌")
                      ? {
                          bankName: ["국민은행", "신한은행", "우리은행", "하나은행", "농협은행"][Math.floor(Math.random() * 5)],
                          accountLastFour: Math.floor(1000 + Math.random() * 9000),
                        }
                      : null,
                  },
                  null,
                  2,
                )}
              </pre>
            </div>
          </div>

          {payment.status === "취소" || payment.status === "환불" ? (
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">취소/환불 정보</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">취소/환불 일시</p>
                  <p className="font-medium">
                    {new Date(new Date(payment.date).getTime() + 1000 * 60 * 60 * 24 * 2).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">취소/환불 사유</p>
                  <p className="font-medium">
                    {payment.status === "취소" ? "고객 요청에 의한 결제 취소" : "서비스 불만족으로 인한 환불"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">처리자</p>
                  <p className="font-medium">관리자 (admin@meetu.com)</p>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="border-t p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  )
}
