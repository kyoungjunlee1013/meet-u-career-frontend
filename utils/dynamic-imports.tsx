"use client"

import dynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"

// 지원자 상세 정보 컴포넌트 동적 임포트
export const DynamicApplicantDetail = dynamic(() => import("../components/business/applicants/ApplicantDetail"), {
  ssr: false,
  loading: () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <Skeleton className="h-32 w-32 rounded-full" />
          <div className="flex-1 space-y-4">
            <Skeleton className="h-8 w-48" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <Skeleton className="h-6 w-32 mb-4" />
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <Skeleton className="h-6 w-40 mb-4" />
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  ),
})

// 결제 관련 컴포넌트 동적 임포트
export const DynamicPaymentsFilters = dynamic(() => import("@/components/admin/payments/PaymentsFilters"), {
  loading: () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-10 w-full rounded-md" />
        ))}
      </div>
      <div className="flex items-center">
        <div className="relative flex-grow mr-2">
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <Skeleton className="h-10 w-20 rounded-md" />
      </div>
    </div>
  ),
  ssr: false,
})

export const DynamicPaymentsTable = dynamic(() => import("@/components/admin/payments/PaymentsTable"), {
  loading: () => (
    <div className="space-y-4 mt-4">
      <div className="grid grid-cols-6 gap-4 p-4 border-b">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-6 w-full rounded-md" />
        ))}
      </div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="grid grid-cols-6 gap-4 p-4 border-b">
          {[...Array(6)].map((_, j) => (
            <Skeleton key={j} className="h-6 w-full rounded-md" />
          ))}
        </div>
      ))}
    </div>
  ),
  ssr: false,
})

export const DynamicPaymentsPagination = dynamic(() => import("@/components/admin/payments/PaymentsPagination"), {
  loading: () => (
    <div className="flex justify-center items-center space-x-2 mt-4">
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} className="h-10 w-10 rounded-md" />
      ))}
    </div>
  ),
  ssr: false,
})

// 관리자 프로필 컴포넌트 동적 임포트
export const DynamicAdminProfileContent = dynamic(() => import("@/components/admin/profile/AdminProfileContent"), {
  loading: () => (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* 왼쪽 사이드바 스켈레톤 */}
        <div className="w-full md:w-1/4">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-col items-center">
              <Skeleton className="h-32 w-32 rounded-full mb-4" />
              <Skeleton className="h-6 w-40 mb-2" />
              <Skeleton className="h-4 w-32 mb-4" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          </div>
        </div>

        {/* 오른쪽 콘텐츠 영역 스켈레톤 */}
        <div className="w-full md:w-3/4">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <div className="flex space-x-4">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-10 w-24 rounded-md" />
                ))}
              </div>
            </div>
            <div className="p-6 space-y-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-6 w-48" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Skeleton className="h-12 w-full rounded-md" />
                    <Skeleton className="h-12 w-full rounded-md" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  ssr: false,
})
