"use client";
import { useState } from "react";
import { BusinessHeader } from "@/components/business/layout/BusinessHeader";
import { PaymentsStatistics } from "@/components/business/payments/PaymentsStatistics";
import { PaymentsSearch } from "@/components/business/payments/PaymentsSearch";
import { PaymentsTabs, PaymentsTabValue } from "@/components/business/payments/PaymentsTabs";
import { PaymentsCardList } from "@/components/business/payments/PaymentsCardList";
import { PaymentCardData } from "@/components/business/payments/PaymentsCard";

export default function BusinessPaymentsPage() {
  // mock 결제 내역 데이터
  const payments: PaymentCardData[] = [
    {
      id: 1,
      transactionId: "ORD-20250422-0001",
      createdAt: "2025-04-22 14:30",
      accountName: "홍길동",
      advertisementTitle: "프론트엔드 채용광고",
      advertisementPeriod: "7일",
      advertisementStatus: "진행 중",
      amount: 120000,
      status: 1, // 성공
      method: "카드",
      advertisementLink: "#",
    },
    {
      id: 2,
      transactionId: "ORD-20250422-0002",
      createdAt: "2025-04-21 10:10",
      accountName: "김영희",
      advertisementTitle: "백엔드 채용광고",
      advertisementPeriod: "14일",
      advertisementStatus: "종료",
      amount: 90000,
      status: 2, // 진행 중
      method: "카카오페이",
      advertisementLink: "#",
    },
    {
      id: 3,
      transactionId: "ORD-20250420-0003",
      createdAt: "2025-04-20 09:00",
      accountName: "이철수",
      advertisementTitle: "디자인 채용광고",
      advertisementPeriod: "7일",
      advertisementStatus: "종료",
      amount: 70000,
      status: 3, // 종료
      method: "토스",
      advertisementLink: "#",
    },
  ];

  const [activeTab, setActiveTab] = useState<PaymentsTabValue>("all");

  // 결제 상태별 필터링
  const statusFilterMap: Record<PaymentsTabValue, number[]|null> = {
    all: null,
    progress: [2], // 진행 중
    ended: [3],    // 종료
  };
  const filter = statusFilterMap[activeTab];
  const filteredPayments = !filter ? payments : payments.filter(p => filter.includes(p.status));

  return (
    <div className="min-h-screen bg-gray-50">
      <BusinessHeader />
      <main className="max-w-[1200px] mx-auto px-6 py-6">
        <h1 className="text-2xl font-bold mb-6">결제 내역</h1>
        <PaymentsStatistics payments={payments} />
        <PaymentsSearch />
        <PaymentsTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <PaymentsCardList payments={filteredPayments} />
      </main>
    </div>
  );
}

