"use client"
import { CompanyHeader } from "./CompanyHeader"
import { ReviewStatistics } from "./ReviewStatistics"
import { InterviewExperience } from "./InterviewExperience"
import { RelatedCompanies } from "./RelatedCompanies"
import { PromotionalBanner } from "./PromotionalBanner"

interface CompanyReviewDetailProps {
  companyId: string
}

export const CompanyReviewDetail = ({ companyId }: CompanyReviewDetailProps) => {
  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <CompanyHeader companyId={companyId} />

      <div className="max-w-[1200px] mx-auto px-4 mt-6 flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/3">
          <PromotionalBanner />
          <ReviewStatistics />
          <InterviewExperience />
        </div>
        <div className="w-full lg:w-1/3">
          <RelatedCompanies />
        </div>
      </div>
    </div>
  )
}
