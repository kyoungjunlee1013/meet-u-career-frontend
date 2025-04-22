import React from "react";
import { ReceiptText, ExternalLink } from "lucide-react";

export interface PaymentCardData {
  id: number;
  transactionId: string;
  createdAt: string;
  accountName: string;
  advertisementTitle: string;
  advertisementPeriod: string; // ex: "7일", "14일" 등
  advertisementStatus: string; // ex: "진행 중", "종료"
  amount: number;
  status: number; // 0: 실패, 1: 성공
  method: string;
  advertisementLink?: string;
}

const statusLabelMap: Record<number, string> = {
  0: "실패",
  1: "성공",
  2: "진행 중",
  3: "종료"
};
const statusColors: Record<number, string> = {
  0: "bg-red-100 text-red-800",
  1: "bg-green-100 text-green-800",
  2: "bg-blue-100 text-blue-800",
  3: "bg-gray-100 text-gray-800",
};

export const PaymentsCard: React.FC<{ payment: PaymentCardData }> = ({ payment }) => {
  return (
    <div className="border border-gray-200 rounded-xl shadow-sm bg-white flex flex-col md:flex-row md:items-center p-5 gap-4">
      {/* Left: 광고 정보 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-lg truncate">{payment.advertisementTitle}</span>
          <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {payment.advertisementPeriod}
          </span>
          <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[payment.advertisementStatus as unknown as number] || "bg-gray-100 text-gray-800"}`}>
            {payment.advertisementStatus}
          </span>
          {payment.advertisementLink && (
            <a href={payment.advertisementLink} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:underline flex items-center gap-1">
              <ExternalLink className="w-4 h-4" /> 상세
            </a>
          )}
        </div>
        <div className="text-sm text-gray-500 mb-2">
          주문번호 <span className="font-mono text-blue-800">{payment.transactionId}</span>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-gray-700">
          <div>결제자: <span className="font-medium">{payment.accountName}</span></div>
          <div>결제일: <span className="font-medium">{payment.createdAt}</span></div>
          <div>결제수단: <span className="font-medium">{payment.method}</span></div>
        </div>
      </div>
      {/* Right: 결제 금액, 상태, 액션 */}
      <div className="flex flex-col items-end min-w-[160px] gap-2">
        <div className="text-xl font-bold text-gray-900">{payment.amount.toLocaleString()}원</div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[payment.status] || "bg-gray-100 text-gray-800"}`}>{statusLabelMap[payment.status] ?? payment.status}</span>
        <button className="flex items-center gap-1 mt-2 px-3 py-1 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
          <ReceiptText className="w-4 h-4" /> 영수증
        </button>
      </div>
    </div>
  );
};
