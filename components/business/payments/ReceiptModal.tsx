import React from "react";
import { PaymentCardData, advertisementStatusMap, methodLabelMap, formatDate } from "./PaymentsCard";

interface ReceiptModalProps {
  payment: PaymentCardData;
  open: boolean;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ payment, open, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl"
          onClick={onClose}
          aria-label="닫기"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4">영수증</h2>
        <div className="space-y-2">
          <div><span className="text-gray-500">주문번호:</span> <span className="font-mono text-blue-800">{payment.transactionId}</span></div>
          <div><span className="text-gray-500">결제일:</span> <span>{formatDate(payment.createdAt)}</span></div>
          <div><span className="text-gray-500">결제자:</span> <span>{payment.companyName}</span></div>
          <div><span className="text-gray-500">광고명:</span> <span>{payment.advertisementTitle}</span></div>
          <div><span className="text-gray-500">광고 기간:</span> <span>{payment.advertisementPeriod}일</span></div>
          <div><span className="text-gray-500">광고 상태:</span> <span>{advertisementStatusMap[payment.advertisementStatus] ?? payment.advertisementStatus}</span></div>
          <div><span className="text-gray-500">결제수단:</span> <span>{methodLabelMap[payment.method] ?? payment.method}</span></div>
          <div><span className="text-gray-500">결제금액:</span> <span className="font-bold">{payment.amount.toLocaleString()}원</span></div>
        </div>
      </div>
    </div>
  );
};
