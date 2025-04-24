"use client";
import { useState, useEffect } from "react";
import { BusinessHeader } from "@/components/business/layout/BusinessHeader";
import { PaymentsStatistics } from "@/components/business/payments/PaymentsStatistics";
import { PaymentsSearch } from "@/components/business/payments/PaymentsSearch";
import { PaymentsTabs, PaymentsTabValue } from "@/components/business/payments/PaymentsTabs";
import { PaymentsCardList } from "@/components/business/payments/PaymentsCardList";
import { PaymentCardData } from "@/components/business/payments/PaymentsCard";

import { ReceiptModal } from "@/components/business/payments/ReceiptModal";

export default function BusinessPaymentsPage() {
  useEffect(() => {
    fetch("/api/business/payment/history")
      .then(res => res.json())
      .then(data => {
        console.log("결제 내역 API 응답:", data);
      })
      .catch(err => {
        console.error("결제 내역 API 에러:", err);
      });
  }, []);

  const [payments, setPayments] = useState<PaymentCardData[]>([]);
  const [activeTab, setActiveTab] = useState<PaymentsTabValue>("all");
  // 모달 상태 관리
  const [receiptPayment, setReceiptPayment] = useState<PaymentCardData|null>(null);

  useEffect(() => {
    fetch("/api/business/payment/history")
      .then(res => res.json())
      .then(data => {
        setPayments(data.data);
      })
      .catch(err => {
        console.error("결제 내역 API 에러:", err);
      });
  }, []);

  // 광고 상태별 필터링
  const statusFilterMap: Record<PaymentsTabValue, number[]|null> = {
    all: null,
    progress: [1], // 진행 중 광고 advertisementStatus === 1
    ended: [3],    // 종료 광고 advertisementStatus === 3
  };
  const filter = statusFilterMap[activeTab];
  const filteredPayments = !filter ? payments : payments.filter(p => filter.includes(p.advertisementStatus));

  // 영수증 모달 열기/닫기 핸들러
  const handleOpenReceipt = (payment: PaymentCardData) => setReceiptPayment(payment);
  const handleCloseReceipt = () => setReceiptPayment(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <BusinessHeader />
      <main className="max-w-[1200px] mx-auto px-6 py-6">
        <h1 className="text-2xl font-bold mb-6">결제 내역</h1>
        <PaymentsStatistics payments={payments} />
        <PaymentsSearch />
        <PaymentsTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <PaymentsCardList payments={filteredPayments} onReceiptClick={handleOpenReceipt} />
      </main>
      <ReceiptModal open={!!receiptPayment} payment={receiptPayment!} onClose={handleCloseReceipt} />
    </div>
  );
}

