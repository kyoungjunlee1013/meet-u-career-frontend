import React from "react";
import { ReceiptText, ExternalLink } from "lucide-react";

export interface PaymentCardData {
  id: number;
  transactionId: string;
  createdAt: string;
  companyName: string;
  advertisementTitle: string;
  advertisementPeriod: number; // API: number
  advertisementStatus: number; // API: number
  amount: number;
  status: number; // 0: 실패, 1: 성공
  method: number; // API: number
  advertisementLink?: string;
}

interface PaymentsCardProps {
  payment: PaymentCardData;
  onReceiptClick?: (payment: PaymentCardData) => void;
}

export const advertisementStatusMap: Record<number, string> = {
  1: "진행 중",
  2: "일시중지",
  3: "종료",
  4: "승인대기"
};
export const statusLabelMap: Record<number, string> = {
  0: "실패",
  1: "성공"
};
export const statusColors: Record<number, string> = {
  0: "bg-red-100 text-red-800",
  1: "bg-green-100 text-green-800",
  2: "bg-blue-100 text-blue-800",
  3: "bg-gray-100 text-gray-800",
};
export const methodLabelMap: Record<number, string> = {
  1: "카드",
  2: "카카오페이",
  3: "네이버페이",
  4: "토스페이"
};

export function formatDate(dateStr: string) {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  return `${yyyy}.${mm}.${dd} ${hh}:${min}`;
}

export const PaymentsCard: React.FC<PaymentsCardProps> = ({ payment, onReceiptClick }) => {
  return (
    <div className="border border-gray-200 rounded-xl shadow-sm bg-white flex flex-col md:flex-row md:items-center p-5 gap-4">
      {/* Left: 광고 정보 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-lg truncate">{payment.advertisementTitle}</span>
          <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {payment.advertisementPeriod}일
          </span>
          <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[payment.advertisementStatus] || "bg-gray-100 text-gray-800"}`}>
            {advertisementStatusMap[payment.advertisementStatus] ?? payment.advertisementStatus}
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
          <div>결제자: <span className="font-medium">{payment.companyName}</span></div>
          <div>결제일: <span className="font-medium">{formatDate(payment.createdAt)}</span></div>
          <div>결제수단: <span className="font-medium">{methodLabelMap[payment.method] ?? payment.method}</span></div>
        </div>
      </div>
      {/* Right: 결제 금액, 상태, 액션 */}
      <div className="flex flex-col items-end min-w-[160px] gap-2">
        <div className="text-xl font-bold text-gray-900">{payment.amount.toLocaleString()}원</div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[payment.status] || "bg-gray-100 text-gray-800"}`}>{statusLabelMap[payment.status] ?? payment.status}</span>
        <button
          className="flex items-center gap-1 mt-2 px-3 py-1 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
          onClick={() => onReceiptClick?.(payment)}
        >
          <ReceiptText className="w-4 h-4" /> 영수증
        </button>
      </div>
    </div>
  );
};
