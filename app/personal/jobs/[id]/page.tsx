import { Header } from "@/components/home/Header"
import { MainNavigation } from "@/components/home/MainNavigation"
import { JobDetailContent } from "@/components/personal/jobs/JobDetailContent"
import { JobSidebar } from "@/components/personal/jobs/JobSidebar"
import { Footer } from "@/components/home/Footer"

interface JobDetailPageProps {
  params: { id: string }
}

const JobDetailPage = ({ params }: JobDetailPageProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <MainNavigation />
      <main className="flex-1 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="hidden md:block w-16">
              <JobSidebar />
            </div>
            <div className="flex-1">
              <JobDetailContent jobId={params.id} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default JobDetailPage
