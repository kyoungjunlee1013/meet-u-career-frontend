import { BusinessHeader } from "@/components/business/layout/BusinessHeader"
import { JobPostingForm } from "@/components/business/jobs/register/JobPostingForm"

export default function RegisterJobPostingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <BusinessHeader />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">공고 작성하기</h1>
        <JobPostingForm />
      </main>
    </div>
  )
}
