"use client";

import { BusinessHeader } from "@/components/business/layout/BusinessHeader";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type JobType = {
  id: number;
  title: string;
  companyName: string;
  expirationDate: string;
  statusLabel: string;
  // 필요한 필드 추가
};

export default function JobPaymentPage() {
  // Toss Payments 결제창 호출 핸들러
  const handleTossPayment = () => {
    if (!job) {
      alert("공고 정보를 불러오지 못했습니다.");
      return;
    }
    const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;
    const redirectUrl = process.env.NEXT_PUBLIC_TOSS_REDIRECT_URI;
    const orderId = `${job.id}-${Date.now()}`;
    const orderName = `${job.title} - ${selectedProduct?.label} 광고`;
    const amount = selectedProduct?.amount || 0;
    console.log({ clientKey, redirectUrl, orderId, orderName, amount });
    if (typeof window === "undefined" || !(window as any).TossPayments) {
      alert("TossPayments SDK를 불러오지 못했습니다. 새로고침 후 다시 시도해 주세요.");
      return;
    }
    if (!clientKey || !redirectUrl) {
      alert("Toss 결제 환경변수가 올바르게 설정되어 있지 않습니다.");
      return;
    }
    const successUrl = `${redirectUrl}/business/jobs/${job.id}/payment/success?adType=${selectedProduct?.type}&durationDays=${selectedProduct?.durationDays}&jobPostingId=${job.id}`;
    const failUrl = `${redirectUrl}/business/jobs/${job.id}/payment/fail?adType=${selectedProduct?.type}&durationDays=${selectedProduct?.durationDays}&jobPostingId=${job.id}`;
    const tossPayments = (window as any).TossPayments(clientKey);
    tossPayments.requestPayment("카드", {
      amount,
      orderId,
      orderName,
      customerName: "홍길동", // 실제 사용자명으로 교체 필요
      successUrl,
      failUrl,
    });
  };


  // 실제 공고 데이터 fetch
  const params = useParams();
  const jobId = params?.id;
  const [job, setJob] = useState<JobType|null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);

  useEffect(() => {
    if (jobId) {
      setLoading(true);
      setError(null);
      fetch(`/api/business/job/view/${jobId}`)
        .then(res => res.json())
        .then(data => setJob(data.data))
        .catch(() => setError('공고 데이터를 불러올 수 없습니다.'))
        .finally(() => setLoading(false));
    }
  }, [jobId]);

  const [selectedType, setSelectedType] = useState("BASIC");

  if (loading) return <div className="text-center py-10">로딩 중...</div>;
  if (error || !job) return <div className="text-center py-10 text-red-500">{error || '공고 데이터를 불러올 수 없습니다.'}</div>;

  // 광고 상품 리스트 하드코딩
  const adProducts = [
    {
      type: 1,
      label: "BASIC",
      durationDays: 7,
      amount: 30000,
      dailyAmount: 4285,
      desc: "하단 노출",
    },
    {
      type: 2,
      label: "STANDARD",
      durationDays: 14,
      amount: 60000,
      dailyAmount: 4285,
      desc: "중간 우선 영역",
    },
    {
      type: 3,
      label: "PREMIUM",
      durationDays: 21,
      amount: 100000,
      dailyAmount: 4761,
      desc: "최상단 고정 + 광고 뱃지",
    },
  ];

  const selectedProduct = adProducts.find(p => p.type === selectedType);

  return (
    <div className="min-h-screen bg-gray-50">
      <BusinessHeader />
      <main className="max-w-[1200px] mx-auto px-6 py-6">
        <h1 className="text-2xl font-bold mb-6">공고 결제 페이지</h1>
        <div className="bg-white rounded shadow p-4 mb-8">
          <div className="text-xl font-semibold mb-1">{job?.title}</div>
          <div className="text-gray-600 mb-1">{job?.companyName}</div>
          <div className="text-gray-500 text-sm mb-1">마감일: {job?.expirationDate ? new Date(job.expirationDate).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}</div>
          <div className="text-blue-600 text-xs">{job?.statusLabel}</div>
        </div>

        {/* 광고 상품 선택 UI */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">광고 상품을 선택하세요</h2>
          <div className="flex gap-6 flex-wrap">
            {adProducts.map(product => (
              <button
                key={product.type}
                type="button"
                onClick={() => setSelectedType(product.type)}
                className={`flex-1 min-w-[220px] max-w-[300px] p-5 rounded-lg border-2 transition-all shadow-sm text-left
                  ${selectedType === product.type ? "border-blue-600 bg-blue-50" : "border-gray-200 bg-white hover:border-blue-300"}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-lg">{product.label}</span>
                  {selectedType === product.type && (
                    <span className="text-blue-600 font-bold">선택됨</span>
                  )}
                </div>
                <div className="text-gray-800 font-semibold mb-1">{product.durationDays}일 • <span className="text-blue-700">₩{product.amount.toLocaleString()}</span></div>
                <div className="text-xs text-gray-500 mb-1">1일당 ₩{product.dailyAmount.toLocaleString()}</div>
                <div className="text-sm text-gray-600">{product.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 결제 금액 및 안내 */}
        <div className="bg-white rounded shadow p-4 flex flex-col sm:flex-row items-center justify-between mb-8">
          <div>
            <div className="text-sm text-gray-500 mb-1">선택한 상품</div>
            <div className="font-semibold text-lg">{selectedProduct?.label} ({selectedProduct?.durationDays}일)</div>
            <div className="text-xs text-gray-400">{selectedProduct?.desc}</div>
          </div>
          <div className="text-right mt-4 sm:mt-0">
            <div className="text-gray-500 text-sm">결제 금액</div>
            <div className="text-2xl font-bold text-blue-700">₩{selectedProduct?.amount.toLocaleString()}</div>
          </div>
        </div>

        {/* 결제 버튼 */}
        <button
          className="w-full max-w-md mx-auto block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg text-lg shadow"
          onClick={handleTossPayment}
        >
          결제하기
        </button>
      </main>
    </div>
  );
}

