"use client";
import { BusinessHeader } from "@/components/business/layout/BusinessHeader";
import { PaymentResultCard } from "@/components/business/payment/PaymentResultCard";
import { useRouter } from "next/navigation";

export default function PaymentFailPage() {
  const router = useRouter();

  return (
    <>
      <BusinessHeader />
      <PaymentResultCard
        icon={
          <svg className="mx-auto h-16 w-16 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.054 0 1.918-.816 1.994-1.85l.007-.15V6c0-1.054-.816-1.918-1.85-1.994L19 4H5c-1.054 0-1.918.816-1.994 1.85L3 6v12c0 1.054.816 1.918 1.85 1.994L5 20zm7-7v2m0 4h.01" />
          </svg>
        }
        title="결제에 실패했습니다"
        description="광고 결제 처리 중 오류가 발생했습니다. 다시 시도하거나, 문제가 지속되면 고객센터로 문의해 주세요."
        infoContent={
          <div className="bg-gray-50 rounded-md p-4 mb-4 text-left">
            <div><b>실패 사유:</b> 결제 인증이 정상적으로 완료되지 않았습니다.</div>
            {/* 필요시 추가 에러 메시지 노출 */}
          </div>
        }
        actions={
          <>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => router.push('/business/jobs/[id]/payment')}
            >
              다시 시도하기
            </button>
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
              onClick={() => router.push('/')}
            >
              메인으로 이동
            </button>
          </>
        }
      />
    </>
  );
}
