"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

import { BusinessHeader } from "@/components/business/layout/BusinessHeader";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adInfo, setAdInfo] = useState<any>(null);

  useEffect(() => {
    const paymentKey = searchParams.get("paymentKey");
    const orderId = searchParams.get("orderId");
    const amount = searchParams.get("amount");
    const adType = searchParams.get("adType");
    const durationDays = searchParams.get("durationDays");
    const jobPostingId = searchParams.get("jobPostingId");
    if (!paymentKey || !orderId || !amount || !adType || !durationDays || !jobPostingId) {
      setError("결제 정보 또는 광고 정보가 올바르지 않습니다.");
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch("/api/business/advertisement/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paymentKey,
        orderId,
        amount: Number(amount),
        adType: Number(adType),
        durationDays: Number(durationDays),
        jobPostingId: Number(jobPostingId)
      }),
    })
      .then(res => res.json())
      .then(data => {
        setAdInfo(data);
        setError(null);
      })
      .catch(() => {
        setError("광고 등록에 실패했습니다. 결제 내역에서 상태를 확인해 주세요.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <>
        <BusinessHeader />
        <div className="flex flex-col items-center justify-center min-h-[60vh] py-10">
          <div className="bg-white rounded-lg shadow-lg px-8 py-10 text-center max-w-lg w-full">
            <svg className="mx-auto h-16 w-16 text-blue-400 mb-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /></svg>
            <h2 className="text-xl font-bold mb-2">광고 등록 중입니다...</h2>
            <p className="text-gray-700">잠시만 기다려 주세요.</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <BusinessHeader />
        <div className="flex flex-col items-center justify-center min-h-[60vh] py-10">
          <div className="bg-white rounded-lg shadow-lg px-8 py-10 text-center max-w-lg w-full">
            <svg className="mx-auto h-16 w-16 text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.054 0 1.918-.816 1.994-1.85l.007-.15V6c0-1.054-.816-1.918-1.85-1.994L19 4H5c-1.054 0-1.918.816-1.994 1.85L3 6v12c0 1.054.816 1.918 1.85 1.994L5 20zm7-7v2m0 4h.01" /></svg>
            <h2 className="text-xl font-bold mb-2">광고 등록에 실패했습니다</h2>
            <p className="text-gray-700 mb-4">{error}</p>
            <div className="flex gap-3 justify-center mt-4">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => router.push('/business/payments')}
              >
                결제 내역 확인
              </button>
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                onClick={() => router.push('/business/jobs')}
              >
                공고 목록 이동
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  const result = adInfo?.data?.result;
  return (
    <>
      <BusinessHeader />
      <div className="flex flex-col items-center justify-center min-h-[60vh] py-10">
        <div className="bg-white rounded-lg shadow-lg px-8 py-10 text-center max-w-lg w-full">
          <svg className="mx-auto h-16 w-16 text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2l4-4m5 2a9 9 0 11-18 0a9 9 0 0118 0z" /></svg>
          <h2 className="text-2xl font-bold mb-2">광고 결제가 완료되었습니다!</h2>
          <p className="text-gray-700 mb-4">프리미엄 광고가 정상적으로 등록되어, 곧 상단에 노출됩니다.</p>
          <div className="bg-gray-50 rounded-md p-4 mb-4 text-left">
            <div><b>결제 금액:</b> <span className="text-blue-700">{adInfo?.data?.amount ? Number(adInfo.data.amount).toLocaleString() : '-'}원</span></div>
            <div><b>주문번호:</b> {adInfo?.data?.orderId || '-'}</div>
            <div><b>광고 ID:</b> {result || '-'}</div>
          </div>
          <div className="flex gap-3 justify-center mt-4">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => router.push('/business/payments')}
            >
              결제 내역 확인
            </button>
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
              onClick={() => router.push('/business/jobs')}
            >
              공고 목록 이동
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
