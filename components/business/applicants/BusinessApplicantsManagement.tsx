import { BusinessHeader } from "@/components/business/layout/BusinessHeader"
import { ApplicantsHeader } from "./ApplicantsHeader"
import { JobPostingCard } from "./JobPostingCard"
import { ApplicantsStatistics } from "./ApplicantsStatistics"
import { ApplicantsSearch } from "./ApplicantsSearch"
import { ApplicantsTable } from "./ApplicantsTable"

export const BusinessApplicantsManagement = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <BusinessHeader />
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-6">
        <ApplicantsHeader />
        <JobPostingCard />
        <ApplicantsStatistics />
        <ApplicantsSearch />
        <ApplicantsTable />
      </main>
    </div>
  )
}
