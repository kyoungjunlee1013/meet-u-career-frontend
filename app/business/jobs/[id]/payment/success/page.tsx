"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

import { BusinessHeader } from "@/components/business/layout/BusinessHeader";

export default function PaymentSuccessPage() {
  // 임시: 무조건 결제 성공 화면 노출
  const adRegistered = true;
  const error = null;
  const amount = 100000; // 임시 금액
  const orderId = "테스트-주문번호";
  const adInfo = { data: { result: "테스트-광고ID" } };
  const router = useRouter();

  return (
    <>
      <BusinessHeader />
      <div className="flex flex-col items-center justify-center min-h-[60vh] py-10">
        <div className="bg-white rounded-lg shadow-lg px-8 py-10 text-center max-w-lg w-full">
          <svg className="mx-auto h-16 w-16 text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2l4-4m5 2a9 9 0 11-18 0a9 9 0 0118 0z" /></svg>
          <h2 className="text-2xl font-bold mb-2">광고 결제가 완료되었습니다!</h2>
          <p className="text-gray-700 mb-4">프리미엄 광고가 정상적으로 등록되어, 곧 상단에 노출됩니다.</p>
          <div className="bg-gray-50 rounded-md p-4 mb-4 text-left">
            <div><b>결제 금액:</b> <span className="text-blue-700">{Number(amount).toLocaleString()}원</span></div>
            <div><b>주문번호:</b> {orderId}</div>
            <div><b>광고 ID:</b> {adInfo?.data?.result || "-"}</div>
          </div>
          <div className="flex gap-3 justify-center mt-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">내 광고 현황 보기</button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">메인으로 이동</button>
          </div>
        </div>
      </div>
    </>
  );
}

