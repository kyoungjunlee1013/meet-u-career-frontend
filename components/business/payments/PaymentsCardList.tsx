import React from "react";
import { PaymentsCard, PaymentCardData } from "./PaymentsCard";

interface PaymentsCardListProps {
  payments: PaymentCardData[];
  loading?: boolean;
  error?: string | null;
}

export const PaymentsCardList: React.FC<PaymentsCardListProps> = ({ payments = [], loading = false, error = null }) => {
  if (loading) {
    return <div className="text-center py-8 text-gray-400">로딩 중...</div>;
  }
  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }
  if (!payments.length) {
    return <div className="text-center py-8 text-gray-500">표시할 결제 내역이 없습니다.</div>;
  }
  return (
    <div className="flex flex-col gap-4 mt-4">
      {payments.map((payment) => (
        <PaymentsCard key={payment.id} payment={payment} />
      ))}
    </div>
  );
};
