"use client"

import { useState } from "react"
import { Info } from "lucide-react"
import { PaymentDetailModal } from "./PaymentsDetailModal"

// Sample data for demonstration
const paymentsData = [
  {
    transactionId: "PAY-2023-04-15-001",
    date: "2023-04-15 14:30:22",
    customer: "김철수",
    amount: "₩50,000원",
    method: "신용카드",
    provider: "KakaoPay",
    status: "완료",
    item: "프리미엄 구독 (1개월)",
  },
  {
    transactionId: "PAY-2023-04-14-089",
    date: "2023-04-14 09:15:43",
    customer: "이영희",
    amount: "₩30,000원",
    method: "계좌이체",
    provider: "토스페이먼츠",
    status: "완료",
    item: "이력서 첨삭 서비스",
  },
  {
    transactionId: "PAY-2023-04-13-156",
    date: "2023-04-13 18:22:10",
    customer: "박지민",
    amount: "₩100,000원",
    method: "가상계좌",
    provider: "NaverPay",
    status: "대기중",
    item: "프리미엄 구독 (3개월)",
  },
  {
    transactionId: "PAY-2023-04-12-201",
    date: "2023-04-12 11:05:37",
    customer: "최민준",
    amount: "₩25,000원",
    method: "휴대폰 결제",
    provider: "KG이니시스",
    status: "취소",
    item: "이력서 첨삭 서비스",
  },
  {
    transactionId: "PAY-2023-04-11-345",
    date: "2023-04-11 16:48:59",
    customer: "정수민",
    amount: "₩150,000원",
    method: "신용카드",
    provider: "KakaoPay",
    status: "완료",
    item: "프리미엄 구독 (6개월)",
  },
  {
    transactionId: "PAY-2023-04-10-422",
    date: "2023-04-10 08:30:14",
    customer: "강지훈",
    amount: "₩50,000원",
    method: "계좌이체",
    provider: "토스페이먼츠",
    status: "환불",
    item: "프리미엄 구독 (1개월)",
  },
  {
    transactionId: "PAY-2023-04-09-567",
    date: "2023-04-09 13:12:45",
    customer: "윤서연",
    amount: "₩25,000원",
    method: "휴대폰 결제",
    provider: "KG이니시스",
    status: "완료",
    item: "이력서 첨삭 서비스",
  },
  {
    transactionId: "PAY-2023-04-08-612",
    date: "2023-04-08 19:55:33",
    customer: "임현우",
    amount: "₩30,000원",
    method: "신용카드",
    provider: "NaverPay",
    status: "완료",
    item: "이력서 첨삭 서비스",
  },
  {
    transactionId: "PAY-2023-04-07-789",
    date: "2023-04-07 10:40:21",
    customer: "한소희",
    amount: "₩100,000원",
    method: "가상계좌",
    provider: "토스페이먼츠",
    status: "완료",
    item: "프리미엄 구독 (3개월)",
  },
  {
    transactionId: "PAY-2023-04-06-823",
    date: "2023-04-06 15:33:47",
    customer: "송민석",
    amount: "₩50,000원",
    method: "신용카드",
    provider: "KakaoPay",
    status: "대기중",
    item: "프리미엄 구독 (1개월)",
  },
]

export default function PaymentsTable() {
  const [selectedPayment, setSelectedPayment] = useState<any>(null)

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                거래 ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                결제 일시
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                결제자
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                결제 금액
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                결제 방법
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                상태
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                상세
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paymentsData.map((payment) => (
              <tr key={payment.transactionId} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {payment.transactionId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.method}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs rounded-full ${
                      payment.status === "완료"
                        ? "bg-green-100 text-green-800"
                        : payment.status === "대기중"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {payment.status}
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

      {selectedPayment && <PaymentDetailModal payment={selectedPayment} onClose={() => setSelectedPayment(null)} />}
    </>
  )
}
