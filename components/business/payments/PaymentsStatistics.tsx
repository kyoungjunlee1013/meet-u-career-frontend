import React from "react";

interface PaymentsStatisticsProps {
  payments: Array<{
    amount: number;
    status: number; // 0: 실패, 1: 성공
    method?: number;
    advertisementStatus?: number;
  }>;
}

export const PaymentsStatistics = ({ payments = [] }: PaymentsStatisticsProps) => {
  // 전체 결제 건수
  const total = payments.length;
  // 총 결제 금액(성공만)
  const totalAmount = payments.filter(p => p.status === 1).reduce((sum, p) => sum + (p.amount || 0), 0);
  // 진행 중 광고(광고 status === 1)
  const activeAds = payments.filter(p => p.status === 1 && p.advertisementStatus === 1).length;
  // 종료된 광고(광고 status === 3)
  const expiredAds = payments.filter(p => p.status === 1 && p.advertisementStatus === 3).length;

  const stats = [
    { label: "전체 결제 건수", value: total, color: "text-blue-600" },
    { label: "총 결제 금액", value: totalAmount.toLocaleString() + "원", color: "text-purple-500" },
    { label: "진행 중 광고", value: activeAds, color: "text-green-500" },
    { label: "종료된 광고", value: expiredAds, color: "text-gray-500" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-md p-4 shadow-sm border border-gray-100">
          <div className="text-gray-600 text-sm mb-1">{stat.label}</div>
          <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
        </div>
      ))}
    </div>
  );
};
