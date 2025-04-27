"use client";

import { use, useEffect, useState } from "react";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { BusinessHeader } from "@/components/business/layout/BusinessHeader";
import { DynamicApplicantDetail } from "@/utils/dynamic-imports";
import {
  type ApplicantStatus,
  type ResumeApplicationDetail,
} from "@/types/applicants";
import axios from "axios";

export default function ApplicantDetailPage({
  params,
}: {
  params: Promise<{ applicantId: string }>;
}) {
  const isChecking = useAuthGuard("business"); // business만 접근 가능

  const { applicantId } = use(params);
  const [applicant, setApplicant] = useState<ResumeApplicationDetail | null>(
    null
  );
  const [status, setStatus] = useState<ApplicantStatus>("서류검토중");

  useEffect(() => {
    const fetchApplicantDetail = async () => {
      try {
        const response = await axios.get(
          `/api/applications/resume/detail/${applicantId}`
        );
        const data = response.data.data;
        setApplicant(data);
        setStatus(data.applicationStatus);
      } catch (error) {
        console.error("지원자 상세 조회 실패:", error);
      }
    };

    fetchApplicantDetail();
  }, [applicantId]);

  if (isChecking) return null; // 검사 중일 땐 아무것도 렌더링하지 않음

  return (
    <div className="min-h-screen bg-gray-50">
      <BusinessHeader />
      <main className="container mx-auto py-8 px-4">
        <DynamicApplicantDetail applicant={applicant} status={status} />
      </main>
    </div>
  );
}
