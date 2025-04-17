import { Header } from "@/components/home/Header"
import { Footer } from "@/components/home/Footer"
import { CompanyJobsContent } from "@/components/personal/company/jobs/CompanyJobsContent"

export default function CompanyJobsPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <CompanyJobsContent companyId={params.id} />
      </main>
      <Footer />
    </div>
  )
}
