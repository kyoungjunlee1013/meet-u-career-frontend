"use client"

import { useEffect, useState } from "react"
import { CompanyHeader } from "./CompanyHeader"
import { ActionButtons } from "./ActionButtons"
import { InterviewExperience } from "./InterviewExperience"
import { PromotionalBanner } from "./PromotionalBanner"
import { apiClient } from "@/api/apiClient"

interface CompanyInfo {
  companyId: number
  companyName: string
  industry: string
  logoKey: string | null
  address: string
  businessNumber: string
  website: string
}

interface InterviewReview {
  id: number
  jobCategoryName: string
  interviewYearMonth: string
  rating: number
  createdAt: string
  questionsAsked: string
  result: number
  difficulty: number
  interviewType: number
  interviewParticipants: number
  interviewTip: string
}

interface Props {
  companyId: string
}

export const CompanyReviewDetail = ({ companyId }: Props) => {
  const [company, setCompany] = useState<CompanyInfo | null>(null)
  const [reviews, setReviews] = useState<InterviewReview[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await apiClient.get(`/api/personal/interview-reviews/company/info/${companyId}`)
        setCompany(res.data.data)
      } catch (e) {
        setError(true)
      }
    }

    const fetchReviews = async () => {
      try {
        const res = await apiClient.get(`/api/personal/interview-reviews/company/${companyId}`)
        setReviews(Array.isArray(res.data.data) ? res.data.data : [])
      } catch (e) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchCompany()
    fetchReviews()
  }, [companyId])

  if (loading) {
    return <div className="p-8 text-sm text-gray-500">로딩 중...</div>
  }

  if (error) {
    return <div className="p-8 text-sm text-red-500">데이터를 불러오지 못했습니다.</div>
  }

  return (
    <div className="bg-gray-50 pb-20">
      {company ? (
        <CompanyHeader
          companyName={company.companyName}
          logoKey={company.logoKey}
          industry={company.industry}
          address={company.address}
          businessNumber={company.businessNumber}
          website={company.website}
        />
      ) : (
        <div className="text-sm text-gray-400 p-6">회사 정보를 찾을 수 없습니다.</div>
      )}

      <div className="max-w-[1200px] mx-auto px-4 mt-6">
        <ActionButtons reviews={reviews} />
        <PromotionalBanner reviewCount={reviews.length} />
        <InterviewExperience reviews={reviews} />
      </div>
    </div>
  )
}
