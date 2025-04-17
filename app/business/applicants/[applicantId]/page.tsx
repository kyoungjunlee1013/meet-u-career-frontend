import { BusinessHeader } from "@/components/business/layout/BusinessHeader"
import { DynamicApplicantDetail } from "@/utils/dynamic-imports"

export default function ApplicantDetailPage({ params }: { params: { applicantId: string } }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <BusinessHeader activeTab="지원자 관리" />
      <main className="container mx-auto py-8 px-4">
        <DynamicApplicantDetail applicantId={params.applicantId} />
      </main>
    </div>
  )
}
