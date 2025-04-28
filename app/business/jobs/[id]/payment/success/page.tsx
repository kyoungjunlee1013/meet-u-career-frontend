"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

import { BusinessHeader } from "@/components/business/layout/BusinessHeader";
import { apiClient } from "@/api/apiClient";

function getAdTypeName(adType?: number) {
  switch (adType) {
    case 1:
      return "베이직 광고";
    case 2:
      return "스탠다드 광고";
    case 3:
      return "프리미엄 광고";
    default:
      return "광고";
  }
}

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentInfo, setPaymentInfo] = useState<any>(null);

  useEffect(() => {
    async function completePayment() {
      const transactionId = searchParams.get("transactionId");
      const orderId = searchParams.get("orderId") || transactionId; // fallback
      const paymentKey = searchParams.get("paymentKey");
      const amount = searchParams.get("amount");
      const adType = searchParams.get("adType");
      const durationDays = searchParams.get("durationDays");
      const jobPostingId = searchParams.get("jobPostingId");
      if (!transactionId || !paymentKey || !amount || !adType || !durationDays || !jobPostingId) {
        setError("결제 정보가 올바르지 않습니다.");
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        // 1. 광고 등록 + 결제 승인
        // 1. 광고 등록 + 결제 승인
        const registerRes = await apiClient.post("/api/business/advertisement/register", {
          paymentKey,
          orderId,
          amount: Number(amount),
          adType: Number(adType),
          durationDays: Number(durationDays),
          jobPostingId: Number(jobPostingId)
        });
        if (registerRes.status !== 200) {
          throw new Error("광고 등록 실패");
        }
        // 2. 결제 상세 조회
        const paymentRes = await apiClient.get(`/api/business/payment/${transactionId}`);
        setPaymentInfo(paymentRes.data?.data);
        setError(null);
      } catch (err) {
        setError("결제 정보를 불러오지 못했습니다. 결제 내역에서 상태를 확인해 주세요.");
      } finally {
        setLoading(false);
      }
    }
    completePayment();
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

  return (
    <>
      <BusinessHeader />
      <div className="flex flex-col items-center justify-center min-h-[60vh] py-10">
        <div className="bg-white rounded-lg shadow-lg px-8 py-10 text-center max-w-lg w-full">
          <svg className="mx-auto h-16 w-16 text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2l4-4m5 2a9 9 0 11-18 0a9 9 0 0118 0z" /></svg>
          <h2 className="text-2xl font-bold mb-2">광고 결제가 완료되었습니다!</h2>
          <p className="text-gray-700 mb-4">
            {paymentInfo?.adType
              ? `${getAdTypeName(paymentInfo.adType)}가 정상적으로 등록되어, 곧 메인 화면에 노출됩니다.`
              : '광고가 정상적으로 등록되어, 곧 메인 화면에 노출됩니다.'}
          </p>
          <div className="bg-gray-50 rounded-md p-4 mb-4 text-left">
            <div><b>결제 금액:</b> <span className="text-blue-700">{paymentInfo?.amount ? Number(paymentInfo.amount).toLocaleString() : '-'}원</span></div>
            <div><b>주문번호:</b> {paymentInfo?.transactionId || '-'}</div>
            <div><b>결제 일시:</b> {paymentInfo?.createdAt ? new Date(paymentInfo.createdAt).toLocaleString() : '-'}</div>
            <div><b>광고 상품:</b> {typeof paymentInfo?.advertisementPeriod === 'number' ? `${paymentInfo.advertisementPeriod}일 (${paymentInfo.advertisementTitle || '-'})` : paymentInfo?.advertisementTitle || '-'}</div>
            <div><b>광고 적용 기간:</b> {paymentInfo?.advertisementStartDate && paymentInfo?.advertisementEndDate ? `${new Date(paymentInfo.advertisementStartDate).toLocaleDateString()} ~ ${new Date(paymentInfo.advertisementEndDate).toLocaleDateString()}` : '-'}</div>
            <div><b>기업명:</b> {paymentInfo?.companyName || '-'}</div>
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
