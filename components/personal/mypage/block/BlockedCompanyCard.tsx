"use client";

import { useState } from "react";
import { Building, MapPin, Calendar } from "lucide-react"
import { BlockedCompanyCardProps } from "@/types/block";
import axios from "axios";
import { useUserStore } from "@/store/useUserStore";

export function BlockedCompanyCard({ company, fetchBlockedCompanies }: BlockedCompanyCardProps) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleUnblock = async (companyId: number) => {
    setIsSubmitting(true);

    try {
      const token = sessionStorage.getItem("accessToken");
      const headers = token && useUserStore.getState().isLocalhost ? { "Authorization": `Bearer ${token}` } : {};

      const response = await axios.post("/api/personal/companyblock/unblock",
        { companyId },
        { headers }
      );

      console.log("res : ", response.data);

      fetchBlockedCompanies(); // 차단 해제 후 목록 갱신
    } catch (error) {
      console.error(`차단 해제 실패:`, error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col h-full max-w-[350px] w-full mx-auto p-6">
      {/* 상단: 빌딩 아이콘 & 회사명 */}
      <div className="flex items-center mb-4">
        <Building className="h-6 w-6 text-gray-500 mr-2" />
        <h3 className="font-bold text-gray-900 text-base leading-tight">{company.companyName}</h3>
      </div>
      {/* 상세 정보 */}
      <div className="flex flex-col gap-2 text-sm text-gray-700 mb-6 mt-2">
        <div className="flex items-center text-gray-500">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{company.address}</span>
        </div>
        <div className="flex items-center text-gray-500">
          <Calendar className="h-4 w-4 mr-1" />
          <span>차단 일자: {new Date(company.createAt).toISOString().split('T')[0]}</span>
        </div>
      </div>
      <div className="flex mt-auto">
        <button
          className="flex-1 py-2 px-4 bg-white border border-blue-500 text-blue-600 rounded-md text-sm font-semibold hover:bg-blue-50 transition-colors"
          onClick={() => handleUnblock(company.companyId)}  // 수정된 부분
          disabled={isSubmitting}
          aria-label={`${company.companyName} 차단 해제하기`}
        >
          {isSubmitting ? "차단 해제 중..." : "차단 해제"}
        </button>
      </div>

    </div>
  )
}
